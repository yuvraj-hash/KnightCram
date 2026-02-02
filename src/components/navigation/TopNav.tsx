import { useState } from "react";
import { Search, Briefcase, PlusSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OffCanvasMenu from "./OffCanvasMenu";

interface TopNavProps {
    isMenuOpen: boolean;
    onMenuOpenChange: (isOpen: boolean) => void;
}

const TopNav = ({ isMenuOpen, onMenuOpenChange }: TopNavProps) => {
    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-white/30 h-14 md:h-16 flex items-center justify-between px-3 md:px-4 transition-all duration-300"
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Left Icons */}
                {/* Left Brand */}
                <div className="flex items-center gap-2">


                    <a
                        href="/main"
                        className="flex items-center gap-1 md:gap-2 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg p-1"
                        aria-label="KnightCram homepage"
                    >
                        <img
                            src="/New.gif"
                            alt="KnightCram Logo"
                            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain transition-all duration-300 group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <span className="font-script font-bold text-xl md:text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors duration-300 tracking-wide">
                            KnightCram
                        </span>
                    </a>
                </div>

                {/* Center Brand */}


                {/* Right Icons */}
                <div className="flex items-center gap-1 md:gap-2">
                    <div className="relative hidden md:block w-64 lg:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground stroke-[2.5px]" />
                        <Input
                            placeholder="Search..."
                            className="pl-9 h-9 bg-background/50 border-primary/60 hover:border-primary focus-visible:ring-primary/50 rounded-full transition-colors"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden hover:bg-primary/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                        aria-label="Search"
                    >
                        <Search className="w-6 h-6 text-foreground stroke-[2.5px]" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden md:flex items-center gap-2 hover:bg-primary/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background px-3"
                        aria-label="Create new post"
                    >
                        <PlusSquare className="w-6 h-6 text-foreground stroke-[2.5px]" />
                        <span className="font-bold text-lg text-foreground">Create</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                        aria-label="Messages"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8 text-foreground"
                        >
                            {/* Front Bubble */}
                            <path d="M16 4H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4l5-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                            {/* Lines */}
                            <path d="M6 9h8" />
                            <path d="M6 13h5" />
                            {/* Back Bubble Peek */}
                            <path d="M18 8h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-4l-4 4v-4" />
                        </svg>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                        aria-label="Opportunities"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8 text-foreground"
                        >
                            {/* Handle */}
                            <path d="M8 6v-1a4 4 0 0 1 8 0v1" />
                            {/* Body */}
                            <rect x="2" y="6" width="20" height="15" rx="4" />
                            {/* Flap Curve */}
                            <path d="M2 10c0 0 5 4 10 4s10-4 10-4" />
                            {/* Clasp */}
                            <path d="M12 12v3" strokeWidth="3.5" />
                        </svg>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                        aria-label="Notifications"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8 text-foreground"
                        >
                            {/* Bell Body */}
                            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                            {/* Clapper */}
                            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                            {/* Top Handle */}
                            <path d="M10.3 8V5a1.7 1.7 0 0 1 3.4 0v3" />
                        </svg>
                    </Button>
                </div>
            </nav>

            <OffCanvasMenu
                isOpen={isMenuOpen}
                onClose={() => onMenuOpenChange(false)}
                onToggle={() => onMenuOpenChange(!isMenuOpen)}
            />
        </>
    );
};

export default TopNav;
