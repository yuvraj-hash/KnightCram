import { useCallback, useEffect, useState } from "react";
import { getProfile, saveProfile } from "@/lib/profileService";
import { localStorageService } from "@/lib/localStorageService";
import {
  MessageCircle, UserPlus, Share2, MoreHorizontal,
  MapPin, Link as LinkIcon, Calendar, Building2,
  Plus, Edit2, ArrowRight, X, Pencil
} from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSettingsIcon from "@/components/icons/ProfileSettingsIcon";
import BasicInfoForm from "@/components/profile/BasicInfoForm";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "skills" | "experience">("posts");
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();

  const loadProfile = useCallback(async () => {
    const p = await getProfile();
    setProfile(p);
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Refresh profile from localStorage when edit modal closes
  const handleModalClose = () => {
    setEditOpen(false);
    const fresh = localStorageService.getProfile();
    setProfile((prev: any) => ({ ...prev, ...fresh }));
  };

  // Called by BasicInfoForm on every successful save — keeps view in sync immediately
  const handleBasicInfoSave = (updatedData: any) => {
    setProfile((prev: any) => ({ ...prev, ...updatedData }));
  };

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );

  const completionPercentage = profile.completionPercentage || 0;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-background/50 relative">

      {/* ─── Profile Settings icon → goes to Settings page (Profile section) ─── */}
      <button
        onClick={() => navigate("/settings")}
        className="fixed top-16 md:top-20 right-3 md:right-4 z-40 p-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all shadow-xl group"
        aria-label="Profile Settings"
        title="Profile Settings"
      >
        <ProfileSettingsIcon strokeWidth={2} className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-500" />
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Profile Card Section */}
        <div className="relative px-0 md:px-6 mb-6 pt-0 md:pt-6">
          <ProfileHeader
            profile={profile}
            onSave={async (updatedData: any) => {
              const newProfile = { ...profile, ...updatedData };
              setProfile(newProfile);
              await saveProfile(updatedData);
            }}
          />

          <div className="bg-white/5 backdrop-blur-xl rounded-b-none md:rounded-b-2xl border-x-0 md:border-x border-b border-white/10 shadow-2xl px-4 md:px-6 pb-6 pt-0 -mt-2">
            {/* Stats */}
            <div className="grid grid-cols-5 gap-2 md:gap-4 mt-0 pt-4 border-t border-white/10 pb-2 md:pb-0">
              {[
                { value: "45", label: "Posts" },
                { value: "3.5K", label: "Followers" },
                { value: "520", label: "Followings" },
                { value: "1.8K", label: "Interplay" },
                { value: "85", label: "Activity" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-white">{value}</div>
                  <div className="text-[10px] md:text-xs text-white/50 mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-4 md:px-6 grid md:grid-cols-3 gap-6 pb-20 md:pb-16">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Strength Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 md:p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold">Profile Strength</h2>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  {completionPercentage}%
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-xs md:text-sm text-white/60 mb-4">
                {completionPercentage < 60
                  ? "Complete your profile to unlock campus features and increase visibility."
                  : completionPercentage < 80
                    ? "Almost there! Just a few more details needed."
                    : "Excellent! Your profile is complete and stands out."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Basic Info", done: true },
                  { label: "Academic", done: !!profile.college },
                  { label: "Verified", done: profile.verificationStatus !== "none" },
                ].map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${done ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"}`}>
                      {done ? "✓" : "○"}
                    </span>
                    <span className="text-white/70">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 md:p-6 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base md:text-lg">About</h3>
                <button
                  onClick={() => setEditOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition px-2 py-1 rounded-lg hover:bg-white/10"
                  title="Edit Basic Info"
                >
                  <Pencil size={13} />
                  Edit Profile
                </button>
              </div>
              {/* Bio / Headline */}
              {profile.bio && (
                <p className="text-sm font-medium text-blue-300 mb-2 italic">"{profile.bio}"</p>
              )}
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                {profile.college
                  ? `${profile.college} student passionate about learning and growth.`
                  : profile.company
                    ? `${profile.designation || "Professional"} at ${profile.company}.`
                    : "Write a short bio to introduce yourself to the community."}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-1 overflow-x-auto scrollbar-hide mt-6">
              {(["posts", "skills", "experience"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition whitespace-nowrap min-w-[100px] md:min-w-0 ${activeTab === tab ? "bg-blue-600 text-white shadow-lg" : "text-white/60 hover:text-white/80"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "posts" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 md:p-6 shadow-xl text-center">
                <div className="py-8 md:py-12">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                  <p className="text-white/60 text-sm mb-4">Share your achievements, insights, and resources with the community</p>
                  <button className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition">Create Post</button>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 md:p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Skills</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-full text-sm font-medium border border-white/20 hover:bg-white/10 transition">Demonstrate skills</button>
                    <button className="p-1 hover:bg-white/10 rounded-full transition"><Plus size={20} /></button>
                    <button className="p-1 hover:bg-white/10 rounded-full transition"><Edit2 size={18} /></button>
                  </div>
                </div>
                <div className="space-y-1">
                  {["Problem Solving", "Leadership", "Communication", "Analytics"].map((skill, i) => (
                    <div key={skill} className={`py-3 ${i !== 3 ? "border-b border-white/10" : ""}`}>
                      <div className="font-bold text-base">{skill}</div>
                      <div className="text-sm text-white/60 mt-1">2 endorsements</div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 mt-2 text-center text-white/60 font-medium hover:text-white transition flex items-center justify-center gap-1 border-t border-white/10">
                  Show all 15 skills <ArrowRight size={16} />
                </button>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 md:p-6 shadow-xl text-left">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Experience</h3>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-white/10 rounded-full transition"><Plus size={20} /></button>
                    <button className="p-1 hover:bg-white/10 rounded-full transition"><Edit2 size={18} /></button>
                  </div>
                </div>
                {profile.company || profile.businessName ? (
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-xl shrink-0">
                      <Building2 size={24} className="text-white/70" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base">{profile.designation || "Owner/Founder"}</h4>
                      <p className="text-sm text-white">{profile.company || profile.businessName}</p>
                      <p className="text-xs text-white/50 mt-1">{profile.industry || "Business"} · Full-time</p>
                      <p className="text-xs text-white/50">Jan 2023 - Present · 1 yr 2 mos</p>
                      {profile.businessDescription && (
                        <p className="text-sm text-white/80 mt-3 leading-relaxed">{profile.businessDescription}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 size={32} className="text-white/30" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No experience added yet</h3>
                    <p className="text-white/60 text-sm mb-4">Add your work experience to build your credibility</p>
                    <button className="text-blue-400 font-medium hover:underline">Add experience</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 hidden md:block">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 md:p-6 shadow-xl">
              <div className="flex items-center gap-3 text-white/70">
                <Calendar size={18} />
                <div className="text-sm">
                  <div className="text-white/50">Joined</div>
                  <div className="font-medium">Jan 2024</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-4 md:p-6 shadow-xl border border-white/10">
              <h3 className="font-bold text-lg mb-2">Complete Your Profile</h3>
              <p className="text-sm text-white/80 mb-4">Increase profile visibility and unlock exclusive features</p>
              <button
                onClick={() => navigate("/settings")}
                className="w-full px-4 py-2 rounded-full bg-white text-blue-600 font-medium hover:bg-white/90 transition"
              >
                View Setup Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Edit Basic Info Modal (slide-up sheet) ─── */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleModalClose}
          />

          {/* Sheet */}
          <div className="relative w-full md:max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f1117] border border-white/10 rounded-t-3xl md:rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 md:fade-in duration-300 z-10">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0f1117]/95 backdrop-blur-md rounded-t-3xl md:rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold text-white">Edit Basic Info</h2>
                <p className="text-xs text-white/40 mt-0.5">Changes save instantly to your profile</p>
              </div>
              <button
                onClick={handleModalClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* BasicInfoForm embedded — no outer save bar needed */}
            <div className="p-6">
              <BasicInfoForm
                profile={profile}
                onSave={handleBasicInfoSave}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfileView;
