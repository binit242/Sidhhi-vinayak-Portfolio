import React, { useRef } from "react";
import { motion } from "framer-motion";

interface SparkleTextProps {
  children: React.ReactNode;
  className?: string;
  sparklesCount?: number;
}

const SparkleText: React.FC<SparkleTextProps> = ({ children, className }) => {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ scale: 1, filter: "brightness(1) saturate(1)" }}
      whileHover={{ 
        scale: 1.02, 
        // Brightness makes it glow, Saturate makes the gold "pop"
        filter: "brightness(1.3) saturate(1.5)",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ display: "inline-block", position: "relative", cursor: "pointer" }}
    >
      {children}
    </motion.span>
  );
};

export default SparkleText;