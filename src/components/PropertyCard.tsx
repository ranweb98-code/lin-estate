import { Link } from "react-router-dom";
import { MapPin, BedDouble, Maximize, MessageCircle, Crown } from "lucide-react";

import { Property, formatPrice, generateWhatsAppLink } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const isFeatured = property.featuredWeek || property.isHot;

  return (
    <div className={`group bg-card rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shine ${
      isFeatured ? "border-gold/30 shadow-lg shadow-gold/5" : "border-border hover:border-gold/20 hover:shadow-xl"
    }`}>
      <Link to={`/properties/${property.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-1.5">
          {isFeatured && (
            <Badge className="bg-gold text-gold-foreground border-0 text-[10px] px-3 py-1 font-semibold tracking-wide gap-1">
              <Crown className="h-3 w-3" />
              מומלץ
            </Badge>
          )}
          {property.isNew && (
            <Badge className="bg-foreground/80 backdrop-blur-sm text-background border-0 text-[10px] px-3 py-1 font-semibold tracking-wide">חדש</Badge>
          )}
          {property.isHot && (
            <Badge className="bg-destructive text-destructive-foreground border-0 text-[10px] px-3 py-1 font-semibold tracking-wide">חם!</Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <span className="text-gold font-bold text-2xl font-display drop-shadow-lg tracking-tight">
            {formatPrice(property.price)}
          </span>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/properties/${property.id}`}>
          <h3 className="font-semibold text-foreground mb-2 hover:text-gold transition-colors duration-300 line-clamp-1 text-[15px]">
            {property.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-5 line-clamp-2 leading-relaxed">{property.description}</p>

        <div className="flex items-center gap-5 text-[11px] text-muted-foreground mb-5 pb-5 border-b border-border">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-gold" />
            {property.location}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3 w-3 text-gold" />
            {property.rooms} חד׳
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="h-3 w-3 text-gold" />
            {property.size} מ״ר
          </span>
        </div>

        <a href={generateWhatsAppLink(property)} target="_blank" rel="noopener noreferrer" className="w-full block">
          <Button className="w-full bg-gold hover:bg-gold-dark text-gold-foreground gap-2 rounded-xl h-11 text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gold/15 active:scale-[0.97]">
            <MessageCircle className="h-3.5 w-3.5" />
            שלחו הודעה בוואטסאפ
          </Button>
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
