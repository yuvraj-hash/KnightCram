import { useRef, useEffect } from "react";
import { Home, Layers, Zap, Settings, X, Plus, Gamepad2, PenTool, LayoutGrid, Menu, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

interface OffCanvasMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
}

const OffCanvasMenu = ({ isOpen, onClose, onToggle }: OffCanvasMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // ... useEffects ...

    // Prevent body scroll when menu is open (only on mobile)
    useEffect(() => {
        if (isOpen && window.innerWidth < 768) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const menuItems = [
        { icon: Home, label: "Home", href: "/home" },
        { icon: Layers, label: "Resources", href: "/resources" },
        { icon: MessageSquare, label: "Forum", href: "/forum" },
        { icon: Zap, label: "Spotlight", href: "/spotlight" },
        { icon: Settings, label: "Settings", href: "/settings" },
    ];

    const communityItems = [
        { icon: Plus, label: "Start a community", href: "/create-community" },
    ];

    const gameItems = [
        { icon: Gamepad2, label: "Stonefall", subLabel: "Build a tower", href: "/games/stonefall", isNew: true, highlight: true },
        { icon: PenTool, label: "Pixelary", href: "/games/pixelary" },
        { icon: LayoutGrid, label: "Blokkit", href: "/games/blokkit" },
    ];

    return (
        <>
            {/* Backdrop - Only visible when open on mobile */}
            <div
                className={cn(
                    "fixed inset-0 top-14 md:top-16 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
                aria-hidden="true"
            />
            {/* Desktop Backdrop Removed to keep main content visible and interactive */}

            {/* Sliding Container: Content + Rail */}
            <aside
                ref={menuRef}
                className={cn(
                    "fixed top-14 md:top-16 left-0 bottom-0 z-40 flex h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out will-change-transform",
                    isOpen ? "translate-x-0" : "-translate-x-[270px]"
                )}
                aria-label="Main Navigation"
            >
                {/* 1. Menu Content Panel (Width 270px) */}
                <div className="w-[270px] bg-background border-r border-white/10 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-x-[1px] [&::-webkit-scrollbar-thumb]:border-y-[4px] [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-content hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600 flex flex-col shrink-0">
                    <div className="flex flex-col py-2">
                        {/* Main Links */}
                        <div className="flex flex-col px-2 pb-2">
                            {menuItems.map((item) => {
                                const isActive = (location.pathname === "/main" || location.pathname === "/spotlight")
                                    ? item.label === "Spotlight"
                                    : location.pathname === item.href;

                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                                            isActive
                                                ? "bg-zinc-800 text-white font-medium"
                                                : "text-foreground/90 hover:bg-zinc-800/50"
                                        )}
                                    >
                                        <item.icon className={cn("w-5 h-5", isActive ? "opacity-100" : "opacity-90")} />
                                        <span className="font-medium text-sm">{item.label}</span>
                                    </a>
                                );
                            })}
                        </div>

                        <div className="h-px bg-white/10 mx-4 my-2" />

                        {/* Communities */}
                        <div className="flex flex-col px-2 py-2">
                            {communityItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground/90 hover:bg-zinc-800/50 transition-colors group"
                                >
                                    <item.icon className="w-5 h-5 opacity-90" />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </a>
                            ))}
                        </div>

                        <div className="h-px bg-white/10 mx-4 my-2" />

                        {/* Games/Extras Section */}
                        <div className="flex flex-col px-2 py-2">
                            <div className="px-3 pb-3 text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between cursor-pointer hover:bg-zinc-800/30 rounded-md py-1 mb-1">
                                Games on KnightCram
                                <span className="text-[10px] opacity-70">▼</span>
                            </div>

                            {gameItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors group relative overflow-hidden",
                                        item.highlight ? "bg-zinc-800/80 hover:bg-zinc-800" : "text-foreground/90 hover:bg-zinc-800/50"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/5",
                                        item.highlight ? "bg-transparent" : "bg-zinc-800/50"
                                    )}>
                                        <item.icon className="w-5 h-5" />
                                    </div>

                                    <div className="flex flex-col leading-tight justify-center h-8">
                                        <span className="font-medium text-sm">{item.label}</span>
                                    </div>
                                </a>
                            ))}
                        </div>


                    </div>
                </div>

                {/* 2. The Vertical Rail (Width 40px) - Moves with the container */}
                <div className="w-[40px] h-full border-r border-transparent md:border-white/5 flex flex-col items-center pt-4 relative shrink-0">
                    {/* The Vertical Rail Line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/30 -translate-x-1/2" />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative z-10 text-foreground bg-background hover:bg-zinc-800 rounded-full w-10 h-10 border border-white/30 shadow-sm"
                        onClick={onToggle}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>

            </aside>
        </>
    );
};

export default OffCanvasMenu;
