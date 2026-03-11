import { Link } from "react-router-dom";
import { MapPin, BedDouble, Maximize, Star, MessageCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Property, formatPrice } from "@/data/properties";
import FadeIn from "@/components/FadeIn";

interface PropertyOfTheWeekProps {
  properties: Property[];
}

const PropertyOfTheWeek = ({ properties }: PropertyOfTheWeekProps) => {
  const property =
    properties.find((p) => p.featuredWeek) ||
    properties.find((p) => p.isHot) ||
    properties.find((p) => p.isNew) ||
    properties[0];

  if (!property) return null;

  const whatsAppMessage = encodeURIComponent(
    `שלום ליה,\n\nראיתי את נכס השבוע באתר ואני מעוניין/ת לקבל עליו פרטים נוספים:\n\nשם הנכס: ${property.name}\nאזור: ${property.location}\nמחיר: ${formatPrice(property.price)}\nחדרים: ${property.rooms}\n\nאשמח לשמוע ממך.`
  );
  const whatsAppLink = `https://wa.me/972534213841?text=${whatsAppMessage}`;

  return (
    <section className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn direction="none" scale>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 border border-gold/20 text-gold px-5 py-2 rounded-full mb-6 text-[11px] tracking-[0.2em] uppercase font-medium">
              <Star className="h-3.5 w-3.5 fill-gold" />
              <span>נבחר במיוחד</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground">
              נכס השבוע
            </h2>
            <div className="w-12 h-px bg-gold/25 mx-auto mt-6" />
          </div>
        </FadeIn>

        <div className="max-w-5xl mx-auto">
          <FadeIn delay={150} scale>
            <motion.div
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative overflow-hidden group">
                  <motion.img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-[300px] md:h-[380px] lg:h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <motion.div
                    className="absolute top-4 right-4 bg-gold text-gold-foreground px-4 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-2 tracking-wide"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Star className="h-3 w-3 fill-current" />
                    הזדמנות השבוע
                  </motion.div>
                </div>

                {/* Details */}
                <div className="p-8 md:p-10 lg:p-14 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-3 leading-tight">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-7">
                    <MapPin className="h-3.5 w-3.5 text-gold" />
                    <span>{property.location}</span>
                  </div>

                  <span className="text-3xl md:text-4xl font-bold font-display text-gold mb-7 block">
                    {formatPrice(property.price)}
                  </span>

                  <div className="flex items-center gap-8 py-6 border-y border-border mb-7">
                    <div className="flex items-center gap-2.5">
                      <BedDouble className="h-4 w-4 text-gold" />
                      <span className="text-lg font-bold text-foreground">{property.rooms}</span>
                      <span className="text-muted-foreground text-xs">חדרים</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Maximize className="h-4 w-4 text-gold" />
                      <span className="text-lg font-bold text-foreground">{property.size}</span>
                      <span className="text-muted-foreground text-xs">מ״ר</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-9">
                    {property.description || property.longDescription}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to={`/properties/${property.id}`} className="flex-1">
                      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="w-full bg-gold hover:bg-gold-dark text-gold-foreground gap-2 h-12 rounded-full text-sm hover:shadow-lg hover:shadow-gold/15 transition-all">
                          לצפייה בנכס
                          <ArrowLeft className="h-3.5 w-3.5" />
                        </Button>
                      </motion.div>
                    </Link>
                    <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" variant="outline" className="w-full gap-2 h-12 rounded-full text-sm border-border hover:bg-secondary">
                          <MessageCircle className="h-3.5 w-3.5" />
                          וואטסאפ
                        </Button>
                      </motion.div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default PropertyOfTheWeek;
