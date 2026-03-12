import { Link } from "react-router-dom";
import { Phone, Instagram, MessageCircle, Mail } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background relative grain">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-gold/20 to-transparent" />
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <h3 className="text-2xl font-bold font-display text-white">ליה</h3>
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-0.5" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium">נדל״ן</span>
            </div>
            <p className="text-white/50 text-sm leading-[1.9] max-w-xs">
              סוכנת נדל״ן המתמחה באזור אשדוד והסביבה, עם שירות אישי וליווי מלא עד סגירת העסקה.
            </p>
            <div className="w-10 h-px bg-gold/20 mt-6" />
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-[11px] tracking-[0.3em] uppercase text-white/40">ניווט</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/", label: "דף הבית" },
                { to: "/properties", label: "נכסים" },
                { to: "/ai-finder", label: "מציאת נכס AI" },
                { to: "/about", label: "אודות" },
                { to: "/contact", label: "צור קשר" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-white/50 hover:text-gold transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-[11px] tracking-[0.3em] uppercase text-white/40">צור קשר</h4>
            <div className="flex flex-col gap-4">
              {[
                { href: "tel:+972546739422", icon: Phone, label: "054-673-9422", dir: "ltr" as const },
                { href: "https://wa.me/972546739422", icon: MessageCircle, label: "וואטסאפ", external: true },
                { href: "mailto:Liya.alt@gmail.com", icon: Mail, label: "Liya.alt@gmail.com" },
                { href: "https://www.instagram.com/liya_chernobrod?igsh=MXBodHlzczl5ZjNodw==", icon: Instagram, label: "@liya_chernobrod", external: true },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-gold transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <span dir={item.dir}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-8 text-center">
          <p className="text-[11px] text-white/30">© {new Date().getFullYear()} ליה נדל״ן. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
