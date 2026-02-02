import { Check, X } from "lucide-react";

const whatItIs = [
  "A student-driven platform for truth",
  "Real experiences, anonymous when needed",
  "Built for students, not institutions",
  "Community-powered insights",
];

const whyItExists = [
  { reason: "Because brochures lie", icon: X },
  { reason: "Because placements are inflated", icon: X },
  { reason: "Because students deserve reality before regret", icon: Check },
];

const WhatIsSection = () => {
  return (
    <section className="py-20 md:py-32 relative bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* What It Is */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
              The Platform
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
              What is <span className="text-gradient">KnightCram</span>?
            </h2>

            <div className="space-y-4">
              {whatItIs.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why It Exists */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
              The Purpose
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
              Why it <span className="text-gradient">exists</span>
            </h2>

            <div className="space-y-4">
              {whyItExists.map((item, index) => (
                <div
                  key={item.reason}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${index === 2
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-background border border-border hover:border-destructive/30"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${index === 2 ? "bg-primary/20" : "bg-destructive/10"
                      }`}
                  >
                    {index === 2 ? (
                      <Check className="w-5 h-5 text-primary" />
                    ) : (
                      <X className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <span
                    className={`font-medium ${index === 2 ? "text-primary" : "text-foreground"
                      }`}
                  >
                    {item.reason}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
