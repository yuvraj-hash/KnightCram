
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    Users
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

// --- Types ---

type Section = "main" | "account" | "privacy" | "activity" | "notifications";

// --- Mock Data & State Management ---

export default function Settings() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<Section>("account");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Initial check for mobile view to default to "main" if actually mobile (handled by media query logic mostly, but state helps)
    // Actually, distinct handling: Mobile: List -> Detail. Desktop: Split Pane.
    // For Desktop split pane, we always have a selection. For Mobile, we start at list.
    // Let's use a "mobileSection" state vs "desktopSection" state? No, same state.
    // If window width < md: activeSection "main" means list view. "account" means detail view.
    // If window width >= md: user sees both. "main" is not a valid selection for the right pane, so we default to "account".

    // Simpler approach:
    // Mobile: if activeSection is null/main, show list. if valid section, show detail.
    // Desktop: Always show list (sidebar). Show content of activeSection (default to account if main).

    const handleSectionClick = (section: Section) => {
        setActiveSection(section);
        // On mobile, this will switch view. On desktop, just updates right pane.
    };

    const handleBack = () => {
        setActiveSection("main");
    };

    const navigateToProfileSettings = () => {
        navigate("/profile/onboarding");
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
        <div className="max-w-7xl mx-auto p-4 md:p-8 text-white min-h-screen pb-24">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                {/* Mobile Back Button - only show if NOT main section */}
                {activeSection !== "main" && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setActiveSection("main")}
                        className="md:hidden"
                    >
                        <ArrowLeft size={24} />
                    </Button>
                )}
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    {activeSection === "main" ? "Settings" :
                        (window.innerWidth >= 768) ? "Settings" : // On desktop always show "Settings" title or maybe the specific one? Title "Settings" is safer for overall page.
                            activeSection === "account" ? "Account Settings" :
                                activeSection === "privacy" ? "Privacy Settings" :
                                    activeSection === "activity" ? "Your Activity" :
                                        activeSection === "notifications" ? "Notifications" : "Settings"}
                </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Navigation Sidebar (List) */}
                {/* Mobile: Show only if activeSection == 'main' */}
                {/* Desktop: Always show */}
                <aside className={`
                    w-full md:w-1/4 space-y-4
                    ${activeSection === "main" ? "block" : "hidden md:block"}
                `}>
                    {/* Account */}
                    <div
                        onClick={() => handleSectionClick("account")}
                        className={`group p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between
                            ${activeSection === "account" ? "bg-blue-500/20 border-blue-500/50" : "bg-white/5 border-white/10 hover:bg-white/10"}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${activeSection === "account" ? "bg-blue-500 text-white" : "bg-blue-500/20 text-blue-400"}`}>
                                <User size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Account</h3>
                                <p className="text-xs text-white/50 md:hidden lg:block lg:text-[10px] xl:text-xs">Manage details</p>
                            </div>
                        </div>
                        <ChevronRight className={`text-white/30 transition-transform ${activeSection === "account" ? "rotate-90 md:rotate-0 text-blue-400" : ""}`} size={16} />
                    </div>

                    {/* Profile Link */}
                    <div
                        onClick={navigateToProfileSettings}
                        className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                                <Users size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Profile</h3>
                                <p className="text-xs text-white/50 md:hidden lg:block lg:text-[10px] xl:text-xs">Edit public info</p>
                            </div>
                        </div>
                        <ChevronRight className="text-white/30" size={16} />
                    </div>

                    {/* Privacy */}
                    <div
                        onClick={() => handleSectionClick("privacy")}
                        className={`group p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between
                            ${activeSection === "privacy" ? "bg-green-500/20 border-green-500/50" : "bg-white/5 border-white/10 hover:bg-white/10"}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${activeSection === "privacy" ? "bg-green-500 text-white" : "bg-green-500/20 text-green-400"}`}>
                                <Shield size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Privacy</h3>
                                <p className="text-xs text-white/50 md:hidden lg:block lg:text-[10px] xl:text-xs">Security & Visibility</p>
                            </div>
                        </div>
                        <ChevronRight className={`text-white/30 transition-transform ${activeSection === "privacy" ? "rotate-90 md:rotate-0 text-green-400" : ""}`} size={16} />
                    </div>

                    {/* Activity */}
                    <div
                        onClick={() => handleSectionClick("activity")}
                        className={`group p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between
                            ${activeSection === "activity" ? "bg-orange-500/20 border-orange-500/50" : "bg-white/5 border-white/10 hover:bg-white/10"}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${activeSection === "activity" ? "bg-orange-500 text-white" : "bg-orange-500/20 text-orange-400"}`}>
                                <Activity size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Your Activity</h3>
                                <p className="text-xs text-white/50 md:hidden lg:block lg:text-[10px] xl:text-xs">Analytics & History</p>
                            </div>
                        </div>
                        <ChevronRight className={`text-white/30 transition-transform ${activeSection === "activity" ? "rotate-90 md:rotate-0 text-orange-400" : ""}`} size={16} />
                    </div>

                    {/* Notifications */}
                    <div
                        onClick={() => handleSectionClick("notifications")}
                        className={`group p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between
                            ${activeSection === "notifications" ? "bg-pink-500/20 border-pink-500/50" : "bg-white/5 border-white/10 hover:bg-white/10"}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${activeSection === "notifications" ? "bg-pink-500 text-white" : "bg-pink-500/20 text-pink-400"}`}>
                                <Bell size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Notifications</h3>
                                <p className="text-xs text-white/50 md:hidden lg:block lg:text-[10px] xl:text-xs">Alert preferences</p>
                            </div>
                        </div>
                        <ChevronRight className={`text-white/30 transition-transform ${activeSection === "notifications" ? "rotate-90 md:rotate-0 text-pink-400" : ""}`} size={16} />
                    </div>
                </aside>

                {/* Main Content Area */}
                {/* Mobile: Show only if activeSection != 'main' */}
                {/* Desktop: Always show (defaults to account if activeSection is 'main' - handled by default render) */}

                <main className={`
                    flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[500px]
                    ${activeSection === "main" ? "hidden md:block" : "block"}
                `}>
                    {/* On Desktop, if 'main' is active, we might want to default to Account or show a placeholder. 
                        Let's handle the default state visually. 
                        In the state initialization, we set "account" as default, but for mobile logic we need "main" distinct.
                        Correction: If I initialize to "main", Desktop shows empty right pane? 
                        Let's change initialization or render logic.
                    */}
                    {(activeSection === "main" || activeSection === "account") && <AccountSettings />}
                    {activeSection === "privacy" && <PrivacySettings />}
                    {activeSection === "activity" && <ActivitySettings />}
                    {activeSection === "notifications" && <NotificationSettings />}
                </main>
            </div>
        </div>
    );
}

