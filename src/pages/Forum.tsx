import React, { useState } from "react";
import {
    Search, MessageSquare, Plus, ChevronRight, Hash,
    ArrowLeft, Eye, MessageCircle, ArrowUp, ArrowDown,
    Clock, Filter, MoreHorizontal, User, Bookmark,
    Video, Users, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

// --- Mock Data ---

const CATEGORIES = [
    { id: "ai-ml", name: "AI & Machine Learning", description: "Discuss artificial intelligence, machine learning models, and data science.", icon: "🧠" },
    { id: "web-dev", name: "Web Development", description: "Frontend, backend, fullstack development, and web design.", icon: "💻" },
    { id: "startups", name: "Startup Ideas", description: "Share and discuss the next big thing, get feedback, and find co-founders.", icon: "🚀" },
    { id: "career", name: "Career Advice", description: "Resume reviews, interview tips, and general career growth.", icon: "💼" },
    { id: "research", name: "Research Discussions", description: "Academic research, paper discussions, and scientific exploration.", icon: "🔬" },
    { id: "project-help", name: "Project Help", description: "Stuck on a project? Ask the community for help and guidance.", icon: "🛠️" },
];

const MOCK_LIVE_ROOMS = [
    { id: "room-1", title: "AI Study Group", categoryId: "ai-ml", host: "VIT CSE 3rd Year", participants: 14 },
    { id: "room-2", title: "Placement Interview Practice", categoryId: "career", host: "John Doe", participants: 9 },
    { id: "room-3", title: "Web Dev Debug Session", categoryId: "web-dev", host: "Sarah Smith", participants: 6 },
];

const MOCK_SCHEDULED_ROOMS = [
    { id: "scheduled-1", title: "DSA Practice Session", categoryId: "project-help", host: "AlgoPro", time: "Today at 8:00 PM" },
    { id: "scheduled-2", title: "React State Management", categoryId: "web-dev", host: "Frontend Master", time: "Tomorrow at 10:00 AM" },
];

const MOCK_DISCUSSIONS = [
    {
        id: 1, categoryId: "ai-ml", title: "Best resources for learning PyTorch from scratch?",
        tags: ["pytorch", "beginner", "neural-networks"], author: "Alex Chen",
        views: 1204, replies: 24, upvotes: 45, date: "2 hours ago",
        content: "I'm looking to dive into PyTorch for an upcoming project. I have some background in Python but I'm completely new to deep learning. What are the best resources (courses, books, tutorials) to get started? Has anyone tried the fast.ai course?"
    },
    {
        id: 2, categoryId: "ai-ml", title: "Implementing transformers for time-series forecasting",
        tags: ["transformers", "time-series", "advanced"], author: "Sarah Johnson",
        views: 845, replies: 12, upvotes: 38, date: "5 hours ago",
        content: "I've been reading up on how transformers can be applied to time-series data, specifically for volatile market predictions. Does anyone have experience with this, or open-source repositories to share?"
    },
    {
        id: 3, categoryId: "web-dev", title: "React vs Vue in 2026",
        tags: ["react", "vue", "frontend"], author: "Mike Ross",
        views: 3450, replies: 156, upvotes: 210, date: "1 day ago",
        content: "With the new updates to both React and Vue, which one do you prefer for building scalable web applications?"
    },
    {
        id: 4, categoryId: "project-help", title: "CORS issue with Express backend and Next.js frontend",
        tags: ["node", "express", "nextjs", "cors"], author: "David Kim",
        views: 450, replies: 8, upvotes: 15, date: "3 hours ago",
        content: "I keep getting a CORS preflight error when making a POST request from my Next.js client to my Express API. I have the cors middleware set up on Express. What am I missing?"
    },
];

const MOCK_REPLIES: Record<number, any[]> = {
    1: [
        { id: 101, author: "David Kim", content: "I highly recommend the official PyTorch tutorials. They are very comprehensive and cover everything from tensors to deploying models.", upvotes: 12, date: "1 hour ago" },
        { id: 102, author: "Emily Watson", content: "Check out Fast.ai's Deep Learning course. It's fantastic and uses PyTorch under the hood (the fastai library). It teaches top-down which is great for beginners.", upvotes: 8, date: "45 mins ago" }
    ],
    2: [],
    3: [],
    4: []
};

// --- Components ---

export default function Forum() {
    const navigate = useNavigate();
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [activeDiscussionId, setActiveDiscussionId] = useState<number | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("latest");

    const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);

    const handleJoinRoom = (roomId: string) => {
        navigate(`/live-room/${roomId}`);
    };

    const handleCreateRoomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const roomId = Math.random().toString(36).substring(7);
        navigate(`/live-room/${roomId}`);
    };

    // Derived state
    const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId);
    const activeDiscussion = MOCK_DISCUSSIONS.find(d => d.id === activeDiscussionId);

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategoryId(categoryId);
        setActiveDiscussionId(null);
        setSearchQuery("");
    };

    const handleDiscussionClick = (discussionId: number) => {
        setActiveDiscussionId(discussionId);
    };

    const handleBackToCategories = () => {
        setActiveCategoryId(null);
        setActiveDiscussionId(null);
    };

    const handleBackToCategory = () => {
        setActiveDiscussionId(null);
    };

    // 1. Render Categories View
    const renderCategories = () => (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Forum</h1>
                    <p className="text-sm md:text-base text-white/60 mt-1">Ask questions, share knowledge, and participate in structured discussions.</p>
                </div>
                <div className="flex w-full sm:w-auto items-center gap-3">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                            placeholder="Search forums..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-black/20 border-white/10 text-sm focus-visible:ring-primary/50 text-white rounded-full h-10"
                        />
                    </div>
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0 h-10 px-4 md:px-5">
                        <Plus className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Ask Question</span>
                    </Button>
                    <Button onClick={() => setIsCreateRoomOpen(true)} className="rounded-full bg-green-600 hover:bg-green-700 text-white flex-shrink-0 h-10 px-4 md:px-5">
                        <Video className="w-4 h-4 md:mr-2 animate-pulse" />
                        <span className="hidden md:inline">Start Live Room</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase())).map((category) => (
                    <div
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-md flex flex-col items-start gap-4"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white/5">
                                {category.icon}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{category.name}</h3>
                                <p className="text-xs text-white/50">{MOCK_DISCUSSIONS.filter(d => d.categoryId === category.id).length} discussions</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed line-clamp-2">{category.description}</p>
                    </div>
                ))}
            </div>

            {/* Live Now Section */}
            {!searchQuery && (
                <div className="mt-12 animate-in fade-in duration-500">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Live Now</h2>
                        <span className="text-sm text-white/50 ml-2">Join active discussions instantly</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {MOCK_LIVE_ROOMS.map(room => {
                            const category = CATEGORIES.find(c => c.id === room.categoryId);
                            return (
                                <div key={room.id} className="bg-[#1c1e26] border border-white/5 hover:border-white/20 rounded-2xl p-5 transition-all duration-300 shadow-md group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="mb-4 flex items-start justify-between">
                                        <div>
                                            <h3 className="font-bold text-white text-lg mb-1">{room.title}</h3>
                                            <div className="text-xs text-white/50 flex items-center gap-1.5">
                                                <span className="text-white/70">Category:</span> {category?.name || "General"}
                                            </div>
                                        </div>
                                        <div className="bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded w-fit flex items-center gap-1.5 border border-red-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                                            Live
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                                                {room.host.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-xs text-white/40">Host</div>
                                                <div className="text-sm font-medium text-white/90 truncate max-w-[100px]">{room.host}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-1.5 text-xs text-white/60">
                                                <Users className="w-3.5 h-3.5" />
                                                <span>{room.participants}</span>
                                            </div>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handleJoinRoom(room.id)}
                                                className="h-8 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg px-4"
                                            >
                                                Join Room
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Scheduled Rooms Section */}
            {!searchQuery && (
                <div className="mt-12 mb-8 animate-in fade-in duration-500 delay-100">
                    <div className="flex items-center gap-2 mb-6">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Upcoming Sessions</h2>
                        <span className="text-sm text-white/50 ml-2">Scheduled live rooms you can join later</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {MOCK_SCHEDULED_ROOMS.map(room => {
                            const category = CATEGORIES.find(c => c.id === room.categoryId);
                            return (
                                <div key={room.id} className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all duration-300 shadow-sm flex flex-col justify-between group">
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2 text-blue-400 font-medium text-sm">
                                            <Clock className="w-4 h-4" /> {room.time}
                                        </div>
                                        <h3 className="font-bold text-white text-lg mb-1">{room.title}</h3>
                                        <div className="text-xs text-white/50 flex items-center gap-1.5">
                                            <span className="text-white/70">Category:</span> {category?.name || "General"}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                                                {room.host.charAt(0)}
                                            </div>
                                            <span className="text-xs text-white/70 font-medium">{room.host}</span>
                                        </div>
                                        <Button variant="outline" size="sm" className="h-7 text-[10px] uppercase font-bold tracking-wider rounded-lg border-white/20 text-white hover:text-white hover:bg-white/10">
                                            Notify Me
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );

    // 2. Render Discussion List View (inside a category)
    const renderDiscussionList = () => {
        if (!activeCategory) return null;

        let filtered = MOCK_DISCUSSIONS.filter(d => d.categoryId === activeCategory.id);

        if (searchQuery) {
            filtered = filtered.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
        }

        if (sortBy === "replies") filtered.sort((a, b) => b.replies - a.replies);
        else if (sortBy === "views") filtered.sort((a, b) => b.views - a.views);
        else if (sortBy === "upvotes") filtered.sort((a, b) => b.upvotes - a.upvotes);
        // "latest" is default mock order

        return (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">

                {/* Navigation Breadcrumb */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleBackToCategories} className="cursor-pointer hover:text-white transition-colors">Categories</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{activeCategory.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl border border-white/10 shadow-sm">
                            {activeCategory.icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{activeCategory.name}</h2>
                            <p className="text-sm text-white/60 mt-0.5">{activeCategory.description}</p>
                        </div>
                    </div>
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 h-10 px-5 text-white max-w-fit">
                        <Plus className="w-4 h-4 mr-2" /> New Discussion
                    </Button>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white/5 border border-white/10 p-2 md:p-3 rounded-xl mt-6">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                            placeholder={`Search in ${activeCategory.name}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-black/20 border-white/5 text-sm h-9 rounded-lg text-white"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Filter className="w-4 h-4 text-white/40 hidden sm:block" />
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full sm:w-[150px] h-9 bg-black/20 border-white/5 text-sm rounded-lg">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1c23] border-white/10 text-white">
                                <SelectItem value="latest">Latest</SelectItem>
                                <SelectItem value="replies">Most Replies</SelectItem>
                                <SelectItem value="views">Most Views</SelectItem>
                                <SelectItem value="upvotes">Most Upvotes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Discussions List */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                    {filtered.length === 0 ? (
                        <div className="p-12 text-center text-white/50">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No discussions found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {filtered.map((discussion) => (
                                <div
                                    key={discussion.id}
                                    onClick={() => handleDiscussionClick(discussion.id)}
                                    className="p-4 md:p-5 hover:bg-white/[0.03] cursor-pointer transition-colors duration-200 flex flex-col md:flex-row gap-4 justify-between"
                                >
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base md:text-lg font-semibold text-white hover:text-blue-400 transition-colors mb-2 leading-snug pr-4">{discussion.title}</h3>
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            {discussion.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-white/70 flex items-center gap-1">
                                                    <Hash className="w-3 h-3 text-white/40" />{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-white/50">
                                            <span className="flex items-center gap-1.5 font-medium"><User className="w-3.5 h-3.5" /> {discussion.author}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {discussion.date}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 md:gap-6 shrink-0 pt-2 md:pt-0 border-t border-white/5 md:border-t-0 mt-3 md:mt-0">
                                        <div className="text-center">
                                            <div className="text-white font-medium flex items-center justify-center gap-1 text-sm"><MessageSquare className="w-4 h-4 text-white/40" /> {discussion.replies}</div>
                                            <div className="text-[10px] text-white/40 uppercase tracking-wide mt-0.5">Replies</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-white font-medium flex items-center justify-center gap-1 text-sm"><Eye className="w-4 h-4 text-white/40" /> {discussion.views}</div>
                                            <div className="text-[10px] text-white/40 uppercase tracking-wide mt-0.5">Views</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-white font-medium flex items-center justify-center gap-1 text-sm"><ArrowUp className="w-4 h-4 text-green-400" /> {discussion.upvotes}</div>
                                            <div className="text-[10px] text-white/40 uppercase tracking-wide mt-0.5">Votes</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 3. Render Discussion View
    const renderDiscussion = () => {
        if (!activeCategory || !activeDiscussion) return null;
        const replies = MOCK_REPLIES[activeDiscussion.id] || [];

        return (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-300 pb-20">

                {/* Navigation Breadcrumb */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleBackToCategories} className="cursor-pointer hover:text-white transition-colors">Categories</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleBackToCategory} className="cursor-pointer hover:text-white transition-colors">{activeCategory.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="max-w-[200px] truncate">{activeDiscussion.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Main Post */}
                <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden mt-4">
                    <div className="flex">
                        {/* Voting Sidebar */}
                        <div className="hidden md:flex flex-col items-center bg-black/20 p-4 border-r border-white/5 w-16 shrink-0">
                            <button className="p-1 hover:bg-white/10 rounded text-white/40 hover:text-green-400 transition-colors"><ArrowUp className="w-6 h-6" /></button>
                            <span className="font-bold my-2 text-white">{activeDiscussion.upvotes}</span>
                            <button className="p-1 hover:bg-white/10 rounded text-white/40 hover:text-red-400 transition-colors"><ArrowDown className="w-6 h-6" /></button>
                        </div>

                        <div className="p-5 md:p-6 flex-1 min-w-0">
                            {/* Mobile Voting (Inline) */}
                            <div className="flex items-center gap-3 mb-4 md:hidden text-sm font-medium bg-black/20 w-fit px-3 py-1.5 rounded-full border border-white/5">
                                <button className="hover:text-green-400 transition-colors"><ArrowUp className="w-4 h-4" /></button>
                                <span>{activeDiscussion.upvotes}</span>
                                <button className="hover:text-red-400 transition-colors"><ArrowDown className="w-4 h-4" /></button>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                {activeDiscussion.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-300 flex items-center gap-1">
                                        <Hash className="w-3 h-3 opacity-60" />{tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug">{activeDiscussion.title}</h1>

                            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {activeDiscussion.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm text-white">{activeDiscussion.author}</div>
                                        <div className="text-xs text-white/50 flex items-center gap-2 mt-0.5">
                                            <Clock className="w-3 h-3" /> {activeDiscussion.date}
                                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                            <Eye className="w-3 h-3" /> {activeDiscussion.views} views
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white rounded-full"><Bookmark className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white rounded-full"><MoreHorizontal className="w-4 h-4" /></Button>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none text-white/80 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                                {activeDiscussion.content}
                            </div>

                            <div className="mt-8 flex items-center gap-3">
                                <Button className="rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm h-9 px-4 border border-white/10">
                                    <MessageCircle className="w-4 h-4 mr-2" /> Reply
                                </Button>
                                <Button variant="ghost" className="rounded-full text-white/50 hover:text-white text-sm h-9 px-4">
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Replies Section */}
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                        {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
                    </h3>

                    <div className="space-y-4">
                        {replies.length === 0 ? (
                            <div className="text-center py-10 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <p className="text-white/50 text-sm">No replies yet. Be the first to answer!</p>
                            </div>
                        ) : (
                            replies.map(reply => (
                                <div key={reply.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex shadow-md">
                                    <div className="hidden md:flex flex-col items-center bg-black/10 p-4 border-r border-white/5 w-14 shrink-0">
                                        <button className="p-1 hover:bg-white/10 rounded text-white/40 hover:text-green-400 transition-colors"><ArrowUp className="w-5 h-5" /></button>
                                        <span className="font-semibold my-1 text-sm text-white">{reply.upvotes}</span>
                                        <button className="p-1 hover:bg-white/10 rounded text-white/40 hover:text-red-400 transition-colors"><ArrowDown className="w-5 h-5" /></button>
                                    </div>
                                    <div className="p-4 md:p-5 flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs">
                                                    {reply.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm text-white">{reply.author}</div>
                                                    <div className="text-[11px] text-white/40 mt-0.5">{reply.date}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 md:hidden">
                                                <span className="text-xs font-medium text-white/50 flex items-center gap-1"><ArrowUp className="w-3 h-3 text-green-400" /> {reply.upvotes}</span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-white/80 leading-relaxed pl-10 md:pl-0">
                                            {reply.content}
                                        </div>
                                        <div className="mt-4 flex items-center gap-4 pl-10 md:pl-0">
                                            <button className="text-xs font-semibold text-white/40 hover:text-white transition-colors">Reply</button>
                                            <button className="text-xs font-semibold text-white/40 hover:text-red-400 transition-colors">Report</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background relative selection:bg-primary/30 pt-4 md:pt-6">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
                {!activeCategory && renderCategories()}
                {activeCategory && !activeDiscussion && renderDiscussionList()}
                {activeCategory && activeDiscussion && renderDiscussion()}
            </div>

            {/* Create Live Room Modal */}
            <Dialog open={isCreateRoomOpen} onOpenChange={setIsCreateRoomOpen}>
                <DialogContent className="bg-[#1c1e26] border-white/10 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl flex items-center gap-2">
                            <Video className="w-5 h-5 text-blue-400" /> Start Live Room
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateRoomSubmit} className="space-y-4 mt-4">
                        <div>
                            <label className="text-sm font-medium text-white/70 mb-1.5 block">Room Name</label>
                            <Input required placeholder="e.g. AI Study Session" className="bg-black/20 border-white/10 text-white focus-visible:ring-blue-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-white/70 mb-1.5 block">Category</label>
                            <Select required defaultValue="ai-ml">
                                <SelectTrigger className="bg-black/20 border-white/10 text-white focus:ring-blue-500">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1c23] border-white/10 text-white">
                                    {CATEGORIES.map(c => <SelectItem key={c.id} value={c.id}>{c.icon} {c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-white/70 mb-1.5 block">Description (Optional)</label>
                            <Input placeholder="What will be discussed?" className="bg-black/20 border-white/10 text-white focus-visible:ring-blue-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-white/70 mb-1.5 block">Max Participants</label>
                                <Input type="number" defaultValue={20} min={2} max={50} className="bg-black/20 border-white/10 text-white focus-visible:ring-blue-500" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-white/70 mb-1.5 block">Room Type</label>
                                <Select defaultValue="public">
                                    <SelectTrigger className="bg-black/20 border-white/10 text-white focus:ring-blue-500">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1c23] border-white/10 text-white">
                                        <SelectItem value="public">🌐 Public</SelectItem>
                                        <SelectItem value="private">🔒 Private</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-white/70 mb-1.5 block">Schedule Session</label>
                            <Select defaultValue="now">
                                <SelectTrigger className="bg-black/20 border-white/10 text-white focus:ring-blue-500">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1c23] border-white/10 text-white">
                                    <SelectItem value="now">Live Now</SelectItem>
                                    <SelectItem value="later">Schedule for Later</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter className="mt-6 pt-2 border-t border-white/5 sm:justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsCreateRoomOpen(false)} className="text-white/70 hover:text-white hover:bg-white/5">Cancel</Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6">Create Room</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
