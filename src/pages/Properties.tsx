import { useState, useMemo } from "react";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatPrice, ListingType } from "@/data/properties";
import { Skeleton } from "@/components/ui/skeleton";
import FadeIn from "@/components/FadeIn";
import ListingTypeFilter from "@/components/ListingTypeFilter";
import { SlidersHorizontal } from "lucide-react";

const Properties = () => {
  const { data: properties = [], isLoading, error } = useProperties();

  const [listingType, setListingType] = useState<ListingType | "הכל">("הכל");
  const [cityFilter, setCityFilter] = useState("הכל");
  const [roomsFilter, setRoomsFilter] = useState("הכל");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 500]);

  const cities = useMemo(() => {
    const set = new Set(properties.map((p) => p.location));
    return ["הכל", ...Array.from(set).sort()];
  }, [properties]);

  const roomOptions = useMemo(() => {
    const set = new Set(properties.map((p) => p.rooms));
    return ["הכל", ...Array.from(set).sort((a, b) => a - b).map(String)];
  }, [properties]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (listingType !== "הכל" && p.listingType !== listingType) return false;
      if (cityFilter !== "הכל" && p.location !== cityFilter) return false;
      if (roomsFilter !== "הכל" && p.rooms !== parseInt(roomsFilter)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (p.size < sizeRange[0] || p.size > sizeRange[1]) return false;
      return true;
    });
  }, [properties, listingType, cityFilter, roomsFilter, priceRange, sizeRange]);

  if (error) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">שגיאה בטעינת נכסים</h1>
          <p className="text-muted-foreground">נסו לרענן את הדף</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 block">קטלוג נכסים</span>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">כל הנכסים</h1>
            <div className="w-12 h-px bg-gold/25 mx-auto mb-5" />
            <p className="text-muted-foreground max-w-md mx-auto text-sm">מבחר נכסים באשדוד והסביבה</p>
          </div>
        </FadeIn>

        <FadeIn delay={50}>
          <div className="mb-8">
            <ListingTypeFilter value={listingType} onChange={setListingType} />
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mb-10 bg-card border border-border rounded-2xl p-7 md:p-9 shadow-sm">
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-8 h-8 rounded-xl bg-gold-light flex items-center justify-center">
                <SlidersHorizontal className="h-4 w-4 text-gold" />
              </div>
              <span className="text-sm font-semibold text-foreground">סינון נכסים</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground mb-3 block uppercase tracking-[0.2em]">מיקום</span>
                <div className="flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <Button
                      key={c}
                      size="sm"
                      variant={cityFilter === c ? "default" : "outline"}
                      className={`rounded-full transition-all text-xs ${cityFilter === c ? "bg-gold text-gold-foreground hover:bg-gold-dark" : "border-border hover:bg-secondary hover:border-gold/20"}`}
                      onClick={() => setCityFilter(c)}
                    >
                      {c}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-muted-foreground mb-3 block uppercase tracking-[0.2em]">חדרים</span>
                <div className="flex flex-wrap gap-2">
                  {roomOptions.map((r) => (
                    <Button
                      key={r}
                      size="sm"
                      variant={roomsFilter === r ? "default" : "outline"}
                      className={`rounded-full transition-all text-xs ${roomsFilter === r ? "bg-gold text-gold-foreground hover:bg-gold-dark" : "border-border hover:bg-secondary hover:border-gold/20"}`}
                      onClick={() => setRoomsFilter(r)}
                    >
                      {r === "הכל" ? r : `${r} חד׳`}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7">
              <span className="text-[11px] font-semibold text-muted-foreground mb-3 block uppercase tracking-[0.2em]">
                טווח מחיר: {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
              </span>
              <div className="px-2">
                <Slider
                  min={0}
                  max={10000000}
                  step={100000}
                  value={priceRange}
                  onValueChange={(v) => setPriceRange(v as [number, number])}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-7">
              <span className="text-[11px] font-semibold text-muted-foreground mb-3 block uppercase tracking-[0.2em]">
                גודל: {sizeRange[0]} מ״ר – {sizeRange[1]} מ״ר
              </span>
              <div className="px-2">
                <Slider
                  min={0}
                  max={500}
                  step={10}
                  value={sizeRange}
                  onValueChange={(v) => setSizeRange(v as [number, number])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[440px] rounded-2xl" />
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-7">{filtered.length} נכסים נמצאו</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((p, i) => (
                <FadeIn key={p.id} delay={i * 80}>
                  <PropertyCard property={p} />
                </FadeIn>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-24 text-muted-foreground">
                <p className="text-lg">לא נמצאו נכסים בקריטריונים שנבחרו</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Properties;
