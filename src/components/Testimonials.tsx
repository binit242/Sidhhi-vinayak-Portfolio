import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import BlurReveal from "@/components/ui/BlurReveal"; // Import your new component

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Homeowner, Salt Lake",
    rating: 5,
    text: "Edifice delivered our dream home on time and beyond expectations. The attention to detail in every corner is remarkable. Truly world-class construction quality.",
  },
  {
    name: "Priya Mukherjee",
    role: "Investor, New Town",
    rating: 5,
    text: "As a real estate investor, I've worked with many builders. Edifice stands out for their transparency, build quality, and commitment to timelines. Highly recommended.",
  },
  {
    name: "Amit Ghosh",
    role: "Resident, Rajarhat",
    rating: 4,
    text: "Living in an Edifice property for two years now. The community design, green spaces, and modern amenities make it a joy. The after-sales service is top-notch.",
  },
  {
    name: "Sunita Das",
    role: "Business Owner, Park Street",
    rating: 5,
    text: "Our commercial space by Edifice has been a game-changer for our business. Premium location, elegant design, and excellent infrastructure. Worth every penny.",
  },
  {
    name: "Debashis Roy",
    role: "Homeowner, Howrah",
    rating: 5,
    text: "From the first meeting to the handover, the entire experience was seamless. Edifice truly cares about their customers and it shows in every interaction.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="py-24 bg-card border-y border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">
            Testimonials
          </p>
          <BlurReveal text="What Our Clients Say" className="font-display text-3xl md:text-4xl font-bold"/>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <Quote className="absolute -top-2 left-0 h-10 w-10 text-accent/20" />

          <div className="min-h-[220px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full text-center px-8"
              >
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < t.rating
                          ? "text-accent fill-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground/90 text-lg leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <p className="font-display font-semibold">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-accent" : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;