import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";
import SignUpModal from "@/components/auth/SignUpModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass shadow-lg shadow-background/50" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo - slightly larger with very tight spacing */}
            <a 
              href="/" 
              className="flex items-center gap-1 md:gap-2 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg p-1"
              aria-label="KnightCram homepage"
            >
              <img
                src="/New.gif"
                alt="KnightCram Animated Logo"
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain transition-all duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-bubblegum font-bold text-xl md:text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors duration-300">
                KnightCram
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="nav"
                size="sm"
                onClick={() => scrollToSection("about")}
                className="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label="About section"
              >
                About
              </Button>
              <Button
                variant="nav"
                size="sm"
                onClick={() => scrollToSection("how-it-works")}
                className="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label="How it works section"
              >
                How It Works
              </Button>
              <div className="w-px h-5 bg-border mx-1" />
              <Button
                variant="heroOutline"
                size="sm"
                onClick={() => setIsLoginOpen(true)}
                className="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Sign in to your account"
              >
                Sign In
              </Button>
              <Button
                variant="navPrimary"
                size="sm"
                onClick={() => setIsSignUpOpen(true)}
                className="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Create new account"
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-border animate-fade-up">
              <div className="flex flex-col gap-2">
                <Button
                  variant="nav"
                  size="sm"
                  className="w-full justify-start transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  onClick={() => scrollToSection("about")}
                  aria-label="About section"
                >
                  About
                </Button>
                <Button
                  variant="nav"
                  size="sm"
                  className="w-full justify-start transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  onClick={() => scrollToSection("how-it-works")}
                  aria-label="How it works section"
                >
                  How It Works
                </Button>
                <div className="h-px bg-border my-1" />
                <Button
                  variant="heroOutline"
                  size="sm"
                  className="w-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  aria-label="Sign in to your account"
                >
                  Sign In
                </Button>
                <Button
                  variant="navPrimary"
                  size="sm"
                  className="w-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  onClick={() => {
                    setIsSignUpOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  aria-label="Create new account"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <SignUpModal
        isOpen={isSignUpOpen}
        onOpenChange={setIsSignUpOpen}
        onSwitchToLogin={() => {
          setIsSignUpOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default Navbar;