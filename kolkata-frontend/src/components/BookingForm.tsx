import React, { useState } from "react";
import api from "@/api/client";
import BorderGlow from "@/components/BorderGlow";
import { toast } from "sonner";
import { CalendarDays, User, Phone, Send } from "lucide-react";

const BookingForm = ({ projectId }: { projectId: number }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    preferredDate: "",
    visitType: "SITE_VISIT",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/appointments", { ...formData, projectId });
      toast.success("Booking request sent! Our team will contact you soon.");
      setFormData({ fullName: "", phone: "", preferredDate: "", visitType: "SITE_VISIT", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send booking request. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <BorderGlow animated borderRadius={12}>
      <div className="p-8">
        <h3 className="font-display text-xl font-semibold mb-6">Book a Site Visit</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
            <input
              type="text"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone Number *</label>
            <input
              type="tel"
              placeholder="+91 98300 12345"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Preferred Date</label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Visit Type</label>
            <select
              value={formData.visitType}
              onChange={(e) => setFormData({ ...formData, visitType: e.target.value })}
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
            >
              <option value="SITE_VISIT">Site Visit</option>
              <option value="VIRTUAL_TOUR">Virtual Tour</option>
              <option value="OFFICE_VISIT">Office Visit</option>
              <option value="PHONE_CALL">Phone Call</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Message</label>
            <textarea
              placeholder="Any specific queries or requirements…"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-accent border-2 border-accent rounded-full transition duration-300 ease-out group disabled:opacity-50 w-full"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-accent group-hover:translate-x-0 ease">
              <Send className="w-5 h-5" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
              {sending ? "Sending…" : "Submit Request"}
            </span>
            <span className="relative invisible">{sending ? "Sending…" : "Submit Request"}</span>
          </button>
        </form>
      </div>
    </BorderGlow>
  );
};

export default BookingForm;
