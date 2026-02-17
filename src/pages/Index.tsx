import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Award, Users } from "lucide-react";
import heroImg from "@/assets/hero-building.jpg";
import Testimonials from "@/components/Testimonials";

const stats = [
  { icon: Building2, value: "150+", label: "Projects Delivered" },
  { icon: Award, value: "18", label: "Years of Excellence" },
  { icon: Users, value: "5,000+", label: "Happy Families" },
];

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Modern building" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        </div>
        <div className="relative container mx-auto px-6 py-32">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-accent font-medium tracking-widest uppercase text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}>
              Kolkata's Finest Builders
            </motion.p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              We Build
              <br />
              <span className="text-gradient">Landmarks</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
              Crafting iconic residential and commercial spaces across Kolkata with
              uncompromising quality and visionary design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <s.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
                <div className="font-display text-4xl font-bold mb-1">{s.value}</div>
                <div className="text-muted-foreground text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Dream?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Let's discuss your vision. Our team is ready to bring your project to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
