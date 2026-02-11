import { useEffect, useState } from "react";
import { localStorageService } from "@/lib/localStorageService";
import ProfileHeader from "@/components/profile/ProfileHeader";
import RoleSelector from "@/components/profile/RoleSelector";
import BasicInfoForm from "@/components/profile/BasicInfoForm";
import AcademicInfoForm from "@/components/profile/AcademicInfoForm";
import VerificationUploader from "@/components/profile/VerificationUploader";
import ProfileStrengthMeter from "@/components/profile/ProfileStrengthMeter";
import { CheckCircle2, Save } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProfileOnboarding = () => {
  const nav = useNavigate();
  const [profile, setProfile] = useState<any>({
    name: "",
    handle: "",
    email: "",
    phone: "",
    roles: [],
    class: "",
    stream: "",
    course: "",
    university: "",
    college: "",
    state: "",
    academicYear: "",
    yearOfPassing: "",
    company: "",
    designation: "",
    industry: "",
    businessName: "",
    businessDescription: "",
    verificationStatus: "none",
    completionPercentage: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const savedProfile = localStorageService.getProfile();
    setProfile((prev: any) => ({ ...prev, ...savedProfile }));
  }, []);

  const isProfileValid = () => {
    const hasRole = profile.roles && profile.roles.length > 0;
    const hasBasicInfo =
      profile.name?.trim() &&
      profile.handle?.trim() &&
      profile.email?.trim() &&
      profile.phone?.trim();
    return hasRole && hasBasicInfo;
  };

  const handleSave = async () => {
    if (!isProfileValid()) {
      toast.error("Please complete all mandatory sections (Role & Basic Info).");
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      toast.success("Profile saved successfully!");

      // Redirect to profile view after save
      setTimeout(() => {
        nav("/profile/view");
      }, 1000);
    } catch (error) {
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormSave = (updatedData: any) => {
    const merged = { ...profile, ...updatedData };
    localStorageService.updateProfile(merged);
    localStorageService.updateCompletion();
    setProfile(merged);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-background/50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-lg text-white/60">Build your professional presence on KnightCram</p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
            <CheckCircle2 className="text-green-400" size={20} />
            <p className="text-green-300">All changes saved successfully!</p>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Forms */}
          <div className="md:col-span-2 space-y-6">
            {/* Role Selection */}
            <RoleSelector roles={profile.roles || []} onChange={(roles: string[]) => handleFormSave({ roles })} />

            {/* Basic Info Form */}
            <BasicInfoForm profile={profile} onSave={handleFormSave} />

            {/* Academic Info Form */}
            <AcademicInfoForm profile={profile} onSave={handleFormSave} />

            {/* Verification Uploader */}
            <VerificationUploader profile={profile} onUpload={(data) => handleFormSave(data || { verificationStatus: "submitted" })} />

            {/* Unified Save Button */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-lg">Ready to share your profile?</h4>
                  <p className="text-sm text-white/80 mt-1">Save all your changes and make it live</p>
                </div>
                <button
                  onClick={handleSave}
                  disabled={isSaving || !isProfileValid()}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 md:py-3 rounded-xl bg-white text-blue-600 font-bold hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed transition duration-200 whitespace-nowrap flex-shrink-0"
                >
                  <Save size={20} />
                  {isSaving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Profile Strength */}
            <ProfileStrengthMeter profile={profile} />

            {/* Progress Tips */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden">
              <div className="px-6 py-6 border-b border-white/10">
                <h3 className="font-bold text-lg">Completion Tips</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-400 font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-sm">Basic Information</p>
                    <p className="text-xs text-white/50 mt-1">Fill in your name and contact details</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${profile.roles?.length ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                    {profile.roles?.length ? "✓" : "2"}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Select Your Roles</p>
                    <p className="text-xs text-white/50 mt-1">Choose roles that describe you best</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${profile.college || profile.company || profile.businessName ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}
                  >
                    {profile.college || profile.company || profile.businessName ? "✓" : "3"}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Academic/Professional Details</p>
                    <p className="text-xs text-white/50 mt-1">Add relevant information based on your role</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${profile.verificationStatus && profile.verificationStatus !== "none" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}
                  >
                    {profile.verificationStatus && profile.verificationStatus !== "none" ? "✓" : "4"}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Verify Your Profile</p>
                    <p className="text-xs text-white/50 mt-1">Upload ID documents for verification</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-6 shadow-xl border border-white/10">
              <h3 className="font-bold text-lg mb-4">Why Complete Your Profile?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="flex-shrink-0 mt-px" />
                  <span>Unlock exclusive campus features</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="flex-shrink-0 mt-px" />
                  <span>Build professional visibility</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="flex-shrink-0 mt-px" />
                  <span>Connect with opportunities</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="flex-shrink-0 mt-px" />
                  <span>Get verified and trusted status</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ProfileOnboarding;
