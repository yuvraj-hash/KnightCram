import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Scale, AlertTriangle, Clock, Factory, AlertCircle, Globe, Zap, ArrowRight, Brain, CheckCircle2, ShieldAlert, History, GraduationCap, Building2, FileText, TrendingDown } from "lucide-react";

// --- Components ---

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
    return (
        <section
            id={id}
            className={`min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 md:py-16 relative overflow-hidden ${className}`}
            tabIndex={-1}
        >
            <div className="w-full max-w-7xl mx-auto">
                {children}
            </div>
        </section>
    );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// --- Sections ---

const problems = [
    {
        icon: GraduationCap,
        stage: "School",
        problem: "Education teaches marks, not skills",
    },
    {
        icon: Building2,
        stage: "College",
        problem: "Colleges optimize rankings, not outcomes",
    },
    {
        icon: FileText,
        stage: "Degree",
        problem: "Degrees do not map to real jobs",
    },
    {
        icon: TrendingDown,
        stage: "Result",
        problem: "Mass unemployment & unfulfilled potential",
    },
];

const IntroSection = () => {
    return (
        <Section id="intro" className="text-center !justify-start !min-h-0 !pt-2 md:!pt-4 pb-12 md:pb-20">
            <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
                {/* Badge */}
                <FadeIn className="flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm animate-fade-in">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-sm font-semibold text-foreground/80 tracking-wider uppercase">Spotlight</span>
                    </div>
                </FadeIn>

                {/* Main Heading */}
                <FadeIn delay={0.1}>
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
                        <span className="text-gradient glow-text">Illuminating</span>
                        <br />
                        <span className="text-foreground">what others overlook</span>
                    </h1>
                </FadeIn>

                {/* Subheading */}
                <FadeIn delay={0.2} className="max-w-3xl mx-auto">
                    <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">

                        <span className="text-foreground font-semibold">Reckoning with 190 years of Macaulay's system.</span>
                    </p>
                </FadeIn>

                {/* Value Proposition */}
                <FadeIn delay={0.3} className="max-w-2xl mx-auto">
                    <div className="text-left space-y-3">
                        <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                            A global circle of students and alumni sharing truths, conquering the cram, and guiding the next generation through the darkness of doubt.
                        </p>

                        <div className="space-y-2 text-center">
                            <p className="text-lg md:text-xl font-medium text-primary animate-fade-up" style={{ animationDelay: "0.3s" }}>
                                If you're tired of being gaslit by the system, welcome home.
                            </p>
                            <p className="text-sm text-muted-foreground italic animate-fade-up" style={{ animationDelay: "0.5s" }}>
                                "We don't promise success. We promise clarity."
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>

            <FadeIn delay={0.4} className="mt-16 w-full max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {/* Connecting Line (Horizontal on Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 z-0 opacity-30" />

                    {problems.map((item, index) => (
                        <div
                            key={item.stage}
                            className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-background/40 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 z-10"
                        >
                            {/* Icon Container */}
                            <div className="relative mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors">
                                    <item.icon className="w-5 h-5 text-primary group-hover:text-primary transition-colors" />
                                </div>
                                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground border-2 border-background flex items-center justify-center shadow-md">
                                    <span className="text-xs font-bold">{index + 1}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <h3 className="font-display text-base font-bold text-foreground">
                                    {item.stage}
                                </h3>
                                <p className="text-muted-foreground text-xs leading-relaxed max-w-[140px] mx-auto font-medium">
                                    {item.problem}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </Section>
    );
};

const WhyWeExistSection = () => {
    return (
        <Section id="why-we-exist" className="bg-gradient-to-b from-background to-muted/20 py-12 md:py-20">
            <div className="space-y-16 md:space-y-20 max-w-6xl mx-auto">
                {/* Section Header */}
                <FadeIn className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-4">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Mission</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                        Why KnightCram Exists
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Breaking 190 years of educational conditioning
                    </p>
                </FadeIn>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Problem Statement */}
                    <FadeIn delay={0.1} className="space-y-6 pl-0 lg:pl-16">
                        <div className="space-y-5">
                            <h3 className="text-xl md:text-2xl font-semibold text-foreground">The System We Challenge</h3>
                            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    For <span className="text-primary font-bold">190+ years</span>, our education system trained obedience, not thinking.
                                </p>
                                <p>
                                    Degrees became trophies. Placements became marketing. Students became numbers.
                                </p>
                                <div className="p-4 rounded-lg bg-muted/30 border-l-4 border-primary/50">
                                    <p className="text-foreground font-semibold">
                                        KnightCram exists to flip that power back to students.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Solution Features */}
                    <FadeIn delay={0.2} className="space-y-6">
                        <h3 className="text-xl md:text-2xl font-semibold text-foreground">Here, you will find:</h3>
                        <div className="space-y-4">
                            {[
                                {
                                    icon: CheckCircle2,
                                    text: "Real professor and hostel reviews",
                                    color: "text-emerald-500"
                                },
                                {
                                    icon: CheckCircle2,
                                    text: "Honest placement and internship insights",
                                    color: "text-emerald-500"
                                },
                                {
                                    icon: CheckCircle2,
                                    text: "Past year papers and notes that actually help",
                                    color: "text-emerald-500"
                                },
                                {
                                    icon: CheckCircle2,
                                    text: "Anonymous spaces to speak without fear",
                                    color: "text-emerald-500"
                                },
                                {
                                    icon: CheckCircle2,
                                    text: "Alumni who guide, not preach",
                                    color: "text-emerald-500"
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift"
                                >
                                    <item.icon className={`w-5 h-5 ${item.color} shrink-0 mt-0.5`} />
                                    <span className="text-foreground/90">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                {/* Core Values */}
                <FadeIn delay={0.4} className="py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        {[
                            { icon: ShieldAlert, text: "No university control", color: "text-destructive" },
                            { icon: Zap, text: "No paid promotions", color: "text-amber-500" },
                            { icon: Brain, text: "No fake success stories", color: "text-blue-500" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="p-6 rounded-xl bg-card/30 border border-border/50 hover:border-primary/20 transition-all duration-300"
                            >
                                <item.icon className={`w-10 h-10 ${item.color} mx-auto mb-3`} />
                                <p className="font-semibold text-foreground">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </FadeIn>

                {/* Call to Action */}
                <FadeIn delay={0.6} className="text-center">
                    <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-card to-muted/20 border border-border/50 space-y-5">
                        <p className="text-muted-foreground text-lg">
                            You're early. Right now, there are no reviews yet. No forums buzzing yet. No placement data yet.
                        </p>
                        <p className="text-xl font-semibold text-foreground">
                            Be the first to post. Be the first to tell the truth. Be the first to protect the next generation of students.
                        </p>
                        <p className="italic text-muted-foreground">But that's the point.</p>
                        <p className="text-muted-foreground">
                            You're not just a user. You're a trailblazer. The first 1,000 students will build what comes next.
                        </p>
                        <div className="pt-4">
                            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Your truth matters. Share it.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </Section>
    );
};

const AnonymousSection = () => {
    // Balance scale animation logic
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], [15, 0]);
    const scaleRef = useRef(null);
    const isScaleInView = useInView(scaleRef, { margin: "-100px" });

    return (
        <Section id="anonymous" className="bg-muted/10 pt-4 md:pt-8 pb-8 md:pb-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
                {/* Animation Visualization */}
                <FadeIn className="flex justify-center">
                    <div ref={scaleRef} className="relative h-96 w-full max-w-lg flex items-center justify-center">
                        {/* Scale Base */}
                        <div className="absolute bottom-10 w-4 h-56 bg-muted-foreground/30 rounded-full mx-auto" />
                        <div className="absolute bottom-10 w-32 h-4 bg-muted-foreground/30 rounded-full mx-auto" />

                        {/* Scale Beam */}
                        <motion.div
                            initial={{ rotate: -20 }}
                            animate={isScaleInView ? { rotate: 0 } : { rotate: -20 }}
                            transition={{ type: "spring", stiffness: 60, damping: 10 }}
                            className="w-80 h-2 bg-muted-foreground/50 absolute top-20 rounded-full origin-center"
                        >
                            {/* Plates */}
                            <div className="absolute left-0 top-0 w-24 h-24 border-2 border-muted-foreground/40 rounded-full flex items-center justify-center translate-y-8 -translate-x-10 bg-card/50 backdrop-blur-sm">
                                <span className="text-sm text-center p-2 text-muted-foreground font-medium">Anonymous</span>
                            </div>
                            <div className="absolute right-0 top-0 w-24 h-24 border-2 border-muted-foreground/40 rounded-full flex items-center justify-center translate-y-8 translate-x-10 bg-card/50 backdrop-blur-sm">
                                <span className="text-sm text-center p-2 text-muted-foreground font-medium">Verified</span>
                            </div>
                        </motion.div>

                        {/* Balance Indicator */}
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    </div>
                </FadeIn>

                {/* Content */}
                <FadeIn delay={0.1} className="space-y-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Scale className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">Anonymous but Accountable</h2>
                    </div>

                    <div className="space-y-4 text-sm md:text-base leading-relaxed">
                        <div className="space-y-2">
                            <p className="font-semibold text-foreground">Truth needs safety.</p>
                            <p className="text-muted-foreground">That's why KnightCram allows anonymous posting.</p>
                            <p className="font-semibold text-foreground">But this is not chaos.</p>
                        </div>

                        <div className="space-y-3 pt-1">
                            {[{
                                icon: CheckCircle2,
                                text: "Every anonymous post comes from a verified student or alumni.",
                                color: "text-emerald-500",
                                delay: 0.2
                            },
                            {
                                icon: ShieldAlert,
                                text: "Abuse is moderated. Lies are challenged.",
                                color: "text-indigo-500",
                                delay: 0.3
                            },
                            {
                                icon: Zap,
                                text: "Honesty is rewarded.",
                                color: "text-amber-500",
                                delay: 0.4
                            }].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: item.delay }}
                                    className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-border/50"
                                >
                                    <item.icon className={`w-5 h-5 ${item.color} shrink-0 mt-0.5`} />
                                    <span className="text-foreground/90">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-3">
                            <p className="text-lg md:text-xl font-display font-bold text-primary border-l-4 border-primary/30 pl-4">
                                Speak freely. Speak responsibly.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </Section>
    );
};

const GlitchText = ({ text }: { text: string }) => {
    return (
        <span className="relative inline-block hover:animate-pulse">
            <span className="absolute top-0 left-0 -ml-[2px] opacity-70 text-red-500 animate-[pulse_0.5s_infinite]">{text}</span>
            <span className="absolute top-0 left-0 ml-[2px] opacity-70 text-blue-500 animate-[pulse_0.5s_infinite_reverse]">{text}</span>
            <span className="relative z-10">{text}</span>
        </span>
    );
}

const MvpSection = () => {
    return (
        <Section id="mvp" className="bg-muted/5 py-12 md:py-20">
            <div className="space-y-12 max-w-6xl mx-auto text-center">
                <FadeIn className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/5 mb-4">
                        <span className="text-sm font-semibold text-destructive uppercase tracking-wider">Early Access</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                        This Is an <GlitchText text="MVP" />. <span className="text-primary">You Matter!</span>
                    </h2>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="grid lg:grid-cols-2 gap-8 text-left border border-border/50 p-8 rounded-2xl bg-card/30 relative overflow-hidden max-w-5xl mx-auto">
                        <div className="absolute top-4 -right-12 w-40 py-1.5 bg-destructive text-[11px] font-bold text-white rotate-45 shadow-lg tracking-widest z-20 flex justify-center items-center uppercase">
                            v0.1 ALPHA
                        </div>

                        <div className="space-y-5 pt-8">
                            <FadeIn delay={0.2}>
                                <h3 className="text-xl md:text-2xl font-semibold text-foreground">Raw. Unfinished.</h3>
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <p className="text-muted-foreground text-base md:text-lg">
                                    This is Version 0.1. Rough edges everywhere.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.4}>
                                <div className="inline-block px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                                    <p className="text-xl font-bold text-emerald-500">Good.</p>
                                </div>
                            </FadeIn>
                        </div>

                        <div className="space-y-5 text-base md:text-lg pt-8">
                            <FadeIn delay={0.5}>
                                <p className="text-foreground/90">
                                    That means you're early enough to shape it. Report bugs. Request features. Break things. We're listening.
                                </p>
                            </FadeIn>
                            <div className="space-y-3 border-l-2 border-primary/30 pl-4 py-2">
                                <FadeIn delay={0.6}><p className="text-foreground font-medium">Your feedback shapes what we build.</p></FadeIn>
                                <FadeIn delay={0.7}><p className="text-foreground font-medium">Your posts decide what survives.</p></FadeIn>
                                <FadeIn delay={0.8}><p className="text-primary font-bold text-lg">Your honesty becomes the culture.</p></FadeIn>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </Section>
    );
};

const QuickTruthSection = () => {
    return (
        <Section id="quick-truth" className="pt-6 md:pt-10 pb-12 md:pb-20 bg-gradient-to-br from-background to-muted/10">
            <div className="max-w-5xl mx-auto space-y-6 text-center">
                <FadeIn>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-sm font-bold uppercase tracking-wider">
                        <History className="w-4 h-4" />
                        <span>Historical Context</span>
                    </div>
                </FadeIn>

                <div className="space-y-8">
                    <FadeIn delay={0.1}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
                            India's education system was not designed for{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                                creativity
                            </span>
                            .
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-muted-foreground">
                            It was designed for{' '}
                            <span className="text-destructive underline decoration-destructive/30">
                                control
                            </span>
                            .
                        </h3>
                    </FadeIn>
                </div>

                <FadeIn delay={0.3}>
                    <div className="bg-card/50 p-8 rounded-2xl border border-border/50 relative mt-6 mb-4 max-w-3xl mx-auto shadow-lg">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-serif px-6 py-2 text-lg font-bold rounded-lg shadow-md">
                            1835
                        </div>
                        <div className="pt-8">
                            <History className="w-12 h-12 text-muted-foreground/50 mb-6 mx-auto" />
                            <blockquote className="font-serif text-lg md:text-xl italic text-foreground/90 mb-3 leading-relaxed">
                                In 1835, Thomas Macaulay openly stated the goal was to create people who were
                                "Indian in blood and colour, but English in taste and intellect."
                            </blockquote>
                            <div className="font-mono text-base md:text-lg text-destructive font-bold border-t border-border/50 pt-3 mt-3">
                                Translation: train clerks, not thinkers.
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="max-w-lg mx-auto text-left space-y-4 !mt-0">
                        <div className="p-4 rounded-lg bg-muted/30 border-l-4 border-primary/50">
                            <p className="font-bold text-foreground text-lg mb-2">That structure still exists today.</p>
                            <div className="space-y-2 text-foreground/80">
                                <p>Same exams. Same memorization. Same fear of failure.</p>
                                <p className="text-primary font-medium">Different syllabus. Same mindset.</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </Section>
    );
};

const FactoryModelSection = () => {
    return (
        <Section className="bg-[#0b0b0f] overflow-hidden">
            <div className="w-full max-w-7xl mx-auto space-y-16 z-10 px-4 md:px-48">
                <div className="text-center space-y-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Then Came the Factory Model</h2>
                        <p className="text-slate-400">In the early 1900s, industrialists like John D. Rockefeller pushed a standardized education system.</p>
                    </FadeIn>
                </div>

                <div className="relative border-y-2 border-dashed border-white/10 py-12 overflow-hidden">
                    {/* Conveyor Belt Visual */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                    <div className="flex justify-around items-center gap-4 flex-wrap md:flex-nowrap relative z-10">
                        {['fixed curriculum', 'fixed time tables', 'fixed outcomes'].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.3 }}
                                className="bg-[#1e1e24] p-6 rounded-lg border border-white/5 text-center w-full md:w-auto hover:border-white/20 transition-colors"
                            >
                                <Factory className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                                <span className="font-mono text-sm uppercase tracking-widest text-slate-300">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <FadeIn delay={0.4}>
                            <h3 className="text-2xl font-bold text-white">Why?</h3>
                            <p className="text-xl text-red-400 font-semibold">Factories needed obedient workers, not independent thinkers.</p>
                        </FadeIn>
                        <FadeIn delay={0.6}>
                            <p className="text-slate-400">This model spread globally. Including India.</p>
                        </FadeIn>
                    </div>
                    <div className="space-y-3 text-lg text-slate-300">
                        <FadeIn delay={0.7}><p>Schools became <span className="text-white font-bold">assembly lines</span>.</p></FadeIn>
                        <FadeIn delay={0.8}><p>Grades became <span className="text-white font-bold">filters</span>.</p></FadeIn>
                        <FadeIn delay={0.9}><p>Creativity became a <span className="text-white font-bold">risk</span>.</p></FadeIn>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const CostWePaySection = () => {
    return (
        <Section className="bg-gradient-to-b from-black to-slate-900/50">
            <div className="max-w-4xl mx-auto w-full px-4 md:px-24">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">The Cost We Pay Today</h2>
                </FadeIn>

                <div className="space-y-3">
                    {[
                        "Rote learning over understanding",
                        "Exam ranks over real skills",
                        "Placement posters over actual careers",
                        "Students blaming themselves for a broken system"
                    ].map((text, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className="py-3 px-4 border-l-4 border-slate-700 bg-white/5 hover:border-red-500 hover:bg-white/10 transition-all rounded-r-lg"
                        >
                            <p className="text-base text-slate-200">{text}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 grid gap-6 text-center md:text-left">
                    <FadeIn delay={0.8}>
                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-slate-400">
                            <span className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                Burnout is treated as weakness.
                            </span>
                            <span className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                Questioning is treated as rebellion.
                            </span>
                        </div>
                    </FadeIn>

                    <FadeIn delay={1.0}>
                        <div className="text-center mt-12 space-y-2">
                            <h3 className="text-3xl font-bold text-white">That is not normal.</h3>
                            <h3 className="text-3xl font-bold text-red-500">That is conditioning.</h3>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </Section>
    );
};

const GlobalExamplesSection = () => {
    return (
        <Section className="bg-[#050505]">
            <FadeIn>
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
                    But Education Does Not Have to Be This Way
                </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mx-auto px-4">
                {[
                    {
                        country: "Finland",
                        desc: "No standardized tests till high school. Focus on curiosity, play, and mental wellbeing. Teachers are mentors, not enforcers.",
                        color: "border-blue-500"
                    },
                    {
                        country: "Japan",
                        desc: "Moral education, teamwork, discipline. Students clean classrooms themselves. Character matters as much as marks.",
                        color: "border-red-500"
                    },
                    {
                        country: "Singapore",
                        desc: "Multiple success paths, not one topper model. Strong skill based education. Merit with flexibility.",
                        color: "border-white"
                    },
                    {
                        country: "China (recent shift)",
                        desc: "Reducing exam pressure. Promoting vocational and skill based routes. Aligning education with real industry needs.",
                        color: "border-amber-500"
                    }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.2 }}
                        whileHover={{ y: -10 }}
                        className={`p-6 rounded-2xl bg-white/5 border-t-4 ${item.color} h-full flex flex-col`}
                    >
                        <div className="mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-slate-400" />
                            <h3 className="text-xl font-bold text-white">{item.country}</h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            <FadeIn delay={0.8}>
                <div className="text-center mt-8 space-y-4">
                    <p className="text-2xl text-slate-300">Different cultures. <span className="text-white font-bold">Same lesson.</span></p>
                    <p className="text-xl text-emerald-400 font-medium">Education should create capable humans, not anxious robots.</p>
                </div>
            </FadeIn>
        </Section>
    );
};

const WhyMatchesSection = () => {
    return (
        <Section className="">
            <div className="max-w-6xl mx-auto space-y-12 text-center">
                <FadeIn>
                    <div className="space-y-2">
                        <span className="text-indigo-400 font-bold tracking-wider text-sm uppercase">Why This Matters Here</span>
                        <h2 className="text-4xl font-bold text-white">KnightCram is not here to fight universities.</h2>
                        <h2 className="text-4xl font-bold text-emerald-500">It is here to balance the system.</h2>
                    </div>
                </FadeIn>

                <FadeIn delay={0.3} className="!mt-6">
                    <p className="text-2xl text-slate-300 italic">
                        When institutions won’t tell the full story, <span className="text-white font-bold underline decoration-white/30">students will.</span>
                    </p>
                </FadeIn>

                <div className="grid sm:grid-cols-2 gap-6 text-left max-w-4xl mx-auto bg-white/5 p-6 rounded-2xl border border-white/10 !mt-6">
                    <p className="col-span-full font-semibold text-slate-400 mb-2">This platform exists to:</p>
                    {[
                        "expose gaps between promise and reality",
                        "help you make informed decisions",
                        "remind you that struggle is not stupidity",
                        "build collective intelligence across campuses"
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                            <p className="text-slate-200">{item}</p>
                        </div>
                    ))}
                </div>

                <FadeIn delay={0.6} className="!mt-6">
                    <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
                        Awareness is the first step to change.
                    </p>
                </FadeIn>
            </div>
        </Section>
    );
};

const OutroSection = () => {
    return (
        <Section id="outro" className="pt-6 md:pt-10 pb-12 md:pb-20 text-center bg-gradient-to-b from-background to-primary/5">
            <div className="max-w-5xl mx-auto space-y-12">
                <FadeIn className="space-y-2">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
                        Take What Helps.
                    </h2>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-muted-foreground">
                        Question Everything Else.
                    </h2>
                </FadeIn>

                <div className="space-y-5 text-lg md:text-xl">
                    <FadeIn delay={0.1}>
                        <p className="text-muted-foreground max-w-2xl mx-auto">You don't have to hate the system.</p>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-foreground font-semibold text-xl md:text-2xl max-w-2xl mx-auto">
                            You just don't have to blindly accept it.
                        </p>
                    </FadeIn>
                </div>

                <FadeIn delay={0.3}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto py-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift"
                        >
                            <p className="font-bold text-foreground text-lg">Learn the rules.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift"
                        >
                            <p className="font-bold text-foreground text-lg">Understand the game.</p>
                        </motion.div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.6}>
                    <p className="text-2xl md:text-3xl font-bold text-primary">
                        Then decide how you want to play.
                    </p>
                </FadeIn>

                <FadeIn delay={0.7}>
                    <div className="pt-12 border-t border-border/30 mt-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4"
                        >
                            Welcome to KnightCram.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="text-lg md:text-xl text-muted-foreground"
                        >
                            Where thinking is not a crime.
                        </motion.p>
                    </div>
                </FadeIn>
            </div>
        </Section>
    );
};

const Footer = () => {
    return (
        <footer className="py-4 md:py-6 border-t border-border/50 bg-background/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                    <a
                        href="#"
                        className="hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded"
                        aria-label="Terms and Conditions"
                    >
                        Terms & Conditions
                    </a>
                    <span className="hidden md:inline w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                    <a
                        href="#"
                        className="hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded"
                        aria-label="Privacy Policy"
                    >
                        Privacy Policy
                    </a>
                </div>
                <div className="mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground/70">
                    <p>© {new Date().getFullYear()} KnightCram. All rights reserved.</p>
                    <p className="mt-1">Built by students, for students.</p>
                </div>
            </div>
        </footer>
    );
};

const Spotlight = () => {
    return (
        <div className="w-full bg-background text-foreground overflow-x-hidden font-sans">
            <IntroSection />
            <WhyWeExistSection />
            <AnonymousSection />
            <MvpSection />
            <QuickTruthSection />
            <FactoryModelSection />
            <CostWePaySection />
            <GlobalExamplesSection />
            <WhyMatchesSection />
            <OutroSection />
            <Footer />
        </div>
    );
};

export default Spotlight;
