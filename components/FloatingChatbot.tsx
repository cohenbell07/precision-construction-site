"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Send, X, MessageCircle, Loader2 } from "lucide-react";
import type { ChatConversation } from "@/lib/aiTools";
import { BRAND_CONFIG } from "@/lib/utils";

export function FloatingChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState<ChatConversation[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [collectingContact, setCollectingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });
  const [projectDetails, setProjectDetails] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && conversation.length === 0) {
      setConversation([
        {
          role: "assistant",
          content: "Hey! Planning a reno or build? I can help you figure out scope, pricing, and next steps. What are you working on?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, conversation.length]);

  useEffect(() => {
    if (isOpen && conversation.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation, isOpen]);

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
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: [...conversation, { role: "user", content: userMessage }],
          currentPage: pathname ?? undefined,
        }),
      });

      const data = await response.json();

      if (data.response) {
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: data.response, timestamp: new Date() },
        ]);
        if (data.projectDetails) {
          setProjectDetails((prev: any) => ({ ...prev, ...data.projectDetails }));
        }
        if (data.shouldCollectContact) {
          setCollectingContact(true);
        }
      } else {
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'd love to help you get a quote on this. Drop your contact info below and we'll follow up within 24 hours!",
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
          content: `I'm having a moment — reach us directly at ${BRAND_CONFIG.contact.phoneFormatted} or visit our contact page.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async () => {
    if (!contactInfo.email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/leads/create-from-chat", {
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

      const data = await res.json();

      if (res.ok && data.success) {
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "You're all set! We'll be in touch within 24 hours with next steps. Thanks for reaching out!",
            timestamp: new Date(),
          },
        ]);
        setCollectingContact(false);
        setContactInfo({ name: "", email: "", phone: "" });
      } else {
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Something went wrong on our end. Try again or call us directly — we're happy to help.",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error submitting contact:", error);
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong on our end. Try again or call us directly — we're happy to help.",
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
      <button
        className={`fixed right-4 sm:right-6 sm:bottom-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 ${pathname?.startsWith("/services/") && pathname !== "/services" ? "bottom-24" : "bottom-5"}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] ${pathname?.startsWith("/services/") && pathname !== "/services" ? "bottom-44 sm:bottom-24" : "bottom-24"}`}>
          <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] shadow-[0_8px_40px_rgba(0,0,0,0.7)] h-[480px] sm:h-[540px] max-h-[calc(100vh-7rem)] flex flex-col">

            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.06] bg-[#050505] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <div>
                  <p className="text-sm font-heading font-bold text-white uppercase tracking-wide">Project Helper</p>
                  <p className="text-[10px] text-white/30">Online now — ask us anything</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-white/[0.10] flex items-center justify-center transition-colors"
              >
                <X className="h-3.5 w-3.5 text-white/50" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 ${
                      msg.role === "user"
                        ? "bg-white text-black rounded-br-sm"
                        : "bg-white/[0.05] border border-white/[0.06] text-white/70 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-[13px] leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.05] border border-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Contact Form */}
            {collectingContact && (
              <div className="px-4 pb-3 shrink-0">
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 space-y-2.5">
                  <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Get Your Free Quote</p>
                  <input
                    placeholder="Name"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-base sm:text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-base sm:text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-base sm:text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
                  />
                  <button
                    onClick={handleContactSubmit}
                    disabled={loading || !contactInfo.email}
                    className="w-full bg-white text-black py-2.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors disabled:opacity-40"
                  >
                    Send My Info
                  </button>
                </div>
              </div>
            )}

            {/* Message Input */}
            {!collectingContact && (
              <div className="px-4 pb-4 pt-2 border-t border-white/[0.04] shrink-0">
                <div className="flex gap-2">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask about your project..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-base sm:text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !message.trim()}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors disabled:opacity-40 shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
