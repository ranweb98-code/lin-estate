import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, BedDouble, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const propertyTypes = ["הכל", "דירה", "פנטהאוז", "בית פרטי", "דו משפחתי", "דירת גן"];
const roomOptions = ["הכל", "2", "3", "4", "5", "6+"];

const HomeQuickFilters = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("הכל");
  const [rooms, setRooms] = useState("הכל");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (type !== "הכל") params.set("type", type);
    if (rooms !== "הכל") params.set("rooms", rooms);
    navigate(`/properties${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div className="relative -mt-10 z-20 container mx-auto px-4">
      <div className="bg-card/80 backdrop-blur-2xl border border-border rounded-2xl p-6 md:p-8 shadow-xl shadow-black/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          {/* Property Type */}
          <div>
            <label className="text-[11px] font-semibold text-muted-foreground mb-2.5 block uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Home className="h-3 w-3 text-gold" />
              סוג נכס
            </label>
            <div className="flex flex-wrap gap-1.5">
              {propertyTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`text-xs px-3.5 py-2 rounded-full border transition-all duration-200 ${
                    type === t
                      ? "bg-gold text-gold-foreground border-gold"
                      : "bg-secondary border-border text-muted-foreground hover:border-gold/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div>
            <label className="text-[11px] font-semibold text-muted-foreground mb-2.5 block uppercase tracking-[0.2em] flex items-center gap-1.5">
              <BedDouble className="h-3 w-3 text-gold" />
              חדרים
            </label>
            <div className="flex flex-wrap gap-1.5">
              {roomOptions.map((r) => (
                <button
                  key={r}
                  onClick={() => setRooms(r)}
                  className={`text-xs px-3.5 py-2 rounded-full border transition-all duration-200 ${
                    rooms === r
                      ? "bg-gold text-gold-foreground border-gold"
                      : "bg-secondary border-border text-muted-foreground hover:border-gold/30"
                  }`}
                >
                  {r === "הכל" ? r : `${r} חד׳`}
                </button>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <div>
            <Button
              onClick={handleSearch}
              className="w-full bg-gold hover:bg-gold-dark text-gold-foreground gap-2.5 rounded-xl h-12 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gold/15 active:scale-[0.97]"
            >
              <Search className="h-4 w-4" />
              חיפוש נכסים
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeQuickFilters;
