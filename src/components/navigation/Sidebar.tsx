import { Home, User, BookOpen, MessageSquare, Zap, Settings, Users, PlusCircle, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();

    const menuItems = [
        { icon: User, label: "Profile", path: "/profile" },
        { icon: Home, label: "Home", path: "/home" },
        { icon: Briefcase, label: "Opportunities", path: "/opportunities" },
        { icon: BookOpen, label: "Resources", path: "/resources" },
        { icon: MessageSquare, label: "Forum", path: "/forum" },
        { icon: Zap, label: "Spotlight", path: "/main" },
        { icon: Users, label: "Start a community", path: "/community/create" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
            <aside
                className={cn(
                    "fixed left-0 top-14 md:top-16 bottom-0 z-40 bg-background border-r border-border transition-all duration-300 ease-in-out scrollbar-none overflow-y-auto",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                    isOpen ? "md:w-[240px]" : "md:w-[72px]",
                    "w-[240px]"
                )}
            >
                <div className="flex flex-col py-2">
                    {menuItems.map((item) => {
                        // Logic to handle multiple paths pointing to the same place if necessary,
                        // but here we just rely on direct mapping.
                        // If we are on /main, it matches Spotlight's new path.
                        // If we are on /spotlight, we might want to also highlight Spotlight.
                        const isActive = location.pathname === item.path || (item.label === "Spotlight" && location.pathname === "/spotlight");
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => {
                                    // Close sidebar on mobile when an item is clicked
                                    if (window.innerWidth < 768 && onClose) {
                                        onClose();
                                    }
                                }}
                                className={cn(
                                    "flex items-center gap-4 px-3 py-3 mx-2 rounded-lg transition-colors duration-200 group hover:bg-secondary/50",
                                    isOpen ? "flex-row justify-start" : "md:flex-col md:justify-center md:gap-1 md:px-0 md:mx-1 flex-row justify-start gap-4 px-3 mx-2", // Handle mobile (always expanded view) vs desktop (toggled)
                                    isActive && "bg-secondary"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "shrink-0 transition-colors",
                                        isOpen ? "w-5 h-5" : "md:w-6 md:h-6 w-5 h-5",
                                        isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                                    )}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                <span
                                    className={cn(
                                        "text-foreground",
                                        isOpen
                                            ? "text-sm font-medium"
                                            : "md:text-[10px] md:font-normal md:text-center md:w-full md:truncate md:px-1 text-sm font-medium" // Mobile behaves like open
                                    )}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </aside>
        </>
    );
};


export default Sidebar;
