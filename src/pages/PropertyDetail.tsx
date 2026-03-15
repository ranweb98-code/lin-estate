import { useParams, Link } from "react-router-dom";
import { ArrowRight, MapPin, BedDouble, Maximize, MessageCircle, Check } from "lucide-react";
import { formatPrice, generateWhatsAppLink } from "@/data/properties";
import { useProperties } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import PropertyInquiryForm from "@/components/PropertyInquiryForm";

const PropertyDetail = () => {
  const { id } = useParams();
  const { data: properties = [], isLoading } = useProperties();
  const property = properties.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen container mx-auto px-4">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-[4/3] rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">הנכס לא נמצא</h1>
          <Link to="/properties">
            <Button variant="outline" className="rounded-full">חזרה לנכסים</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
            <Link to="/properties" className="hover:text-gold transition-colors duration-300 flex items-center gap-1">
              <ArrowRight className="h-4 w-4" />
              כל הנכסים
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground">{property.name}</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <FadeIn>
            <div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg border border-border">
                <img
                  src={property.images[selectedImage]}
                  alt={property.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 hover:opacity-90 ${
                        selectedImage === i ? "border-gold shadow-md shadow-gold/10" : "border-transparent opacity-50 hover:opacity-70"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Details */}
          <FadeIn delay={200}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                {property.isNew && <Badge className="bg-gold text-gold-foreground border-0 rounded-full px-4 py-1 text-[11px] font-semibold">חדש</Badge>}
                {property.isHot && <Badge className="bg-destructive text-destructive-foreground border-0 rounded-full px-4 py-1 text-[11px] font-semibold">חם!</Badge>}
                <Badge variant="outline" className="rounded-full border-border text-muted-foreground">{property.type}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4 leading-tight">{property.name}</h1>
              <p className="text-3xl font-bold text-gold mb-7 font-display">{formatPrice(property.price)}</p>

              <div className="flex items-center gap-7 text-muted-foreground mb-9 pb-9 border-b border-border flex-wrap">
                <span className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-light flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-gold" />
                  </div>
                  {property.address}
                </span>
                <span className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-light flex items-center justify-center">
                    <BedDouble className="h-4 w-4 text-gold" />
                  </div>
                  {property.rooms} חדרים
                </span>
                <span className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-light flex items-center justify-center">
                    <Maximize className="h-4 w-4 text-gold" />
                  </div>
                  {property.size} מ״ר
                </span>
              </div>

              <h3 className="font-bold text-lg mb-4 font-display">תיאור הנכס</h3>
              <p className="text-muted-foreground leading-[1.9] mb-9">{property.longDescription}</p>

              {property.features.length > 0 && (
                <>
                  <h3 className="font-bold text-lg mb-5 font-display">מאפיינים</h3>
                  <div className="grid grid-cols-2 gap-3 mb-10">
                    {property.features.map((f) => (
                      <span key={f} className="flex items-center gap-3 text-sm text-muted-foreground bg-secondary rounded-xl px-4 py-3.5 border border-border">
                        <Check className="h-4 w-4 text-gold shrink-0" />
                        {f}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <a href={generateWhatsAppLink(property)} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-gold hover:bg-gold-dark text-gold-foreground gap-2.5 text-base rounded-xl h-14 shadow-lg shadow-gold/15 transition-all hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5">
                  <MessageCircle className="h-5 w-5" />
                  שלחו הודעה בוואטסאפ
                </Button>
              </a>

              <div className="mt-8">
                <PropertyInquiryForm property={property} />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
