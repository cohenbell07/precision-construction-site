"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, X, MessageCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatConversation } from "@/lib/aiTools";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState<ChatConversation[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [collectingContact, setCollectingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });
  const [projectDetails, setProjectDetails] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation with greeting
  useEffect(() => {
    if (isOpen && conversation.length === 0) {
      setConversation([
        {
          role: "assistant",
          content: "Hi! I'm here to help with your construction project. What kind of project are you planning?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, conversation.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage("");
    setConversation((prev) => [
      ...prev,
      { role: "user", content: userMessage, timestamp: new Date() },
    ]);
    setLoading(true);

    try {
      // Send to API for AI processing
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: [...conversation, { role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();

      if (data.response) {
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: data.response, timestamp: new Date() },
        ]);

        // Update project details if provided
        if (data.projectDetails) {
          setProjectDetails((prev: any) => ({ ...prev, ...data.projectDetails }));
        }

        // Check if we should collect contact info
        if (data.shouldCollectContact) {
          setCollectingContact(true);
        }
      } else {
        // Fallback response
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Thanks for your interest! Would you like to provide your contact information so we can follow up?",
            timestamp: new Date(),
          },
        ]);
        setCollectingContact(true);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble right now. Please contact us directly at " + process.env.NEXT_PUBLIC_CONTACT_EMAIL || "our contact page",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async () => {
    if (!contactInfo.email) {
      alert("Please provide at least your email address");
      return;
    }

    setLoading(true);
    try {
      // Create lead from chat
      await fetch("/api/leads/create-from-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          projectDetails,
          conversation: conversation.map((c) => c.content).join("\n"),
        }),
      });

      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Thank you! We've received your information and will contact you within 24 hours.",
          timestamp: new Date(),
        },
      ]);
      setCollectingContact(false);
      setContactInfo({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error submitting contact:", error);
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Thank you! We'll follow up soon.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl gold-3d-button text-black shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="card-premium border-gold/30 h-[600px] flex flex-col rounded-2xl">
              <CardHeader className="pb-3 border-b border-gold/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-text-primary uppercase tracking-wide">
                    AI Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {conversation.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 ${
                          msg.role === "user"
                            ? "gold-3d-button text-black"
                            : "card-premium text-text-primary border-gold/20"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="card-premium rounded-xl p-3 border-gold/20">
                        <Loader2 className="h-4 w-4 animate-spin text-gold" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Contact Form (if collecting) */}
                {collectingContact && (
                  <div className="mb-4 p-4 card-premium border-gold/30 rounded-xl">
                    <p className="text-sm font-semibold text-text-primary mb-3 uppercase">
                      Get a Free Consultation
                    </p>
                    <div className="space-y-2">
                      <Input
                        placeholder="Your name"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="bg-industrial-slate/90 border-gold/30"
                      />
                      <Input
                        type="email"
                        placeholder="Email *"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        className="bg-industrial-slate/90 border-gold/30"
                        required
                      />
                      <Input
                        type="tel"
                        placeholder="Phone (optional)"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        className="bg-industrial-slate/90 border-gold/30"
                      />
                      <Button
                        onClick={handleContactSubmit}
                        disabled={loading || !contactInfo.email}
                        className="w-full btn-premium font-bold"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}

                {/* Message Input */}
                {!collectingContact && (
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type your message..."
                      className="flex-1 bg-industrial-slate/90 border-gold/30"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={loading || !message.trim()}
                      className="btn-premium"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

