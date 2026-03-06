import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PenLine, BookOpen } from "lucide-react";
import { useCreate } from "@/context/CreateContext";
import PostComposer from "./PostComposer";
import ResourceUploader from "./ResourceUploader";

const CreateModal = () => {
    const { view, openPost, openResource, close } = useCreate();
    const sheetRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        if (view !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [view]);

    return (
        <AnimatePresence>
            {view !== null && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={close}
                        className="fixed inset-0 z-[90] bg-black/50"
                    />

                    {/* Wrapper for positioning */}
                    <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-center p-0 sm:p-4 pointer-events-none">
                        {/* Modal / Bottom Sheet */}
                        <motion.div
                            key="sheet"
                            ref={sheetRef}
                            initial={isDesktop ? { opacity: 0, scale: 0.9 } : { y: "100%" }}
                            animate={isDesktop ? { opacity: 1, scale: 1 } : { y: 0 }}
                            exit={isDesktop ? { opacity: 0, scale: 0.9 } : { y: "100%" }}
                            transition={{ type: "spring", stiffness: 400, damping: 33 }}
                            className="relative bg-background border-t sm:border border-border rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full sm:max-w-[600px] sm:mx-auto pointer-events-auto"
                            style={{ maxHeight: "92dvh", height: isDesktop ? "auto" : undefined }}
                        >
                            {/* Drag handle (mobile only) */}
                            <div className="flex sm:hidden justify-center pt-3 pb-2 shrink-0">
                                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
                            </div>

                            {/* Close button handled inside specific views */}

                            <AnimatePresence mode="wait">
                                {view === "menu" && (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.18 }}
                                        className="px-5 pb-8 pt-3"
                                    >
                                        <div className="mb-5 flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-foreground">Create</h2>
                                                <p className="text-sm text-muted-foreground mt-0.5">What would you like to share?</p>
                                            </div>
                                            <button
                                                onClick={close}
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                                                aria-label="Close"
                                            >
                                                <X className="w-5 h-5 text-muted-foreground" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Post Card */}
                                            <motion.button
                                                whileTap={{ scale: 0.97 }}
                                                onClick={openPost}
                                                id="create-post-btn"
                                                className="group flex flex-col items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.25)] transition-all duration-200 text-left w-full"
                                            >
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                                                    <PenLine className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground text-base leading-tight">Create Post</p>
                                                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                                        Share thoughts, questions, or campus experiences.
                                                    </p>
                                                </div>
                                            </motion.button>

                                            {/* Resource Card */}
                                            <motion.button
                                                whileTap={{ scale: 0.97 }}
                                                onClick={openResource}
                                                id="create-resource-btn"
                                                className="group flex flex-col items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-blue-400/50 hover:shadow-[0_4px_20px_-4px_rgba(96,165,250,0.2)] transition-all duration-200 text-left w-full"
                                            >
                                                <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-400/20 transition-colors duration-200">
                                                    <BookOpen className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground text-base leading-tight">Upload Resource</p>
                                                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                                        Share notes, PDFs, or study materials.
                                                    </p>
                                                </div>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {view === "post" && (
                                    <motion.div
                                        key="post"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.18 }}
                                        className="overflow-y-auto"
                                    >
                                        <PostComposer />
                                    </motion.div>
                                )}

                                {view === "resource" && (
                                    <motion.div
                                        key="resource"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.18 }}
                                        className="overflow-y-auto"
                                    >
                                        <ResourceUploader />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CreateModal;
