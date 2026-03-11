import { Star, Quote } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "רונית כהן",
    text: "ליה ליוותה אותנו לאורך כל הדרך ברכישת הדירה החדשה שלנו. מקצועית, זמינה ואכפתית – ממליצה בחום!",
    rating: 5,
  },
  {
    name: "אבי לוי",
    text: "הודות לליה מכרנו את הדירה במחיר מעולה ובזמן קצר. היא יודעת לנהל משא ומתן ברמה הגבוהה ביותר.",
    rating: 5,
  },
  {
    name: "שירה ברק",
    text: "חיפשנו דירת השקעה וליה מצאה לנו בדיוק את מה שרצינו. שירות אישי ומקצועי מהרגע הראשון.",
    rating: 5,
  },
];

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 2 : -2, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, rotate }}
      className="bg-card border border-border rounded-2xl p-8 md:p-9 flex flex-col relative overflow-hidden group hover:shadow-lg hover:border-gold/20 transition-all duration-300"
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/[0.08] to-transparent rounded-bl-full" />
      
      <Quote className="h-8 w-8 text-gold/20 mb-6 rotate-180" />
      <div className="flex gap-1 mb-6">
        {Array.from({ length: t.rating }).map((_, j) => (
          <motion.div
            key={j}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + j * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Star className="h-4 w-4 fill-gold text-gold" />
          </motion.div>
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-[1.9] mb-8 flex-1">"{t.text}"</p>
      <div className="flex items-center gap-3 pt-6 border-t border-border">
        <div className="w-11 h-11 rounded-full bg-gold-light flex items-center justify-center">
          <span className="text-sm font-bold text-gold font-display">{t.name.charAt(0)}</span>
        </div>
        <span className="font-medium text-foreground text-sm">{t.name}</span>
      </div>
    </motion.div>
  );
}

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleX = useTransform(scrollYProgress, [0, 0.3], ["-25%", "0%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.35], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-18 md:mb-20">
          <motion.span 
            className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 block"
            style={{ opacity: titleOpacity }}
          >
            המלצות
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6"
            style={{ x: titleX, opacity: titleOpacity }}
          >
            מה הלקוחות אומרים
          </motion.h2>
          <motion.div 
            className="h-px bg-gradient-to-l from-transparent via-gold/30 to-transparent max-w-[200px] mx-auto"
            style={{ width: lineWidth }}
          />
          <motion.p 
            className="text-muted-foreground text-sm max-w-sm mx-auto mt-6"
            style={{ opacity: titleOpacity }}
          >
            לקוחות מרוצים שכבר מצאו את הבית שלהם איתנו
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
