
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
    CheckCircle2,
    LifeBuoy,
    Book,
    HelpCircle,
    Radio,
    RefreshCw,
    ShieldAlert,
    FileText,
    LogOut,
    Lock,
    Smartphone,
    History,
    UserX,
    Eye,
    EyeOff,
    Globe,
    Calendar,
    Mail,
    Flag,
    Paperclip
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

type Section = "main" | "account" | "profile" | "privacy" | "activity" | "notifications" | "support";

// --- Mock Data & State Management ---

export default function Settings() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState<Section>(() =>
        typeof window !== "undefined" && window.innerWidth < 768 ? "main" : "account"
    );

    // Jump directly to a section if navigation state was provided (e.g. from ProfileHeader)
    useEffect(() => {
        const incoming = (location.state as any)?.section as Section | undefined;
        if (incoming) {
            setActiveSection(incoming);
            // Clear state so a back-navigation doesn't re-trigger
            window.history.replaceState({}, "");
        }
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && activeSection === "main") {
                setActiveSection("account");
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeSection]);

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
        const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
        const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
        const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

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

        const handleLogout = () => {
            toast.success("Successfully logged out");
            setTimeout(() => navigate("/login"), 1000);
        };

        const handleReportSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            setIsReportDialogOpen(false);
            toast.success("Your issue has been submitted successfully.");
        };

        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-white/10 bg-white/[0.02]">
                        <h3 className="text-lg font-semibold">Support & Feedback</h3>
                    </div>

                    <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                        <DialogTrigger asChild>
                            <div className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer transition select-none group">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                        <Flag size={20} className="text-white/70 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[15px]">Report an Issue</p>
                                        <p className="text-[13px] text-white/50 group-hover:text-white/70 transition-colors">Let us know if something is broken</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-white/30 group-hover:text-white/70 transition-colors" />
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Report an Issue</DialogTitle>
                                <DialogDescription>
                                    Describe the issue you're facing. Attach any relevant files if necessary.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleReportSubmit} className="space-y-4 mt-2">
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea placeholder="Please describe what happened..." required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Attachments (Optional)</Label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-white/10 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Paperclip className="w-6 h-6 mb-2 text-white/50" />
                                                <p className="text-xs text-white/50">Click to attach file</p>
                                            </div>
                                            <input type="file" className="hidden" />
                                        </label>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsReportDialogOpen(false)}>Cancel</Button>
                                    <Button type="submit">Submit Report</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-white/10 bg-white/[0.02]">
                        <h3 className="text-lg font-semibold">Security & Access</h3>
                    </div>

                    {/* Logout */}
                    <div
                        onClick={handleLogout}
                        className="flex items-center justify-between p-4 border-b border-white/10 last:border-0 hover:bg-white/5 cursor-pointer transition select-none group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="mt-0.5 p-2 bg-white/5 rounded-lg group-hover:bg-red-500/20 transition-colors">
                                <LogOut size={20} className="text-white/70 group-hover:text-red-400 transition-colors" />
                            </div>
                            <div>
                                <p className="font-medium text-[15px] group-hover:text-red-400 transition-colors">Log Out</p>
                                <p className="text-[13px] text-white/50 transition-colors">Sign out of your account on this device</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-white/30 group-hover:text-red-400 transition-colors" />
                    </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-red-500/20 bg-red-500/5">
                        <h3 className="text-red-400 font-semibold flex items-center gap-2">
                            <AlertTriangle size={18} /> Danger Zone
                        </h3>
                    </div>

                    <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
                        <DialogTrigger asChild>
                            <div className="flex items-center justify-between p-4 border-b border-red-500/20 last:border-0 hover:bg-red-500/10 cursor-pointer transition select-none group">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                                        <UserX size={20} className="text-red-400/80 group-hover:text-red-400 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[15px] text-white">Deactivate Account</p>
                                        <p className="text-[13px] text-white/50">Temporarily hide your profile</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-red-400/50 group-hover:text-red-400 transition-colors" />
                            </div>
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

                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                            <div className="flex items-center justify-between p-4 border-b border-red-500/20 last:border-0 hover:bg-red-500/10 cursor-pointer transition select-none group">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                                        <Trash2 size={20} className="text-red-400/80 group-hover:text-red-400 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[15px] text-red-400">Delete Account</p>
                                        <p className="text-[13px] text-red-400/60">Permanently delete your data</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-red-400/50 group-hover:text-red-400 transition-colors" />
                            </div>
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
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                    <h3 className="text-lg font-bold">Security</h3>
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 cursor-pointer transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <Lock size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Change Password</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Update your account password</p>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white/70 transition-colors" />
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 cursor-pointer transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <Smartphone size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Two-Factor Authentication</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Add an extra layer of security</p>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white/70 transition-colors" />
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 cursor-pointer transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <History size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Login Activity</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Review devices accessing your account</p>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white/70 transition-colors" />
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                    <h3 className="text-lg font-bold">Privacy Controls</h3>
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <EyeOff size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Private Account</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Only followers can see your posts</p>
                        </div>
                    </div>
                    <Switch checked={isPrivate} onCheckedChange={(v) => handleToggle(setIsPrivate, v)} />
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <User size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Show Real Name</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Display your real name on profile</p>
                        </div>
                    </div>
                    <Switch checked={showRealName} onCheckedChange={(v) => handleToggle(setShowRealName, v)} />
                </div>

                <div className="px-5 py-3 border-b border-white/10 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3 mb-2">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <Eye size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Who Can See My Profile</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Manage profile visibility</p>
                        </div>
                    </div>
                    <div className="pl-12 space-y-1.5">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setProfileVisibility("public"); toast.success("Settings updated"); }}>
                            <input type="radio" id="public" name="visibility" checked={profileVisibility === "public"} onChange={() => { setProfileVisibility("public"); toast.success("Settings updated"); }} className="accent-blue-500 w-3.5 h-3.5 cursor-pointer" />
                            <label htmlFor="public" className="cursor-pointer text-xs">Public</label>
                        </div>
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setProfileVisibility("campus"); toast.success("Settings updated"); }}>
                            <input type="radio" id="campus" name="visibility" checked={profileVisibility === "campus"} onChange={() => { setProfileVisibility("campus"); toast.success("Settings updated"); }} className="accent-blue-500 w-3.5 h-3.5 cursor-pointer" />
                            <label htmlFor="campus" className="cursor-pointer text-xs">Campus Only</label>
                        </div>
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setProfileVisibility("followers"); toast.success("Settings updated"); }}>
                            <input type="radio" id="followers" name="visibility" checked={profileVisibility === "followers"} onChange={() => { setProfileVisibility("followers"); toast.success("Settings updated"); }} className="accent-blue-500 w-3.5 h-3.5 cursor-pointer" />
                            <label htmlFor="followers" className="cursor-pointer text-xs">Followers Only</label>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <Activity size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Show Activity Status</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Show when you're active</p>
                        </div>
                    </div>
                    <Switch checked={showActivityStatus} onCheckedChange={(v) => handleToggle(setShowActivityStatus, v)} />
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <Globe size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Search Indexing</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Allow search engines to find you</p>
                        </div>
                    </div>
                    <Switch checked={allowSearchIndexing} onCheckedChange={(v) => handleToggle(setAllowSearchIndexing, v)} />
                </div>

                <div className="flex items-center justify-between px-5 py-3 hover:bg-white/5 cursor-pointer transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <UserX size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Blocked Users</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Manage blocked accounts</p>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white/70 transition-colors" />
                </div>
            </div>
        </div>
    );

    const ActivitySettings = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                    <h3 className="text-lg font-bold">Activity Log</h3>
                </div>
                {[
                    { icon: ThumbsUp, label: "Likes", desc: "View posts you've liked" },
                    { icon: MessageSquare, label: "Comments", desc: "Review your recent comments" },
                    { icon: Hash, label: "Tags & Mentions", desc: "See where you were mentioned" },
                    { icon: Bookmark, label: "Saved Posts", desc: "Manage your bookmarked content" },
                    { icon: Clock, label: "Time Spent", desc: "Detailed breakdown of your usage" },
                    { icon: Search, label: "Search History", desc: "Manage your recent searches" },
                    { icon: Trash2, label: "Recently Deleted", desc: "Recover deleted content (up to 30 days)" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3 border-b border-white/10 last:border-0 hover:bg-white/5 cursor-pointer transition select-none group">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                <item.icon size={18} className="text-white/70 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">{item.label}</p>
                                <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">{item.desc}</p>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-white/30 group-hover:text-white/70 transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );

    const NotificationSettings = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                    <h3 className="text-lg font-bold">Push Notifications</h3>
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                            <MessageSquare size={18} className="text-blue-400" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Messages Only</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Only notify me for direct messages</p>
                        </div>
                    </div>
                    <Switch checked={messagesOnly} onCheckedChange={(v) => handleToggle(setMessagesOnly, v)} />
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                            <Moon size={18} className="text-purple-400" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Sleep Mode</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Automatically pause notifications at night</p>
                        </div>
                    </div>
                    <Switch checked={sleepMode} onCheckedChange={(v) => handleToggle(setSleepMode, v)} />
                </div>

                {sleepMode && (
                    <div className="px-5 pb-4 pt-1 border-b border-white/10 bg-white/[0.01]">
                        <div className="flex gap-4 ml-12">
                            <div className="w-1/2">
                                <Label className="text-xs text-white/60 mb-1.5 block">Start Time</Label>
                                <Input type="time" className="bg-white/5 border-white/10 h-8 text-sm" />
                            </div>
                            <div className="w-1/2">
                                <Label className="text-xs text-white/60 mb-1.5 block">End Time</Label>
                                <Input type="time" className="bg-white/5 border-white/10 h-8 text-sm" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                            <Calendar size={18} className="text-green-400" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Events</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Reminders & RSVP updates</p>
                        </div>
                    </div>
                    <Switch checked={events} onCheckedChange={(v) => handleToggle(setEvents, v)} />
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                    <h3 className="text-lg font-bold">Email Notifications</h3>
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <Mail size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Feedback & Surveys</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Help us improve the platform</p>
                        </div>
                    </div>
                    <Switch checked={emailFeedback} onCheckedChange={(v) => handleToggle(setEmailFeedback, v)} />
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <RefreshCw size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Product Updates</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">New features and major changes</p>
                        </div>
                    </div>
                    <Switch checked={emailProduct} onCheckedChange={(v) => handleToggle(setEmailProduct, v)} />
                </div>

                <div className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition select-none group">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <Radio size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">News & Tips</p>
                            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Weekly digests and community news</p>
                        </div>
                    </div>
                    <Switch checked={emailNews} onCheckedChange={(v) => handleToggle(setEmailNews, v)} />
                </div>
            </div>
        </div>
    );

    const SupportSettings = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm">
                {[
                    { id: "guidelines", icon: Book, label: "Community Guidelines", desc: "Rules and best practices for our community" },
                    { id: "faqs", icon: HelpCircle, label: "FAQs", desc: "Answers to common questions" },
                    { id: "news", icon: Radio, label: "News", desc: "Latest platform announcements" },
                    { id: "updates", icon: RefreshCw, label: "Updates", desc: "New features and improvements" },
                    { id: "privacy", icon: ShieldAlert, label: "Privacy Policy", desc: "How we protect your data" },
                    { id: "terms", icon: FileText, label: "Terms and Conditions", desc: "Agreement and usage terms" },
                ].map((item, i) => (
                    <div
                        key={i}
                        onClick={() => navigate(`/support/${item.id}`)}
                        className="flex items-center justify-between px-5 py-3 border-b border-white/10 last:border-0 hover:bg-white/5 cursor-pointer transition select-none group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                <item.icon size={18} className="text-white/70 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">{item.label}</p>
                                <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">{item.desc}</p>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-white/30 group-hover:text-white/70 transition-colors" />
                    </div>
                ))}
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
                        onClick={() => {
                            if (window.innerWidth < 768 && activeSection !== "main") {
                                setActiveSection("main");
                            } else {
                                navigate(-1);
                            }
                        }}
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
                                                    : activeSection === "support" ? "Support"
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
                            {[
                                { id: "account", label: "Account", icon: User, color: "blue" },
                                { id: "profile", label: "Profile", icon: Users, color: "purple" },
                                { id: "privacy", label: "Privacy", icon: Shield, color: "green" },
                                { id: "activity", label: "Your Activity", icon: Activity, color: "orange" },
                                { id: "notifications", label: "Notifications", icon: Bell, color: "pink" },
                                { id: "support", label: "Support", icon: LifeBuoy, color: "teal" }
                            ].map((navItem) => {
                                const isActive = activeSection === navItem.id;
                                const colorStyles = {
                                    blue: isActive ? "bg-blue-500/15 border-blue-500/40" : "",
                                    purple: isActive ? "bg-purple-500/15 border-purple-500/40" : "",
                                    green: isActive ? "bg-green-500/15 border-green-500/40" : "",
                                    orange: isActive ? "bg-orange-500/15 border-orange-500/40" : "",
                                    pink: isActive ? "bg-pink-500/15 border-pink-500/40" : "",
                                    teal: isActive ? "bg-teal-500/15 border-teal-500/40" : ""
                                }[navItem.color];

                                const iconBgStyles = {
                                    blue: isActive ? "bg-blue-500 text-white" : "bg-blue-500/20 text-blue-400",
                                    purple: isActive ? "bg-purple-500 text-white" : "bg-purple-500/20 text-purple-400",
                                    green: isActive ? "bg-green-500 text-white" : "bg-green-500/20 text-green-400",
                                    orange: isActive ? "bg-orange-500 text-white" : "bg-orange-500/20 text-orange-400",
                                    pink: isActive ? "bg-pink-500 text-white" : "bg-pink-500/20 text-pink-400",
                                    teal: isActive ? "bg-teal-500 text-white" : "bg-teal-500/20 text-teal-400"
                                }[navItem.color];

                                const textStyles = {
                                    blue: isActive ? "text-blue-300" : "text-white",
                                    purple: isActive ? "text-purple-300" : "text-white",
                                    green: isActive ? "text-green-300" : "text-white",
                                    orange: isActive ? "text-orange-300" : "text-white",
                                    pink: isActive ? "text-pink-300" : "text-white",
                                    teal: isActive ? "text-teal-300" : "text-white"
                                }[navItem.color];

                                const dotStyles = {
                                    blue: "bg-blue-400",
                                    purple: "bg-purple-400",
                                    green: "bg-green-400",
                                    orange: "bg-orange-400",
                                    pink: "bg-pink-400",
                                    teal: "bg-teal-400"
                                }[navItem.color];

                                return (
                                    <button
                                        key={navItem.id}
                                        onClick={() => handleSectionClick(navItem.id as Section)}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3
                                        ${isActive ? colorStyles : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]"}
                                        `}
                                    >
                                        <div className={`p-1.5 rounded-lg flex-shrink-0 ${iconBgStyles}`}>
                                            <navItem.icon size={18} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-semibold text-[14px] leading-none ${textStyles}`}>{navItem.label}</p>
                                        </div>
                                        {isActive && <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotStyles}`} />}
                                    </button>
                                );
                            })}
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
                            ${activeSection === "support" ? "bg-teal-500/20 text-teal-400" : ""}
                        `}>
                                {(activeSection === "account" || activeSection === "main") && <User size={20} />}
                                {activeSection === "profile" && <Users size={20} />}
                                {activeSection === "privacy" && <Shield size={20} />}
                                {activeSection === "activity" && <Activity size={20} />}
                                {activeSection === "notifications" && <Bell size={20} />}
                                {activeSection === "support" && <LifeBuoy size={20} />}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold leading-tight">
                                    {(activeSection === "account" || activeSection === "main") && "Account Settings"}
                                    {activeSection === "profile" && "Edit Profile"}
                                    {activeSection === "privacy" && "Privacy & Security"}
                                    {activeSection === "activity" && "Your Activity"}
                                    {activeSection === "notifications" && "Notifications"}
                                    {activeSection === "support" && "Help & Support"}
                                </h2>
                                <p className="text-xs text-white/40 mt-0.5">
                                    {(activeSection === "account" || activeSection === "main") && "Manage your account details and preferences"}
                                    {activeSection === "profile" && "Update your role, info, and verification documents"}
                                    {activeSection === "privacy" && "Control your security and visibility settings"}
                                    {activeSection === "activity" && "Review your usage analytics and history"}
                                    {activeSection === "notifications" && "Manage how and when you receive alerts"}
                                    {activeSection === "support" && "Find answers, policies, and community guidelines"}
                                </p>
                            </div>
                        </div>

                        {(activeSection === "main" || activeSection === "account") && <AccountSettings />}
                        {activeSection === "profile" && <ProfileSection />}
                        {activeSection === "privacy" && <PrivacySettings />}
                        {activeSection === "activity" && <ActivitySettings />}
                        {activeSection === "notifications" && <NotificationSettings />}
                        {activeSection === "support" && <SupportSettings />}
                    </main>
                </div>
            </div>
        </div>
    );
}

