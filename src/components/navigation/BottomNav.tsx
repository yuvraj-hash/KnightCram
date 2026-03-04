import { Home, Layers, MessageSquareText, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreate } from "@/context/CreateContext";

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { openCreate } = useCreate();

    const navItems = [
        { icon: Home, label: "Home", path: "/main", active: location.pathname === "/main" || location.pathname === "/home", ariaLabel: "Home page" },
        { icon: Layers, label: "Resources", path: "/resources", active: location.pathname === "/resources", ariaLabel: "Study materials" },
        {
            isCreate: true,
            icon: Plus,
            label: "Create",
            path: null,
            active: false,
            ariaLabel: "Create new post",
            onClick: openCreate
        },
        { icon: MessageSquareText, label: "Forum", path: "/forum", active: location.pathname === "/forum", ariaLabel: "Discussion forum" },
        { icon: User, label: "Profile", path: "/profile/view", active: location.pathname.startsWith("/profile/view"), ariaLabel: "User profile" },
    ];

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border h-16 flex md:hidden items-center justify-around px-2 pb-safe shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.1)] transition-all duration-300"
            role="navigation"
            aria-label="Bottom navigation"
        >
            {navItems.map((item, i) => (
                <div key={item.label || i} className="flex-1 flex justify-center">
                    {'isCreate' in item && item.isCreate ? (
                        <button
                            onClick={item.onClick}
                            className="group relative -top-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-primary/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                            aria-label={item.ariaLabel}
                        >
                            <item.icon className="h-6 w-6 stroke-[3px]" />
                        </button>
                    ) : (
                        <Button
                            variant="ghost"
                            onClick={() => item.path && navigate(item.path)}
                            className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-none hover:bg-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background text-muted-foreground hover:text-foreground"
                            aria-label={item.ariaLabel}
                        >
                            <item.icon
                                className={`h-6 w-6 ${item.active ? "stroke-[2.5px] text-primary" : "stroke-[2px]"
                                    } transition-all duration-200`}
                            />
                            <span
                                className={`text-[10px] font-medium transition-colors duration-200 ${item.active ? "text-primary" : "text-muted-foreground"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </Button>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default BottomNav;
