import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const navLinks = [
  { to: "/", label: "דף הבית" },
  { to: "/properties", label: "נכסים" },
  { to: "/ai-finder", label: "מציאת נכס AI" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "צור קשר" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled && !isOpen;

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent"
          : "bg-background/90 backdrop-blur-2xl border-b border-border shadow-sm"
      }`}
      style={{ transform: "translateZ(0)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="ליה נדל״ן"
              className={`h-12 md:h-14 w-auto object-contain transition-all duration-300 ${
                isTransparent ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-[13px] font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === link.to
                    ? "text-gold"
                    : isTransparent
                    ? "text-white/70 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/liya_chernobrod?igsh=MXBodHlzczl5ZjNodw=="
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-full transition-all duration-300 ${
                isTransparent ? "text-white/50 hover:text-gold" : "text-muted-foreground hover:text-gold"
              }`}
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a href="tel:+972546739422">
              <Button
                size="sm"
                className="gap-2 rounded-full text-xs px-6 h-10 transition-all duration-300 bg-gold text-gold-foreground hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/15"
              >
                <Phone className="h-3.5 w-3.5" />
                <span dir="ltr">054-673-9422</span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden h-10 w-10 ${isTransparent ? "text-white hover:bg-white/10" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-2xl border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block text-base font-medium py-3.5 px-5 rounded-xl transition-all duration-300 ${
                  location.pathname === link.to
                    ? "text-gold bg-gold-light"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-5 pt-5 mt-3 border-t border-border">
              <a href="tel:+972546739422" className="flex items-center gap-2 text-sm font-medium text-gold">
                <Phone className="h-4 w-4" />
                <span dir="ltr">054-673-9422</span>
              </a>
              <a
                href="https://www.instagram.com/liya_chernobrod?igsh=MXBodHlzczl5ZjNodw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
