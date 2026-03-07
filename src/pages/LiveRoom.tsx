import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Mic, MicOff, Video, VideoOff, MonitorUp, Hand, PhoneOff,
    Users, MessageSquare, ChevronLeft, Send, MoreVertical, X,
    Settings, UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const MOCK_PARTICIPANTS = [
    { id: "1", name: "You", isHost: false, role: "Student", micOn: true, videoOn: true, avatar: "" },
    { id: "2", name: "Alex Chen", isHost: true, role: "Mentor", micOn: true, videoOn: false, avatar: "https://i.pravatar.cc/150?u=2" },
    { id: "3", name: "Sarah Johnson", isHost: false, role: "Student", micOn: false, videoOn: true, avatar: "https://i.pravatar.cc/150?u=3" },
    { id: "4", name: "Mike Ross", isHost: false, role: "Student", micOn: false, videoOn: false, avatar: "https://i.pravatar.cc/150?u=4" },
];

const MOCK_CHAT = [
    { id: "1", senderId: "2", senderName: "Alex Chen", time: "10:02 AM", content: "Hey everyone, welcome to the study group!" },
    { id: "2", senderId: "3", senderName: "Sarah Johnson", time: "10:03 AM", content: "Hi! Thanks for organizing this." },
];

export default function LiveRoom() {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [isMicOn, setIsMicOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isHandRaised, setIsHandRaised] = useState(false);

    // UI state
    const [showRightPanel, setShowRightPanel] = useState(true);
    const [activeTab, setActiveTab] = useState("chat");
    const [chatMessage, setChatMessage] = useState("");
    const [chatHistory, setChatHistory] = useState(MOCK_CHAT);

    // Responsive right panel
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setShowRightPanel(false);
            } else {
                setShowRightPanel(true);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMic = () => setIsMicOn(!isMicOn);
    const toggleVideo = () => setIsVideoOn(!isVideoOn);
    const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
    const toggleHandRaise = () => setIsHandRaised(!isHandRaised);

    const handleLeave = () => {
        navigate("/forum");
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        const newMessage = {
            id: Date.now().toString(),
            senderId: "1",
            senderName: "You",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: chatMessage
        };

        setChatHistory([...chatHistory, newMessage]);
        setChatMessage("");
    };

    const toggleRightPanel = (tab: string) => {
        if (showRightPanel && activeTab === tab) {
            setShowRightPanel(false);
        } else {
            setShowRightPanel(true);
            setActiveTab(tab);
        }
    };

    return (
        <div className="h-screen w-full bg-[#111] flex flex-col font-sans text-white overflow-hidden selection:bg-primary/30">
            {/* Top Bar */}
            <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-white/10 bg-[#1a1c23] shrink-0">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="md:hidden text-white/70 hover:text-white" onClick={() => navigate("/forum")}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-lg md:text-xl font-semibold leading-tight">AI Study Group {roomId ? `#${roomId}` : ""}</h1>
                        <p className="text-xs text-white/50 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            Live • {MOCK_PARTICIPANTS.length} Participants
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
                        <Users className="w-4 h-4 text-white/60" />
                        <span className="text-sm font-medium">{MOCK_PARTICIPANTS.length}</span>
                    </div>
                    <Button
                        variant="destructive"
                        className="hidden md:flex rounded-full h-9 px-4 font-medium"
                        onClick={handleLeave}
                    >
                        Leave Room
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* Video Grid Area */}
                <div className="flex-1 p-2 md:p-4 flex flex-col overflow-hidden relative transition-all duration-300">
                    <div className={`grid gap-2 md:gap-4 flex-1 w-full h-full p-2
                        ${MOCK_PARTICIPANTS.length === 1 ? 'grid-cols-1' : ''}
                        ${MOCK_PARTICIPANTS.length === 2 ? 'grid-cols-1 md:grid-cols-2' : ''}
                        ${MOCK_PARTICIPANTS.length >= 3 && MOCK_PARTICIPANTS.length <= 4 ? 'grid-cols-2 grid-rows-2' : ''}
                        ${MOCK_PARTICIPANTS.length > 4 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''}
                    `}>
                        {MOCK_PARTICIPANTS.map((participant, index) => (
                            <div key={participant.id} className="relative bg-[#1c1e26] rounded-2xl overflow-hidden border border-white/5 shadow-lg group flex items-center justify-center">
                                {/* Video/Avatar */}
                                {participant.videoOn ? (
                                    <div className="w-full h-full bg-black/40 flex items-center justify-center">
                                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                                            <Video className="w-16 h-16 mb-4" />
                                            <span>Camera stream</span>
                                        </div>
                                    </div>
                                ) : (
                                    <Avatar className="w-24 h-24 border-2 border-white/10">
                                        <AvatarImage src={participant.avatar} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold">
                                            {participant.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                )}

                                {/* Overlay UI */}
                                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium text-sm text-white drop-shadow-md">{participant.name}</div>
                                        {participant.isHost && (
                                            <span className="text-[10px] uppercase font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded shadow-sm">Host</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!participant.micOn && (
                                            <div className="w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center backdrop-blur-md">
                                                <MicOff className="w-3.5 h-3.5 text-white" />
                                            </div>
                                        )}
                                        {index === 1 && isHandRaised && (
                                            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center shadow-md">
                                                <Hand className="w-3.5 h-3.5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Speaking indicator ring */}
                                {participant.micOn && index === 1 && (
                                    <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl pointer-events-none"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Temporary Mobile Right Panel Overlay */}
                    {showRightPanel && (
                        <div className="lg:hidden absolute inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setShowRightPanel(false)}></div>
                    )}
                </div>

                {/* Right Panel (Chat / Participants) */}
                <div className={`
                    absolute lg:relative right-0 inset-y-0 z-50 w-80 lg:w-[340px] bg-[#1a1c23] border-l border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out shadow-[-10px_0_30px_rgba(0,0,0,0.5)] lg:shadow-none
                    ${showRightPanel ? 'translate-x-0' : 'translate-x-full lg:hidden lg:translate-x-0 lg:hidden'}
                `}>
                    <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 shrink-0">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="bg-white/5 w-full h-10 p-1">
                                <TabsTrigger value="chat" className="w-1/2 data-[state=active]:bg-white/10 data-[state=active]:text-white text-xs">Chat</TabsTrigger>
                                <TabsTrigger value="participants" className="w-1/2 data-[state=active]:bg-white/10 data-[state=active]:text-white text-xs">People</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Button variant="ghost" size="icon" className="lg:hidden w-8 h-8 ml-2 text-white/50" onClick={() => setShowRightPanel(false)}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <Tabs value={activeTab} className="w-full h-full flex flex-col">

                            {/* Chat Tab */}
                            <TabsContent value="chat" className="flex-1 flex flex-col m-0 h-full data-[state=inactive]:hidden">
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    <div className="text-center text-xs text-white/40 my-2">Messages are only visible during the live session</div>
                                    {chatHistory.map((msg) => (
                                        <div key={msg.id} className={`flex flex-col ${msg.senderId === "1" ? 'items-end' : 'items-start'}`}>
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-xs font-semibold text-white/70">{msg.senderName}</span>
                                                <span className="text-[10px] text-white/40">{msg.time}</span>
                                            </div>
                                            <div className={`px-3 py-2 rounded-2xl max-w-[85%] text-sm ${msg.senderId === "1"
                                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                                    : 'bg-white/10 text-white/90 rounded-bl-sm'
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-white/10 bg-black/20 shrink-0">
                                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                        <Input
                                            placeholder="Send a message..."
                                            value={chatMessage}
                                            onChange={(e) => setChatMessage(e.target.value)}
                                            className="bg-white/5 border-white/10 text-sm rounded-full h-10 px-4 focus-visible:ring-blue-500/50"
                                        />
                                        <Button type="submit" size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 h-10 w-10 shrink-0">
                                            <Send className="w-4 h-4 text-white" />
                                        </Button>
                                    </form>
                                </div>
                            </TabsContent>

                            {/* Participants Tab */}
                            <TabsContent value="participants" className="flex-1 p-4 m-0 data-[state=inactive]:hidden overflow-y-auto">
                                <Button className="w-full mb-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white gap-2">
                                    <UserPlus className="w-4 h-4" /> Add People
                                </Button>
                                <div className="space-y-4">
                                    {MOCK_PARTICIPANTS.map((p) => (
                                        <div key={p.id} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-9 h-9 border border-white/10">
                                                    <AvatarImage src={p.avatar} />
                                                    <AvatarFallback className="bg-white/10 text-xs">{p.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="text-sm font-medium text-white/90 leading-tight flex items-center gap-2">
                                                        {p.name} {p.id === "1" && "(You)"}
                                                    </div>
                                                    <div className="text-xs text-white/40">{p.role}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                                {!p.micOn ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4 text-white/50" />}
                                                <Button variant="ghost" size="icon" className="w-7 h-7 text-white/50 hover:text-white"><MoreVertical className="w-4 h-4" /></Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            {/* Bottom Controls */}
            <footer className="h-20 lg:h-24 bg-[#1a1c23] border-t border-white/10 pb-env shrink-0 px-4 flex items-center justify-between">

                {/* Left block - Info (desktop) */}
                <div className="hidden md:flex items-center w-1/4 min-w-[200px]">
                    <div className="text-sm font-medium text-white/80">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | Room {roomId}</div>
                </div>

                {/* Center block - Main controls */}
                <div className="flex-1 flex justify-center items-center gap-3 sm:gap-4 md:gap-5">
                    <Button
                        variant={isMicOn ? "secondary" : "destructive"}
                        size="icon"
                        onClick={toggleMic}
                        className={`rounded-full w-12 h-12 md:w-14 md:h-14 transition-all duration-300 ${isMicOn ? 'bg-white/10 hover:bg-white/20 text-white' : ''}`}
                    >
                        {isMicOn ? <Mic className="w-5 h-5 md:w-6 md:h-6" /> : <MicOff className="w-5 h-5 md:w-6 md:h-6" />}
                    </Button>
                    <Button
                        variant={isVideoOn ? "secondary" : "destructive"}
                        size="icon"
                        onClick={toggleVideo}
                        className={`rounded-full w-12 h-12 md:w-14 md:h-14 transition-all duration-300 ${isVideoOn ? 'bg-white/10 hover:bg-white/20 text-white' : ''}`}
                    >
                        {isVideoOn ? <Video className="w-5 h-5 md:w-6 md:h-6" /> : <VideoOff className="w-5 h-5 md:w-6 md:h-6" />}
                    </Button>
                    <Button
                        variant={isScreenSharing ? "default" : "secondary"}
                        size="icon"
                        onClick={toggleScreenShare}
                        className={`rounded-full w-12 h-12 md:w-14 md:h-14 hidden sm:flex transition-all duration-300 ${!isScreenSharing ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        <MonitorUp className="w-5 h-5 md:w-6 md:h-6" />
                    </Button>
                    <Button
                        variant={isHandRaised ? "default" : "secondary"}
                        size="icon"
                        onClick={toggleHandRaise}
                        className={`rounded-full w-12 h-12 md:w-14 md:h-14 transition-all duration-300 ${!isHandRaised ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-[0_0_15px_rgba(234,179,8,0.5)]'}`}
                    >
                        <Hand className="w-5 h-5 md:w-6 md:h-6" />
                    </Button>

                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={handleLeave}
                        className="rounded-full w-12 h-12 md:w-14 md:h-14 md:hidden shadow-lg"
                    >
                        <PhoneOff className="w-5 h-5" />
                    </Button>
                </div>

                {/* Right block - Chat/Settings/Leave */}
                <div className="w-fit md:w-1/4 flex items-center justify-end gap-2 md:gap-3 lg:justify-end">
                    <Button
                        variant={activeTab === 'chat' && showRightPanel ? "default" : "ghost"}
                        size="icon"
                        onClick={() => toggleRightPanel('chat')}
                        className={`rounded-full w-10 h-10 lg:w-12 lg:h-12 ${activeTab === 'chat' && showRightPanel ? 'bg-white/20 text-blue-400' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                    >
                        <MessageSquare className="w-5 h-5" />
                    </Button>
                    <Button
                        variant={activeTab === 'participants' && showRightPanel ? "default" : "ghost"}
                        size="icon"
                        onClick={() => toggleRightPanel('participants')}
                        className={`rounded-full w-10 h-10 lg:w-12 lg:h-12 ${activeTab === 'participants' && showRightPanel ? 'bg-white/20 text-blue-400' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                    >
                        <Users className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-10 h-10 lg:w-12 lg:h-12 text-white/70 hover:bg-white/10 hover:text-white hidden sm:flex"
                    >
                        <Settings className="w-5 h-5" />
                    </Button>
                </div>

            </footer>
        </div>
    );
}
