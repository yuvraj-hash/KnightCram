import React, { useState } from "react";
import {
    Search, Users, Plus, ChevronRight, MessageSquare,
    ArrowLeft, ArrowUp, Star, TrendingUp, Calendar, FileText,
    Settings, Shield, Megaphone, CheckCircle2, MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// --- Mock Data ---

const MOCK_COMMUNITIES = [
    {
        id: "c1",
        name: "Web3 Builders",
        description: "A collective of developers, designers, and enthusiasts building the decentralized web.",
        memberCount: 1240,
        isFeatured: true,
        isPopular: false,
        isJoined: false,
        lastActivity: "10 mins ago",
        banner: "bg-gradient-to-r from-purple-600 to-indigo-600",
        icon: "🌐"
    },
    {
        id: "c2",
        name: "AI Innovators",
        description: "Discussing the latest in AI, sharing projects, and collaborating on ML research.",
        memberCount: 8430,
        isFeatured: true,
        isPopular: true,
        isJoined: true,
        lastActivity: "Just now",
        banner: "bg-gradient-to-r from-emerald-500 to-teal-700",
        icon: "🧠"
    },
    {
        id: "c3",
        name: "UI/UX Designers Hub",
        description: "Share feedback, find inspiration, and network with other designers.",
        memberCount: 3200,
        isFeatured: false,
        isPopular: true,
        isJoined: false,
        lastActivity: "2 hours ago",
        banner: "bg-gradient-to-r from-pink-500 to-rose-600",
        icon: "🎨"
    },
    {
        id: "c4",
        name: "Indie Hackers Network",
        description: "For solo founders building bootstrapped businesses. Share milestones and setbacks.",
        memberCount: 5120,
        isFeatured: false,
        isPopular: true,
        isJoined: true,
        lastActivity: "5 mins ago",
        banner: "bg-gradient-to-r from-amber-500 to-orange-600",
        icon: "🚀"
    },
    {
        id: "c5",
        name: "Open Source Contributors",
        description: "Find projects to contribute to and collaborate with open source maintainers.",
        memberCount: 2150,
        isFeatured: true,
        isPopular: false,
        isJoined: false,
        lastActivity: "1 day ago",
        banner: "bg-gradient-to-r from-blue-600 to-cyan-600",
        icon: "💻"
    }
];

// --- Components ---

export default function CommunityPage() {
    const [activeCommunityId, setActiveCommunityId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"discussions" | "members" | "resources" | "events" | "announcements">("discussions");

    // Filter derivations
    const activeCommunity = MOCK_COMMUNITIES.find(c => c.id === activeCommunityId);
    const featuredCommunities = MOCK_COMMUNITIES.filter(c => c.isFeatured);
    const popularCommunities = MOCK_COMMUNITIES.filter(c => c.isPopular);
    const myCommunities = MOCK_COMMUNITIES.filter(c => c.isJoined);

    // Computed Search
    const searchResults = searchQuery
        ? MOCK_COMMUNITIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    const handleCommunityClick = (id: string) => {
        setActiveCommunityId(id);
        setActiveTab("discussions");
        setSearchQuery("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setActiveCommunityId(null);
    };

    const toggleJoin = (e: React.MouseEvent, communityId: string) => {
        e.stopPropagation();
        // In a real app, this would trigger an API call and update the global state
        // For now we just mock visually by a toast or similar (omitted for brevity)
        alert(`Toggle join state for community ${communityId}`);
    };

    // 1. Render Main Directory View
    const renderDirectory = () => (
        <div className="space-y-10 animate-in fade-in duration-300">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10 w-full md:w-auto">
                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Community</h1>
                    <p className="text-base text-white/60 mt-2 max-w-md">Discover and join communities based on your interests. Connect, collaborate, and grow together.</p>
                </div>

                <div className="flex flex-col sm:flex-row w-full md:w-auto items-stretch sm:items-center gap-3 relative z-10">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                            placeholder="Search communities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-black/20 border-white/10 focus-visible:ring-primary/50 text-white rounded-full h-10 w-full"
                        />
                    </div>
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white h-10 px-5 shrink-0">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Community
                    </Button>
                </div>
            </div>

            {/* Search Results Overlay / Inline */}
            {searchQuery && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Search className="w-5 h-5 text-blue-400" /> Search Results for "{searchQuery}"
                    </h2>
                    {searchResults.length === 0 ? (
                        <p className="text-white/50 text-center py-8">No communities found matching your search.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {searchResults.map(community => (
                                <div key={community.id} onClick={() => handleCommunityClick(community.id)} className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-4 cursor-pointer transition flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0 ${community.banner}`}>
                                        {community.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base truncate">{community.name}</h3>
                                        <p className="text-xs text-white/50">{community.memberCount.toLocaleString()} members</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Main Content Layout */}
            {!searchQuery && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Column (Featured & Popular) */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Featured Communities */}
                        <section>
                            <div className="flex items-center gap-2 mb-5">
                                <Star className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Featured Communities</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {featuredCommunities.map(community => (
                                    <div
                                        key={community.id}
                                        onClick={() => handleCommunityClick(community.id)}
                                        className="group bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-md flex flex-col h-full"
                                    >
                                        <div className={`h-16 w-full ${community.banner} relative`}>
                                            <div className="absolute -bottom-6 left-4 w-12 h-12 bg-[#1a1c23] border-2 border-[#1a1c23] rounded-lg flex items-center justify-center text-xl shadow-lg">
                                                {community.icon}
                                            </div>
                                        </div>
                                        <div className="pt-8 p-5 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">{community.name}</h3>
                                            </div>
                                            <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-1">{community.description}</p>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-xs font-medium text-white/50 flex items-center gap-1.5">
                                                    <Users className="w-3.5 h-3.5" /> {community.memberCount.toLocaleString()}
                                                </span>
                                                <Button
                                                    onClick={(e) => toggleJoin(e, community.id)}
                                                    variant={community.isJoined ? "outline" : "default"}
                                                    size="sm"
                                                    className={`h-8 rounded-full text-xs font-medium px-4 ${community.isJoined ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                                                >
                                                    {community.isJoined ? "Joined" : "Join"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Popular Communities */}
                        <section>
                            <div className="flex items-center gap-2 mb-5">
                                <TrendingUp className="w-5 h-5 text-emerald-400" />
                                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Trending Now</h2>
                            </div>
                            <div className="space-y-3">
                                {popularCommunities.map(community => (
                                    <div
                                        key={community.id}
                                        onClick={() => handleCommunityClick(community.id)}
                                        className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-4 cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0 ${community.banner}`}>
                                                {community.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-base text-white truncate">{community.name}</h3>
                                                <div className="flex items-center gap-3 text-xs text-white/50 mt-1">
                                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {community.memberCount.toLocaleString()} members</span>
                                                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                                    <span className="text-emerald-400 font-medium">Active {community.lastActivity}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={(e) => toggleJoin(e, community.id)}
                                            variant={community.isJoined ? "ghost" : "secondary"}
                                            size="sm"
                                            className={`shrink-0 rounded-full h-8 ${community.isJoined ? "text-white/50 hover:text-white" : "bg-white/10 hover:bg-white/20 text-white"}`}
                                        >
                                            {community.isJoined ? "View" : "Join"}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar - My Communities */}
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl sticky top-24">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-base font-bold flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-blue-400" /> My Communities
                                </h2>
                                <span className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">{myCommunities.length}</span>
                            </div>

                            {myCommunities.length === 0 ? (
                                <div className="text-center py-6 text-white/50 text-sm">
                                    You haven't joined any communities yet.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {myCommunities.map(community => (
                                        <div
                                            key={community.id}
                                            onClick={() => handleCommunityClick(community.id)}
                                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition group"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-sm shrink-0 shadow-sm border border-white/5">
                                                    {community.icon}
                                                </div>
                                                <div className="min-w-0 pr-2">
                                                    <h3 className="font-medium text-sm text-white group-hover:text-blue-400 transition-colors truncate">{community.name}</h3>
                                                    <p className="text-[10px] text-white/40 truncate">{community.lastActivity}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Button variant="ghost" className="w-full mt-4 text-xs text-white/50 hover:text-white border border-transparent hover:border-white/10 rounded-xl h-9">
                                View All
                            </Button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );

    // 2. Render Single Community Page
    const renderCommunityDetails = () => {
        if (!activeCommunity) return null;

        const tabs = [
            { id: "discussions", label: "Discussions", icon: MessageSquare },
            { id: "members", label: "Members", icon: Users },
            { id: "resources", label: "Resources", icon: FileText },
            { id: "events", label: "Events", icon: Calendar },
            { id: "announcements", label: "Announcements", icon: Megaphone },
        ] as const;

        return (
            <div className="animate-in slide-in-from-right-8 duration-300 pb-20">

                {/* Navigation Breadcrumb */}
                <Breadcrumb className="mb-4 hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleBack} className="cursor-pointer hover:text-white transition-colors">Directory</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{activeCommunity.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <button onClick={handleBack} className="md:hidden flex items-center gap-2 text-sm text-white/60 hover:text-white mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Directory
                </button>

                {/* Community Header Card */}
                <div className="bg-[#0f1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative mb-6">
                    <div className={`h-28 md:h-36 w-full ${activeCommunity.banner} opacity-80`} />
                    <div className="px-5 md:px-8 pb-6 relative">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-10 md:-mt-12 mb-4">
                            <div className="flex items-end gap-4">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#0f1117] border-4 border-[#0f1117] rounded-xl flex items-center justify-center text-4xl md:text-5xl shadow-xl shrink-0">
                                    {activeCommunity.icon}
                                </div>
                                <div className="mb-1 hidden md:block">
                                    <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{activeCommunity.name}</h1>
                                    <p className="text-sm font-medium text-white/50 flex items-center gap-1.5 mt-1">
                                        <Shield className="w-3.5 h-3.5 text-blue-400" /> Public Community
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                                {activeCommunity.isJoined ? (
                                    <>
                                        <Button variant="outline" className="flex-1 md:flex-none border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full">
                                            Joined
                                        </Button>
                                        <Button size="icon" variant="outline" className="shrink-0 border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full">
                                            <Settings className="w-4 h-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <Button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full">
                                        Join Community
                                    </Button>
                                )}
                                <Button size="icon" variant="outline" className="shrink-0 border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full hidden sm:flex">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Title */}
                        <div className="md:hidden mb-4">
                            <h1 className="text-2xl font-bold text-white leading-tight">{activeCommunity.name}</h1>
                            <p className="text-xs font-medium text-white/50 flex items-center gap-1.5 mt-1.5">
                                <Shield className="w-3.5 h-3.5 text-blue-400" /> Public Community
                            </p>
                        </div>

                        <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-3xl mb-5">
                            {activeCommunity.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-4 h-4 text-white/40" />
                                <span className="font-bold text-white">{activeCommunity.memberCount.toLocaleString()}</span> <span className="text-white/50">Members</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                <span className="font-bold text-white">124</span> <span className="text-white/50">Online</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                <span className="text-white/40 text-xs">Admin:</span>
                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">K</div>
                                <span className="text-xs font-medium">Kyle B.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom Tab Navigation */}
                <div className="flex overflow-x-auto scrollbar-hide border-b border-white/10 mb-6 sticky top-[56px] md:top-[64px] bg-background/80 backdrop-blur-xl z-10 pt-2 -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="flex gap-1 md:gap-2 w-max pb-1 relative">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab.id ? "text-white" : "text-white/50 hover:text-white/80 hover:bg-white/5 rounded-lg"
                                    }`}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-blue-400" : ""}`} />
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full shadow-[0_-2px_8px_rgba(59,130,246,0.5)]"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content Areas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">

                        {activeTab === "discussions" && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold">Recent Discussions</h3>
                                    <Button size="sm" className="h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-3.5 h-3.5 mr-1" /> Post</Button>
                                </div>

                                {/* Mock Feed Items */}
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/[0.07] transition cursor-pointer">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">U{i}</div>
                                            <div>
                                                <div className="font-medium text-sm text-white flex items-center gap-2">User Name <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60">Community Member</span></div>
                                                <div className="text-[11px] text-white/40">{i * 2} hours ago</div>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-base mb-1.5 text-white">Discussion topic title example {i}</h4>
                                        <p className="text-sm text-white/70 line-clamp-2 mb-4 leading-relaxed">
                                            This is a preview of the discussion content. It shows what people are talking about within this specific community group. Members can share ideas, post questions, and interact here.
                                        </p>
                                        <div className="flex items-center gap-4 border-t border-white/5 pt-3 mt-3">
                                            <button className="flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white transition"><MessageSquare className="w-4 h-4" /> {i * 5 + 2} Comments</button>
                                            <button className="flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-green-400 transition"><Star className="w-4 h-4" /> {i * 10 + 8} Votes</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "members" && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                <Users className="w-12 h-12 text-white/20 mx-auto mb-3" />
                                <h3 className="text-lg font-bold mb-1">Members Directory</h3>
                                <p className="text-sm text-white/50 mb-4">Browse and connect with {activeCommunity.memberCount.toLocaleString()} members in this group.</p>
                                <Input className="max-w-md mx-auto bg-black/20 border-white/10 text-center" placeholder="Search members by name..." />
                            </div>
                        )}

                        {activeTab === "resources" && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                <FileText className="w-12 h-12 text-white/20 mx-auto mb-3" />
                                <h3 className="text-lg font-bold mb-1">Shared Resources</h3>
                                <p className="text-sm text-white/50 mb-4">Guides, links, and documents shared by the admins and community.</p>
                                <Button variant="outline" className="border-white/10 hover:bg-white/5">Upload Resource</Button>
                            </div>
                        )}

                        {activeTab === "events" && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                <Calendar className="w-12 h-12 text-white/20 mx-auto mb-3" />
                                <h3 className="text-lg font-bold mb-1">Upcoming Events</h3>
                                <p className="text-sm text-white/50">No upcoming virtual or physical meetups scheduled.</p>
                            </div>
                        )}

                        {activeTab === "announcements" && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                <Megaphone className="w-12 h-12 text-blue-400/20 mx-auto mb-3" />
                                <h3 className="text-lg font-bold mb-1">Admin Announcements</h3>
                                <p className="text-sm text-white/50">Keep track of important updates from moderators.</p>
                            </div>
                        )}

                    </div>

                    {/* Right Sidebar for Specific Community */}
                    <div className="space-y-6 hidden lg:block">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><Settings className="w-4 h-4 text-white/50" /> About Group</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <span className="text-white/50">Created</span>
                                    <span className="font-medium">March 2024</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <span className="text-white/50">Privacy</span>
                                    <span className="font-medium flex items-center gap-1 text-emerald-400"><Shield className="w-3.5 h-3.5" /> Public</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/50">Content Policy</span>
                                    <Button variant="link" className="text-blue-400 h-auto p-0 font-medium">View Rules</Button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-amber-400" /> Moderators</h3>
                            <div className="flex items-center gap-3 hover:bg-white/5 p-2 -mx-2 rounded-lg cursor-pointer transition">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">K</div>
                                <div>
                                    <p className="text-sm font-medium">Kyle Builder</p>
                                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Creator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background relative selection:bg-primary/30 pt-4 md:pt-6">
            <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                {!activeCommunityId ? renderDirectory() : renderCommunityDetails()}
            </div>
        </div>
    );
}
