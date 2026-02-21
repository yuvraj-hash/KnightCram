import React from "react";
import { Check, BookOpen, GraduationCap, Award, Briefcase, Rocket, Laptop } from "lucide-react";

const ROLES = [
  { name: "Pre University Student", icon: BookOpen, color: "blue" },
  { name: "University Student", icon: GraduationCap, color: "purple" },
  { name: "Alumni / Opportunity Seeker", icon: Award, color: "indigo" },
  { name: "Working Professional", icon: Briefcase, color: "cyan" },
  { name: "Business Owner / Indie Professional", icon: Rocket, color: "pink" },
  { name: "Indie Hacker / Freelancer", icon: Laptop, color: "orange" },
];

const RoleSelector: React.FC<{ roles: string[]; onChange: (r: string[]) => void }> = ({ roles, onChange }) => {
  const toggle = (role: string) => {
    // Enforce single selection
    onChange([role]);
  };

  return (
    <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      <div className="px-6 py-6 border-b border-white/10">
        <h3 className="font-bold text-xl">Select Your Role</h3>
        <p className="text-sm text-white/50 mt-1">Choose the role that describes you best</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ROLES.map((role) => {
            const isSelected = roles.includes(role.name);
            const Icon = role.icon;

            return (
              <button
                key={role.name}
                onClick={() => toggle(role.name)}
                className={`relative px-5 py-4 rounded-xl font-medium transition duration-200 border ${isSelected
                  ? `border-${role.color}-500 bg-${role.color}-500/20 text-white shadow-lg shadow-${role.color}-500/20`
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20"
                  }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <Icon size={24} className={isSelected ? `text-${role.color}-400` : "text-white/50"} />
                    <span className="text-sm">{role.name}</span>
                  </div>
                  {isSelected && <Check size={18} className="text-green-400 flex-shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {roles.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-300">
              <strong>Selected roles:</strong> {roles.join(", ")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoleSelector;
