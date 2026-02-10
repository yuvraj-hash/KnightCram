import React, { useState, useEffect } from "react";
import { Edit2, Check, X, Building2, GraduationCap } from "lucide-react";

const ProfileHeader: React.FC<{ profile: any; onSave: (p: any) => void; saving?: boolean }> = ({ profile, onSave, saving }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name || "");
  const [handle, setHandle] = useState(profile.handle || "");

  useEffect(() => {
    setName(profile.name || "");
    setHandle(profile.handle || "");
  }, [profile]);

  const save = () => {
    onSave({ name, handle });
    setEditing(false);
  };

  const reset = () => {
    setName(profile.name || "");
    setHandle(profile.handle || "");
    setEditing(false);
  };

  const organization = profile.college || profile.university || profile.company || profile.businessName;
  const isStudent = ["Pre University Student", "University Student", "Alumni / Opportunity Seeker"].includes(profile.roles?.[0]);

  return (
    <section className="relative group">
      {/* Cover Gradient */}
      <div className="h-48 rounded-t-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Optional: Add a subtle pattern or overlay here if desired */}
      </div>

      {/* Profile Card Content */}
      <div className="bg-white/5 backdrop-blur-xl rounded-b-2xl border border-white/10 px-8 pb-8 shadow-xl relative">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar - Overlapping Cover */}
          <div className="relative -mt-20 mb-4 md:mb-0">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-2xl ring-4 ring-background overflow-hidden relative z-10">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 pt-4 min-w-0 w-full">
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
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={save}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white font-medium transition"
                  >
                    <Check size={18} />
                    {saving ? "Saving..." : "Save"}
                  </button>
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
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-1">
                  <h1 className="text-4xl font-bold text-white tracking-tight">{profile.name || "Your Name"}</h1>

                  {/* Role */}
                  <p className="text-xl text-white/90 font-medium">{profile.roles?.[0] || "Role not set"}</p>

                  {/* Organization */}
                  {organization && (
                    <div className="flex items-center gap-2 text-white/70 text-base mt-1">
                      {isStudent ? <GraduationCap size={18} /> : <Building2 size={18} />}
                      <span>{organization}</span>
                    </div>
                  )}

                  {/* Handle */}
                  <p className="text-sm text-white/40 font-mono mt-2 pt-2">@{profile.handle || "handle"}</p>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition backdrop-blur-md opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <Edit2 size={16} />
                  <span>Edit Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
