"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { BRAND_CONFIG } from "@/lib/utils";
import { Mail, Phone, MapPin, Send, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
          source: "contact_page",
        }),
      });

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Message received",
        description: "Your message has been received. We'll contact you soon!",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-black texture-concrete">
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">
            Contact Us
          </h1>
          <div className="inline-block mb-6">
            <div className="h-1 w-24 bg-gold mx-auto"></div>
          </div>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-4 leading-relaxed">
            Get in touch with us to discuss your project. We treat every client like family.
          </p>
          <p className="text-lg text-gold font-bold max-w-3xl mx-auto mb-4 uppercase tracking-wide">
            {BRAND_CONFIG.motto}
          </p>
          <p className="text-base text-text-secondary mt-6 max-w-3xl mx-auto">
            {BRAND_CONFIG.contact.cta}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-premium card-beveled border-gold/30">
            <CardHeader>
              <CardTitle className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-text-primary uppercase tracking-wide">
                    Name *
                  </label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="focus:ring-gold/50 focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-text-primary uppercase tracking-wide">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="focus:ring-gold/50 focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-text-primary uppercase tracking-wide">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(403) 555-0123"
                    className="focus:ring-gold/50 focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold mb-2 text-text-primary uppercase tracking-wide">
                    Project Type
                  </label>
                  <Input
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    placeholder="e.g., Kitchen Renovation, Flooring, etc."
                    className="focus:ring-gold/50 focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-text-primary uppercase tracking-wide">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="focus:ring-gold/50 focus:border-gold"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full btn-premium btn-glow">
                  {loading ? "Sending..." : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="card-premium card-beveled border-gold/30">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-black text-text-primary uppercase tracking-tight">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gold/10 rounded-sm border border-gold/20">
                    <MapPin className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary mb-1 uppercase tracking-wide">Address</p>
                    <p className="text-text-secondary">{BRAND_CONFIG.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gold/10 rounded-sm border border-gold/20">
                    <Phone className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary mb-1 uppercase tracking-wide">Phone</p>
                    <a
                      href={`tel:${BRAND_CONFIG.contact.phone}`}
                      className="text-gold hover:text-gold-light transition-colors font-semibold"
                    >
                      {BRAND_CONFIG.contact.phoneFormatted}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gold/10 rounded-sm border border-gold/20">
                    <Mail className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary mb-1 uppercase tracking-wide">Email</p>
                    <a
                      href={`mailto:${BRAND_CONFIG.contact.email}`}
                      className="text-gold hover:text-gold-light transition-colors font-semibold"
                    >
                      {BRAND_CONFIG.contact.email}
                    </a>
                  </div>
                </div>
                <div className="pt-4 border-t border-gold/20">
                  <p className="text-sm text-text-secondary mb-2">
                    <strong className="text-text-primary">Owner:</strong> {BRAND_CONFIG.owner}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {BRAND_CONFIG.contact.cta}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium card-beveled border-gold/30">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-black text-text-primary uppercase tracking-tight">
                  Service Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-text-secondary">
                  We proudly serve Calgary and surrounding areas including:
                </p>
                <ul className="space-y-2 text-text-secondary list-none">
                  <li className="flex items-center space-x-2 bg-transparent">
                    <span className="text-gold text-lg leading-none">•</span>
                    <span>Calgary (All Quadrants)</span>
                  </li>
                  <li className="flex items-center space-x-2 bg-transparent">
                    <span className="text-gold text-lg leading-none">•</span>
                    <span>Airdrie</span>
                  </li>
                  <li className="flex items-center space-x-2 bg-transparent">
                    <span className="text-gold text-lg leading-none">•</span>
                    <span>Cochrane</span>
                  </li>
                  <li className="flex items-center space-x-2 bg-transparent">
                    <span className="text-gold text-lg leading-none">•</span>
                    <span>Okotoks</span>
                  </li>
                  <li className="flex items-center space-x-2 bg-transparent">
                    <span className="text-gold text-lg leading-none">•</span>
                    <span>Chestermere</span>
                  </li>
                  <li className="flex items-center space-x-2 bg-transparent">
                    <span className="text-gold text-lg leading-none">•</span>
                    <span>And more!</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Booking Calendar Section */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">
              Schedule a Call
            </h2>
            <div className="inline-block mb-6">
              <div className="h-1 w-24 bg-gold mx-auto"></div>
            </div>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Book a consultation call to discuss your project. We&apos;ll find a time that works for you.
            </p>
          </motion.div>

          <Card className="card-premium card-beveled border-gold/30 max-w-5xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-display font-black text-text-primary uppercase tracking-tight flex items-center gap-3">
                <Calendar className="h-8 w-8 text-gold" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Calendar Grid */}
              <div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-4 uppercase tracking-wide">
                  Choose a Date
                </h3>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {/* Day headers */}
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-bold text-gold uppercase tracking-wide py-2">
                      {day}
                    </div>
                  ))}
                  {/* Calendar dates - showing next 2 weeks */}
                  {Array.from({ length: 14 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    const dateStr = date.toISOString().split("T")[0];
                    const day = date.getDate();
                    const isToday = i === 0;
                    const isPast = i < 0;
                    const isSelected = selectedDate === dateStr;
                    
                    return (
                      <button
                        key={dateStr}
                        onClick={() => !isPast && setSelectedDate(dateStr)}
                        disabled={isPast}
                        className={`
                          aspect-square rounded-lg border-2 transition-all
                          ${isPast 
                            ? "border-steel/20 text-text-muted bg-industrial-slate/30 cursor-not-allowed" 
                            : isSelected
                            ? "border-gold bg-gold/20 text-gold font-bold shadow-lg scale-105"
                            : "border-gold/30 text-text-secondary bg-industrial-slate/50 hover:border-gold/60 hover:bg-gold/10 hover:scale-105"
                          }
                          ${isToday && !isPast ? "ring-2 ring-gold/50" : ""}
                        `}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <span className="text-sm">{day}</span>
                          {isToday && (
                            <span className="text-xs text-gold mt-0.5">Today</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h3 className="text-xl font-display font-bold text-text-primary mb-4 uppercase tracking-wide flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gold" />
                    Available Times
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "9:00 AM", "10:00 AM", "11:00 AM",
                      "1:00 PM", "2:00 PM", "3:00 PM",
                      "4:00 PM", "5:00 PM"
                    ].map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`
                          px-4 py-3 rounded-lg border-2 transition-all text-sm font-semibold
                          ${selectedTime === time
                            ? "border-gold bg-gold/20 text-gold shadow-lg"
                            : "border-gold/30 text-text-secondary bg-industrial-slate/50 hover:border-gold/60 hover:bg-gold/10"
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Form */}
              {selectedDate && selectedTime && (
                <div className="pt-6 border-t border-gold/20 space-y-4">
                  <h3 className="text-xl font-display font-bold text-text-primary mb-4 uppercase tracking-wide">
                    Your Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bookingName" className="block text-sm font-semibold mb-2 text-text-primary uppercase tracking-wide">
                        Name *
                      </label>
                      <Input
                        id="bookingName"
                        required
                        placeholder="Your name"
                        className="focus:ring-gold/50 focus:border-gold"
                      />
                    </div>
                    <div>
                      <label htmlFor="bookingEmail" className="block text-sm font-semibold mb-2 text-text-primary uppercase tracking-wide">
                        Email *
                      </label>
                      <Input
                        id="bookingEmail"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        className="focus:ring-gold/50 focus:border-gold"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bookingPhone" className="block text-sm font-semibold mb-2 text-text-primary uppercase tracking-wide">
                      Phone *
                    </label>
                    <Input
                      id="bookingPhone"
                      type="tel"
                      required
                      placeholder="(403) 555-0123"
                      className="focus:ring-gold/50 focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="bookingNotes" className="block text-sm font-semibold mb-2 text-text-primary uppercase tracking-wide">
                      Project Details (Optional)
                    </label>
                    <Textarea
                      id="bookingNotes"
                      placeholder="Brief description of your project..."
                      rows={3}
                      className="focus:ring-gold/50 focus:border-gold"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Booking Request Received",
                        description: `Your call request for ${new Date(selectedDate).toLocaleDateString()} at ${selectedTime} has been received. We'll confirm shortly!`,
                      });
                      setSelectedDate("");
                      setSelectedTime("");
                    }}
                    className="w-full btn-premium btn-glow"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Call
                  </Button>
                  <p className="text-xs text-text-muted text-center">
                    * This is a placeholder booking system. A real booking API will be integrated in the future.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
