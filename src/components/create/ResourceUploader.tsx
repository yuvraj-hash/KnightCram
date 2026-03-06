import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ChevronLeft, CheckCircle2 } from "lucide-react";
import { useCreate } from "@/context/CreateContext";

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Computer Science", "Economics", "History", "Biology", "Other"];
const TAG_OPTIONS = ["Exam", "PYQ", "Notes", "Assignment", "Cheat Sheet", "Lab Report", "Reference"];

const fileEmoji = (f: File) => {
    if (f.type === "application/pdf") return "📄";
    if (f.name.match(/\.pptx?$/i)) return "📊";
    if (f.name.match(/\.docx?$/i)) return "📝";
    if (f.type.startsWith("image/")) return "🖼️";
    return "📎";
};

const ResourceUploader = () => {
    const { close, openCreate } = useCreate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [tag, setTag] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const addFiles = (newFiles: File[]) => setFiles((f) => [...f, ...newFiles]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) addFiles(Array.from(e.target.files));
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        addFiles(Array.from(e.dataTransfer.files));
    }, []);

    const removeFile = (idx: number) => setFiles((f) => f.filter((_, i) => i !== idx));

    const handleUpload = async () => {
        if (!title.trim() || files.length === 0) return;
        setUploading(true);
        for (let i = 0; i <= 100; i += 10) {
            await new Promise((r) => setTimeout(r, 90));
            setProgress(i);
        }
        setUploading(false);
        setDone(true);
        await new Promise((r) => setTimeout(r, 900));
        close();
    };

    const canUpload = title.trim() && files.length > 0 && tag !== null && !uploading;

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
                    <h2 className="font-bold text-foreground text-lg leading-tight">Upload Resource</h2>
                    <p className="text-xs text-muted-foreground hidden sm:block">Share academic materials with your community</p>
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
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

                {/* Title */}
                <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Title <span className="text-red-400">*</span>
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. DSA Notes – Binary Trees"
                        className="mt-1.5 w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 outline-none text-foreground placeholder:text-muted-foreground/50 text-sm transition-all duration-150"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of what's inside..."
                        rows={2}
                        className="mt-1.5 w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 outline-none resize-none text-foreground placeholder:text-muted-foreground/50 text-sm transition-all duration-150"
                    />
                </div>

                {/* File drop zone */}
                <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Files <span className="text-red-400">*</span>
                    </label>
                    <div
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileRef.current?.click()}
                        className={`mt-1.5 flex flex-col items-center justify-center gap-2.5 p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 ${dragging
                            ? "border-blue-400 bg-blue-400/5"
                            : "border-border bg-muted/30 hover:border-blue-400/60 hover:bg-blue-400/5"
                            }`}
                    >
                        <input
                            ref={fileRef}
                            type="file"
                            multiple
                            accept=".pdf,.ppt,.pptx,.doc,.docx,image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${dragging ? "bg-blue-400/20" : "bg-muted"
                            }`}>
                            <Upload className={`w-5 h-5 transition-colors ${dragging ? "text-blue-400" : "text-muted-foreground"}`} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-foreground">
                                {dragging ? "Drop files here" : "Click or drag to upload"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">PDF, PPT, DOC, Images</p>
                        </div>
                    </div>

                    {/* File list */}
                    <AnimatePresence>
                        {files.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2.5 space-y-2"
                            >
                                {files.map((f, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted/50 border border-border group"
                                    >
                                        <span className="text-lg shrink-0">{fileEmoji(f)}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
                                            <p className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        <button
                                            onClick={() => removeFile(i)}
                                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Subject */}
                <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject / Course</label>
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1.5 w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 outline-none text-foreground text-sm appearance-none cursor-pointer transition-all duration-150"
                    >
                        <option value="">Select a subject...</option>
                        {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                {/* Tag selection details */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Resource Tag <span className="text-red-400">*</span>
                        </label>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {TAG_OPTIONS.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTag(t)}
                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${tag === t
                                    ? "bg-blue-400/15 border-blue-400 text-blue-500 shadow-[0_0_10px_-2px_rgba(96,165,250,0.3)]"
                                    : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer — upload button */}
            <div className="px-5 py-4 border-t border-border bg-background shrink-0 space-y-3">
                <AnimatePresence>
                    {uploading && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-1.5">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Uploading...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    style={{ width: `${progress}%` }}
                                    className="h-full bg-blue-400 rounded-full"
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileTap={{ scale: canUpload ? 0.97 : 1 }}
                    onClick={handleUpload}
                    disabled={!canUpload}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${canUpload
                        ? "bg-blue-500 text-white hover:bg-blue-400 shadow-[0_4px_14px_-4px_rgba(96,165,250,0.6)]"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {done ? (
                            <motion.span key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Uploaded!
                            </motion.span>
                        ) : uploading ? (
                            <motion.span key="ing" className="flex items-center gap-2">
                                <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full block" />
                                Uploading...
                            </motion.span>
                        ) : (
                            <motion.span key="idle" className="flex items-center gap-2">
                                <Upload className="w-4 h-4" /> Upload Resource
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
};

export default ResourceUploader;
