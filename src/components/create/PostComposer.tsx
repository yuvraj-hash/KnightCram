import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image, Shield, ChevronLeft, Send } from "lucide-react";
import { useCreate } from "@/context/CreateContext";

const CATEGORIES = [
    "Campus Life",
    "Academics",
    "Placements",
    "Question",
    "Advice",
    "Rant",
    "Experience",
    "Others"
];

const PostComposer = () => {
    const { close, openCreate } = useCreate();
    const [text, setText] = useState("");
    const [category, setCategory] = useState<string | null>(null);
    const [anonymous, setAnonymous] = useState(false);
    const [hashtag, setHashtag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [posting, setPosting] = useState(false);
    const [posted, setPosted] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === "Enter" || e.key === ",") && hashtag.trim()) {
            e.preventDefault();
            const clean = hashtag.trim().replace(/^#/, "");
            if (clean && !tags.includes(clean)) setTags((t) => [...t, clean]);
            setHashtag("");
        }
    };

    const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

    const handleMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setMediaFiles((f) => [...f, ...Array.from(e.target.files!)]);
    };

    const removeMedia = (idx: number) => setMediaFiles((f) => f.filter((_, i) => i !== idx));

    const handlePost = async () => {
        if (!text.trim() || !category) return;
        setPosting(true);
        await new Promise((r) => setTimeout(r, 1200));
        setPosting(false);
        setPosted(true);
        await new Promise((r) => setTimeout(r, 900));
        close();
    };

    return (
        <div className="flex flex-col bg-background">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border shrink-0">
                <button
                    onClick={openCreate}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground"
                    aria-label="Back"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h2 className="font-bold text-foreground text-lg leading-tight">Create Post</h2>
                    <p className="text-xs text-muted-foreground hidden sm:block">Share thoughts, questions, or experiences</p>
                </div>
                <button
                    onClick={close}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                {/* Avatar + text area */}
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary font-bold text-sm">Y</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">
                            {anonymous
                                ? <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary" /> Anonymous</span>
                                : "Your Name"
                            }
                        </p>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What's happening on campus? Share a thought, question, or experience..."
                            rows={5}
                            className="w-full bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground/50 text-base leading-relaxed"
                            autoFocus
                        />
                    </div>
                </div>

                {/* Media previews */}
                <AnimatePresence>
                    {mediaFiles.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex gap-2 flex-wrap pl-13"
                        >
                            {mediaFiles.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0.85, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.85, opacity: 0 }}
                                    className="relative group w-20 h-20 rounded-xl overflow-hidden border border-border bg-muted shrink-0"
                                >
                                    {f.type.startsWith("image/") ? (
                                        <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt={f.name} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-2xl">🎬</div>
                                    )}
                                    <button
                                        onClick={() => removeMedia(i)}
                                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3 text-white" />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Category */}
                <div>
                    <div className="flex items-center justify-between mb-2.5">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Category <span className="text-red-400">*</span>
                        </p>
                        {!category && text.trim() && (
                            <span className="text-[10px] text-muted-foreground italic bg-muted/50 px-2 py-0.5 rounded-md">
                                Please select a category
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((c) => (
                            <button
                                key={c}
                                data-active={category === c}
                                onClick={() => setCategory(category === c ? null : c)}
                                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${category === c
                                    ? "bg-primary/10 border-primary text-foreground shadow-[0_0_10px_-2px_hsl(var(--primary)/0.2)]"
                                    : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">Hashtags</p>
                    <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-muted/50 border border-border min-h-[44px] items-center">
                        {tags.map((t) => (
                            <motion.span
                                key={t}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold"
                            >
                                #{t}
                                <button onClick={() => removeTag(t)} className="hover:text-red-400 transition-colors ml-0.5">
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.span>
                        ))}
                        <input
                            value={hashtag}
                            onChange={(e) => setHashtag(e.target.value)}
                            onKeyDown={addTag}
                            placeholder={tags.length === 0 ? "course, department, year... (press Enter)" : ""}
                            className="bg-transparent outline-none text-xs text-foreground placeholder:text-muted-foreground/50 flex-1 min-w-[100px]"
                        />
                    </div>
                </div>
            </div>

            {/* Footer toolbar */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-background shrink-0">
                <div className="flex items-center gap-0.5">
                    <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleMedia} />

                    <button
                        onClick={() => fileRef.current?.click()}
                        className="p-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Attach image or video"
                    >
                        <Image className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => setAnonymous((a) => !a)}
                        className={`flex items-center gap-1.5 ml-1 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${anonymous
                            ? "bg-primary/10 border-primary/40 text-primary"
                            : "bg-transparent border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                    >
                        <Shield className="w-3.5 h-3.5" />
                        Anonymous
                    </button>
                </div>

                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handlePost}
                    disabled={!text.trim() || !category || posting}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${text.trim() && category && !posting
                        ? "bg-primary text-primary-foreground hover:brightness-110 shadow-[0_4px_14px_-4px_hsl(var(--primary)/0.5)]"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {posted ? (
                            <motion.span key="done" initial={{ scale: 0 }} animate={{ scale: 1 }}>✓ Posted!</motion.span>
                        ) : posting ? (
                            <motion.span key="ing" className="flex items-center gap-2">
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full block"
                                />
                                Posting...
                            </motion.span>
                        ) : (
                            <motion.span key="idle" className="flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                Post
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
};

export default PostComposer;
