import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface Props {
  isDark: boolean;
  toggle: () => void;
}

const ThemeToggle = ({ isDark, toggle }: Props) => {
  return (
    <button
      onClick={toggle}
      className="relative h-8 w-14 rounded-full bg-secondary border border-border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-accent flex items-center justify-center"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className="h-4 w-4 text-accent-foreground" />
          ) : (
            <Sun className="h-4 w-4 text-accent-foreground" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
