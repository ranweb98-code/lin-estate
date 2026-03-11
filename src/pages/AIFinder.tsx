import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, RotateCcw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property, formatPrice, generateWhatsAppLink } from "@/data/properties";
import { useProperties } from "@/hooks/useProperties";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import FadeIn from "@/components/FadeIn";

interface StepConfig {
  title: string;
  key: string;
  type: "options" | "slider";
  options?: { label: string; value: string }[];
  sliderConfig?: { min: number; max: number; step: number };
}

const steps: StepConfig[] = [
  {
    title: "מה התקציב שלכם?",
    key: "budget",
    type: "slider",
    sliderConfig: { min: 500000, max: 5000000, step: 100000 },
  },
  {
    title: "איזה סוג נכס מעניין אתכם?",
    key: "type",
    type: "options",
    options: [
      { label: "דירה", value: "דירה" },
      { label: "פנטהאוז", value: "פנטהאוז" },
      { label: "בית פרטי", value: "בית פרטי" },
      { label: "דו משפחתי", value: "דו משפחתי" },
      { label: "דירת גן", value: "דירת גן" },
    ],
  },
  {
    title: "כמה חדרים?",
    key: "rooms",
    type: "options",
    options: [
      { label: "2 חדרים", value: "2" },
      { label: "3 חדרים", value: "3" },
      { label: "4 חדרים", value: "4" },
      { label: "5 חדרים", value: "5" },
      { label: "6+ חדרים", value: "6" },
    ],
  },
  {
    title: "באיזה מיקום?",
    key: "location",
    type: "options",
    options: [
      { label: "אשדוד", value: "אשדוד" },
      { label: "אשקלון", value: "אשקלון" },
      { label: "יבנה", value: "יבנה" },
      { label: "גן יבנה", value: "גן יבנה" },
      { label: "הסביבה", value: "הסביבה" },
    ],
  },
  {
    title: "מה הכי חשוב לכם?",
    key: "priority",
    type: "options",
    options: [
      { label: "מחיר נמוך", value: "cheap" },
      { label: "נכס גדול", value: "big" },
      { label: "נכס להשקעה", value: "investment" },
      { label: "נכס למשפחה", value: "family" },
      { label: "נכס יוקרתי", value: "luxury" },
    ],
  },
];

function scoreProperty(property: Property, selections: Record<string, string>): number {
  let score = 0;
  const budgetParts = selections.budget?.split("-");
  if (budgetParts && budgetParts.length === 2) {
    const bMin = parseInt(budgetParts[0]);
    const bMax = parseInt(budgetParts[1]);
    if (property.price >= bMin && property.price <= bMax) score += 25;
    else if (property.price <= bMax * 1.2 && property.price >= bMin * 0.8) score += 12;
    else score += 5;
  } else {
    score += 10;
  }
  if (property.type === selections.type) score += 25; else score += 5;
  const rooms = parseInt(selections.rooms);
  if (property.rooms === rooms) score += 20;
  else if (Math.abs(property.rooms - rooms) === 1) score += 12; else score += 3;
  if (selections.location === "הסביבה") score += 15;
  else if (property.location === selections.location) score += 20; else score += 5;
  switch (selections.priority) {
    case "cheap": score += property.price < 1500000 ? 10 : property.price < 2000000 ? 6 : 2; break;
    case "big": score += property.size >= 200 ? 10 : property.size >= 130 ? 7 : 3; break;
    case "investment": score += property.rooms <= 3 && property.price < 1500000 ? 10 : 4; break;
    case "family": score += property.rooms >= 4 && (property.type === "דירת גן" || property.type === "דו משפחתי" || property.type === "בית פרטי") ? 10 : property.rooms >= 4 ? 7 : 3; break;
    case "luxury": score += property.price >= 3000000 ? 10 : property.price >= 2000000 ? 7 : 3; break;
  }
  return Math.min(Math.round(score), 100);
}

const formatSliderPrice = (value: number): string => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M ₪`;
  return `${(value / 1000).toFixed(0)}K ₪`;
};

const AIFinder = () => {
  const { data: properties = [], isLoading } = useProperties();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([1000000, 3000000]);

  const handleSelect = (value: string) => {
    const key = steps[currentStep].key;
    const newSelections = { ...selections, [key]: value };
    setSelections(newSelections);
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 500);
    }
  };

  const reset = () => { setCurrentStep(0); setSelections({}); setShowResults(false); };

  const results = showResults
    ? properties.map((p) => ({ property: p, score: scoreProperty(p, selections) })).sort((a, b) => b.score - a.score).slice(0, 4)
    : [];

  const progress = showResults ? 100 : ((currentStep) / steps.length) * 100;

  if (isLoading) {
    return (
      <div className="pt-28 pb-16 min-h-screen container mx-auto px-4 max-w-2xl">
        <Skeleton className="h-10 w-64 mx-auto mb-8" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <FadeIn>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gold-light text-gold px-5 py-2.5 rounded-full mb-6 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>מציאת נכס חכמה</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4 leading-tight">
              בואו נמצא לכם
              <br />
              <span className="text-gold">את הנכס המושלם</span>
            </h1>
            <p className="text-muted-foreground">ענו על כמה שאלות ונמצא לכם את ההתאמה הטובה ביותר</p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2 uppercase tracking-wide">
              <span>שלב {showResults ? steps.length : currentStep + 1} מתוך {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </FadeIn>

        {!showResults ? (
          <FadeIn delay={200}>
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-8">{steps[currentStep].title}</h2>
              
              {steps[currentStep].type === "slider" && steps[currentStep].sliderConfig ? (
                <div className="space-y-8">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>מינימום</span>
                    <span>מקסימום</span>
                  </div>
                  <Slider
                    value={budgetRange}
                    onValueChange={(val) => setBudgetRange(val as [number, number])}
                    min={steps[currentStep].sliderConfig!.min}
                    max={steps[currentStep].sliderConfig!.max}
                    step={steps[currentStep].sliderConfig!.step}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between">
                    <div className="bg-gold-light border border-gold/20 rounded-xl px-5 py-3 text-center min-w-[130px]">
                      <p className="text-xs text-muted-foreground mb-0.5">מ-</p>
                      <p className="text-lg font-bold text-gold">{formatSliderPrice(budgetRange[0])}</p>
                    </div>
                    <div className="h-px flex-1 bg-border mx-4" />
                    <div className="bg-gold-light border border-gold/20 rounded-xl px-5 py-3 text-center min-w-[130px]">
                      <p className="text-xs text-muted-foreground mb-0.5">עד</p>
                      <p className="text-lg font-bold text-gold">{formatSliderPrice(budgetRange[1])}</p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gold hover:bg-gold-dark text-gold-foreground h-12 rounded-xl text-base font-medium"
                    onClick={() => {
                      const value = `${budgetRange[0]}-${budgetRange[1]}`;
                      handleSelect(value);
                    }}
                  >
                    המשך
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {steps[currentStep].options?.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-right p-5 rounded-xl border-2 transition-all duration-300 text-base font-medium hover:border-gold hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-md ${
                        selections[steps[currentStep].key] === opt.value
                          ? "border-gold bg-gold-light shadow-md"
                          : "border-border bg-background"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  className="mt-6 gap-2 text-muted-foreground"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ArrowRight className="h-4 w-4" />
                  חזרה
                </Button>
              )}
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <div>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-3">
                  הנכסים המתאימים ביותר עבורכם
                </h2>
                <p className="text-muted-foreground">מצאנו {results.length} נכסים שמתאימים להעדפות שלכם</p>
              </div>

              <div className="space-y-4">
                {results.map((r, i) => (
                  <div
                    key={r.property.id}
                    className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                      i === 0 ? "border-gold ring-2 ring-gold/20" : "border-border"
                    }`}
                  >
                    {i === 0 && (
                      <div className="bg-gold text-gold-foreground text-center py-2.5 text-sm font-bold tracking-wide">
                        ⭐ ההתאמה הטובה ביותר
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row">
                      <Link to={`/properties/${r.property.id}`} className="block shrink-0">
                        <img
                          src={r.property.image}
                          alt={r.property.name}
                          className="w-full sm:w-52 h-44 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                          loading="lazy"
                        />
                      </Link>
                      <div className="p-5 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Link to={`/properties/${r.property.id}`} className="font-bold text-foreground hover:text-gold transition-colors duration-300 text-lg">{r.property.name}</Link>
                          <span className="text-xs font-bold text-gold bg-gold-light px-3 py-1.5 rounded-full">
                            {r.score}% התאמה
                          </span>
                        </div>
                        <p className="text-gold font-bold text-lg mb-2">{formatPrice(r.property.price)}</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {r.property.rooms} חד׳ · {r.property.size} מ״ר · {r.property.location}
                        </p>
                        <a href={generateWhatsAppLink(r.property)} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-gold hover:bg-gold-dark text-gold-foreground gap-2 rounded-xl">
                            <MessageCircle className="h-4 w-4" />
                            שלחו הודעה על הנכס הזה
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button variant="outline" className="gap-2 rounded-full px-8 border-border" onClick={reset}>
                  <RotateCcw className="h-4 w-4" />
                  חיפוש חדש
                </Button>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default AIFinder;
