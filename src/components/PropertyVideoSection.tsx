import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, MapPin, ArrowLeft, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { Property, formatPrice, isEmbedVideo, getEmbedUrl } from "@/data/properties";
import FadeIn from "@/components/FadeIn";

interface Props {
  properties: Property[];
}

function VideoCard({ property }: { property: Property }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const isEmbed = property.videoUrl ? isEmbedVideo(property.videoUrl) : false;

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isEmbed) {
      setIsMuted((prev) => !prev);
    } else if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, [isEmbed]);

  return (
    <Link to={`/properties/${property.id}`} className="group block">
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-muted shadow-lg border border-border">
        {property.videoUrl && isEmbed ? (
          <iframe
            src={getEmbedUrl(property.videoUrl, isMuted)}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            allow="autoplay; encrypted-media"
          />
        ) : (
          <video
            ref={videoRef}
            src={property.videoUrl}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {property.videoUrl && (
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm shadow-lg transition-all hover:bg-black/70 active:scale-95"
              aria-label={isMuted ? "הפעל צליל" : "השתק"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </button>
          )}
          <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-gold/20">
            <Play className="h-4 w-4 text-gold-foreground fill-current" />
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-6 pointer-events-none">
          <h3 className="text-white font-bold text-lg mb-1.5 leading-tight">{property.name}</h3>
          <div className="flex items-center gap-1.5 text-white/60 text-sm mb-4">
            <MapPin className="h-3.5 w-3.5" />
            {property.location}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gold font-bold text-lg font-display">{formatPrice(property.price)}</span>
            <span className="text-white/50 text-xs flex items-center gap-1 group-hover:text-gold transition-colors duration-300">
              צפו בנכס
              <ArrowLeft className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function PropertyVideoSection({ properties }: Props) {
  const videoProperties = useMemo(() => {
    return properties.filter((p) => p.videoUrl);
  }, [properties]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll on desktop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || videoProperties.length <= 3) return;

    let animId: number;
    let speed = 0.5; // px per frame

    const step = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed;
        // Loop back when reaching the end
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    // Only auto-scroll on md+ screens
    const mq = window.matchMedia("(min-width: 768px)");
    if (mq.matches) {
      animId = requestAnimationFrame(step);
    }
    const onChange = () => {
      if (mq.matches) {
        animId = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(animId);
      }
    };
    mq.addEventListener("change", onChange);

    return () => {
      cancelAnimationFrame(animId);
      mq.removeEventListener("change", onChange);
    };
  }, [isPaused, videoProperties.length]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (videoProperties.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14 md:mb-18">
            <span className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 block">
              סיור וירטואלי
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground leading-tight">
              צפו בנכסים שלנו
            </h2>
            <div className="w-12 h-px bg-gold/25 mx-auto mt-6" />
            <p className="text-muted-foreground mt-5 max-w-md mx-auto text-sm leading-relaxed">
              סרטוני וידאו מקצועיים של הנכסים הבולטים שלנו
            </p>
          </div>
        </FadeIn>

        <div className="relative group/section">
          {/* Navigation arrows – desktop only */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/80 border border-border shadow-lg items-center justify-center backdrop-blur-sm opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 hover:bg-gold hover:text-gold-foreground hover:border-gold"
            aria-label="הבא"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/80 border border-border shadow-lg items-center justify-center backdrop-blur-sm opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 hover:bg-gold hover:text-gold-foreground hover:border-gold"
            aria-label="הקודם"
          >
            <ArrowRight className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
          >
            {videoProperties.map((p, i) => (
              <FadeIn key={p.id} delay={i * 120} scale>
                <div className="min-w-[80vw] sm:min-w-[60vw] md:min-w-[340px] lg:min-w-[380px] snap-center flex-shrink-0">
                  <VideoCard property={p} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
