import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/972546739422?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%9C%D7%99%D7%94%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A0%D7%95%D7%A1%D7%A4%D7%99%D7%9D."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      title="שלחו הודעה בוואטסאפ"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <div className="relative bg-[#25D366] text-white rounded-full p-4 shadow-xl shadow-[#25D366]/25 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-[#25D366]/30 active:scale-95">
          <MessageCircle className="h-6 w-6" />
        </div>
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
