import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreate } from "@/context/CreateContext";
import { Search, Briefcase, PlusSquare, Menu, X, Bell, Zap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TopNavProps {
    isMenuOpen: boolean;
    onMenuOpenChange: (isOpen: boolean) => void;
}

const TopNav = ({ isMenuOpen, onMenuOpenChange }: TopNavProps) => {
    const { openCreate } = useCreate();
    const navigate = useNavigate();
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-white/30 h-14 md:h-16 flex items-center justify-between px-3 md:px-4 transition-all duration-300"
            role="navigation"
            aria-label="Main navigation"
        >
            {/* Left Icons */}
            <div className="flex items-center gap-0 md:gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onMenuOpenChange(!isMenuOpen)}
                    className="flex hover:bg-neutral-800 rounded-full"
                    aria-label="Toggle menu"
                >
                    <Menu className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                </Button>

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
                    <span className="font-bubblegum font-bold text-xl md:text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors duration-300 tracking-wide">
                        KnightCram
                    </span>
                </a>
            </div>

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
                    onClick={openCreate}
                    className="hidden md:flex items-center gap-2 hover:bg-primary/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background px-3"
                    aria-label="Create new post"
                >
                    <PlusSquare className="w-6 h-6 text-foreground stroke-[2.5px]" />
                    <span className="font-bold text-lg text-foreground">Create</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/forum")}
                    className="hover:bg-primary/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Forum"
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
                    onClick={() => navigate("/spotlight")}
                    className="hidden md:flex hover:bg-primary/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Spotlight"
                >
                    <Zap className="w-8 h-8 text-foreground" strokeWidth={2.5} />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Notifications"
                >
                    <Bell className="w-8 h-8 text-foreground" strokeWidth={2.5} />
                </Button>

                <AlertDialog>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-red-500/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-background group"
                                    aria-label="Log Out"
                                >
                                    <LogOut className="w-[30px] h-[30px] text-foreground group-hover:text-red-500 transition-colors" strokeWidth={2.5} />
                                </Button>
                            </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="hidden md:block">
                            <p>Log Out</p>
                        </TooltipContent>
                    </Tooltip>
                    <AlertDialogContent className="bg-background border border-white/10 sm:max-w-[425px]">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will end your current session and require you to sign in again.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-white/5 hover:bg-white/10 border-white/10 font-medium">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    localStorage.clear();
                                    sessionStorage.clear();
                                    navigate("/login");
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white font-medium"
                            >
                                Log Out
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </nav>
    );
};

export default TopNav;
