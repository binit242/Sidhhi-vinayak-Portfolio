import { motion } from "framer-motion";

const BlurReveal = ({ 
  text, 
  className = "", 
  delayOffset = 0, 
  duration = 0.8,
  stagger = 0.1 
}) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delayOffset,
      },
    },
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 10, 
      filter: "blur(8px)" 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hidden" // This forces it to "reset" and re-animate on hover
      viewport={{ once: false, amount: 0.5 }}
      className={`inline-block cursor-default ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default BlurReveal;