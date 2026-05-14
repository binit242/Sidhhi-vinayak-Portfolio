import { Link } from "react-router-dom";
import { motion, animate } from "framer-motion";
import { ArrowRight, Building2, Award, Users } from "lucide-react";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-building.jpg";
import Testimonials from "@/components/Testimonials";
import BlurReveal from "@/components/ui/BlurReveal";
import DotField from "@/components/ui/DotField";
import SparkleText from "@/components/ui/SparkleText";

const stats = [
  { icon: Building2, value: "15+", label: "Projects Delivered" },
  { icon: Award, value: "10+", label: "Years of Excellence" },
  { icon: Users, value: "100+", label: "Happy Families" },
];

// Counter component for animated numbers
const CountUpValue = ({ targetValue }: { targetValue: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, targetValue, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (value) => {
        setDisplayValue(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [targetValue]);

  return <span>{displayValue}</span>;
};

const Index = () => {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt="Modern building" 
            className="w-full h-full object-cover" 
          />
          
          <div 
            className="absolute inset-0 z-10"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 80%)',
              maskImage: 'linear-gradient(to right, black 20%, transparent 80%)'
            }}
          >
            <DotField
              dotRadius={1.5}
              dotSpacing={14}
              bulgeStrength={67}
              glowRadius={160}
              sparkle={false}
              waveAmplitude={0}
              cursorRadius={500}
              cursorForce={0.1}
              bulgeOnly
              gradientFrom="#A855F7"
              gradientTo="#B497CF"
              glowColor="#120F17"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20 z-20" />
        </div>

        <div className="relative container mx-auto px-6 py-32 z-30">
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
              transition={{ delay: 0.3 }}
            >
              Kolkata's Finest Builders
            </motion.p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
  <BlurReveal text="We Build" />
  <br />
  <SparkleText className="group relative inline-block">
    <span 
      className="relative z-10 inline-block text-transparent bg-clip-text transition-all duration-700 ease-out 
                 bg-[linear-gradient(110deg,#CB9B51_40%,#FFE6A5_50%,#CB9B51_60%)] 
                 bg-[length:200%_100%] animate-shine
                 group-hover:bg-[linear-gradient(110deg,#FFD700_0%,#FFFACD_50%,#FFD700_100%)]
                 group-hover:drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]"
      style={{
        WebkitBackgroundClip: 'text',
        filter: 'drop-shadow(0 0 12px rgba(203, 155, 81, 0.4))'
      }}
    >
      Landmarks
    </span>
    
    {/* The Molten Smear Glow */}
    <span 
      className="absolute left-0 top-0 z-0 select-none blur-[15px] opacity-40 text-[#CB9B51] 
                 transition-all duration-700 ease-out
                 group-hover:text-[#FFD700] group-hover:opacity-90 group-hover:blur-[40px] group-hover:scale-110"
      aria-hidden="true"
    >
      Landmarks
    </span>
  </SparkleText>
</h1>

            <motion.p 
              className="text-muted-foreground text-lg md:text-xl max-w-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Crafting iconic residential and commercial spaces across Kolkata with
              uncompromising quality and visionary design.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link to="/projects" className="relative inline-block text-lg group">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-amber-900 transition-colors duration-300 ease-out border-2 border-accent rounded-full group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-full bg-amber-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-accent group-hover:-rotate-180 ease"></span>
                  <span className="relative inline-flex items-center gap-2">View Projects <ArrowRight className="h-4 w-4" /></span>
                </span>
                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-#FFD700 rounded-full group-hover:mb-0 group-hover:mr-0"></span>
              </Link>
              
              <Link to="/contact" className="relative px-5 py-3 overflow-hidden font-medium text-gray-800 bg-gray-100 bg-opacity-30 backdrop-blur-lg border border-gray-100 rounded-lg shadow-inner group">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Get in Touch</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.15 }}
              >
                <s.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
                <div className="font-display text-4xl font-bold mb-1">
                  <CountUpValue targetValue={parseInt(s.value)} />
                  <span>+</span>
                </div>
                <div className="text-muted-foreground text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <BlurReveal text="Ready to Build Your Dream?" />
            </h2>
            <motion.p 
              className="text-muted-foreground max-w-md mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Let's discuss your vision. Our team is ready to bring your project to life.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/contact" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-accent transition duration-300 ease-out border-2 border-accent rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-accent group-hover:translate-x-0 ease">
                  <ArrowRight className="w-6 h-6" />
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-accent transition-all duration-300 transform group-hover:translate-x-full ease">Contact Us</span>
                <span className="relative invisible">Contact Us</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;