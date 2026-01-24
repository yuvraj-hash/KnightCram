import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Wand2 } from "lucide-react";

import InteractiveParticles from "@/components/ui/InteractiveParticles";

interface HeroSectionProps {
  onSignUpClick: () => void;
}

const HeroSection = ({ onSignUpClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <InteractiveParticles />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-up">
            <Wand2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80">Student-Owned Network</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-gradient glow-text">Illuminating</span>
            <br />
            <span className="text-foreground">what others overlook</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            A global circle of students and alumni sharing truths, conquering the cram, and guiding the next generation through the darkness of doubt.
          </p>

          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>

            <span className="text-primary font-medium">If you're tired of being gaslit by the system, welcome home.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button
              variant="hero"
              size="xl"
              className="w-full sm:w-auto group"
              onClick={onSignUpClick}
            >
              Join the Circle
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
              Read Real Student Truths
            </Button>
          </div>

          {/* Trust Line */}
          <p className="mt-12 text-sm text-text-dim italic animate-fade-up" style={{ animationDelay: "0.5s" }}>
            "We don't promise success. We promise clarity."
          </p>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
