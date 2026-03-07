import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
    Heart, MessageCircle, Share2, Bookmark, Image as ImageIcon,
    Video, FileText, Send, MoreVertical, Plus, Loader2
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreate } from "@/context/CreateContext";

// --- Types ---
type MediaType = "image" | "video" | "resource";

interface Comment {
    id: string;
    authorName: string;
    text: string;
}

interface Post {
    id: string;
    authorName: string;
    authorAvatar?: string;
    university: string;
    category: string;
    content: string;
    createdAt: string;
    likes: number;
    commentsCount: number;
    topComment?: Comment;
    media?: {
        type: MediaType;
        url?: string;
        title?: string;
    };
    hasLiked?: boolean;
    hasSaved?: boolean;
}

// --- Mock Data ---
const MOCK_CATEGORIES = ["Academics", "Campus Life", "Placements", "Advice", "Rant", "Experience"];

const INITIAL_MOCK_POSTS: Post[] = [
    {
        id: "p1",
        authorName: "Riya Sharma",
        authorAvatar: "https://i.pravatar.cc/150?u=riya",
        university: "VIT Vellore • 3rd Year CSE",
        category: "Placements",
        content: "Just cleared my first technical round at Microsoft! Here are some of the DSA questions they focused on. Number one tip: always explain your thought process out loud before coding.",
        createdAt: "2 hours ago",
        likes: 124,
        commentsCount: 18,
        topComment: {
            id: "c1",
            authorName: "Amit Kumar",
            text: "Congrats! What topics should I focus on for the resume shortlisting?"
        }
    },
    {
        id: "p2",
        authorName: "Aditya Verma",
        authorAvatar: "https://i.pravatar.cc/150?u=aditya",
        university: "BITS Pilani • ECE",
        category: "Campus Life",
        content: "The sunset from the library building today was absolutely unreal.",
        createdAt: "5 hours ago",
        likes: 342,
        commentsCount: 5,
        media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800&h=400"
        }
    },
    {
        id: "p3",
        authorName: "Sneha Reddy",
        authorAvatar: "https://i.pravatar.cc/150?u=sneha",
        university: "NIT Trichy • Alumni",
        category: "Advice",
        content: "Don't ignore core subjects like OS and DBMS while grinding LeetCode. A lot of good product companies will drill down into your fundamental understanding of systems.",
        createdAt: "8 hours ago",
        likes: 512,
        commentsCount: 42,
        topComment: {
            id: "c2",
            authorName: "Priya D",
            text: "So true! Was just rejected because my OS concepts were rusty."
        }
    },
    {
        id: "p4",
        authorName: "Rahul Singh",
        authorAvatar: "https://i.pravatar.cc/150?u=rahul",
        university: "IIT Bombay • 1st Year",
        category: "Academics",
        content: "Created a comprehensive cheat sheet for linear algebra based on Professor Strang's lectures. Hope this helps anyone preparing for mid-sems!",
        createdAt: "12 hours ago",
        likes: 89,
        commentsCount: 7,
        media: {
            type: "resource",
            title: "Linear_Algebra_Notes.pdf"
        }
    }
];

const generateMorePosts = (startIndex: number): Post[] => {
    return Array.from({ length: 3 }).map((_, i) => ({
        id: `p${startIndex + i}`,
        authorName: `Student ${startIndex + i}`,
        authorAvatar: `https://i.pravatar.cc/150?u=user${startIndex + i}`,
        university: "Engineering College • 2nd Year",
        category: MOCK_CATEGORIES[(startIndex + i) % MOCK_CATEGORIES.length],
        content: "This is a dynamically loaded post to simulate infinite scrolling. Continuing to build and share experiences with the community!",
        createdAt: "1 day ago",
        likes: Math.floor(Math.random() * 100),
        commentsCount: Math.floor(Math.random() * 20)
    }));
};

// --- Components ---

const FeedPostCard = ({ post }: { post: Post }) => {
    const [isLiked, setIsLiked] = useState(post.hasLiked || false);
    const [isSaved, setIsSaved] = useState(post.hasSaved || false);
    const [likesCount, setLikesCount] = useState(post.likes);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <article className="bg-[#1c1e26] border border-white/5 rounded-2xl p-4 md:p-5 mb-4 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3 items-center">
                    <Avatar className="w-10 h-10 border border-white/10">
                        <AvatarImage src={post.authorAvatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                            {post.authorName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white/90 text-sm md:text-base leading-none hover:underline cursor-pointer">
                                {post.authorName}
                            </h3>
                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                            <span className="text-xs text-white/40">{post.createdAt}</span>
                        </div>
                        <p className="text-xs text-white/50 mt-1 truncate max-w-[200px] md:max-w-none">
                            {post.university}
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white -mr-2">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </div>

            {/* Category Tag */}
            <div className="mb-3">
                <span className="bg-white/5 border border-white/10 text-white/70 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {post.category}
                </span>
            </div>

            {/* Content */}
            <div className="text-sm md:text-base text-white/80 leading-relaxed whitespace-pre-wrap mb-4">
                {post.content}
            </div>

            {/* Media Rendering */}
            {post.media && (
                <div className="mb-4 rounded-xl overflow-hidden border border-white/5 bg-black/20">
                    {post.media.type === "image" && post.media.url && (
                        <img src={post.media.url} alt="Post media" className="w-full max-h-[400px] object-cover" />
                    )}
                    {post.media.type === "resource" && (
                        <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-white/5 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/20 text-blue-400">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm text-blue-400">{post.media.title}</h4>
                                <p className="text-xs text-white/40 mt-0.5">PDF Document • 2.4 MB</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Engagement Stats Details */}
            <div className="flex items-center justify-between text-xs text-white/40 mb-3 px-1">
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center p-0.5">
                        <Heart className="w-full h-full text-white fill-white" />
                    </div>
                    {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                </div>
                <div>
                    {post.commentsCount} comments
                </div>
            </div>

            {/* Interaction Buttons */}
            <div className="flex items-center justify-between border-t border-b border-white/5 py-1 mb-3">
                <Button variant="ghost" className={`flex-1 flex gap-2 rounded-lg text-xs md:text-sm font-medium ${isLiked ? 'text-blue-500' : 'text-white/60 hover:text-white hover:bg-white/5'}`} onClick={handleLike}>
                    <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'fill-blue-500' : ''}`} />
                    Like
                </Button>
                <Button variant="ghost" className="flex-1 flex gap-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-xs md:text-sm font-medium">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    Comment
                </Button>
                <Button variant="ghost" className="flex-1 flex gap-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-xs md:text-sm font-medium">
                    <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                    Share
                </Button>
                <Button variant="ghost" className={`flex gap-2 rounded-lg text-xs md:text-sm font-medium px-3 sm:px-4 shrink-0 ${isSaved ? 'text-yellow-500' : 'text-white/60 hover:text-white hover:bg-white/5'}`} onClick={() => setIsSaved(!isSaved)}>
                    <Bookmark className={`w-4 h-4 md:w-5 md:h-5 ${isSaved ? 'fill-yellow-500' : ''}`} />
                </Button>
            </div>

            {/* Comment Preview */}
            {post.topComment && (
                <div className="bg-black/20 rounded-lg p-3 text-sm flex gap-2 border border-white/5">
                    <span className="font-semibold text-white/80 shrink-0">{post.topComment.authorName}:</span>
                    <span className="text-white/60 line-clamp-2">{post.topComment.text}</span>
                </div>
            )}
        </article>
    );
};


export default function HomeFeed() {
    const { openCreate } = useCreate();
    const [posts, setPosts] = useState<Post[]>(() =>
        [...INITIAL_MOCK_POSTS].sort((a, b) => (b.likes + b.commentsCount) - (a.likes + a.commentsCount))
    );
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostElementRef = useCallback((node: HTMLDivElement) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMorePosts();
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    const loadMorePosts = () => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            // Note: In real app, this would be: `await fetchHomeFeed(page)`
            const newPosts = generateMorePosts(posts.length + 1);
            setPosts(prev => {
                const combined = [...prev, ...newPosts];
                // Sort by engagement (likes + comments) and newest (mocked by placing new items logically)
                return combined.sort((a, b) => {
                    const engA = a.likes + a.commentsCount;
                    const engB = b.likes + b.commentsCount;
                    return engB - engA; // Sort highest engagement first
                });
            });
            setIsLoading(false);
            if (posts.length > 20) setHasMore(false); // mock stop condition
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-background relative selection:bg-primary/30">
            <div className="max-w-2xl mx-auto px-0 sm:px-4 py-4 md:py-6 relative">

                {/* Create Post Entry - LinkedIn Style */}
                <div className="bg-[#1c1e26] sm:border border-white/5 sm:rounded-2xl p-4 mb-6 shadow-sm">
                    <div className="flex gap-3">
                        <Avatar className="w-12 h-12 border border-white/10 shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold">You</AvatarFallback>
                        </Avatar>
                        <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal text-white/50 bg-black/20 hover:bg-black/40 border-white/10 rounded-full h-12 px-5 text-sm"
                            onClick={openCreate}
                        >
                            Share something with the community...
                        </Button>
                    </div>
                    <div className="flex items-center justify-around mt-4 pt-3 border-t border-white/5">
                        <Button variant="ghost" className="flex-1 text-white/60 hover:text-white hover:bg-white/5 rounded-lg flex gap-2" onClick={openCreate}>
                            <ImageIcon className="w-5 h-5 text-green-400" /> Photo
                        </Button>
                        <Button variant="ghost" className="flex-1 text-white/60 hover:text-white hover:bg-white/5 rounded-lg flex gap-2" onClick={openCreate}>
                            <Video className="w-5 h-5 text-blue-400" /> Video
                        </Button>
                        <Button variant="ghost" className="flex-1 text-white/60 hover:text-white hover:bg-white/5 rounded-lg flex gap-2" onClick={openCreate}>
                            <FileText className="w-5 h-5 text-orange-400" /> Resource
                        </Button>
                    </div>
                </div>

                {/* Feed Divider for mobile */}
                <div className="h-2 bg-black/40 sm:hidden mb-4 border-y border-white/5 w-full"></div>

                {/* Feed Timeline */}
                <div className="space-y-2 sm:space-y-4 px-0 sm:px-0 pb-20">
                    {posts.map((post, index) => {
                        if (posts.length === index + 1) {
                            return <div ref={lastPostElementRef} key={post.id}><FeedPostCard post={post} /></div>;
                        } else {
                            return <FeedPostCard key={post.id} post={post} />;
                        }
                    })}

                    {/* Infinite Scroll Loader */}
                    {isLoading && (
                        <div className="flex flex-col justify-center items-center py-8">
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                            <span className="text-white/40 text-sm mt-3">Loading more posts...</span>
                        </div>
                    )}

                    {!hasMore && (
                        <div className="text-center py-8 text-white/40 text-sm">
                            You've caught up with everything for now!
                        </div>
                    )}
                </div>

            </div>

            {/* Floating Mobile Create Button */}
            <div className="md:hidden fixed bottom-20 right-4 z-40">
                <Button
                    className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                    size="icon"
                    onClick={openCreate}
                >
                    <Plus className="w-6 h-6" />
                </Button>
            </div>
        </div>
    );
}

// Future Backend Integration Reference:
// async function fetchHomeFeed(page: number, filters?: string[]) {
//    return await fetch(`/api/feed?page=${page}`).then(res => res.json());
// }
