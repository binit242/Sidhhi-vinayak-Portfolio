import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

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
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Let's Talk</h1>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Fill in the form and our team will reach out within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
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
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
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
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
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
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
                placeholder="Tell us about your project…"
                maxLength={1000}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Message"} <Send className="h-4 w-4" />
            </button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-display font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">12/A Park Street, Kolkata, West Bengal 700016</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-muted-foreground">+91 98300 12345</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-muted-foreground">hello@edifice.in</span>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-display font-semibold mb-2">Office Hours</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Monday – Saturday: 10 AM – 7 PM</p>
                <p>Sunday: By appointment only</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
