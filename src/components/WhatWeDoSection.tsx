import { Eye, Brain, Compass } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Honest Reviews",
    description: "Real takes on professors, dorms,  placements, faculty behavior & campus realities - unfiltered and verified.",
  },
  {
    icon: Brain,
    title: "Restore Awareness",
    description: "Understand the system you're in before you can navigate it. Knowledge is power.",
  },
  {
    icon: Compass,
    title: "Navigate Reality",
    description: "Help students make decisions based on truth, not marketing fluff.",
  },
];

const WhatWeDoSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative bg-card/50">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px line-gradient" />
      <div className="absolute bottom-0 left-0 w-full h-px line-gradient" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Our Mission
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What does <span className="text-gradient">KnightCram</span> do?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're not here to sell you dreams. We're here to arm you with reality.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 hover-lift text-center"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
