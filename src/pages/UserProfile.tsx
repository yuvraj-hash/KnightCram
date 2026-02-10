import { useEffect, useState } from "react";
import { localStorageService } from "@/lib/localStorageService";
import { MessageCircle, UserPlus, Share2, MoreHorizontal, MapPin, Calendar } from "lucide-react";

const UserProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "skills" | "experience" | "activity">("posts");

  useEffect(() => {
    const savedProfile = localStorageService.getProfile();
    setProfile(savedProfile);
  }, []);

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
    <main className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="max-w-4xl mx-auto">
        {/* Hero Cover Section */}
        <div className="relative h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-b-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition">
              <Share2 size={20} />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Profile Card Section */}
        <div className="relative px-6 mb-6">
          {/* Main Profile Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl -mt-16 pt-8 pb-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg ring-4 ring-background overflow-hidden">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                </div>
                {profile.verificationStatus === "verified" && (
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm ring-4 ring-background">
                    ✓
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="flex-1 min-w-0">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {profile.name || "Anonymous User"}
                  </h1>
                  <p className="text-lg text-white/70 mt-1">@{profile.handle || "user"}</p>

                  {profile.roles && profile.roles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {profile.roles.slice(0, 2).map((role: string) => (
                        <span key={role} className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 text-sm font-medium">
                          {role}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/60">
                    {profile.college && (
                      <div className="flex items-center gap-1">
                        <span>🎓</span>
                        <span>{profile.college}</span>
                      </div>
                    )}
                    {profile.company && (
                      <div className="flex items-center gap-1">
                        <span>💼</span>
                        <span>{profile.company}</span>
                      </div>
                    )}
                    {profile.state && (
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{profile.state}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <button className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition shadow-lg">
                  <UserPlus size={18} />
                  <span>Connect</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition backdrop-blur-sm">
                  <MessageCircle size={18} />
                  <span>Message</span>
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1.2K</div>
                <div className="text-xs text-white/50 mt-1">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">45</div>
                <div className="text-xs text-white/50 mt-1">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3.5K</div>
                <div className="text-xs text-white/50 mt-1">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{completionPercentage}%</div>
                <div className="text-xs text-white/50 mt-1">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">27</div>
                <div className="text-xs text-white/50 mt-1">Endorsements</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-6 grid md:grid-cols-3 gap-6 pb-16">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Tabs Navigation */}
            <div className="flex gap-1 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-1">
              {(["posts", "skills", "experience", "activity"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            {activeTab === "posts" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl text-center">
                <div className="py-12">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                  <p className="text-white/60 text-sm">This user hasn't shared any posts yet</p>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl">
                <h3 className="font-bold text-lg mb-4">Skills & Endorsements</h3>
               <div className="grid grid-cols-2 gap-3">
                  {["Problem Solving", "Leadership", "Communication", "Analytics"].map((skill) => (
                    <div key={skill} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition cursor-pointer">
                      <div className="font-medium text-sm">{skill}</div>
                      <div className="text-xs text-white/50 mt-1">8 endorsements</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl text-center">
                <div className="py-12">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-lg font-semibold mb-2">No experience added yet</h3>
                  <p className="text-white/60 text-sm">Create your profile to add experience</p>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl">
                <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">📌</div>
                    <div>
                      <p className="text-sm font-medium">Updated profile</p>
                      <p className="text-xs text-white/50 mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                    <div>
                      <p className="text-sm font-medium">Verified profile</p>
                      <p className="text-xs text-white/50 mt-1">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">🎓</div>
                    <div>
                      <p className="text-sm font-medium">Joined KnightCram</p>
                      <p className="text-xs text-white/50 mt-1">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* About Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl">
              <h3 className="font-bold text-lg mb-4">About</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {profile.college
                  ? `${profile.college} student passionate about learning and growth.`
                  : profile.company
                    ? `${profile.designation} at ${profile.company}`
                    : "Building a professional presence on KnightCram."}
              </p>
            </div>

            {/* Joined Date Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl">
              <div className="flex items-center gap-3 text-white/70">
                <Calendar size={18} />
                <div className="text-sm">
                  <div className="text-white/50">Joined</div>
                  <div className="font-medium">Jan 2024</div>
                </div>
              </div>
            </div>

            {/* Profile Quality Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-xl border border-white/10">
              <h3 className="font-bold text-lg mb-3">Profile Quality</h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Completion</span>
                  <span className="font-bold">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-700"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-white/80">
                {profile.name && profile.email && profile.phone ? "✓ Contact info verified" : "Complete profile info"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
