import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface GoldShineTextProps {
  children: React.ReactNode;
  className?: string;
}

// CSS for the shine effect
const shineStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  color: "#FFD700", // Gold
  background: "linear-gradient(92deg, #FFD700 30%, #FFF8DC 50%, #FFD700 70%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0 0 8px #FFD70088)",
  overflow: "hidden"
};

const GoldShineText: React.FC<GoldShineTextProps> = ({ children, className }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLSpanElement>(null);

  // Animate shine on mount
  React.useEffect(() => {
    controls.start({
      WebkitMaskPosition: ["-100% 0", "200% 0"],
      transition: { duration: 1.2, ease: "easeInOut" }
    });
  }, [controls]);

  // Animate on hover
  const handleMouseEnter = () => {
    controls.start({
      WebkitMaskPosition: ["-100% 0", "200% 0"],
      transition: { duration: 1.2, ease: "easeInOut" }
    });
  };
  const handleMouseLeave = () => {
    controls.start({ WebkitMaskPosition: "-100% 0" });
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={shineStyle}
      animate={controls}
      initial={{ WebkitMaskPosition: "-100% 0" }}
      whileHover={{ WebkitMaskPosition: "200% 0" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine overlay */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.9) 50%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(120deg, transparent 40%, white 50%, transparent 60%)",
          maskImage: "linear-gradient(120deg, transparent 40%, white 50%, transparent 60%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "200% 100%",
          maskSize: "200% 100%",
          animation: "gold-shine 2s linear infinite"
        }}
      />
      {children}
      <style>{`
        @keyframes gold-shine {
          0% { WebkitMaskPosition: -100% 0; mask-position: -100% 0; }
          100% { WebkitMaskPosition: 200% 0; mask-position: 200% 0; }
        }
      `}</style>
    </motion.span>
  );
};

export default GoldShineText;
