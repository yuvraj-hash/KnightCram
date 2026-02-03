import { Home, User, BookOpen, MessageSquare, Zap, Settings, Users, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
    const location = useLocation();

    const menuItems = [
        { icon: User, label: "Profile", path: "/profile" },
        { icon: Home, label: "Home", path: "/home" },
        { icon: BookOpen, label: "Resources", path: "/resources" },
        { icon: MessageSquare, label: "Forum", path: "/forum" },
        { icon: Zap, label: "Spotlight", path: "/main" },
        { icon: Users, label: "Start a community", path: "/community/create" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    return (
        <aside
            className={cn(
                "fixed left-0 top-14 md:top-16 bottom-0 z-40 hidden md:block bg-background border-r border-border transition-all duration-300 ease-in-out scrollbar-none overflow-y-auto",
                isOpen ? "w-[240px]" : "w-[72px]"
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
                            className={cn(
                                "flex items-center gap-4 px-3 py-3 mx-2 rounded-lg transition-colors duration-200 group hover:bg-secondary/50",
                                isOpen ? "flex-row justify-start" : "flex-col justify-center gap-1 px-0 mx-1",
                                isActive && "bg-secondary"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "shrink-0 transition-colors",
                                    isOpen ? "w-5 h-5" : "w-6 h-6",
                                    isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                                )}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span
                                className={cn(
                                    "text-foreground",
                                    isOpen
                                        ? "text-sm font-medium"
                                        : "text-[10px] font-normal text-center w-full truncate px-1"
                                )}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
};

export default Sidebar;
