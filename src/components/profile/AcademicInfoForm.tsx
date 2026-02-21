import React, { useState, useEffect } from "react";
import { localStorageService } from "@/lib/localStorageService";
import { BookOpen, Briefcase, Award } from "lucide-react";

interface AcademicInfoFormProps {
  profile: any;
  onSave?: (p: any) => void;
}

// Helper for rendering horizontal form field
const FormField = ({ label, value, field, placeholder, onFocus, onChange, className = "" }: any) => (
  <div className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-4 ${className}`}>
    <label className="w-full md:w-1/3 text-sm font-medium text-white text-left md:text-right">{label}</label>
    <div className="w-full md:w-2/3 max-w-md">
      <input
        value={value}
        onFocus={() => onFocus(field)}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full px-3 py-3 md:py-2 text-base md:text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-blue-500 focus:outline-none transition"
        placeholder={placeholder}
      />
    </div>
  </div>
);

const AcademicInfoForm: React.FC<AcademicInfoFormProps> = ({ profile, onSave }) => {
  const [academicInfo, setAcademicInfo] = useState({
    class: profile.class || "",
    stream: profile.stream || "",
    course: profile.course || "",
    university: profile.university || "",
    college: profile.college || "",
    state: profile.state || "",
    academicYear: profile.academicYear || "",
    yearOfPassing: profile.yearOfPassing || "",
    company: profile.company || "",
    designation: profile.designation || "",
    industry: profile.industry || "",
    businessName: profile.businessName || "",
    businessDescription: profile.businessDescription || "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setAcademicInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    setAcademicInfo({
      class: profile.class || "",
      stream: profile.stream || "",
      course: profile.course || "",
      university: profile.university || "",
      college: profile.college || "",
      state: profile.state || "",
      academicYear: profile.academicYear || "",
      yearOfPassing: profile.yearOfPassing || "",
      company: profile.company || "",
      designation: profile.designation || "",
      industry: profile.industry || "",
      businessName: profile.businessName || "",
      businessDescription: profile.businessDescription || "",
    });
  }, [profile]);

  const handleSave = () => {
    localStorageService.updateProfile(academicInfo);
    localStorageService.updateCompletion();
    if (onSave) onSave(academicInfo);
    setFocusedField(null); // Hide buttons after save
  };

  const handleReset = () => {
    setAcademicInfo({
      class: profile.class || "",
      stream: profile.stream || "",
      course: profile.course || "",
      university: profile.university || "",
      college: profile.college || "",
      state: profile.state || "",
      academicYear: profile.academicYear || "",
      yearOfPassing: profile.yearOfPassing || "",
      company: profile.company || "",
      designation: profile.designation || "",
      industry: profile.industry || "",
      businessName: profile.businessName || "",
      businessDescription: profile.businessDescription || "",
    });
    setFocusedField(null); // Hide buttons after reset
  };

  const renderRoleSpecificFields = () => {
    if (!profile.roles || profile.roles.length === 0) {
      return (
        <div className="text-center py-8">
          <BookOpen size={40} className="mx-auto text-white/30 mb-4" />
          <p className="text-white/60">Select a role to see relevant academic or professional fields</p>
        </div>
      );
    }

    const role = profile.roles[0];

    // Pre University Student
    if (role === "Pre University Student") {
      return (
        <div className="space-y-4">
          <FormField label="Class" value={academicInfo.class} field="class" placeholder="e.g., 12th" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Stream" value={academicInfo.stream} field="stream" placeholder="e.g., Science, Commerce" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="State" value={academicInfo.state} field="state" placeholder="e.g., Delhi" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="High School / Intermediate College" value={academicInfo.college} field="college" placeholder="e.g., DPS RK Puram" onFocus={setFocusedField} onChange={handleInputChange} />
        </div>
      );
    }

    // University Student
    if (role === "University Student") {
      return (
        <div className="space-y-4">
          <FormField label="State" value={academicInfo.state} field="state" placeholder="e.g., Karnataka" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="University" value={academicInfo.university} field="university" placeholder="e.g., VTU" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="College (Optional)" value={academicInfo.college} field="college" placeholder="e.g., RV College of Engineering" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Course" value={academicInfo.course} field="course" placeholder="e.g., B.E. Computer Science" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Stream" value={academicInfo.stream} field="stream" placeholder="e.g., Engineering" onFocus={setFocusedField} onChange={handleInputChange} />

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label className="w-full md:w-1/3 text-sm font-medium text-white text-left md:text-right">Academic Year</label>
            <div className="w-full md:w-2/3 max-w-md">
              <input
                value={academicInfo.academicYear}
                onFocus={() => setFocusedField("academicYear")}
                onChange={(e) => handleInputChange("academicYear", e.target.value)}
                className="w-full px-3 py-3 md:py-2 text-base md:text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-blue-500 focus:outline-none transition"
                placeholder="e.g., 3rd Year"
              />
              <p className="text-xs text-white/50 mt-1">Used for campus feed personalization.</p>
            </div>
          </div>
        </div>
      );
    }

    // Alumni / Opportunity Seeker
    if (role === "Alumni / Opportunity Seeker") {
      return (
        <div className="space-y-4">
          <FormField label="State" value={academicInfo.state} field="state" placeholder="e.g., Maharashtra" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="University" value={academicInfo.university} field="university" placeholder="e.g., Mumbai University" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="College (Optional)" value={academicInfo.college} field="college" placeholder="e.g., St. Xavier's College" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Course" value={academicInfo.course} field="course" placeholder="e.g., B.Sc IT" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Stream" value={academicInfo.stream} field="stream" placeholder="e.g., Science" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Year of Passing" value={academicInfo.yearOfPassing} field="yearOfPassing" placeholder="e.g., 2023" onFocus={setFocusedField} onChange={handleInputChange} />
        </div>
      );
    }

    // Working Professional
    if (role === "Working Professional") {
      return (
        <div className="space-y-4">
          <FormField label="Company/Organization" value={academicInfo.company} field="company" placeholder="e.g., Tech Corp" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Designation" value={academicInfo.designation} field="designation" placeholder="e.g., Software Engineer" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Industry" value={academicInfo.industry} field="industry" placeholder="e.g., IT Services" onFocus={setFocusedField} onChange={handleInputChange} />
        </div>
      );
    }

    // Business Owner / Indie Professional
    if (role === "Business Owner / Indie Professional") {
      return (
        <div className="space-y-4">
          <FormField label="Company/Organization Name (Optional)" value={academicInfo.businessName} field="businessName" placeholder="e.g., My Startup" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Designation (Optional)" value={academicInfo.designation} field="designation" placeholder="e.g., Founder, CEO" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Industry" value={academicInfo.industry} field="industry" placeholder="e.g., SaaS" onFocus={setFocusedField} onChange={handleInputChange} />

          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
            <label className="w-full md:w-1/3 text-sm font-medium text-white text-left md:text-right mt-0 md:mt-2">What you do? (About your work/business)</label>
            <div className="w-full md:w-2/3 max-w-md">
              <textarea
                value={academicInfo.businessDescription}
                onFocus={() => setFocusedField("businessDescription")}
                onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                rows={4}
                className="w-full px-3 py-3 md:py-2 text-base md:text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-blue-500 focus:outline-none transition resize-none"
                placeholder="Describe your business and what you do..."
              />
            </div>
          </div>
        </div>
      );
    }

    // Indie Hacker / Freelancer
    if (role === "Indie Hacker / Freelancer") {
      return (
        <div className="space-y-4">
          <FormField label="Current Client / Project (Optional)" value={academicInfo.company} field="company" placeholder="e.g., Client name or project" onFocus={setFocusedField} onChange={handleInputChange} />
          <FormField label="Primary Skills" value={academicInfo.industry} field="industry" placeholder="e.g., Web Dev, UI/UX, Copywriting" onFocus={setFocusedField} onChange={handleInputChange} />

          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
            <label className="w-full md:w-1/3 text-sm font-medium text-white text-left md:text-right mt-0 md:mt-2">What you do? (Work / side projects)</label>
            <div className="w-full md:w-2/3 max-w-md">
              <textarea
                value={academicInfo.businessDescription}
                onFocus={() => setFocusedField("businessDescription")}
                onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                rows={4}
                className="w-full px-3 py-3 md:py-2 text-base md:text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-blue-500 focus:outline-none transition resize-none"
                placeholder="Describe your freelance work, side-projects, or what you're building..."
              />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const roleIcon = () => {
    if (!profile.roles || !profile.roles[0]) return <BookOpen size={20} />;
    const role = profile.roles[0];
    if (
      role === "Working Professional" ||
      role === "Business Owner / Indie Professional" ||
      role === "Indie Hacker / Freelancer"
    ) {
      return <Briefcase size={20} />;
    }
    if (role === "Alumni / Opportunity Seeker") return <Award size={20} />;
    return <BookOpen size={20} />;
  };

  return (
    <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-blue-400">{roleIcon()}</div>
          <div>
            <h3 className="font-bold text-xl">
              {["Pre University Student", "University Student", "Alumni / Opportunity Seeker"].includes(profile.roles?.[0])
                ? "Academic Details"
                : "Professional Details"}
            </h3>
            <p className="text-sm text-white/50 mt-1">Complete your profile with relevant information</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {renderRoleSpecificFields()}

        <div className="mt-4">
          {/* Action Buttons - Only show if any field is focused */}
          {profile.roles && profile.roles.length > 0 && focusedField && (
            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button
                onClick={handleReset}
                className="px-4 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition duration-200"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AcademicInfoForm;