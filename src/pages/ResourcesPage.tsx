import React, { useState } from "react";
import {
    BookOpen, Search, Plus, FileText, Video, Terminal,
    Github, Link as LinkIcon, Download, Bookmark, Share2,
    Flag, TrendingUp, Clock, ExternalLink, User, ChevronLeft,
    ChevronRight, Compass, ShieldAlert, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// --- Mock Data ---

const CATEGORIES = [
    "All Categories",
    "Programming",
    "AI & Machine Learning",
    "Web Development",
    "Data Science",
    "Design",
    "Startup & Entrepreneurship",
    "Career Preparation",
    "Research Papers",
    "Tools & Software"
];

const MOCK_RESOURCES = [
    {
        id: "r1",
        title: "Complete Guide to Next.js 14 App Router",
        category: "Web Development",
        description: "An in-depth guide covering Server Components, layouts, routing, and data fetching in the new Next.js App Router paradigm.",
        longDescription: "This comprehensive guide explores the completely redesigned architecture of Next.js 14.\n\nWhat you'll learn:\n- The mental model of React Server Components.\n- Nested layouts, loading states, and error handling.\n- Data fetching strategies (server vs client).\n- Server actions for mutations without API routes.\n\nWhether you're migrating from the Pages router or starting fresh, this is the ultimate reference material.",
        tags: ["React", "Next.js", "Frontend", "Guide"],
        type: "Article",
        uploader: "Sarah Dev",
        uploadDate: "2 days ago",
        link: "https://example.com/nextjs-guide",
        isSaved: true,
        featured: true,
        views: 12500,
        upvotes: 843
    },
    {
        id: "r2",
        title: "Attention Is All You Need (Paper summary)",
        category: "AI & Machine Learning",
        description: "A digestible breakdown of the original Transformer paper from Google Brain that revolutionized NLP.",
        longDescription: "The seminal paper 'Attention Is All You Need' introduced the Transformer architecture, dispensing with recurrence and convolutions entirely.\n\nThis breakdown covers:\n- Self-attention mechanisms.\n- Multi-head attention math.\n- Positional encoding.\n- The encoder-decoder structure.\n\nA must-read for anyone looking to truly understand modern LLMs.",
        tags: ["Paper", "Transformers", "NLP", "Deep Learning"],
        type: "Document",
        uploader: "AI_Researcher_01",
        uploadDate: "1 week ago",
        link: "https://example.com/transformer-paper",
        isSaved: false,
        featured: true,
        views: 8900,
        upvotes: 621
    },
    {
        id: "r3",
        title: "Tailwind CSS Component Library",
        category: "Design",
        description: "A large collection of pre-designed, copy-paste Tailwind UI components spanning forms, cards, navigation, and more.",
        longDescription: "Stop rebuilding standard UI elements from scratch.\n\nThis repository provides over 200 fully responsive, accessible UI components built purely with Tailwind utility classes. They require zero custom CSS configuration.\n\nIncludes:\n- Navigation bars & footers\n- Hero sections\n- Pricing tables\n- Authentication forms",
        tags: ["Tailwind", "CSS", "UI Kit", "Free"],
        type: "GitHub Repository",
        uploader: "DesignSystemHQ",
        uploadDate: "3 weeks ago",
        link: "https://github.com/example/tailwind-components",
        isSaved: false,
        featured: false,
        views: 34200,
        upvotes: 2100
    },
    {
        id: "r4",
        title: "How to Build a Startup Financial Model",
        category: "Startup & Entrepreneurship",
        description: "A dynamic spreadsheet template and accompanying video tutorial on projecting startup runway and revenue.",
        longDescription: "A solid financial model is essential for early-stage fundraising.\n\nThis resource includes:\n1. A customizable Google Sheets template with pre-built formulas.\n2. A 45-minute video tutorial explaining how to adjust assumptions.\n\nTracks MRR calculations, burn rate modeling, and headcount scaling over a 36-month projection period.",
        tags: ["Finance", "Spreadsheet", "Founders", "Fundraising"],
        type: "Video",
        uploader: "StartupMentor",
        uploadDate: "1 month ago",
        link: "https://youtube.com/example-video",
        isSaved: true,
        featured: false,
        views: 5600,
        upvotes: 412
    },
    {
        id: "r5",
        title: "PostgreSQL Performance Tuning Tool",
        category: "Tools & Software",
        description: "An open-source CLI tool that analyzes your postgresql.conf and suggests optimizations based on your hardware.",
        longDescription: "Getting the best performance out of Postgres requires tweaking variables that aren't obvious to beginners.\n\nPG-Tune-CLI inspects your machine's CPU and RAM and automatically generates a highly optimized `postgresql.conf` configuration.\n\nSupports high-availability setups and read-replica configurations.",
        tags: ["Database", "Backend", "CLI", "Optimization"],
        type: "Tool",
        uploader: "DbAdmin_Dan",
        uploadDate: "5 days ago",
        link: "https://github.com/example/pg-tune",
        isSaved: false,
        featured: true,
        views: 7800,
        upvotes: 890
    }
];

const getTypeIcon = (type: string, className: string = "w-5 h-5") => {
    switch (type) {
        case "Article": return <FileText className={className} />;
        case "Video": return <Video className={className} />;
        case "Tool": return <Terminal className={className} />;
        case "GitHub Repository": return <Github className={className} />;
        case "Document": return <BookOpen className={className} />;
        default: return <LinkIcon className={className} />;
    }
};

const getTypeColor = (type: string) => {
    switch (type) {
        case "Article": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
        case "Video": return "text-red-400 bg-red-400/10 border-red-400/20";
        case "Tool": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
        case "GitHub Repository": return "text-white bg-white/10 border-white/20";
        case "Document": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
        default: return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
    }
};

export default function ResourcesPage() {
    const [activeResourceId, setActiveResourceId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [activeTab, setActiveTab] = useState("all"); // "all", "trending", "saved"

    const activeResource = MOCK_RESOURCES.find(r => r.id === activeResourceId);

    // Filter Logic
    let filteredResources = MOCK_RESOURCES;

    if (activeTab === "saved") {
        filteredResources = filteredResources.filter(r => r.isSaved);
    } else if (activeTab === "trending") {
        filteredResources = filteredResources.filter(r => r.featured);
    }

    if (categoryFilter !== "All Categories") {
        filteredResources = filteredResources.filter(r => r.category === categoryFilter);
    }

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredResources = filteredResources.filter(r =>
            r.title.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            r.tags.some(t => t.toLowerCase().includes(q))
        );
    }

    const handleResourceClick = (id: string) => {
        setActiveResourceId(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setActiveResourceId(null);
    };

    const handleSave = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        alert(`Toggled save status for resource ${id}`);
    };

    // --- 1. Render Catalog View ---
    const renderCatalog = () => (
        <div className="space-y-8 animate-in fade-in duration-300">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>

                <div className="relative z-10 w-full md:w-auto">
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60 drop-shadow-sm tracking-tight mb-2">Knowledge Library</h1>
                    <p className="text-base md:text-lg text-white/70 max-w-lg leading-relaxed">Explore useful learning materials, tools, and research shared by the community.</p>
                </div>

                <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10">
                    <div className="relative flex-1 sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                            placeholder="Search guides, tools, papers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-black/40 border-white/10 focus-visible:ring-indigo-500/50 text-white rounded-full h-11 w-full shadow-inner"
                        />
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 px-6 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all shrink-0 font-medium">
                                <Plus className="w-4 h-4 mr-2" />
                                Upload Resource
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] bg-[#0f1117] border-white/10 text-white max-h-[90vh] overflow-y-auto w-[95vw]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Upload a Resource</DialogTitle>
                                <DialogDescription className="text-white/60">
                                    Share learning materials, tools, or references to help out the community.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4 mt-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="text-white/80">Resource Title</Label>
                                    <Input id="title" placeholder="e.g. A Complete Guide to React Query" className="bg-white/5 border-white/10" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="category" className="text-white/80">Category</Label>
                                        <Select>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1a1c23] border-white/10 text-white max-h-60">
                                                {CATEGORIES.slice(1).map(c => (
                                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="type" className="text-white/80">Resource Type</Label>
                                        <Select>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                <SelectValue placeholder="Select format" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1a1c23] border-white/10 text-white">
                                                <SelectItem value="Article">Article Layout</SelectItem>
                                                <SelectItem value="Video">Video / Course</SelectItem>
                                                <SelectItem value="Tool">Interactive Tool</SelectItem>
                                                <SelectItem value="GitHub Repository">GitHub Repository</SelectItem>
                                                <SelectItem value="Document">PDF / Document</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="desc" className="text-white/80">Short Description</Label>
                                    <Textarea id="desc" placeholder="Briefly explain what this resource is and why it's useful..." className="bg-white/5 border-white/10 min-h-[100px]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="link" className="text-white/80">Direct Link / URL</Label>
                                    <Input id="link" placeholder="https://..." className="bg-white/5 border-white/10" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="tags" className="text-white/80">Search Tags (comma separated)</Label>
                                    <Input id="tags" placeholder="e.g. Next.js, Architecture, Frontend" className="bg-white/5 border-white/10" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5 rounded-full px-6">Cancel</Button>
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">Submit Resource</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Sidebar - Navigation */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "all" ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                        >
                            <Compass className={`w-5 h-5 ${activeTab === "all" ? "text-indigo-400" : ""}`} /> Discover
                        </button>
                        <button
                            onClick={() => setActiveTab("trending")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "trending" ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                        >
                            <TrendingUp className={`w-5 h-5 ${activeTab === "trending" ? "text-emerald-400" : ""}`} /> Trending Resources
                        </button>
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "saved" ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                        >
                            <Bookmark className={`w-5 h-5 ${activeTab === "saved" ? "text-purple-400" : ""}`} /> Saved Library
                        </button>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 shadow-lg">
                        <h3 className="font-bold mb-4 flex items-center gap-2 text-white/90">Browse by Category</h3>
                        <div className="flex flex-col gap-1">
                            {CATEGORIES.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium border border-transparent ${categoryFilter === cat ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content - Structured List */}
                <div className="lg:col-span-3">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            {activeTab === "saved" ? "Your Library" : activeTab === "trending" ? "Top Charting" : categoryFilter}
                            <span className="text-sm font-normal text-white/50 bg-white/10 px-2 py-0.5 rounded-full">{filteredResources.length}</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {filteredResources.length === 0 ? (
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center">
                                <Search className="w-12 h-12 text-white/20 mb-4" />
                                <h3 className="text-lg font-bold mb-1">No resources found</h3>
                                <p className="text-sm text-white/50 max-w-sm">Try adjusting your category or search filters to discover more.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredResources.map((resource) => (
                                    <div
                                        key={resource.id}
                                        onClick={() => handleResourceClick(resource.id)}
                                        className="group bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-md flex flex-col h-full relative"
                                    >
                                        {/* Header line */}
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wide uppercase flex items-center gap-1.5 border ${getTypeColor(resource.type)}`}>
                                                {getTypeIcon(resource.type, "w-3 h-3")} {resource.type}
                                            </span>
                                            <button onClick={(e) => handleSave(e, resource.id)} className="p-1.5 text-white/30 hover:text-white transition rounded-full hover:bg-white/5 -mr-2 -mt-2">
                                                <Bookmark className={`w-4 h-4 ${resource.isSaved ? "fill-white text-white" : ""}`} />
                                            </button>
                                        </div>

                                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2 leading-tight line-clamp-2">{resource.title}</h3>
                                        <p className="text-xs font-medium text-indigo-400 mb-3">{resource.category}</p>

                                        <p className="text-sm text-white/60 line-clamp-3 leading-relaxed mb-4 flex-1">
                                            {resource.description}
                                        </p>

                                        <div className="mt-auto">
                                            <div className="flex flex-wrap items-center gap-1.5 mb-4 overflow-hidden">
                                                {resource.tags.slice(0, 3).map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 bg-black/30 border border-white/5 rounded text-[10px] text-white/50 font-medium whitespace-nowrap">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {resource.tags.length > 3 && <span className="text-[10px] text-white/40">+{resource.tags.length - 3}</span>}
                                            </div>

                                            <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                                <div className="flex items-center gap-2 text-xs text-white/40">
                                                    <User className="w-3.5 h-3.5" /> <span className="truncate max-w-[80px]">{resource.uploader}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-white/40">
                                                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400/70" /> {resource.upvotes}</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {resource.uploadDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // --- 2. Render Detail View ---
    const renderDetail = () => {
        if (!activeResource) return null;

        return (
            <div className="animate-in slide-in-from-right-8 duration-300 pb-20 max-w-4xl mx-auto">

                {/* Navigation Breadcrumb */}
                <Breadcrumb className="mb-6 hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleBack} className="cursor-pointer hover:text-white transition-colors">Library</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => { handleBack(); setCategoryFilter(activeResource.category); }} className="cursor-pointer hover:text-white transition-colors">{activeResource.category}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="max-w-[200px] truncate">{activeResource.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <button onClick={handleBack} className="md:hidden flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6">
                    <ChevronLeft className="w-4 h-4" /> Back to Library
                </button>

                {/* Main Header Card */}
                <div className="bg-[#10121a] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden mb-8">
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none opacity-20 ${activeResource.type === 'Article' ? 'bg-blue-500' : activeResource.type === 'Video' ? 'bg-red-500' : 'bg-indigo-500'}`}></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 border ${getTypeColor(activeResource.type)}`}>
                            {getTypeIcon(activeResource.type, "w-8 h-8 md:w-10 md:h-10")}
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
                                <div>
                                    <span className="text-sm font-bold tracking-wide text-indigo-400 mb-2 block uppercase">{activeResource.category}</span>
                                    <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight pr-4">{activeResource.title}</h1>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <Button variant="outline" onClick={(e) => handleSave(e, activeResource.id)} className={`h-10 px-4 rounded-full border-white/10 bg-white/5 hover:bg-white/10 font-medium ${activeResource.isSaved ? 'text-indigo-400' : 'text-white'}`}>
                                        <Bookmark className={`w-4 h-4 mr-2 ${activeResource.isSaved ? "fill-indigo-400" : ""}`} />
                                        {activeResource.isSaved ? 'Saved' : 'Save'}
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white shadow-sm">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 border-t border-white/10 pt-5 pr-4 mt-6">
                                <span className="flex items-center gap-1.5 font-medium text-white/80"><User className="w-4 h-4" /> Shared by {activeResource.uploader}</span>
                                <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20"></span>
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {activeResource.uploadDate}</span>
                                <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20"></span>
                                <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> {activeResource.views.toLocaleString()} impressions</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">

                        <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 md:p-8">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white/90">About this Resource</h3>
                            <div className="prose prose-invert max-w-none text-white/70 leading-relaxed text-[15px] whitespace-pre-wrap">
                                {activeResource.longDescription}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <Button className="w-full md:w-auto h-12 md:h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold shadow-lg md:px-8">
                                    Open {activeResource.type} <ExternalLink className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                            <h3 className="font-bold mb-4 text-white/90">Metadata</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-white/40 uppercase font-medium tracking-wider mb-1.5">Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {activeResource.tags.map((tag, idx) => (
                                            <span key={idx} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-medium text-white/70">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase font-medium tracking-wider mb-1 mt-4">File / Link Format</p>
                                    <p className="font-medium text-sm flex items-center gap-2">
                                        {getTypeIcon(activeResource.type, "w-4 h-4")} {activeResource.type}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase font-medium tracking-wider mb-1 mt-4">Community Rating</p>
                                    <p className="font-medium text-sm flex items-center gap-1.5 text-amber-400">
                                        <Star className="w-4 h-4 fill-amber-400" /> {activeResource.upvotes} Upvotes
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5 text-center">
                            <ShieldAlert className="w-6 h-6 text-white/30 mx-auto mb-3" />
                            <p className="text-sm text-white/60 mb-3">Is this link broken or violating guidelines?</p>
                            <Button variant="link" className="text-red-400 hover:text-red-300 h-auto p-0 font-medium text-sm">Report Resource</Button>
                        </div>
                    </div>
                </div>

            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background relative selection:bg-indigo-500/30 pt-4 md:pt-6 pb-24 md:pb-12">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                {!activeResourceId ? renderCatalog() : renderDetail()}
            </div>
        </div>
    );
}
