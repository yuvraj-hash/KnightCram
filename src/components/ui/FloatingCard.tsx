import React, { useState, useRef, useEffect } from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  parallax?: boolean;
  magnetic?: boolean;
  depthEffect?: boolean;
  elastic?: boolean;
  onClick?: () => void;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ 
  children, 
  className = "", 
  parallax = true,
  magnetic = true,
  depthEffect = true,
  elastic = false,
  onClick 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !parallax) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      
      if (parallax) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;
        setPosition({ x: moveX, y: moveY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [parallax]);

  const handleMouseEnter = () => {
    if (elastic) {
      // Add elastic effect on hover
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.02)`;
      }
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    if (elastic && cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
  };

  // Magnetic effect calculation
  const magneticStyle = magnetic ? {
    transform: `translate(${position.x}px, ${position.y}px)`
  } : {};

  // Depth effect styling
  const depthStyle = depthEffect ? {
    boxShadow: `0 10px 30px -10px rgba(0,0,0,0.3), 
                inset 0 0 0 1px rgba(255,255,255,0.1),
                inset 0 20px 30px -10px rgba(255,255,255,0.2)`
  } : {};

  const combinedStyle = {
    ...magneticStyle,
    ...depthStyle,
    ...(elastic ? { 
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      transform: `perspective(1000px) rotateX(${position.y / 10}deg) rotateY(${position.x / 10}deg) scale(1)`
    } : {})
  };

  return (
    <div 
      ref={cardRef}
      className={`rounded-xl bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 ease-out ${className}`}
      style={combinedStyle}
      onMouseMove={parallax ? undefined : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FloatingCard;