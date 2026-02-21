import React, { useState, useEffect } from "react";
import { Edit2, Check, X, Building2, GraduationCap, Camera, Plus, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageUploadModal from "./ImageUploadModal";
import ProfileSettingsIcon from "@/components/icons/ProfileSettingsIcon";

const ProfileHeader: React.FC<{ profile: any; onSave: (p: any) => void; saving?: boolean }> = ({ profile, onSave, saving }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name || "");
  const [handle, setHandle] = useState(profile.handle || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [location, setLocation] = useState(profile.location || "");
  const [activeModal, setActiveModal] = useState<"profile" | "cover" | null>(null);

  useEffect(() => {
    setName(profile.name || "");
    setHandle(profile.handle || "");
    setBio(profile.bio || "");
    setLocation(profile.location || "");
  }, [profile]);

  const save = () => {
    onSave({ name, handle, bio, location });
    setEditing(false);
  };

  const reset = () => {
    setName(profile.name || "");
    setHandle(profile.handle || "");
    setBio(profile.bio || "");
    setLocation(profile.location || "");
    setEditing(false);
  };

  const handleImageSave = (result: string) => {
    if (activeModal === "profile") {
      onSave({ image: result });
    } else if (activeModal === "cover") {
      onSave({ coverImage: result });
    }
    setActiveModal(null);
  };

  const organization = profile.college || profile.university || profile.company || profile.businessName;
  const isStudent = ["Pre University Student", "University Student", "Alumni / Opportunity Seeker"].includes(profile.roles?.[0]);

  // Ownership logic placeholder - assuming true for current profile view
  const isOwner = true;

  return (
    <>
      <section className="relative group">
        {/* Cover Gradient or Image */}
        <div
          className="h-44 md:h-64 rounded-t-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg relative overflow-hidden group/cover bg-cover bg-center"
          style={profile.coverImage ? { backgroundImage: `url(${profile.coverImage})` } : undefined}
        >
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover/cover:bg-black/20"></div>
          {/* Cover Photo Edit Trigger */}
          {isOwner && (
            <button
              onClick={() => setActiveModal("cover")}
              className="absolute bottom-3 right-3 md:bottom-5 md:right-5 z-20 p-2 md:p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition-all"
              title="Update Cover Photo"
            >
              <Camera size={16} />
            </button>
          )}
        </div>

        {/* Profile Card Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-b-2xl border border-white/10 px-4 md:px-8 pb-4 shadow-xl relative">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
            {/* Avatar - Overlapping Cover */}
            <div className="relative -mt-[4.5rem] md:-mt-[6.5rem] mb-2 md:mb-0 group/avatar flex-shrink-0">
              <div className="w-36 h-36 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-4xl md:text-6xl font-bold text-white shadow-2xl ring-4 ring-background overflow-hidden relative z-10 bg-cover bg-center">
                {profile.image ? (
                  <img src={profile.image} alt={name} className="w-full h-full object-cover" />
                ) : (
                  name ? name.charAt(0).toUpperCase() : "U"
                )}
              </div>

              {/* Profile Photo Edit Trigger */}
              {isOwner && (
                <button
                  onClick={() => setActiveModal("profile")}
                  className="absolute bottom-1 right-1 md:bottom-2.5 md:right-2.5 z-20 p-2 md:p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white shadow-xl transition-all ring-4 ring-[#0a0a0a]"
                  title="Update Profile Photo"
                >
                  <Plus size={18} />
                </button>
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1 pt-2 md:pt-4 min-w-0 w-full">
              {editing ? (
                <div className="space-y-4 max-w-lg animated-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-blue-500 focus:outline-none transition"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Bio / Headline</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-blue-500 focus:outline-none transition resize-none"
                      placeholder="E.g. Computer Science Student | Open to Work"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Location</label>
                    <div className="flex items-center">
                      <span className="text-white/50 mr-2 bg-white/5 p-3 rounded-l-lg border border-r-0 border-white/10">
                        <MapPin size={16} />
                      </span>
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-1 p-3 rounded-r-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-blue-500 focus:outline-none transition"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Handle / Username</label>
                    <div className="flex items-center">
                      <span className="text-white/50 mr-2 bg-white/5 p-3 rounded-l-lg border border-r-0 border-white/10">@</span>
                      <input
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="flex-1 p-3 rounded-r-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-blue-500 focus:outline-none transition"
                        placeholder="username"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-6">
                    {/* Save */}
                    <button
                      onClick={save}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white font-medium transition"
                    >
                      <Check size={18} />
                      {saving ? "Saving..." : "Save"}
                    </button>

                    {/* Profile Settings — between Save and Cancel */}
                    <button
                      onClick={() => navigate("/settings", { state: { section: "profile" } })}
                      aria-label="Profile Settings"
                      title="Go to Profile Settings"
                      className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition"
                    >
                      <ProfileSettingsIcon
                        strokeWidth={2}
                        className="w-4 h-4"
                      />
                      Profile Settings
                    </button>

                    {/* Cancel */}
                    <button
                      onClick={reset}
                      className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  {/* Top Row: Name/Handle and Edit Button */}
                  {/* Mobile: Stacked or Flex. Desktop: Flex */}
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-1">{profile.name || "Your Name"}</h1>
                      <p className="text-sm text-white/40 font-mono">@{profile.handle || "handle"}</p>
                    </div>

                    {/* Edit Profile Button */}
                    {isOwner && (
                      <button
                        onClick={() => setEditing(true)}
                        className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition backdrop-blur-md w-full md:w-auto"
                      >
                        <Edit2 size={16} />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>

                  {/* Bottom Row: Role/Bio and Org/Location */}
                  <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
                    {/* Left: Role and Bio */}
                    <div className="flex flex-col justify-center">
                      <p className="text-lg text-white/90 font-medium mb-0.5">{profile.roles?.[0] || "Role not set"}</p>
                      {bio && (
                        <p className="text-sm text-white/70 leading-snug max-w-xl">{bio}</p>
                      )}
                    </div>

                    {/* Right: Organization and Location */}
                    {/* On Desktop: right aligned (items-end) - Wait, user asked for "start matching" left align in right block.
                        So on desktop it should be distinct block but content left aligned.
                        On Mobile: stacks below.
                    */}
                    <div className="flex flex-col justify-center gap-1.5 md:items-start border-t md:border-t-0 border-white/10 pt-4 md:pt-0 mt-2 md:mt-0">
                      {organization && (
                        <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
                          <Building2 size={16} />
                          <span className="truncate max-w-[250px]">{organization}</span>
                        </div>
                      )}

                      {location && (
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <MapPin size={16} />
                          <span className="truncate">{location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={!!activeModal}
        type={activeModal || "profile"}
        onClose={() => setActiveModal(null)}
        onSave={handleImageSave}
        currentImage={activeModal === "profile" ? profile.image : profile.coverImage}
      />
    </>
  );
};

export default ProfileHeader;
