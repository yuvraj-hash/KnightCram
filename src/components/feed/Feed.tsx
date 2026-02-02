import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

const feedPosts = [
    {
        id: 1,
        user: {
            name: "Anonymous_22",
            avatar: "/placeholder.svg",
        },
        location: "IIT Bombay",
        image: "/chess.png", // Reusing asset
        caption: "The chess game of academic politics is real. Just realized how grading curves are actually decided.",
        likes: 423,
        comments: 12,
        time: "2h ago",
    },
    {
        id: 2,
        user: {
            name: "Campus_Insider",
            avatar: "/placeholder.svg",
        },
        location: "Delhi University",
        image: "/Night.png", // Reusing asset
        caption: "Midnight scenes at the library. Who else is pulling an all-nighter for the 'surprise' quiz tomorrow?",
        likes: 890,
        comments: 45,
        time: "5h ago",
    },
];

const Feed = () => {
    return (
        <div className="space-y-6 pb-20">
            {feedPosts.map((post) => (
                <article key={post.id} className="border-b border-border pb-4 last:border-0">
                    {/* Header */}
                    <div className="flex items-center justify-between px-1 mb-3">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8 border border-primary/20">
                                <AvatarImage src={post.user.avatar} />
                                <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold leading-none">{post.user.name}</span>
                                <span className="text-[10px] text-muted-foreground">{post.location}</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Image */}
                    <div className="aspect-square w-full bg-muted rounded-md overflow-hidden mb-3 border border-border/50">
                        <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between px-1 mb-2">
                        <div className="flex items-center gap-4">
                            <button className="text-foreground hover:text-primary transition-colors">
                                <Heart className="w-6 h-6" />
                            </button>
                            <button className="text-foreground hover:text-primary transition-colors">
                                <MessageCircle className="w-6 h-6" />
                            </button>
                            <button className="text-foreground hover:text-primary transition-colors">
                                <Send className="w-6 h-6" />
                            </button>
                        </div>
                        <button className="text-foreground hover:text-primary transition-colors">
                            <Bookmark className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Likes & Caption */}
                    <div className="px-1 space-y-1">
                        <div className="text-sm font-bold">{post.likes} likes</div>
                        <div className="text-sm">
                            <span className="font-semibold mr-2">{post.user.name}</span>
                            <span className="text-muted-foreground">{post.caption}</span>
                        </div>
                        <div className="text-xs text-muted-foreground uppercase pt-1">{post.time}</div>
                    </div>
                </article>
            ))}

            {/* Loading Placeholder */}
            <div className="flex justify-center p-4">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        </div>
    );
};

export default Feed;
