import { lazy, Suspense, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { ListingType } from "@/data/properties";
import heroBg from "@/assets/hero-bg.jpg";
import FadeIn from "@/components/FadeIn";
import ListingTypeFilter from "@/components/ListingTypeFilter";
import PropertyOfTheWeek from "@/components/PropertyOfTheWeek";
import PropertyVideoSection from "@/components/PropertyVideoSection";
import HomeQuickFilters from "@/components/HomeQuickFilters";
import { Skeleton } from "@/components/ui/skeleton";

const AboutAgent = lazy(() => import("@/components/AboutAgent"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const Index = () => {
  const { data: properties = [], isLoading } = useProperties();
  const [listingType, setListingType] = useState<ListingType | "הכל">("הכל");

  const filtered = properties.filter((p) => {
    if (listingType === "הכל") return true;
    return p.listingType === listingType;
  });

  const displayFeatured = useMemo(() => {
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [filtered]);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[600px] h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="נדלן יוקרתי"
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />




        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center hero-content pt-20 pb-24">
          {/* Tag */}
          <div
            className="inline-flex items-center gap-3 border border-white/25 text-white px-6 py-2.5 rounded-full mb-auto text-[11px] tracking-[0.3em] uppercase font-medium backdrop-blur-sm hero-tag"
            style={{ marginBottom: 'clamp(1rem, 3vh, 3rem)' }}
          >
            <span className="w-2 h-2 rounded-full bg-gold" />
            שירות נדל״ן פרימיום
          </div>

          {/* Main headline */}
          <div className="overflow-hidden" style={{ marginBottom: 'clamp(0.25rem, 0.5vh, 0.75rem)' }}>
            <h1 className="font-display font-bold text-white leading-[0.9] tracking-tight hero-title-1"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}>
              מצאו את הבית
            </h1>
          </div>
          <div className="overflow-hidden" style={{ marginBottom: 'clamp(1rem, 3vh, 3.5rem)' }}>
            <h1 className="font-display font-bold leading-[0.9] tracking-tight hero-title-2"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}>
              <span className="text-gold">המושלם</span>{" "}
              <span className="text-white/80">שלכם</span>
            </h1>
          </div>

          {/* Decorative line */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent hero-line"
               style={{ marginBottom: 'clamp(0.75rem, 2vh, 2.5rem)' }} />

          {/* Subtitle */}
          <p className="text-sm md:text-base text-white/60 max-w-md mx-auto font-light leading-relaxed tracking-wide hero-subtitle"
             style={{ marginBottom: 'clamp(1.5rem, 3vh, 3.5rem)' }}>
            ליה – סוכנת נדל״ן עם שירות אישי, מקצועיות
            וליווי מלא עד סגירת העסקה
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 hero-ctas">
            <Link to="/properties">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-gold-foreground gap-2.5 text-sm px-10 h-13 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30 active:scale-[0.97]">
                צפו בנכסים שלנו
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/ai-finder">
              <Button size="lg" className="bg-white/10 border border-white/20 text-white hover:bg-white/20 gap-2.5 text-sm px-10 h-13 rounded-full backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]">
                <Sparkles className="h-4 w-4" />
                מציאת נכס חכמה
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator - hidden on short viewports */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 hero-scroll">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">גלול</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="animate-bounce-slow">
            <ChevronDown className="h-4 w-4 text-white/30" />
          </div>
        </div>
      </section>

      {/* ─── QUICK FILTERS ─── */}
      <HomeQuickFilters />

      {/* ─── PROPERTY OF THE WEEK ─── */}
      {!isLoading && properties.length > 0 && (
        <PropertyOfTheWeek properties={properties} />
      )}

      {/* ─── PROPERTY VIDEOS ─── */}
      {!isLoading && properties.length > 0 && (
        <PropertyVideoSection properties={properties} />
      )}

      {/* ─── FEATURED PROPERTIES ─── */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
              <div>
                <span className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 block">נכסים נבחרים</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground leading-tight">
                  נכסים מומלצים
                </h2>
                <div className="w-12 h-0.5 bg-gold/30 mt-5" />
              </div>
              <ListingTypeFilter value={listingType} onChange={setListingType} />
            </div>
          </FadeIn>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[440px] rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {displayFeatured.map((p, i) => (
                <FadeIn key={p.id} delay={i * 100} scale>
                  <PropertyCard property={p} />
                </FadeIn>
              ))}
            </div>
          )}

          <FadeIn delay={200}>
            <div className="text-center mt-16">
              <Link to="/properties">
                <Button variant="outline" size="lg" className="gap-2.5 border-border text-foreground hover:bg-gold hover:text-gold-foreground hover:border-gold rounded-full px-12 h-13 text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]">
                  לכל הנכסים
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── ABOUT AGENT ─── */}
      <Suspense fallback={<div className="py-24" />}>
        <AboutAgent />
      </Suspense>

      {/* ─── TESTIMONIALS ─── */}
      <Suspense fallback={<div className="py-24" />}>
        <Testimonials />
      </Suspense>

      {/* ─── CTA ─── */}
      <section className="py-28 md:py-36 relative overflow-hidden grain">
        <div className="absolute inset-0 bg-foreground" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-transparent to-gold/[0.08]" />
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full" />
        <div className="absolute bottom-10 left-10 w-96 h-96 border border-white/5 rounded-full" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn scale>
            <span className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase mb-8 block">טכנולוגיה חכמה</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display mb-6 text-white leading-tight max-w-2xl mx-auto">
              תנו ל-AI למצוא לכם
              <br />
              <span className="text-gold">את הנכס המושלם</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mb-8" />
            <p className="text-white/50 mb-12 max-w-md mx-auto text-base font-light leading-relaxed">
              המערכת החכמה שלנו תמצא לכם את הנכס המושלם בהתאם להעדפות שלכם
            </p>
            <Link to="/ai-finder">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-gold-foreground gap-2.5 text-sm px-12 h-13 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30 active:scale-[0.97]">
                <Sparkles className="h-4 w-4" />
                התחילו עכשיו
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};

export default Index;
