import { motion } from "framer-motion";
import liyaPhoto from "@/assets/liya-photo.jpeg";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";

const stats = [
  { value: 150, label: "נכסים שנמכרו", suffix: "+" },
  { value: 200, label: "לקוחות מרוצים", suffix: "+" },
  { value: 10, label: "שנות ניסיון", suffix: "+" },
];

const AboutAgent = () => {
  return (
    <section className="py-28 md:py-40 bg-secondary relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[150px] -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">

          {/* Right side — Photo */}
          <FadeIn direction="right" className="flex justify-center lg:justify-end order-1">
            <div className="relative">
              <motion.div
                className="absolute -inset-4 md:-inset-5 border border-gold/15 rounded-3xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute -top-4 -right-4 md:-top-5 md:-right-5 w-10 h-10 border-t-2 border-r-2 border-gold/30 rounded-tr-2xl" />
              <div className="absolute -bottom-4 -left-4 md:-bottom-5 md:-left-5 w-10 h-10 border-b-2 border-l-2 border-gold/30 rounded-bl-2xl" />

              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={liyaPhoto}
                  alt="ליה – סוכנת נדל״ן"
                  className="w-[280px] md:w-[360px] lg:w-[400px] h-[380px] md:h-[480px] lg:h-[540px] object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </div>
          </FadeIn>

          {/* Left side — Content */}
          <FadeIn direction="left" delay={150} className="order-2 text-center lg:text-right">
            <div className="max-w-lg mx-auto lg:mx-0 lg:mr-0">
              <span className="inline-block text-gold text-[10px] font-semibold tracking-[0.3em] uppercase mb-6 border border-gold/20 px-5 py-2 rounded-full">
                הסוכנת שלכם
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-3 leading-[1.05]">
                ליה נדל״ן
              </h2>

              <p className="text-lg md:text-xl text-gold font-medium mb-6">
                מומחית לנכסי פרימיום באשדוד
              </p>

              <div className="w-14 h-px bg-gold/25 mb-7 mx-auto lg:mx-0 lg:mr-0" />

              <p className="text-muted-foreground leading-[1.9] text-[15px] mb-14">
                ליווי אישי ומקצועי למציאת הנכס המושלם עבורכם. עם ניסיון עשיר
                בשוק הנדל״ן באשדוד, אני מלווה קונים, מוכרים ומשקיעים בתהליך
                חלק ובטוח מתחילתו ועד סגירת העסקה.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center lg:text-right"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + i * 0.12,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      className="text-3xl md:text-4xl font-bold font-display text-gold tabular-nums"
                    />
                    <p className="text-muted-foreground text-xs mt-2 tracking-wide">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutAgent;
