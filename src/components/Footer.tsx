import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  isDark: boolean;
}

const Footer = ({ isDark }: Props) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Logo animation (Apple-like)
  const logoVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    click: { scale: 0.95 },
  };

  // Link animation (Apple-like)
  const linkVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02, color: "var(--foreground)" },
    click: { scale: 0.98 },
  };

  // Underline animation for links
  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* Logo Section */}
          <motion.div variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <Link to="/" className="flex items-center gap-2 mb-3 w-fit">
                <motion.div
                  variants={logoVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="click"
                >
                  <img
                    src={isDark ? "/only symbol dark.png" : "/only symbol normal.png"}
                    alt="Logo symbol"
                    className="h-10 w-auto"
                  />
                </motion.div>
                <motion.div
                  variants={logoVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="click"
                >
                  <img
                    src={isDark ? "/only text dark.png" : "/only text normal.png"}
                    alt="Logo text"
                    className="h-8 w-auto pt-1"
                  />
                </motion.div>
              </Link>
            </motion.div>
            <motion.p
              className="text-muted-foreground text-sm leading-relaxed max-w-xs"
              variants={itemVariants}
            >
              Building Kolkata's future, one landmark at a time. Quality construction since 2015.
            </motion.p>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={itemVariants}>
            <motion.h4
              className="font-display font-semibold mb-3"
              variants={itemVariants}
            >
              Quick Links
            </motion.h4>
            <motion.div className="flex flex-col gap-2 text-sm" variants={containerVariants}>
              {links.map((link) => (
                <motion.div
                  key={link.to}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredLink(link.to)}
                  onHoverEnd={() => setHoveredLink(null)}
                  className="relative w-fit"
                >
                  <motion.div
                    variants={linkVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="click"
                  >
                    <Link
                      to={link.to}
                      className="text-muted-foreground relative inline-block"
                    >
                      {link.label}
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground origin-left"
                        variants={underlineVariants}
                        initial="hidden"
                        animate={hoveredLink === link.to ? "visible" : "hidden"}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </Link>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={
                      hoveredLink === link.to
                        ? { opacity: 0.1 }
                        : { opacity: 0 }
                    }
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants}>
            <motion.h4
              className="font-display font-semibold mb-3"
              variants={itemVariants}
            >
              Contact
            </motion.h4>
            <motion.div className="flex flex-col gap-2 text-sm text-muted-foreground" variants={containerVariants}>
              <motion.p variants={itemVariants}>40 ,Jhilbagan ,Dumdum ,kolkata-7000030 ,WestBengal ,India</motion.p>
              <motion.p variants={itemVariants}>+91 8906693045  /  +91 7003070730</motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          © {new Date().getFullYear()} Sidhhi Vinayak Constructions. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
