import { Home, Key } from "lucide-react";
import { motion } from "framer-motion";
import { ListingType } from "@/data/properties";

interface ListingTypeFilterProps {
  value: ListingType | "הכל";
  onChange: (value: ListingType | "הכל") => void;
}

const ListingTypeFilter = ({ value, onChange }: ListingTypeFilterProps) => {
  const options: { label: string; val: ListingType | "הכל"; icon: typeof Home }[] = [
    { label: "הכל", val: "הכל", icon: Home },
    { label: "מכירה", val: "מכירה", icon: Home },
    { label: "השכרה", val: "השכרה", icon: Key },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-secondary rounded-full p-1.5 border border-border/50 w-fit">
      {options.map((opt) => (
        <motion.button
          key={opt.val}
          onClick={() => onChange(opt.val)}
          className={`relative flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-medium transition-colors duration-300 ${
            value === opt.val
              ? "text-gold-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileTap={{ scale: 0.97 }}
        >
          {value === opt.val && (
            <motion.div
              className="absolute inset-0 bg-gold rounded-full"
              layoutId="filter-bg"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <opt.icon className="h-3.5 w-3.5" />
            {opt.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default ListingTypeFilter;
