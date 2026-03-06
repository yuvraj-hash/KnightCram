import React, { useState } from "react";
import {
    Briefcase, Search, Plus, MapPin, Building, Clock,
    Tag, ExternalLink, Bookmark, Flag, Share2, ChevronLeft,
    Filter, TrendingUp, MonitorSmartphone, GraduationCap,
    Sparkles, CheckCircle2, BookmarkCheck
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

const MOCK_OPPORTUNITIES = [
    {
        id: "o1",
        title: "Frontend Engineering Intern",
        company: "Vercel",
        type: "Internship",
        location: "Remote",
        locationType: "Remote",
        description: "Join our core framework team to help build the future of Next.js. You'll work on new features, bug fixes, and performance improvements.",
        longDescription: "We are looking for a passionate Frontend Engineering Intern to join our team. \n\nResponsibilities:\n- Collaborate with the core framework team to implement new features.\n- Optimize application performance and ensure high quality code.\n- Participate in code reviews and architectural discussions.\n\nRequirements:\n- Strong proficiency in JavaScript/TypeScript and React.\n- Understanding of modern web development principles.\n- Excellent problem-solving skills and eagerness to learn.",
        skills: ["React", "TypeScript", "Next.js"],
        postedDate: "2 hours ago",
        deadline: "2026-04-15",
        isSaved: false,
        featured: true,
        category: "Web Development",
        experience: "Student",
        logo: "bg-black",
        logoText: "V"
    },
    {
        id: "o2",
        title: "Senior AI Researcher",
        company: "OpenAI",
        type: "Full-time",
        location: "San Francisco, CA",
        locationType: "Hybrid",
        description: "Conduct fundamental research in large language models and reinforcement learning to advance artificial general intelligence.",
        longDescription: "Join the frontier of AI research. We are seeking a Senior AI Researcher to push the boundaries of LLMs.\n\nResponsibilities:\n- Design and execute experiments on state-of-the-art models.\n- Publish research findings and contribute to open-source where applicable.\n- Mentor junior researchers and engineers.\n\nRequirements:\n- Ph.D. in Computer Science, AI, or related field.\n- Proven track record of publications in top-tier conferences (NeurIPS, ICML, etc.).\n- Strong background in deep learning frameworks (PyTorch, JAX).",
        skills: ["PyTorch", "Python", "Machine Learning", "Research"],
        postedDate: "1 day ago",
        deadline: "2026-05-01",
        isSaved: true,
        featured: true,
        category: "AI & ML",
        experience: "Experienced",
        logo: "bg-emerald-600",
        logoText: "O"
    },
    {
        id: "o3",
        title: "Freelance UI/UX Designer",
        company: "Acme Startup",
        type: "Freelance",
        location: "Anywhere",
        locationType: "Remote",
        description: "We are looking for a talented designer to revamp our mobile application interface. Project estimated at 3-4 weeks.",
        longDescription: "Acme Startup is preparing for a major app redesign and needs a creative UI/UX designer to lead the visual overhaul.\n\nProject Scope:\n- Conduct user research to inform design decisions.\n- Create wireframes, prototypes, and high-fidelity mockups in Figma.\n- Deliver developer-ready assets and design systems.\n\nRequirements:\n- Strong portfolio demonstrating mobile UI/UX design.\n- Proficiency in Figma and prototyping tools.\n- Ability to work independently and meet deadlines.",
        skills: ["Figma", "UI Design", "Prototyping", "Mobile"],
        postedDate: "3 hours ago",
        deadline: "2026-03-20",
        isSaved: false,
        featured: false,
        category: "Design",
        experience: "Entry Level",
        logo: "bg-blue-500",
        logoText: "A"
    },
    {
        id: "o4",
        title: "Computer Vision Researcher (Student Collab)",
        company: "Stanford Vision Lab",
        type: "Research",
        location: "Stanford, CA",
        locationType: "On-site",
        description: "Looking for a motivated undergrad/grad student to collaborate on a paper focusing on 3D object reconstruction from 2D images.",
        longDescription: "Join our ongoing research project exploring novel methods for 3D reconstruction.\n\nDetails:\n- You will be working directly with PhD candidates.\n- Responsibilities include data preprocessing, model training, and evaluation.\n- Potential for co-authorship on the resulting paper.\n\nRequirements:\n- Current student in CS or related field.\n- Solid understanding of linear algebra and computer vision concepts.\n- Experience with PyTorch.",
        skills: ["Computer Vision", "PyTorch", "Research", "3D Modeling"],
        postedDate: "2 days ago",
        deadline: "2026-04-10",
        isSaved: false,
        featured: false,
        category: "Data Science",
        experience: "Student",
        logo: "bg-red-700",
        logoText: "S"
    },
    {
        id: "o5",
        title: "Fullstack Developer Co-founder",
        company: "Stealth FinTech",
        type: "Startup",
        location: "New York, NY",
        locationType: "Hybrid",
        description: "Seeking a technical co-founder to build a revolutionary personal finance platform. Equity-heavy compensation.",
        longDescription: "We are building the next generation of personal finance and need a technical co-founder to lead product development.\n\nRole:\n- Build the MVP from scratch using modern web technologies.\n- Make critical architectural decisions.\n- Partner with the business founder on product strategy.\n\nRequirements:\n- 3+ years of fullstack development experience.\n- Experience with Next.js, traditional backend (Node/Go/Python), and databases.\n- Entrepreneurial mindset and willingness to take risks.",
        skills: ["Next.js", "Node.js", "PostgreSQL", "Leadership"],
        postedDate: "5 hours ago",
        deadline: "Open",
        isSaved: false,
        featured: false,
        category: "Startup",
        experience: "Experienced",
        logo: "bg-purple-600",
        logoText: "SF"
    }
];

export default function OpportunitiesPage() {
    const [activeOpportunityId, setActiveOpportunityId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [locationFilter, setLocationFilter] = useState("All");
    const [experienceFilter, setExperienceFilter] = useState("All");
    const [activeTab, setActiveTab] = useState("all"); // "all", "saved", "trending"

    const activeOpportunity = MOCK_OPPORTUNITIES.find(o => o.id === activeOpportunityId);

    // Filter Logic
    let filteredOpportunities = MOCK_OPPORTUNITIES;

    if (activeTab === "saved") {
        filteredOpportunities = filteredOpportunities.filter(o => o.isSaved);
    } else if (activeTab === "trending") {
        filteredOpportunities = filteredOpportunities.filter(o => o.featured);
    }

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredOpportunities = filteredOpportunities.filter(o =>
            o.title.toLowerCase().includes(q) ||
            o.company.toLowerCase().includes(q) ||
            o.skills.some(s => s.toLowerCase().includes(q))
        );
    }

    if (typeFilter !== "All") {
        filteredOpportunities = filteredOpportunities.filter(o => o.type === typeFilter);
    }
    if (locationFilter !== "All") {
        filteredOpportunities = filteredOpportunities.filter(o => o.locationType === locationFilter);
    }
    if (experienceFilter !== "All") {
        filteredOpportunities = filteredOpportunities.filter(o => o.experience === experienceFilter);
    }

    const handleOpportunityClick = (id: string) => {
        setActiveOpportunityId(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setActiveOpportunityId(null);
    };

    const handleSave = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        alert(`Toggled save status for ${id}`);
    };

    // --- 1. Render Main Board View ---
    const renderBoard = () => (
        <div className="space-y-8 animate-in fade-in duration-300">

            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>

                <div className="relative z-10 w-full md:w-auto">
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60 drop-shadow-sm tracking-tight mb-2">Opportunities</h1>
                    <p className="text-base md:text-lg text-white/70 max-w-md leading-relaxed">Discover jobs, internships, research, and collaboration opportunities tailored for you.</p>
                </div>

                <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10">
                    <div className="relative flex-1 sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                            placeholder="Search by title, company, or skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-black/40 border-white/10 focus-visible:ring-blue-500/50 text-white rounded-full h-11 w-full shadow-inner"
                        />
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all shrink-0 font-medium">
                                <Plus className="w-4 h-4 mr-2" />
                                Post Opportunity
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] bg-[#0f1117] border-white/10 text-white max-h-[90vh] overflow-y-auto w-[95vw]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Post an Opportunity</DialogTitle>
                                <DialogDescription className="text-white/60">
                                    Fill out the details below to share your opportunity with the community.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4 mt-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="text-white/80">Opportunity Title</Label>
                                    <Input id="title" placeholder="e.g. Frontend Developer Intern" className="bg-white/5 border-white/10" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="company" className="text-white/80">Organization / Company</Label>
                                        <Input id="company" placeholder="e.g. TechCorp" className="bg-white/5 border-white/10" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="type" className="text-white/80">Opportunity Type</Label>
                                        <Select>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1a1c23] border-white/10 text-white">
                                                <SelectItem value="Job">Job</SelectItem>
                                                <SelectItem value="Internship">Internship</SelectItem>
                                                <SelectItem value="Freelance">Freelance</SelectItem>
                                                <SelectItem value="Research">Research</SelectItem>
                                                <SelectItem value="Startup">Startup Collab</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="location" className="text-white/80">Location Type</Label>
                                        <Select>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1a1c23] border-white/10 text-white">
                                                <SelectItem value="Remote">Remote</SelectItem>
                                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                                                <SelectItem value="On-site">On-site</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="deadline" className="text-white/80">Application Deadline</Label>
                                        <Input id="deadline" type="date" className="bg-white/5 border-white/10" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="desc" className="text-white/80">Description</Label>
                                    <Textarea id="desc" placeholder="Describe the role, responsibilities, and benefits..." className="bg-white/5 border-white/10 min-h-[120px]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="skills" className="text-white/80">Required Skills (comma separated)</Label>
                                    <Input id="skills" placeholder="e.g. React, UX Design, Python" className="bg-white/5 border-white/10" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="link" className="text-white/80">Application Link (Optional)</Label>
                                    <Input id="link" placeholder="https://..." className="bg-white/5 border-white/10" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5 rounded-full px-6">Cancel</Button>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">Post Opportunity</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Sidebar - Filters & Navigation */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "all" ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                        >
                            <Briefcase className={`w-5 h-5 ${activeTab === "all" ? "text-blue-400" : ""}`} /> All Opportunities
                        </button>
                        <button
                            onClick={() => setActiveTab("trending")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "trending" ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                        >
                            <TrendingUp className={`w-5 h-5 ${activeTab === "trending" ? "text-emerald-400" : ""}`} /> Trending Matches
                        </button>
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "saved" ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                        >
                            <BookmarkCheck className={`w-5 h-5 ${activeTab === "saved" ? "text-purple-400" : ""}`} /> Saved Roles
                        </button>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 shadow-lg">
                        <h3 className="font-bold mb-4 flex items-center gap-2 text-white/90"><Filter className="w-4 h-4 text-white/50" /> Filter Results</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs text-white/50 uppercase tracking-wider">Opportunity Type</Label>
                                <Select value={typeFilter} onValueChange={setTypeFilter}>
                                    <SelectTrigger className="bg-black/20 border-white/10 text-sm h-10 rounded-xl w-full">
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1c23] border-white/10 text-white">
                                        <SelectItem value="All">All Types</SelectItem>
                                        <SelectItem value="Job">Full-time Job</SelectItem>
                                        <SelectItem value="Internship">Internship</SelectItem>
                                        <SelectItem value="Freelance">Freelance</SelectItem>
                                        <SelectItem value="Research">Research</SelectItem>
                                        <SelectItem value="Startup">Startup</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs text-white/50 uppercase tracking-wider">Location Format</Label>
                                <Select value={locationFilter} onValueChange={setLocationFilter}>
                                    <SelectTrigger className="bg-black/20 border-white/10 text-sm h-10 rounded-xl w-full">
                                        <SelectValue placeholder="All Locations" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1c23] border-white/10 text-white">
                                        <SelectItem value="All">All Locations</SelectItem>
                                        <SelectItem value="Remote">Remote</SelectItem>
                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                        <SelectItem value="On-site">On-site</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs text-white/50 uppercase tracking-wider">Experience Level</Label>
                                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                                    <SelectTrigger className="bg-black/20 border-white/10 text-sm h-10 rounded-xl w-full">
                                        <SelectValue placeholder="All Levels" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1c23] border-white/10 text-white">
                                        <SelectItem value="All">All Levels</SelectItem>
                                        <SelectItem value="Student">Student</SelectItem>
                                        <SelectItem value="Entry Level">Entry Level</SelectItem>
                                        <SelectItem value="Experienced">Experienced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {(typeFilter !== "All" || locationFilter !== "All" || experienceFilter !== "All") && (
                                <Button
                                    onClick={() => { setTypeFilter("All"); setLocationFilter("All"); setExperienceFilter("All"); }}
                                    variant="ghost"
                                    className="w-full text-xs text-blue-400 hover:text-blue-300 h-8 mt-2"
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Content - Structured List */}
                <div className="lg:col-span-3">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold">
                            {activeTab === "saved" ? "Saved Opportunities" : activeTab === "trending" ? "Trending Now" : "Latest Opportunities"}
                            <span className="ml-2 text-sm font-normal text-white/50 bg-white/10 px-2 py-0.5 rounded-full">{filteredOpportunities.length}</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {filteredOpportunities.length === 0 ? (
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center">
                                <Search className="w-12 h-12 text-white/20 mb-4" />
                                <h3 className="text-lg font-bold mb-1">No matches found</h3>
                                <p className="text-sm text-white/50 max-w-sm">We couldn't find any opportunities matching your current filters. Try adjusting your search or clearing filters.</p>
                            </div>
                        ) : (
                            filteredOpportunities.map((opportunity) => (
                                <div
                                    key={opportunity.id}
                                    onClick={() => handleOpportunityClick(opportunity.id)}
                                    className="group bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 rounded-2xl p-5 md:p-6 cursor-pointer transition-all duration-300 shadow-md relative overflow-hidden"
                                >
                                    {/* Subtle hover gradient */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-full blur-2xl transition-all duration-500 pointer-events-none -mr-10 -mt-10"></div>

                                    <div className="flex flex-col sm:flex-row gap-5">
                                        {/* Logo/Icon */}
                                        <div className="shrink-0 flex justify-between items-start">
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-md border border-white/10 ${opportunity.logo}`}>
                                                {opportunity.logoText}
                                            </div>
                                            {/* Mobile Save Button */}
                                            <button onClick={(e) => handleSave(e, opportunity.id)} className="sm:hidden p-2 text-white/40 hover:text-white transition">
                                                <Bookmark className={`w-5 h-5 ${opportunity.isSaved ? "fill-white text-white" : ""}`} />
                                            </button>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1 pr-4">{opportunity.title}</h3>
                                                    <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm text-white/60 mb-3">
                                                        <span className="flex items-center gap-1 font-medium text-white/80"><Building className="w-4 h-4" /> {opportunity.company}</span>
                                                        <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20"></span>
                                                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {opportunity.location}</span>
                                                        <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20"></span>
                                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {opportunity.postedDate}</span>
                                                    </div>
                                                </div>
                                                {/* Desktop Save Button */}
                                                <button onClick={(e) => handleSave(e, opportunity.id)} className="hidden sm:block p-2 text-white/30 hover:text-white transition rounded-full hover:bg-white/5">
                                                    <Bookmark className={`w-5 h-5 ${opportunity.isSaved ? "fill-blue-400 text-blue-400" : ""}`} />
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-semibold text-blue-300">
                                                    {opportunity.type}
                                                </span>
                                                <span className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold flex items-center gap-1
                          ${opportunity.locationType === 'Remote' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                                        opportunity.locationType === 'Hybrid' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                                                            'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}
                                                >
                                                    {opportunity.locationType === 'Remote' ? <MonitorSmartphone className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                                                    {opportunity.locationType}
                                                </span>
                                                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-semibold text-white/60">
                                                    {opportunity.experience}
                                                </span>
                                            </div>

                                            <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mb-4">
                                                {opportunity.description}
                                            </p>

                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                                                <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
                                                    {opportunity.skills.map((skill, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-black/30 border border-white/5 rounded text-[10px] text-white/50 font-medium whitespace-nowrap">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                                <Button className="w-full sm:w-auto shrink-0 bg-white border border-white/10 text-black hover:bg-neutral-200 shadow-md font-semibold h-9 rounded-lg px-5">
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // --- 2. Render Detail View ---
    const renderDetail = () => {
        if (!activeOpportunity) return null;

        return (
            <div className="animate-in slide-in-from-bottom-8 duration-300 pb-20 max-w-4xl mx-auto">

                {/* Navigation Breadcrumb */}
                <Breadcrumb className="mb-6 hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleBack} className="cursor-pointer hover:text-white transition-colors">Opportunities</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{activeOpportunity.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <button onClick={handleBack} className="md:hidden flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6">
                    <ChevronLeft className="w-4 h-4" /> Back to Board
                </button>

                {/* Main Header Card */}
                <div className="bg-[#13151c] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden mb-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
                        <div className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-bold text-white shadow-xl shrink-0 border border-white/10 ${activeOpportunity.logo}`}>
                            {activeOpportunity.logoText}
                        </div>
                        <div className="flex-1 w-full">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-2">
                                <div>
                                    <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 leading-tight pr-4">{activeOpportunity.title}</h1>
                                    <h2 className="text-lg md:text-xl text-white/80 font-medium flex items-center gap-2 mb-4">
                                        {activeOpportunity.company}
                                        <span className="inline-flex w-4 h-4 rounded-full bg-blue-500/20 items-center justify-center"><CheckCircle2 className="w-3 h-3 text-blue-400" /></span>
                                    </h2>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <Button variant="outline" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white shadow-sm">
                                        <Bookmark className={`w-5 h-5 ${activeOpportunity.isSaved ? "fill-blue-400 text-blue-400" : ""}`} />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white shadow-sm">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 border-t border-white/10 pt-5 pr-4">
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {activeOpportunity.location}</span>
                                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {activeOpportunity.type}</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Posted {activeOpportunity.postedDate}</span>
                                <span className="flex items-center gap-1.5 text-orange-400"><Calendar className="w-4 h-4" /> Applies close {activeOpportunity.deadline}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar (Sticky Mobile, Inline Desktop) */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-white/10 md:static md:bg-transparent md:border-none md:p-0 md:backdrop-blur-none z-40 mb-8 flex gap-3">
                    <Button className="flex-1 md:w-auto h-12 md:h-14 rounded-xl md:rounded-full bg-blue-600 hover:bg-blue-700 text-white text-base font-bold shadow-lg shadow-blue-900/20 md:px-10">
                        Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                </div>

                {/* Content Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">

                        <section className="bg-[#13151c]/50 border border-white/5 rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-blue-400" /> Opportunity Overview</h3>
                            <div className="prose prose-invert max-w-none text-white/70 leading-relaxed text-[15px] whitespace-pre-wrap">
                                {activeOpportunity.longDescription}
                            </div>
                        </section>

                        <section className="bg-[#13151c]/50 border border-white/5 rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-emerald-400" /> Required Skills & Attributes</h3>
                            <div className="flex flex-wrap gap-2">
                                {activeOpportunity.skills.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white/80">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#13151c] border border-white/10 rounded-2xl p-6">
                            <h3 className="font-bold mb-4">Summary Facts</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-white/40 uppercase font-medium tracking-wider mb-1">Company</p>
                                    <p className="font-semibold text-sm">{activeOpportunity.company}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase font-medium tracking-wider mb-1">Opportunity Category</p>
                                    <p className="font-semibold text-sm">{activeOpportunity.category}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase font-medium tracking-wider mb-1">Experience Scope</p>
                                    <p className="font-semibold text-sm">{activeOpportunity.experience}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase font-medium tracking-wider mb-1">Work Setup</p>
                                    <p className="font-semibold text-sm">{activeOpportunity.locationType}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 text-center">
                            <Flag className="w-6 h-6 text-white/30 mx-auto mb-3" />
                            <p className="text-sm text-white/60 mb-3">Notice anything wrong with this listing?</p>
                            <Button variant="link" className="text-red-400 hover:text-red-300 h-auto p-0 font-medium text-sm">Report Opportunity</Button>
                        </div>
                    </div>
                </div>

            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background relative selection:bg-blue-500/30 pt-4 md:pt-6 pb-24 md:pb-12">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                {!activeOpportunityId ? renderBoard() : renderDetail()}
            </div>
        </div>
    );
}
