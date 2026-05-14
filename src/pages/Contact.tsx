import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import BorderGlow from "@/components/BorderGlow";
import BlurReveal from "@/components/ui/BlurReveal"; // Import your new component

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    setSending(true);
    // Simulate submission
    setTimeout(() => {
      setSending(false);
      toast.success("Thank you! We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-3">Contact</p>
          
          {/* Replaced standard H1 with BlurReveal */}
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <BlurReveal text="Let's Talk" stagger={0.2} />
          </h1>

          <p className="text-muted-foreground text-lg">
            Have a project in mind? Fill in the form and our team will reach out within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form Wrapped in BorderGlow */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <BorderGlow animated borderRadius={16}>
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                      placeholder="Your full name"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                      placeholder="you@example.com"
                      maxLength={255}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                    placeholder="+91 98300 12345"
                    maxLength={15}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition resize-none"
                    placeholder="Tell us about your project…"
                    maxLength={1000}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-gray-900 bg-gray-800 bg-opacity-20 backdrop-blur-md dark:text-white rounded-lg group disabled:opacity-50"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-accent rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                  <span className="relative inline-flex items-center gap-2">
                    {sending ? "Sending…" : "Send Message"} <Send className="h-4 w-4" />
                  </span>
                </button>
              </form>
            </BorderGlow>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <BorderGlow animated borderRadius={12}>
              <div className="p-6">
                <h3 className="font-display font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">40 ,Jhilbagan ,Dumdum ,kolkata-7000030 ,WestBengal ,India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-muted-foreground">+91 8906693045  /  +91 7003070730</span>
                  </div>
                </div>
              </div>
            </BorderGlow>

            <BorderGlow animated borderRadius={12}>
              <div className="p-6">
                <h3 className="font-display font-semibold mb-2">Office Hours</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Monday – Saturday: 10 AM – 7 PM</p>
                  <p>Sunday: By appointment only</p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;