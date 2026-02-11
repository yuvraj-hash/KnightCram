import React, { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut, Save, Loader2, RotateCcw, Grid3x3, ImageIcon, Camera, Trash2, Upload } from "lucide-react";

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (result: string) => void;
    type: "profile" | "cover";
    currentImage?: string;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
    isOpen,
    onClose,
    onSave,
    type,
    currentImage,
}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [minZoom, setMinZoom] = useState(1);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [imageDims, setImageDims] = useState({ width: 0, height: 0 });

    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [processing, setProcessing] = useState(false);
    const [showGrid, setShowGrid] = useState(true);

    // Constants
    const PROFILE_SIZE = 240; // Reduced size as requested
    const BANNER_ASPECT = 4 / 1; // LinkedIn standard

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setSelectedImage(null);
            setPosition({ x: 0, y: 0 });
            setZoom(1);
            setShowGrid(true);
        }
    }, [isOpen]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

            if (!validTypes.includes(file.type)) {
                alert("Please upload a JPG, PNG, or WEBP image.");
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                alert("File size must be less than 10MB.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setSelectedImage(ev.target.result as string);
                    // Initial states will be set by onLoad
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        setImageDims({ width: naturalWidth, height: naturalHeight });

        // Calculate minimum zoom to cover the mask
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            // Profile mask dimension or Banner dimension
            const maskW = type === 'profile' ? PROFILE_SIZE : containerWidth;
            const maskH = type === 'profile' ? PROFILE_SIZE : containerWidth / BANNER_ASPECT;

            const scaleW = maskW / naturalWidth;
            const scaleH = maskH / naturalHeight;

            // We need to cover the area, so take the larger scale
            const calculatedMinZoom = Math.max(scaleW, scaleH);

            // If type is cover, and we want to lock horizontal, we might force width fit
            // But if image is too tall, we allow vertical drag.
            // If image is too narrow, we must scale up to width.
            const coverMinZoom = type === 'cover' ? scaleW : Math.max(scaleW, scaleH);

            const startingZoom = calculatedMinZoom;

            setMinZoom(startingZoom);
            setZoom(startingZoom);
            setPosition({ x: 0, y: 0 });
        }
    };

    const getConstraints = () => {
        if (!containerRef.current || imageDims.width === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

        const containerWidth = containerRef.current.clientWidth;
        const maskW = type === 'profile' ? PROFILE_SIZE : containerWidth;
        const maskH = type === 'profile' ? PROFILE_SIZE : containerWidth / BANNER_ASPECT;

        const renderedW = imageDims.width * zoom;
        const renderedH = imageDims.height * zoom;

        // Bounds:
        // The image center is at (0,0) + position relative to mask center
        // Max positive shift (right/down) = (Rendered - Mask) / 2
        const xLim = (renderedW - maskW) / 2;
        const yLim = (renderedH - maskH) / 2;

        return {
            minX: -xLim, maxX: xLim,
            minY: -yLim, maxY: yLim
        };
    };

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        setDragStart({ x: clientX - position.x, y: clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

        const rawX = clientX - dragStart.x;
        const rawY = clientY - dragStart.y;

        const { minX, maxX, minY, maxY } = getConstraints();

        // Lock horizontal for cover if requested, or tightly constrained by bounds
        const isHorizontalLocked = type === 'cover';

        setPosition({
            x: isHorizontalLocked ? 0 : Math.max(minX, Math.min(rawX, maxX)),
            y: Math.max(minY, Math.min(rawY, maxY))
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Re-clamp on zoom change
    useEffect(() => {
        const { minX, maxX, minY, maxY } = getConstraints();
        setPosition(p => ({
            x: Math.max(minX, Math.min(p.x, maxX)),
            y: Math.max(minY, Math.min(p.y, maxY))
        }));
    }, [zoom]);

    const generateCroppedImage = async () => {
        setProcessing(true);
        if (!imageRef.current) return;

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const outputW = type === 'profile' ? 400 : 1584;
            const outputH = type === 'profile' ? 400 : 396; // 4:1

            canvas.width = outputW;
            canvas.height = outputH;

            const containerWidth = containerRef.current?.clientWidth || 600;
            const maskW = type === 'profile' ? PROFILE_SIZE : containerWidth;
            const maskH = type === 'profile' ? PROFILE_SIZE : containerWidth / BANNER_ASPECT;

            const renderedW = imageDims.width * zoom;
            const renderedH = imageDims.height * zoom;

            // Calculate source crop
            // Center align logic
            // Offset from Center of Image to Center of Crop Area
            // Delta = position

            // TopLeft of Crop in Rendered Image Coords (0,0 is top left of image)
            // Center of Image is (RenderedW/2, RenderedH/2)
            // Center of Crop is Center of Image - position
            // TopLeft Crop = Center Crop - (MaskW/2, MaskH/2)
            // = (RenderedW/2 - position.x) - MaskW/2

            const cropX = (renderedW - maskW) / 2 - position.x;
            const cropY = (renderedH - maskH) / 2 - position.y;

            // Map to natural scale
            const scale = imageDims.width / renderedW; // 1/zoom effectively

            ctx.drawImage(
                imageRef.current,
                cropX * scale, cropY * scale, maskW * scale, maskH * scale,
                0, 0, outputW, outputH
            );

            onSave(canvas.toDataURL('image/jpeg', 0.9));
        } catch (err) {
            console.error(err);
        }
        setProcessing(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1b1f23] border-none md:border md:border-white/10 rounded-none md:rounded-xl shadow-2xl w-full max-w-2xl flex flex-col h-full md:h-auto md:max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1b1f23] z-10">
                    <h2 className="text-xl font-semibold text-white">
                        {selectedImage ? "Edit Photo" : (type === "profile" ? "Add Profile Photo" : "Add Cover Photo")}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition text-white/70 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-0 bg-black/40 relative flex flex-col">
                    {!selectedImage ? (
                        <div className="flex-1 p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/30">
                                {type === 'profile' ? <Camera size={40} /> : <ImageIcon size={40} />}
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">
                                {type === 'profile' ? "Upload a photo that helps people identify you" : "Showcase your personality or work"}
                            </h3>
                            <p className="text-white/50 text-sm max-w-sm mb-8">
                                {type === 'profile' ? "A clear photo of your face is recommended." : "High quality landscape images work best (rectangles)."}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                                >
                                    <Upload size={18} /> Upload Photo
                                </button>
                                {currentImage && (
                                    <button
                                        onClick={() => onSave("")}
                                        className="bg-white/5 hover:bg-red-900/30 text-white/70 hover:text-red-400 px-6 py-3 rounded-full font-medium transition border border-white/10 flex items-center justify-center gap-2 w-full sm:w-auto"
                                    >
                                        <Trash2 size={18} /> Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col flex-1 h-full">
                            {/* Workspace */}
                            <div
                                className="relative w-full flex-1 bg-black overflow-hidden select-none cursor-move flex items-center justify-center touch-none"
                                ref={containerRef}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onTouchStart={handleMouseDown}
                                onTouchMove={handleMouseMove}
                                onTouchEnd={handleMouseUp}
                                style={{ touchAction: 'none' }}
                            >
                                {/* Image Layer */}
                                <img
                                    ref={imageRef}
                                    src={selectedImage}
                                    onLoad={onImageLoad}
                                    draggable={false}
                                    className="max-w-none origin-center pointer-events-none"
                                    style={{
                                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                        transition: isDragging ? 'none' : 'transform 0.1s cubic-bezier(0.2, 0, 0.2, 1)',
                                    }}
                                    alt="Edit"
                                />

                                {/* Dark Overlay Layer with 'Cutout' */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* We compose the overlay using borders on a centered div */}
                                    {type === 'profile' ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                className="rounded-full shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] ring-1 ring-white/30 z-10 box-content transition-all duration-200"
                                                style={{ width: PROFILE_SIZE, height: PROFILE_SIZE }}
                                            >
                                                {/* Grid */}
                                                {showGrid && (
                                                    <div className="w-full h-full opacity-30">
                                                        <div className="absolute top-1/3 left-0 right-0 h-px bg-white"></div>
                                                        <div className="absolute top-2/3 left-0 right-0 h-px bg-white"></div>
                                                        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white"></div>
                                                        <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                className="w-full shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] ring-1 ring-white/30 z-10 relative transition-all duration-200"
                                                style={{ aspectRatio: `${BANNER_ASPECT}/1` }}
                                            >
                                                {/* Safe Zone Indicator for Profile Photo Overlap */}
                                                <div className="absolute -bottom-10 left-8 w-24 h-24 rounded-full border border-white/20 bg-black/40 flex items-center justify-center hidden md:flex">
                                                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Safe Zone</span>
                                                </div>

                                                {/* Grid */}
                                                {showGrid && (
                                                    <div className="w-full h-full opacity-30">
                                                        <div className="absolute top-1/3 left-0 right-0 h-px bg-white"></div>
                                                        <div className="absolute top-2/3 left-0 right-0 h-px bg-white"></div>
                                                        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white"></div>
                                                        <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Instructions Pill */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-xs font-medium text-white/80 z-20 pointer-events-none shadow-lg border border-white/5 whitespace-nowrap">
                                        Drag to Reposition
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="p-4 md:p-6 bg-[#1b1f23] border-t border-white/10 space-y-4 md:space-y-6 z-10 pb-8 md:pb-6">
                                <div className="flex items-center gap-4 max-w-md mx-auto w-full">
                                    <ZoomOut size={20} className="text-white/50" />
                                    <input
                                        type="range"
                                        min={minZoom}
                                        max={minZoom * 3}
                                        step={0.01}
                                        value={zoom}
                                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                                        className="flex-1 h-4 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 touch-none"
                                    />
                                    <ZoomIn size={20} className="text-white/50" />
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-3 w-full">
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition text-base md:text-sm order-2 sm:order-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={generateCroppedImage}
                                        disabled={processing}
                                        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition flex items-center justify-center gap-2 text-base md:text-sm shadow-lg shadow-blue-900/20 order-1 sm:order-2"
                                    >
                                        {processing ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                        Save Photo
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default ImageUploadModal;
