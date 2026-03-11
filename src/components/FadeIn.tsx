import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  scale?: boolean;
  once?: boolean;
}

const directionOffset = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

const FadeIn = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
  duration = 0.8,
  scale = false,
  once = true,
}: FadeInProps) => {
  const offset = directionOffset[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      ...(scale ? { scale: 0.93 } : {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.12 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
