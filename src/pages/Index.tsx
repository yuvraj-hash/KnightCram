import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhatIsSection from "@/components/WhatIsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/auth/LoginModal";
import SignUpModal from "@/components/auth/SignUpModal";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const openSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        onLoginClick={() => setIsLoginOpen(true)}
        onSignUpClick={() => setIsSignUpOpen(true)}
      />
      <HeroSection onSignUpClick={() => setIsSignUpOpen(true)} />
      <ProblemSection />
      <WhatWeDoSection />
      <HowItWorksSection />
      <WhatIsSection />
      <CTASection onSignUpClick={() => setIsSignUpOpen(true)} />
      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onSwitchToSignUp={openSignUp}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onOpenChange={setIsSignUpOpen}
        onSwitchToLogin={openLogin}
      />
    </main>
  );
};

export default Index;
