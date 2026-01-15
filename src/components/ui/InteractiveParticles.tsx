"use client";

import { useEffect, useRef } from "react";

interface MousePosition {
    x: number;
    y: number;
}

const InteractiveParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Configuration
        const particleCount = 100;
        const connectionDistance = 0; // No lines, just sparkles
        const mouseRadius = 150;
        const items: Particle[] = [];

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            baseX: number;
            baseY: number;
            density: number;

            constructor(canvasWidth: number, canvasHeight: number) {
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow ambient movement
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 0.5; // Random size sprinkles
                this.density = (Math.random() * 30) + 1;
                // Premium colors: clear white/silver with low opacity
                const opacity = Math.random() * 0.5 + 0.1;
                this.color = `rgba(255, 255, 255, ${opacity})`;
            }

            update(mouse: MousePosition, headerWidth: number, headerHeight: number) {
                // Ambient movement
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges (optional, or wrap around) - doing wrap for smoother feel
                if (this.x > headerWidth) this.x = 0;
                else if (this.x < 0) this.x = headerWidth;
                if (this.y > headerHeight) this.y = 0;
                else if (this.y < 0) this.y = headerHeight;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Gentle attraction/repulsion physics
                // "sprinkles also move with it" -> Attraction or flow?
                // Let's do a repulsion effect that creates a clearing, or attraction? 
                // "move WITH it" suggests attraction. Let's try a magnetic flow.

                if (distance < mouseRadius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseRadius - distance) / mouseRadius;
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;

                    // Move away from mouse (repulsion) is often cleaner for "interactive" 
                    // but user said "move with it".
                    // Let's try a subtle push away to clear path (premium feel) or pull towards.
                    // Let's go with a repulse-then-return elastic effect, it looks very high-end.
                    this.x += directionX * 0.5;
                    this.y += directionY * 0.5;
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const { width, height } = canvas.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;

            // Scale for retina displays if needed, but keeping simple for perf first
            // const dpr = window.devicePixelRatio || 1;
            // canvas.width = width * dpr;
            // canvas.height = height * dpr;
            // ctx.scale(dpr, dpr);

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(width, height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update(mouseRef.current, canvas.width, canvas.height);
                particle.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Calculate mouse position relative to canvas
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        window.addEventListener("resize", handleResize);
        // Attach mouse move to container or window? Window allows better capture if hero is large
        // But let's attach to the hero container ideally.
        // However, the component is inside the hero.
        window.addEventListener("mousemove", handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0">
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
};

export default InteractiveParticles;
