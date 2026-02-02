import { Home, Layers, MessageSquareText, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNav = () => {
    const navItems = [
        { icon: Home, label: "Home", active: false, ariaLabel: "Home page" },
        { icon: Layers, label: "Materials", active: false, ariaLabel: "Study materials" },

        { icon: MessageSquareText, label: "Forum", active: false, ariaLabel: "Discussion forum" },
        { icon: User, label: "Profile", active: false, ariaLabel: "User profile" },
    ];

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50 h-14 md:h-16 flex items-center justify-around px-2 pb-1 transition-all duration-300"
            role="navigation"
            aria-label="Bottom navigation"
        >
            {navItems.map((item) => (
                <Button
                    key={item.label}
                    variant="ghost"
                    className={`flex flex-col items-center justify-center gap-1 h-full w-full rounded-none hover:bg-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background text-muted-foreground hover:text-foreground`
                    }
                    aria-label={item.ariaLabel}
                >
                    <item.icon
                        className={`w-6 h-6 md:w-7 md:h-7 ${item.active ? "stroke-[3px] text-foreground" : "stroke-[2.5px]"
                            } transition-all duration-200`}
                    />
                    <span className={`text-[10px] md:text-xs font-medium transition-colors duration-200 ${item.active ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.label}
                    </span>
                </Button>
            ))}
        </nav>
    );
};

export default BottomNav;
