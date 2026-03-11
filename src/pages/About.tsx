import { Award, Users, Building, Heart, Phone, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import liyaAbout from "@/assets/liya-about.jpeg";

const About = () => {
  return (
    <div className="pt-24 md:pt-28 pb-0 min-h-screen bg-background">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Photo */}
            <FadeIn direction="right">
              <div className="relative flex justify-center">
                <div className="relative w-[260px] md:w-[320px] lg:w-[380px]">
                  <motion.div
                    className="absolute -inset-3 rounded-2xl border border-gold/15"
                    animate={{ rotate: [1, -0.5, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border">
                    <img
                      src={liyaAbout}
                      alt="ליה – סוכנת נדל״ן"
                      className="w-full aspect-[3/4] object-cover" />
                    
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent h-28" />
                    <span className="absolute bottom-4 right-5 text-xs font-medium text-white/80 tracking-wide">
                      סוכנת נדל״ן מוסמכת
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn direction="left" delay={200}>
              <div className="text-center lg:text-right">
                <span className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase mb-5 block">אודות</span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-4 leading-tight">
                  ליה נדל״ן
                </h1>
                <p className="text-lg md:text-xl text-gold font-medium mb-4">
                  מומחית לנכסי פרימיום באשדוד
                </p>
                <div className="w-14 h-px bg-gold/25 mb-8 mx-auto lg:mx-0 lg:mr-0" />
                <div className="space-y-4 text-muted-foreground leading-[1.9] max-w-lg mx-auto lg:mx-0 lg:mr-0 mb-9 text-[15px]">
                  <p>
                    שמי ליה ואני סוכנת נדל״ן המתמחה באזור אשדוד והסביבה כבר למעלה מעשור.
                    אני מאמינה שמציאת הבית המושלם היא אחת ההחלטות החשובות בחיים.
                  </p>
                  <p>
                    הניסיון הרב שלי, היכרות מעמיקה עם השכונות והפרויקטים,
                    ורשת קשרים ענפה מאפשרים לי להציע ללקוחותיי את ההזדמנויות הטובות ביותר.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10">
                  {["ליווי אישי", "ניסיון של 10+ שנים", "מאות עסקאות"].map((item, i) =>
                  <motion.div
                    key={item}
                    className="flex items-center gap-2 text-xs text-foreground bg-secondary px-4 py-2 rounded-full border border-border"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                    
                      <CheckCircle className="h-3 w-3 text-gold" />
                      {item}
                    </motion.div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link to="/contact">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button className="bg-gold hover:bg-gold-dark text-gold-foreground gap-2 px-8 h-12 rounded-full text-sm hover:shadow-lg hover:shadow-gold/15 transition-all">
                        <Phone className="h-3.5 w-3.5" />
                        צרו קשר
                      </Button>
                    </motion.div>
                  </Link>
                  <a href="mailto:Liya.alt@gmail.com">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="gap-2 px-8 h-12 rounded-full text-sm border-border hover:bg-secondary">
                        <Mail className="h-3.5 w-3.5" />
                        שלחו מייל
                      </Button>
                    </motion.div>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      


























      

      {/* ─── VALUES ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 block">הערכים שלי</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-5">למה לבחור בליה?</h2>
              <div className="w-12 h-px bg-gold/25 mx-auto" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
            { icon: Heart, title: "שירות אישי", desc: "ליווי צמוד ואישי לכל לקוח מהרגע הראשון" },
            { icon: Award, title: "מקצועיות", desc: "ידע מעמיק בשוק הנדל״ן המקומי" },
            { icon: Building, title: "היכרות מקומית", desc: "מכירה כל שכונה ופרויקט באזור אשדוד" },
            { icon: Users, title: "לקוחות מרוצים", desc: "מאות עסקאות מוצלחות לאורך השנים" }].
            map((v, i) =>
            <FadeIn key={v.title} delay={i * 80} scale>
                <motion.div
                className="group bg-card border border-border rounded-2xl p-7 text-center hover:shadow-lg hover:border-gold/20 transition-all duration-300"
                whileHover={{ y: -4 }}>
                
                  <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/15 transition-colors">
                    <v.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-2">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>
    </div>);

};

export default About;