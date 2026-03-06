import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function SupportPage() {
    const { topic } = useParams<{ topic: string }>();
    const navigate = useNavigate();

    const getTitleAndContent = () => {
        switch (topic) {
            case "guidelines":
                return {
                    title: "Community Guidelines",
                    content: "These are our community guidelines. Treat everyone with respect, do not post harmful content, and contribute positively to our community."
                };
            case "faqs":
                return {
                    title: "FAQs",
                    content: "Frequently Asked Questions. Here you will find answers to the most common questions regarding our platform, account management, and features."
                };
            case "news":
                return {
                    title: "News",
                    content: "Latest news and updates about our community platform and features."
                };
            case "updates":
                return {
                    title: "Updates",
                    content: "Recent updates to the application including bug fixes, new features, and performance improvements."
                };
            case "privacy":
                return {
                    title: "Privacy Policy",
                    content: "Your privacy is important to us. Here you can find out how we handle your data, security measures, and your privacy rights."
                };
            case "terms":
                return {
                    title: "Terms and Conditions",
                    content: "These Terms and Conditions govern your use of our service. Please read them carefully to understand your rights and obligations."
                };
            default:
                return {
                    title: "Support",
                    content: "Welcome to the Support section. Please select a topic from the settings menu."
                };
        }
    };

    const { title, content } = getTitleAndContent();

    return (
        <div className="text-white min-h-screen pb-28">
            {/* Sticky Page Header */}
            <header className="sticky top-16 z-20 bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-white/[0.08] shadow-[0_1px_24px_rgba(0,0,0,0.4)]">
                <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center gap-2.5">
                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all duration-200 flex-shrink-0 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                    </button>

                    <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 leading-none">
                        {title}
                    </h1>
                </div>
            </header>

            {/* Page Content */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-white/80 leading-relaxed text-lg">
                            {content}
                        </p>
                        <p className="text-white/50 mt-12 text-sm italic">
                            This is a placeholder page for the {title} content. Full content will be updated soon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
