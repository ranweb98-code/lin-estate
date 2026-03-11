import { Phone, MessageCircle, Instagram, MapPin, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";

const Contact = () => {
  return (
    <div className="pt-24 md:pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 block">יצירת קשר</span>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">צור קשר</h1>
              <div className="w-12 h-px bg-gold/25 mx-auto mb-5" />
              <p className="text-muted-foreground text-sm">נשמח לעמוד לשירותכם</p>
            </div>
          </FadeIn>

          <div className="space-y-4 mb-14">
            {[
              { href: "tel:+972546739422", icon: Phone, title: "טלפון", desc: "054-673-9422", dir: "ltr" as const },
              { href: "https://wa.me/972546739422", icon: MessageCircle, title: "וואטסאפ", desc: "שלחו הודעה ישירות", external: true },
              { href: "mailto:Liya.alt@gmail.com", icon: Mail, title: "אימייל", desc: "Liya.alt@gmail.com" },
              { href: "https://www.instagram.com/liya_chernobrod?igsh=MXBodHlzczl5ZjNodw==", icon: Instagram, title: "אינסטגרם", desc: "@liya_chernobrod", external: true },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-5 bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-gold/20 hover:shadow-md group"
                >
                  <div className="w-13 h-13 rounded-xl bg-gold-light flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-colors">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    <span className="text-muted-foreground text-sm" dir={item.dir}>{item.desc}</span>
                  </div>
                </a>
              </FadeIn>
            ))}

            {[
              { icon: MapPin, title: "אזור פעילות", desc: "אשדוד, אשקלון, יבנה, גן יבנה והסביבה" },
              { icon: Clock, title: "שעות פעילות", desc: "ימים א׳-ה׳ 9:00-19:00 | שישי 9:00-13:00" },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={(i + 4) * 60}>
                <div className="flex items-center gap-5 bg-card border border-border rounded-2xl p-6">
                  <div className="w-13 h-13 rounded-xl bg-gold-light flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    <span className="text-muted-foreground text-sm">{item.desc}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="text-center">
              <a href="https://wa.me/972546739422" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-gold-foreground gap-2.5 px-10 h-13 text-sm rounded-full hover:shadow-lg hover:shadow-gold/15 transition-all hover:-translate-y-0.5">
                  <MessageCircle className="h-5 w-5" />
                  שלחו הודעה עכשיו
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Contact;
