
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    User,
    Shield,
    Activity,
    Bell,
    ChevronRight,
    ArrowLeft,
    ChevronDown,
    AlertTriangle,
    ThumbsUp,
    MessageSquare,
    Bookmark,
    Clock,
    Search,
    Trash2,
    Hash,
    Moon,
    Users,
    Save,
    CheckCircle2
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { localStorageService } from "@/lib/localStorageService";
import RoleSelector from "@/components/profile/RoleSelector";
import BasicInfoForm from "@/components/profile/BasicInfoForm";
import AcademicInfoForm from "@/components/profile/AcademicInfoForm";
import VerificationUploader from "@/components/profile/VerificationUploader";

// --- Types ---

type Section = "main" | "account" | "profile" | "privacy" | "activity" | "notifications";

// --- Mock Data & State Management ---

export default function Settings() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState<Section>("account");

    // Jump directly to a section if navigation state was provided (e.g. from ProfileHeader)
    useEffect(() => {
        const incoming = (location.state as any)?.section as Section | undefined;
        if (incoming) {
            setActiveSection(incoming);
            // Clear state so a back-navigation doesn't re-trigger
            window.history.replaceState({}, "");
        }
    }, []);

    const handleSectionClick = (section: Section) => {
        setActiveSection(section);
    };

    const handleBack = () => {
        setActiveSection("main");
    };

    // Helper for auto-save feedback
    const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
        setter(value);
        toast.success("Settings updated");
    };

    // Account Settings State
    const [isPrivate, setIsPrivate] = useState(false);
    const [accountStatus, setAccountStatus] = useState("active");

    // Privacy Settings State
    const [showRealName, setShowRealName] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState("public");
    const [showActivityStatus, setShowActivityStatus] = useState(true);
    const [allowSearchIndexing, setAllowSearchIndexing] = useState(true);

    // Notifications State
    const [messagesOnly, setMessagesOnly] = useState(false);
    const [sleepMode, setSleepMode] = useState(false);
    const [emailFeedback, setEmailFeedback] = useState(true);
    const [emailProduct, setEmailProduct] = useState(true);
    const [emailNews, setEmailNews] = useState(true);
    const [onlineStatus, setOnlineStatus] = useState(true);
    const [events, setEvents] = useState(true);

    // --- Sub-components (Sections) ---

    // ── Inline Profile Section ──
    const ProfileSection = () => {
        const [profile, setProfile] = useState<any>({});
        const [isSaving, setIsSaving] = useState(false);
        const [saveSuccess, setSaveSuccess] = useState(false);

        useEffect(() => {
            const saved = localStorageService.getProfile();
            setProfile((prev: any) => ({ ...prev, ...saved }));
        }, []);

        const isProfileValid = () =>
            profile.roles?.length > 0 &&
            profile.name?.trim() &&
            profile.handle?.trim() &&
            profile.email?.trim() &&
            profile.phone?.trim();

        const handleFormSave = (updatedData: any) => {
            const merged = { ...profile, ...updatedData };
            localStorageService.updateProfile(merged);
            localStorageService.updateCompletion();
            setProfile(merged);
        };

        const handleSave = async () => {
            if (!isProfileValid()) {
                toast.error("Please complete Role & Basic Info before saving.");
                return;
            }
            setIsSaving(true);
            try {
                await new Promise((r) => setTimeout(r, 500));
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
                toast.success("Profile saved successfully!");
                setTimeout(() => navigate("/profile/view"), 1000);
            } catch {
                toast.error("An error occurred while saving.");
            } finally {
                setIsSaving(false);
            }
        };

        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                {saveSuccess && (
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                        <CheckCircle2 className="text-green-400 flex-shrink-0" size={18} />
                        <p className="text-green-300 text-sm">All changes saved successfully!</p>
                    </div>
                )}

                {/* Forms — full width, no inner grid splitting */}
                <div className="space-y-6">
                    <RoleSelector
                        roles={profile.roles || []}
                        onChange={(roles: string[]) => handleFormSave({ roles })}
                    />
                    <BasicInfoForm profile={profile} onSave={handleFormSave} />
                    <AcademicInfoForm profile={profile} onSave={handleFormSave} />
                    <VerificationUploader
                        profile={profile}
                        onUpload={(data) => handleFormSave(data || { verificationStatus: "submitted" })}
                    />

                    {/* Save bar */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 border border-white/10 shadow-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-bold">Ready to share your profile?</p>
                                <p className="text-sm text-white/70 mt-0.5">Save all changes and make it live</p>
                            </div>
                            <div className="flex gap-3 flex-shrink-0">
                                <button
                                    onClick={() => navigate("/profile/view")}
                                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-semibold transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving || !isProfileValid()}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-600 font-bold text-sm hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
                                >
                                    <Save size={16} />
                                    {isSaving ? "Saving..." : "Save Profile"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const AccountSettings = () => {
        const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
        const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
        const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

        const handleDeactivate = () => {
            setAccountStatus("deactivated");
            setIsDeactivateDialogOpen(false);
            toast.success("Account deactivated. Log in to reactivate.", {
                description: "You have been logged out.",
            });
            setTimeout(() => navigate("/login"), 1500);
        };

        const handleDelete = () => {
            setIsDeleteDialogOpen(false);
            toast.error("Account scheduled for deletion.", {
                description: "Your account will be permanently deleted in 30 days."
            });
            setTimeout(() => navigate("/login"), 1500);
        };

        const handleReportSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            setIsReportDialogOpen(false);
            toast.success("Issue reported successfully.");
        };

        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                    <h3 className="text-lg font-semibold mb-2">Privacy & Visibility</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Private Account</p>
                            <p className="text-sm text-white/50">Only followers can see your posts</p>
                        </div>
                        <Switch checked={isPrivate} onCheckedChange={(v) => handleToggle(setIsPrivate, v)} />
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                    <h3 className="text-lg font-semibold mb-2">Support</h3>
                    <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                        <DialogTrigger asChild>
                            <div className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition">
                                <span className="font-medium">Report an Issue</span>
                                <ChevronRight className="text-white/50" />
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Report an Issue</DialogTitle>
                                <DialogDescription>
                                    Describe the issue you are facing. We'll look into it.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleReportSubmit} className="space-y-4 mt-2">
                                <div className="space-y-2">
                                    <Label>Issue Type</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select issue type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bug">Bug / Error</SelectItem>
                                            <SelectItem value="abuse">Abuse / Harassment</SelectItem>
                                            <SelectItem value="feature">Feature Request</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea placeholder="Please describe what happened..." />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Submit Report</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-4">
                    <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle size={18} /> Danger Zone
                    </h3>

                    <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between text-white hover:bg-red-500/20 hover:text-red-300">
                                Deactivate Account
                                <ChevronRight size={16} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Deactivate Account?</DialogTitle>
                                <DialogDescription>
                                    This will temporarily disable your account. You can reactivate it by logging in again at any time.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDeactivateDialogOpen(false)}>Cancel</Button>
                                <Button variant="destructive" onClick={handleDeactivate}>Deactivate</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Separator className="bg-red-500/20" />

                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between text-red-400 hover:bg-red-500/20 hover:text-red-300">
                                Delete Account
                                <ChevronRight size={16} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Account?</DialogTitle>
                                <DialogDescription>
                                    This action is permanent and cannot be undone. Your data will be permanently deleted after 30 days.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <Label>Confirm Password</Label>
                                <Input type="password" placeholder="Enter your password" />
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                                <Button variant="destructive" onClick={handleDelete}>Permanently Delete</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        );
    };

    const PrivacySettings = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                <h3 className="text-lg font-semibold">Security</h3>
                <Button variant="outline" className="w-full justify-between">
                    Change Password <ChevronRight size={16} />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                    Two-Factor Authentication <ChevronRight size={16} />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                    Login Activity <ChevronRight size={16} />
                </Button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                <h3 className="text-lg font-semibold">Privacy Controls</h3>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Show Real Name</p>
                        <p className="text-sm text-white/50">Display your real name on profile</p>
                    </div>
                    <Switch checked={showRealName} onCheckedChange={(v) => handleToggle(setShowRealName, v)} />
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                    <p className="font-medium">Who Can See My Profile</p>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <input type="radio" id="public" name="visibility" checked={profileVisibility === "public"} onChange={() => setProfileVisibility("public")} className="accent-blue-500 w-4 h-4" />
                            <label htmlFor="public">Public</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="radio" id="campus" name="visibility" checked={profileVisibility === "campus"} onChange={() => setProfileVisibility("campus")} className="accent-blue-500 w-4 h-4" />
                            <label htmlFor="campus">Campus Only</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="radio" id="followers" name="visibility" checked={profileVisibility === "followers"} onChange={() => setProfileVisibility("followers")} className="accent-blue-500 w-4 h-4" />
                            <label htmlFor="followers">Followers Only</label>
                        </div>
                    </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Show Activity Status</p>
                        <p className="text-sm text-white/50">Show when you're active</p>
                    </div>
                    <Switch checked={showActivityStatus} onCheckedChange={(v) => handleToggle(setShowActivityStatus, v)} />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Search Indexing</p>
                        <p className="text-sm text-white/50">Allow search engines to find you</p>
                    </div>
                    <Switch checked={allowSearchIndexing} onCheckedChange={(v) => handleToggle(setAllowSearchIndexing, v)} />
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <Button variant="ghost" className="w-full justify-between text-white">
                    Blocked Users <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );

    const ActivitySettings = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex gap-4 overflow-x-auto pb-4">
                <div className="min-w-[150px] p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                    <p className="text-2xl font-bold text-blue-400">2.4h</p>
                    <p className="text-xs text-blue-200">Daily Avg</p>
                </div>
                <div className="min-w-[150px] p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
                    <p className="text-2xl font-bold text-purple-400">145</p>
                    <p className="text-xs text-purple-200">Interactions</p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                {[
                    { icon: ThumbsUp, label: "Likes" },
                    { icon: MessageSquare, label: "Comments" },
                    { icon: Hash, label: "Tags & Mentions" },
                    { icon: Bookmark, label: "Saved Posts" },
                    { icon: Clock, label: "Time Spent" },
                    { icon: Search, label: "Search History" },
                    { icon: Trash2, label: "Recently Deleted" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-b border-white/10 last:border-0 hover:bg-white/5 cursor-pointer transition">
                        <div className="flex items-center gap-3">
                            <item.icon size={20} className="text-white/70" />
                            <span>{item.label}</span>
                        </div>
                        <ChevronRight size={16} className="text-white/30" />
                    </div>
                ))}
            </div>
        </div>
    );

    const NotificationSettings = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <p className="font-medium">Messages Only</p>
                            <p className="text-sm text-white/50">Mute all except DMs</p>
                        </div>
                    </div>
                    <Switch checked={messagesOnly} onCheckedChange={(v) => handleToggle(setMessagesOnly, v)} />
                </div>

                <Separator className="bg-white/10" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                            <Moon size={20} />
                        </div>
                        <div>
                            <p className="font-medium">Sleep Mode</p>
                            <p className="text-sm text-white/50">Pause notifications at night</p>
                        </div>
                    </div>
                    <Switch checked={sleepMode} onCheckedChange={(v) => handleToggle(setSleepMode, v)} />
                </div>
                {sleepMode && (
                    <div className="flex gap-4 pl-12">
                        <div className="w-1/2">
                            <Label className="text-xs">Start</Label>
                            <Input type="time" className="bg-white/5 border-white/10" />
                        </div>
                        <div className="w-1/2">
                            <Label className="text-xs">End</Label>
                            <Input type="time" className="bg-white/5 border-white/10" />
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                <h3 className="font-medium mb-2">Email Notifications</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Feedback & Surveys</span>
                        <Switch checked={emailFeedback} onCheckedChange={(v) => handleToggle(setEmailFeedback, v)} />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Product Updates</span>
                        <Switch checked={emailProduct} onCheckedChange={(v) => handleToggle(setEmailProduct, v)} />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">News & Tips</span>
                        <Switch checked={emailNews} onCheckedChange={(v) => handleToggle(setEmailNews, v)} />
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Events</p>
                        <p className="text-sm text-white/50">Reminders & RSVP updates</p>
                    </div>
                    <Switch checked={events} onCheckedChange={(v) => handleToggle(setEvents, v)} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Online Status</p>
                        <p className="text-sm text-white/50">Show when you are online</p>
                    </div>
                    <Switch checked={onlineStatus} onCheckedChange={(v) => handleToggle(setOnlineStatus, v)} />
                </div>
            </div>
        </div>
    );

    // Initial load handling (default to main on mobile, account on desktop) is handled by responsive CSS classes logic below
    // activeSection default is "account".
    // On Mobile: Main List should be shown if activeSection is "main". If it's "account", detail is shown.
    // On Desktop: Main List is ALWAYS shown. Detail is ALWAYS shown (updating based on selection).

    // Need to handle the "Back" button on mobile only.
    // Need to handle "Main" state correctly.

    // Let's refine the render logic:

    return (
        <div className="text-white min-h-screen pb-28">

            {/* ── Sticky Page Header ── */}
            <header className="sticky top-16 z-20 bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-white/[0.08] shadow-[0_1px_24px_rgba(0,0,0,0.4)]">
                <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center gap-2.5">

                    {/* Arrow — mobile inside-section: back to list | otherwise: back to previous page */}
                    <button
                        onClick={() =>
                            activeSection !== "main"
                                ? setActiveSection("main")
                                : navigate(-1)
                        }
                        aria-label="Go back"
                        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all duration-200 flex-shrink-0 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                    </button>

                    {/* Title — mobile: active section name | desktop: always "Settings" */}
                    <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 leading-none">
                        <span className="md:hidden">
                            {activeSection === "main" ? "Settings"
                                : activeSection === "account" ? "Account"
                                    : activeSection === "profile" ? "Profile"
                                        : activeSection === "privacy" ? "Privacy"
                                            : activeSection === "activity" ? "Your Activity"
                                                : activeSection === "notifications" ? "Notifications"
                                                    : "Settings"}
                        </span>
                        <span className="hidden md:inline">Settings</span>
                    </h1>
                </div>
            </header>

            {/* ── Page Content ── */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8">

                {/* Two-column layout */}
                <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start">

                    {/* ── Sidebar Nav ── */}
                    <aside className={`
                    w-full md:w-[240px] lg:w-[260px] flex-shrink-0
                    md:sticky md:top-[8.5rem]
                    ${activeSection === "main" ? "block" : "hidden md:block"}
                `}>
                        <p className="hidden md:block text-[11px] font-semibold uppercase tracking-widest text-white/25 px-1 pb-3">
                            Menu
                        </p>

                        <nav className="space-y-1.5">
                            {/* Account */}
                            <button
                                onClick={() => handleSectionClick("account")}
                                className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3
                                ${activeSection === "account"
                                        ? "bg-blue-500/15 border-blue-500/40"
                                        : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]"}
                            `}
                            >
                                <div className={`p-2 rounded-lg flex-shrink-0 ${activeSection === "account" ? "bg-blue-500 text-white" : "bg-blue-500/20 text-blue-400"}`}>
                                    <User size={17} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-semibold text-sm ${activeSection === "account" ? "text-blue-300" : "text-white"}`}>Account</p>
                                    <p className="text-[11px] text-white/40 truncate">Manage details & danger zone</p>
                                </div>
                                {activeSection === "account" && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />}
                            </button>

                            {/* Profile */}
                            <button
                                onClick={() => handleSectionClick("profile")}
                                className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3
                                ${activeSection === "profile"
                                        ? "bg-purple-500/15 border-purple-500/40"
                                        : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]"}
                            `}
                            >
                                <div className={`p-2 rounded-lg flex-shrink-0 ${activeSection === "profile" ? "bg-purple-500 text-white" : "bg-purple-500/20 text-purple-400"}`}>
                                    <Users size={17} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-semibold text-sm ${activeSection === "profile" ? "text-purple-300" : "text-white"}`}>Profile</p>
                                    <p className="text-[11px] text-white/40 truncate">Edit your public info</p>
                                </div>
                                {activeSection === "profile" && <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />}
                            </button>

                            {/* Privacy */}
                            <button
                                onClick={() => handleSectionClick("privacy")}
                                className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3
                                ${activeSection === "privacy"
                                        ? "bg-green-500/15 border-green-500/40"
                                        : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]"}
                            `}
                            >
                                <div className={`p-2 rounded-lg flex-shrink-0 ${activeSection === "privacy" ? "bg-green-500 text-white" : "bg-green-500/20 text-green-400"}`}>
                                    <Shield size={17} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-semibold text-sm ${activeSection === "privacy" ? "text-green-300" : "text-white"}`}>Privacy</p>
                                    <p className="text-[11px] text-white/40 truncate">Security & visibility</p>
                                </div>
                                {activeSection === "privacy" && <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />}
                            </button>

                            {/* Activity */}
                            <button
                                onClick={() => handleSectionClick("activity")}
                                className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3
                                ${activeSection === "activity"
                                        ? "bg-orange-500/15 border-orange-500/40"
                                        : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]"}
                            `}
                            >
                                <div className={`p-2 rounded-lg flex-shrink-0 ${activeSection === "activity" ? "bg-orange-500 text-white" : "bg-orange-500/20 text-orange-400"}`}>
                                    <Activity size={17} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-semibold text-sm ${activeSection === "activity" ? "text-orange-300" : "text-white"}`}>Your Activity</p>
                                    <p className="text-[11px] text-white/40 truncate">Analytics & history</p>
                                </div>
                                {activeSection === "activity" && <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />}
                            </button>

                            {/* Notifications */}
                            <button
                                onClick={() => handleSectionClick("notifications")}
                                className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3
                                ${activeSection === "notifications"
                                        ? "bg-pink-500/15 border-pink-500/40"
                                        : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]"}
                            `}
                            >
                                <div className={`p-2 rounded-lg flex-shrink-0 ${activeSection === "notifications" ? "bg-pink-500 text-white" : "bg-pink-500/20 text-pink-400"}`}>
                                    <Bell size={17} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-semibold text-sm ${activeSection === "notifications" ? "text-pink-300" : "text-white"}`}>Notifications</p>
                                    <p className="text-[11px] text-white/40 truncate">Alert preferences</p>
                                </div>
                                {activeSection === "notifications" && <div className="w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />}
                            </button>
                        </nav>
                    </aside>

                    {/* ── Content Panel ── */}
                    <main className={`
                    flex-1 min-w-0 w-full
                    ${activeSection === "main" ? "hidden md:block" : "block"}
                `}>
                        {/* Desktop: Section heading inside the content area */}
                        <div className="hidden md:flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
                            <div className={`p-2.5 rounded-xl
                            ${(activeSection === "account" || activeSection === "main") ? "bg-blue-500/20 text-blue-400" : ""}
                            ${activeSection === "profile" ? "bg-purple-500/20 text-purple-400" : ""}
                            ${activeSection === "privacy" ? "bg-green-500/20 text-green-400" : ""}
                            ${activeSection === "activity" ? "bg-orange-500/20 text-orange-400" : ""}
                            ${activeSection === "notifications" ? "bg-pink-500/20 text-pink-400" : ""}
                        `}>
                                {(activeSection === "account" || activeSection === "main") && <User size={20} />}
                                {activeSection === "profile" && <Users size={20} />}
                                {activeSection === "privacy" && <Shield size={20} />}
                                {activeSection === "activity" && <Activity size={20} />}
                                {activeSection === "notifications" && <Bell size={20} />}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold leading-tight">
                                    {(activeSection === "account" || activeSection === "main") && "Account Settings"}
                                    {activeSection === "profile" && "Edit Profile"}
                                    {activeSection === "privacy" && "Privacy & Security"}
                                    {activeSection === "activity" && "Your Activity"}
                                    {activeSection === "notifications" && "Notifications"}
                                </h2>
                                <p className="text-xs text-white/40 mt-0.5">
                                    {(activeSection === "account" || activeSection === "main") && "Manage your account details and preferences"}
                                    {activeSection === "profile" && "Update your role, info, and verification documents"}
                                    {activeSection === "privacy" && "Control your security and visibility settings"}
                                    {activeSection === "activity" && "Review your usage analytics and history"}
                                    {activeSection === "notifications" && "Manage how and when you receive alerts"}
                                </p>
                            </div>
                        </div>

                        {(activeSection === "main" || activeSection === "account") && <AccountSettings />}
                        {activeSection === "profile" && <ProfileSection />}
                        {activeSection === "privacy" && <PrivacySettings />}
                        {activeSection === "activity" && <ActivitySettings />}
                        {activeSection === "notifications" && <NotificationSettings />}
                    </main>
                </div>
            </div>
        </div>
    );
}

