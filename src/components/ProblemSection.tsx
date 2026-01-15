import { GraduationCap, Building2, FileText, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: GraduationCap,
    stage: "School",
    problem: "Education teaches marks, not skills",
  },
  {
    icon: Building2,
    stage: "College",
    problem: "Colleges optimize rankings, not outcomes",
  },
  {
    icon: FileText,
    stage: "Degree",
    problem: "Degrees do not map to real jobs",
  },
  {
    icon: TrendingDown,
    stage: "Result",
    problem: "Mass unemployment & unfulfilled potential",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why are Indian youth <span className="text-gradient">jobless</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The pipeline is broken at every stage. Here's what no one tells you.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, index) => (
            <div
              key={item.stage}
              className="group relative p-6 rounded-2xl bg-card border-gradient hover-lift cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {item.stage}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.problem}
              </p>

              {/* Arrow connector (hidden on last item) */}
              {index < problems.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 line-gradient" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
