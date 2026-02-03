import { useState } from "react";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import Spotlight from "@/components/feed/Spotlight";
import Feed from "@/components/feed/Feed";

import Sidebar from "@/components/navigation/Sidebar";

const MainPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Top Navigation */}
            <TopNav isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} />

            {/* Sidebar Navigation */}
            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Main Content Area */}
            <main
                className={`flex-1 w-full pt-16 pb-20 md:pb-0 transition-all duration-300 ease-in-out ${isMenuOpen ? "md:pl-[240px]" : "md:pl-[72px]"
                    }`}
            >
                <Spotlight />
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
};

export default MainPage;
