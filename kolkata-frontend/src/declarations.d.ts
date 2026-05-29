// Tells TypeScript to accept .jsx component imports
declare module "@/components/DotField" {
  import { FC } from "react";
  interface DotFieldProps {
    dotRadius?: number;
    dotSpacing?: number;
    bulgeStrength?: number;
    glowRadius?: number;
    sparkle?: boolean;
    waveAmplitude?: number;
    cursorRadius?: number;
    cursorForce?: number;
    bulgeOnly?: boolean;
    gradientFrom?: string;
    gradientTo?: string;
    glowColor?: string;
  }
  const DotField: FC<DotFieldProps>;
  export default DotField;
}

declare module "@/components/BorderGlow" {
  import { FC, ReactNode } from "react";
  interface BorderGlowProps {
    children: ReactNode;
    animated?: boolean;
    backgroundColor?: string;
    borderRadius?: number;
    className?: string;
    colors?: string[];
    coneSpread?: number;
    edgeSensitivity?: number;
    fillOpacity?: number;
    glowColor?: string;
    glowIntensity?: number;
    glowRadius?: number;
    lightModeGlowColor?: "green" | "golden" | "pink";
  }
  const BorderGlow: FC<BorderGlowProps>;
  export default BorderGlow;
}

declare module "@/components/ui/BlurReveal" {
  import { FC } from "react";
  interface BlurRevealProps {
    text: string;
    className?: string;
    stagger?: number;
  }
  const BlurReveal: FC<BlurRevealProps>;
  export default BlurReveal;
}

declare module "@/components/ui/SparkleText" {
  import { FC, ReactNode } from "react";
  interface SparkleTextProps {
    children: ReactNode;
    className?: string;
  }
  const SparkleText: FC<SparkleTextProps>;
  export default SparkleText;
}

declare module "@/components/BentoGallery" {
  import { FC } from "react";
  interface BentoGalleryProps {
    images: string[];
    name: string;
  }
  const BentoGallery: FC<BentoGalleryProps>;
  export default BentoGallery;
}

declare module "@/components/ProjectCard" {
  import { FC } from "react";
  const ProjectCard: FC<{ project: any; index: number }>;
  export default ProjectCard;
}

declare module "@/components/ThemeToggle" {
  import { FC } from "react";
  interface ThemeToggleProps {
    isDark: boolean;
    toggle: () => void;
  }
  const ThemeToggle: FC<ThemeToggleProps>;
  export default ThemeToggle;
}

declare module "@/components/PageTransition" {
  import { FC, ReactNode } from "react";
  interface PageTransitionProps {
    children: ReactNode;
  }
  const PageTransition: FC<PageTransitionProps>;
  export default PageTransition;
}
