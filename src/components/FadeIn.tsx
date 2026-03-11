import { ReactNode, useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  scale?: boolean;
  once?: boolean;
}

const FadeIn = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
  duration = 0.6,
  scale = false,
  once = true,
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const directionStyles: Record<string, string> = {
    up: "translate3d(0, 24px, 0)",
    down: "translate3d(0, -24px, 0)",
    left: "translate3d(30px, 0, 0)",
    right: "translate3d(-30px, 0, 0)",
    none: "translate3d(0, 0, 0)",
  };

  const hiddenTransform = directionStyles[direction];
  const scaleVal = scale ? "scale(0.95)" : "";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0) scale(1)"
          : `${hiddenTransform} ${scaleVal}`,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay / 1000}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay / 1000}s`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
