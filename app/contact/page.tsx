"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { BRAND_CONFIG } from "@/lib/utils";
import { Mail, Phone, MapPin, Send, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      {/* Hero Section with contact-hero.png */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact-hero.png"
            alt="Contact Precision Construction & Decora"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading px-2">
              Contact Us
            </h1>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-3 sm:mb-4 md:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed premium-text px-2">
              Get in touch with us to discuss your project. We treat every client like family.
            </p>
            <p className="text-sm sm:text-base md:text-lg premium-gold-text font-bold max-w-3xl mx-auto mb-3 sm:mb-4 uppercase tracking-wide px-2">
              {BRAND_CONFIG.motto}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Contact Form - Restyled with card shadow + glow focus */}
          <Card className="card-premium border-gold/30 shadow-2xl bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Name *
                  </label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(403) 555-0123"
                    className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Project Type
                  </label>
                  <Input
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    placeholder="e.g., Kitchen Renovation, Flooring, etc."
                    className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
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
            <Card className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gold/10 rounded-sm border border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <MapPin className="h-6 w-6 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                  </div>
                  <div>
                    <p className="font-black text-white mb-1 uppercase tracking-wide premium-heading-sm">Address</p>
                    <p className="text-white/80">{BRAND_CONFIG.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gold/10 rounded-sm border border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <Phone className="h-6 w-6 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                  </div>
                  <div>
                    <p className="font-black text-white mb-1 uppercase tracking-wide premium-heading-sm">Phone</p>
                    <a
                      href={`tel:${BRAND_CONFIG.contact.phone}`}
                      className="premium-gold-text hover:underline transition-colors font-bold"
                    >
                      {BRAND_CONFIG.contact.phoneFormatted}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gold/10 rounded-sm border border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <Mail className="h-6 w-6 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                  </div>
                  <div>
                    <p className="font-black text-white mb-1 uppercase tracking-wide premium-heading-sm">Email</p>
                    <a
                      href={`mailto:${BRAND_CONFIG.contact.email}`}
                      className="premium-gold-text hover:underline transition-colors font-bold"
                    >
                      {BRAND_CONFIG.contact.email}
                    </a>
                  </div>
                </div>
                <div className="pt-4 border-t border-gold/20">
                  <p className="text-sm text-white/80 mb-2">
                    <strong className="text-white font-black">Owner:</strong> {BRAND_CONFIG.owner}
                  </p>
                  <p className="text-sm text-white/80">
                    {BRAND_CONFIG.contact.cta}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service Areas - Standard bullet points only */}
            <Card className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Service Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4 premium-text">
                  We proudly serve Calgary and surrounding areas including:
                </p>
                <ul className="space-y-2 text-white/80 list-disc list-inside premium-text">
                  <li>Calgary (All Quadrants)</li>
                  <li>Airdrie</li>
                  <li>Cochrane</li>
                  <li>Okotoks</li>
                  <li>Chestermere</li>
                  <li>And more!</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Calendar Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading">
              Schedule a Call
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed premium-text px-2">
              Book a consultation call to discuss your project. We&apos;ll find a time that works for you.
            </p>
          </div>

          <Card className="card-premium border-gold/30 max-w-5xl mx-auto bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight flex items-center gap-2 sm:gap-3 premium-heading-sm">
                <Calendar className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Calendar Grid */}
              <div>
                <h3 className="text-xl font-display font-black text-white mb-4 uppercase tracking-wide premium-heading-sm">
                  Choose a Date
                </h3>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {/* Day headers */}
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-black text-gold uppercase tracking-wide py-2 premium-gold-text">
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
                            ? "border-gold/10 text-white/30 bg-black/30 cursor-not-allowed" 
                            : isSelected
                            ? "border-gold bg-gold/20 text-gold font-black shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-105"
                            : "border-gold/30 text-white bg-black/50 hover:border-gold/60 hover:bg-gold/10 hover:scale-105"
                          }
                          ${isToday && !isPast ? "ring-2 ring-gold/50" : ""}
                        `}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <span className="text-sm">{day}</span>
                          {isToday && (
                            <span className="text-xs text-gold mt-0.5 font-bold">Today</span>
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
                  <h3 className="text-xl font-display font-black text-white mb-4 uppercase tracking-wide flex items-center gap-2 premium-heading-sm">
                    <Clock className="h-5 w-5 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
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
                          px-4 py-3 rounded-lg border-2 transition-all text-sm font-bold
                          ${selectedTime === time
                            ? "border-gold bg-gold/20 text-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                            : "border-gold/30 text-white bg-black/50 hover:border-gold/60 hover:bg-gold/10"
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
                  <h3 className="text-xl font-display font-black text-white mb-4 uppercase tracking-wide premium-heading-sm">
                    Your Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bookingName" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                        Name *
                      </label>
                      <Input
                        id="bookingName"
                        required
                        placeholder="Your name"
                        className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="bookingEmail" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                        Email *
                      </label>
                      <Input
                        id="bookingEmail"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bookingPhone" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                      Phone *
                    </label>
                    <Input
                      id="bookingPhone"
                      type="tel"
                      required
                      placeholder="(403) 555-0123"
                      className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="bookingNotes" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                      Project Details (Optional)
                    </label>
                    <Textarea
                      id="bookingNotes"
                      placeholder="Brief description of your project..."
                      rows={3}
                      className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
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
                  <p className="text-xs text-white/60 text-center">
                    * This is a placeholder booking system. A real booking API will be integrated in the future.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Optional CTA Block at Bottom */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center relative z-10">
          <Card className="card-premium border-gold/30 p-6 sm:p-8 md:p-10 lg:p-12 bg-black/60 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black mb-4 sm:mb-5 md:mb-6 text-white uppercase tracking-tight premium-heading px-2">
              Ready to Get Started?
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-5 md:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-7 md:mb-8 leading-relaxed premium-text px-2">
              Experience the difference of working with a family-owned company. Get a free consultation today.
            </p>
            <Button asChild size="lg" className="btn-premium px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg uppercase tracking-wider w-full sm:w-auto">
              <Link href="/get-quote">Get a Quote</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
