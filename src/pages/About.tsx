import { motion } from "framer-motion";
import { Target, Eye, Hammer } from "lucide-react";

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
        <p className="text-accent font-medium tracking-widest uppercase text-sm mb-3">About Us</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Building Kolkata's Skyline Since 2005
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Edifice Constructions has been at the forefront of Kolkata's real estate transformation
          for nearly two decades. Founded with a commitment to quality and innovation, we've
          delivered over 150 landmark projects across the city, ranging from luxury residences
          and heritage restorations to modern commercial complexes.
        </p>
      </motion.div>

      {/* Values */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            className="bg-card border border-border rounded-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <v.icon className="h-8 w-8 text-accent mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Story */}
      <motion.div
        className="bg-card border border-border rounded-lg p-8 md:p-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl font-bold mb-4">Our Story</h2>
        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            What began as a small construction firm in 2005 by Rajesh Mukherjee has grown into one
            of Eastern India's most trusted real estate developers. Our journey started with a single
            residential project in Salt Lake — 24 apartments built with an obsession for quality
            that set us apart from day one.
          </p>
          <p>
            Today, Edifice Constructions employs over 800 professionals and has delivered projects
            worth over ₹3,000 crores. From the bustling lanes of Howrah to the serene corridors of
            Alipore, our buildings dot the Kolkata landscape as testaments to our craft.
          </p>
          <p>
            We believe in sustainable development, community-first design, and creating spaces
            that elevate everyday living. Every project we take on is a promise — to our clients,
            our city, and the future.
          </p>
        </div>
      </motion.div>
    </div>
  </main>
);

export default About;
