import { Button } from "@/components/ui/button";
import { ArrowRight, Moon } from "lucide-react";

interface CTASectionProps {
  onSignUpClick: () => void;
}

const CTASection = ({ onSignUpClick }: CTASectionProps) => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-pulse-glow">
            <Moon className="w-10 h-10 text-primary stroke-[2.5px]" />
          </div>

          {/* Content */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Join the global circle of{" "}
            <span className="text-gradient">night owls</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Be part of a community that values truth over marketing, reality over
            illusions. Your voice matters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="hero"
              size="xl"
              className="w-full sm:w-auto group"
              onClick={onSignUpClick}
            >
              Sign Up Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by students from
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-foreground/40">
              <span className="text-sm font-medium">IITs</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <span className="text-sm font-medium">NITs</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <span className="text-sm font-medium">IIMs</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <span className="text-sm font-medium">Private Universities</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <span className="text-sm font-medium">& More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
