import { UserCheck, ShieldCheck, Users } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    step: "01",
    title: "Verified Students",
    description: "Only real students can join. We verify identities to ensure authentic voices.",
  },
  {
    icon: ShieldCheck,
    step: "02",
    title: "Anonymous Truth Sharing",
    description: "Share your experiences without fear. Your identity is protected.",
  },
  {
    icon: Users,
    step: "03",
    title: "Community Validated",
    description: "Insights are validated by the community. Truth rises, lies fall.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A student-driven platform for truth, not marketing.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group flex flex-col md:flex-row items-start gap-6 mb-12 last:mb-0"
            >
              {/* Step Number & Icon */}
              <div className="flex-shrink-0 flex items-center gap-4">
                <span className="text-6xl md:text-7xl font-display font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                  {step.step}
                </span>
                <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-[4.5rem] mt-20 w-0.5 h-16 bg-gradient-to-b from-primary/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
