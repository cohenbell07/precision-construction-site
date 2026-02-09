"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import type { ChatConversation, ProjectDetails } from "@/lib/aiTools";

export function AIChatAssistant() {
  const pathname = usePathname();
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<ChatConversation[]>([]);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({});
  const [loading, setLoading] = useState(false);
  const [collectingContact, setCollectingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (conversation.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage("");
    const updatedConversation: ChatConversation[] = [
      ...conversation,
      { role: "user", content: userMessage },
    ];
    setConversation(updatedConversation);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: updatedConversation,
          currentPage: pathname ?? undefined,
        }),
      });
      const data = await res.json();

      if (data.response) {
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
        if (data.projectDetails) {
          setProjectDetails((prev) => ({ ...prev, ...data.projectDetails }));
        }
        if (data.shouldCollectContact) {
          setCollectingContact(true);
        }
      } else {
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Thanks for your interest! Would you like to provide your contact info so we can follow up with a quote?",
          },
        ]);
        setCollectingContact(true);
      }
    } catch {
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble right now. Please contact us directly for assistance.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async () => {
    if (!contactInfo.email) {
      alert("Please provide at least your email address.");
      return;
    }
    setContactSubmitting(true);
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
      if (data.success) {
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Thanks! We've received your details and will get back to you with a quote soon.",
          },
        ]);
        setCollectingContact(false);
        setContactInfo({ name: "", email: "", phone: "" });
      } else {
        alert("Something went wrong. Please try again or contact us directly.");
      }
    } catch {
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-premium border-silver/30">
        <CardContent className="p-4 sm:p-6 md:p-8">
          {conversation.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg mb-2 font-bold text-text-primary uppercase tracking-wide">
                What kind of project are you planning?
              </p>
              <p className="text-sm text-text-secondary">
                Ask me anything about our construction services!
              </p>
            </div>
          )}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
            {conversation.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-sm p-4 ${
                    msg.role === "user"
                      ? "silver-3d-button text-black"
                      : "card-premium text-text-primary border-silver/20"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="card-premium rounded-sm p-4 border-silver/20">
                  <Loader2 className="h-4 w-4 animate-spin text-silver" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {collectingContact ? (
            <div className="space-y-3 rounded-sm p-4 card-premium border-silver/20">
              <p className="text-sm font-medium text-text-primary">
                Leave your details and we&apos;ll send you a quote.
              </p>
              <Input
                value={contactInfo.name}
                onChange={(e) =>
                  setContactInfo((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Name"
                className="bg-industrial-slate/95 border-silver/30 text-text-primary placeholder:text-text-secondary"
              />
              <Input
                type="email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Email *"
                className="bg-industrial-slate/95 border-silver/30 text-text-primary placeholder:text-text-secondary"
              />
              <Input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="Phone"
                className="bg-industrial-slate/95 border-silver/30 text-text-primary placeholder:text-text-secondary"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleContactSubmit}
                  disabled={contactSubmitting || !contactInfo.email.trim()}
                  className="btn-premium disabled:opacity-50 font-bold"
                >
                  {contactSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Get my quote"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCollectingContact(false)}
                  className="border-silver/30"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about your project..."
                className="bg-industrial-slate/95 border-silver/30 text-text-primary placeholder:text-text-secondary focus:border-silver focus:ring-silver/50"
              />
              <Button
                onClick={handleSend}
                disabled={loading || !message.trim()}
                className="btn-premium disabled:opacity-50 font-bold"
              >
                {mounted && loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
