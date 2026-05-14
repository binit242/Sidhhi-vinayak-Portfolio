import { motion } from "framer-motion";
import { Target, Eye, Hammer } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

const values = [
  {
    icon: Target,
    title: "Precision",
    desc: "Every detail is meticulously planned and executed to deliver structures that stand the test of time.",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "We see beyond blueprints — envisioning spaces where communities thrive and memories are made.",
  },
  {
    icon: Hammer,
    title: "Craftsmanship",
    desc: "Our skilled artisans and engineers bring decades of experience to every project we undertake.",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const About = () => (
  <main className="pt-24 pb-16">
    <div className="container mx-auto px-6">
      {/* Header */}
      <motion.div
        className="max-w-3xl mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p 
          className="text-accent font-medium tracking-widest uppercase text-sm mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          About Us
        </motion.p>
        
        <motion.h1 
          className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Building Kolkata's Skyline Since 2015
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Sidhhi Vinayak Constructions has been at the forefront of Kolkata's real estate transformation
          for nearly two decades. Founded with a commitment to quality and innovation, we've
          delivered over 100 landmark projects across the city, ranging from luxury residences
          and heritage restorations to modern commercial complexes.
        </motion.p>
      </motion.div>

      {/* Values Grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <BorderGlow 
              animated={true} 
              className="h-full"
            >
              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <v.icon className="h-8 w-8 text-accent mb-4" />
                </motion.div>
                
                <motion.h3 
                  className="font-display text-xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                >
                  {v.title}
                </motion.h3>
                
                <motion.p 
                  className="text-muted-foreground text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.4, duration: 0.5 }}
                >
                  {v.desc}
                </motion.p>
              </div>
            </BorderGlow>
          </motion.div>
        ))}
      </motion.div>

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BorderGlow animated={true}>
          <div className="p-8 md:p-12">
            <motion.h2 
              className="font-display text-2xl font-bold mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Story
            </motion.h2>
            
            <motion.div 
              className="text-muted-foreground leading-relaxed space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.p variants={itemVariants}>
                What began as a small construction firm in 2015 by Amit Ghosh has grown into one
                of Eastern Bengal's most trusted real estate developers. Our journey started with a single
                residential project in Dumdum — 4 apartments built with an obsession for quality
                that set us apart from day one.
              </motion.p>
              <motion.p variants={itemVariants}>
                Today, Sidhhi Vinayak Constructions employs over 80 professionals and has delivered projects
                worth over ₹30 crores. From the bustling lanes of Dumdum to the serene corridors of
                Salt Lake, our buildings dot the Kolkata landscape as testaments to our craft.
              </motion.p>
              <motion.p variants={itemVariants}>
                We believe in sustainable development, community-first design, and creating spaces
                that elevate everyday living. Every project we take on is a promise — to our clients,
                our city, and the future.
              </motion.p>
            </motion.div>
          </div>
        </BorderGlow>
      </motion.div>
    </div>
  </main>
);

export default About;