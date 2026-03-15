import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";
import { Property } from "@/data/properties";

interface PropertyInquiryFormProps {
  property: Property;
}

const PropertyInquiryForm = ({ property }: PropertyInquiryFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    // Build WhatsApp message with form data
    const msg = encodeURIComponent(
      `שלום ליה,\n\nשמי ${formData.name}\nטלפון: ${formData.phone}${formData.email ? `\nאימייל: ${formData.email}` : ""}\n\nאני מתעניין/ת בנכס: ${property.name}\n${formData.message ? `\nהודעה: ${formData.message}` : ""}`
    );
    window.open(`https://wa.me/972546739422?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-7 w-7 text-gold" />
        </div>
        <h3 className="font-bold text-lg font-display text-foreground mb-2">הפנייה נשלחה!</h3>
        <p className="text-sm text-muted-foreground">ניצור איתך קשר בהקדם</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-7 md:p-8">
      <h3 className="font-bold text-lg font-display text-foreground mb-1">מתעניינים בנכס?</h3>
      <p className="text-sm text-muted-foreground mb-6">השאירו פרטים ונחזור אליכם</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="שם מלא *"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value.slice(0, 100) }))}
          required
          className="rounded-xl h-12 bg-secondary border-border text-sm"
        />
        <Input
          type="email"
          placeholder="אימייל"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value.slice(0, 255) }))}
          className="rounded-xl h-12 bg-secondary border-border text-sm"
        />
        <Input
          type="tel"
          placeholder="טלפון *"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.slice(0, 20) }))}
          required
          className="rounded-xl h-12 bg-secondary border-border text-sm"
        />
        <Textarea
          placeholder="הודעה (אופציונלי)"
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value.slice(0, 500) }))}
          className="rounded-xl bg-secondary border-border text-sm min-h-[80px] resize-none"
        />
        <Button
          type="submit"
          className="w-full bg-gold hover:bg-gold-dark text-gold-foreground gap-2 rounded-xl h-12 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gold/15 active:scale-[0.97]"
        >
          <Send className="h-4 w-4" />
          שלחו פנייה
        </Button>
      </form>
    </div>
  );
};

export default PropertyInquiryForm;
