import React, { useEffect, useState } from "react";
import { localStorageService } from "@/lib/localStorageService";
import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

interface ProfileStrengthMeterProps {
  profile: any;
  showDetails?: boolean;
}

const ProfileStrengthMeter: React.FC<ProfileStrengthMeterProps> = ({ profile, showDetails = true }) => {
  const [completionPercentage, setCompletionPercentage] = useState(profile.completionPercentage || 0);

  useEffect(() => {
    const percentage = localStorageService.calculateCompletion();
    setCompletionPercentage(percentage);
  }, [profile]);

  const basicInfoCompleted = !!(profile.name && profile.handle && profile.email && profile.phone);
  const academicInfoCompleted = !!(
    profile.university || profile.college || profile.course ||
    profile.class || profile.stream || profile.academicYear ||
    profile.yearOfPassing || profile.company || profile.businessName
  );
  const verificationSubmitted = profile.verificationStatus && profile.verificationStatus !== "none";
  const role = profile.roles && profile.roles.length > 0 ? profile.roles[0] : "";

  const getCompletionColor = () => {
    if (completionPercentage >= 80) return 'from-green-500 to-emerald-500';
    if (completionPercentage >= 60) return 'from-blue-500 to-cyan-500';
    if (completionPercentage >= 40) return 'from-yellow-500 to-amber-500';
    return 'from-red-500 to-orange-500';
  };

  const getStatusMessage = () => {
    if (completionPercentage < 40) return "Start filling out your profile";
    if (completionPercentage < 60) return "Complete your profile to unlock features";
    if (completionPercentage < 80) return "Almost there! Just a few more details";
    if (completionPercentage < 100) return "Nearly complete! Just verification remaining";
    return "Your profile is complete!";
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold">Profile Strength</h3>
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {completionPercentage}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pt-6">
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div
            className={`bg-gradient-to-r ${getCompletionColor()} h-3 rounded-full transition-all duration-700 ease-out shadow-lg`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Status Message */}
      <div className="px-6 py-4">
        <p className="text-sm text-white/70 font-medium">
          {getStatusMessage()}
        </p>
      </div>

      {/* Checklist */}
      {showDetails && (
        <div className="px-6 pb-6 space-y-3">
          <h4 className="font-semibold text-white text-sm">Your Progress</h4>

          <div className="space-y-3">
            {/* Basic Info */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              {basicInfoCompleted ? (
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
              ) : (
                <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${basicInfoCompleted ? "text-green-400" : "text-white"}`}>Basic Information</p>
                <p className="text-xs text-white/50 mt-0.5">Name, handle, email, phone</p>
              </div>
            </div>

            {(role === "Alumni" || role === "Opportunity Seeker") && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                {academicInfoCompleted ? (
                  <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                ) : (
                  <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${academicInfoCompleted ? "text-green-400" : "text-white"}`}>Academic/Professional Info</p>
                  <p className="text-xs text-white/50 mt-0.5">School, college, company, or business details</p>
                </div>
              </div>
            )}

            {/* Verification */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              {verificationSubmitted ? (
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
              ) : (
                <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${verificationSubmitted ? "text-green-400" : "text-white"}`}>Verification</p>
                <p className="text-xs text-white/50 mt-0.5">
                  {profile.verificationStatus === "verified" ? "✓ Verified" : profile.verificationStatus === "submitted" ? "⏳ Pending review" : "Upload documents"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tip Box */}
      {completionPercentage < 100 && (
        <div className="mx-6 mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-300 leading-relaxed">
            <strong className="text-blue-200">💡 Tip:</strong> {getStatusMessage()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileStrengthMeter;