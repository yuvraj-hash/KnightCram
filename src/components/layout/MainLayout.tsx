import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import Sidebar from "@/components/navigation/Sidebar";
import CreateModal from "@/components/create/CreateModal";
import { useCreate } from "@/context/CreateContext";

const MainLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { openCreate } = useCreate();

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
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <BottomNav />

            {/* Mobile Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={openCreate}
                className="md:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Create Post or Resource"
            >
                <Plus className="w-6 h-6 stroke-[3px]" />
            </motion.button>

            {/* Create Modal — globally available across all routes */}
            <CreateModal />
        </div>
    );
};

export default MainLayout;
