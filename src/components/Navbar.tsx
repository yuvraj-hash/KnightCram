import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

const Navbar = ({ onLoginClick, onSignUpClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - slightly larger with very tight spacing */}
            <a href="/" className="flex items-center gap-0.2 md:gap-0.5 group">
              <img
                src="/New.gif"
                alt="KnightCram Animated Logo"
                className="w-12 h-12 md:w-18 md:h-18 lg:w-20 lg:h-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors">
                KnightCram
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="nav"
                size="default"
                onClick={() => scrollToSection("about")}
              >
                About
              </Button>
              <Button
                variant="nav"
                size="default"
                onClick={() => scrollToSection("how-it-works")}
              >
                How It Works
              </Button>
              <div className="w-px h-6 bg-border mx-2" />
              <Button
                variant="heroOutline"
                size="default"
                onClick={onLoginClick}
              >
                Sign In
              </Button>
              <Button
                variant="navPrimary"
                size="default"
                onClick={onSignUpClick}
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fade-up">
              <div className="flex flex-col gap-3">
                <Button
                  variant="nav"
                  size="lg"
                  className="w-full justify-start"
                  onClick={() => scrollToSection("about")}
                >
                  About
                </Button>
                <Button
                  variant="nav"
                  size="lg"
                  className="w-full justify-start"
                  onClick={() => scrollToSection("how-it-works")}
                >
                  How It Works
                </Button>
                <div className="h-px bg-border my-2" />
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="navPrimary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    onSignUpClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;