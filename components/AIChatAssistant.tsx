"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { generateAIResponse } from "@/lib/ai";

export function AIChatAssistant() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage("");
    setConversation((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const systemPrompt = `You are a helpful assistant for Precision Construction and Decora Inc., a family-owned and operated 3rd generation Calgary construction company established in 1968, serving Calgary since 1997.
      
      Our motto is "Expect Only The Best" and we treat every client like family. We deliver only the best in service, quality, and satisfaction.
      
      You help customers understand construction services, provide project guidance, and answer questions about:
      - Flooring installation (LVP, carpet, tile, large format porcelain, marmoleum)
      - Custom showers and steam showers
      - Countertops (granite, quartz, porcelain slab, arborite, stainless, natural stone, concrete)
      - Cabinets & Millwork (any style/color, custom closets, Murphy beds)
      - Interior finishing (trim, baseboards, casing, doors, built-ins)
      - Framing (interior renos, wood framing, commercial steel stud)
      - Drywall, taping, ceiling texture
      - Interior & Exterior Painting (including waterproofing/specialty coatings)
      - Basement developments, garage builds, decks, fences
      - Natural stone (marble, granite, slate), stone setting
      - Home additions, full home renovations
      - Commercial & multi-unit building experience
      
      Be friendly, professional, emphasize our family values and commitment to quality. Encourage customers to call or email to book a consultation. Owner is John Olivito.`;

      const { response } = await generateAIResponse(userMessage, systemPrompt);
      setConversation((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble right now. Please contact us directly for assistance.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-premium border-gold/30">
        <CardContent className="p-8">
          {conversation.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg mb-2 font-bold text-text-primary uppercase tracking-wide">What kind of project are you planning?</p>
              <p className="text-sm text-text-secondary">Ask me anything about our construction services!</p>
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
                <div className="card-premium rounded-sm p-4 border-gold/20">
                  <Loader2 className="h-4 w-4 animate-spin text-gold" />
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about your project..."
              className="bg-industrial-slate/90 backdrop-blur-sm border-gold/30 text-text-primary placeholder:text-text-secondary focus:border-gold focus:ring-gold/50"
            />
            <Button
              onClick={handleSend}
              disabled={loading || !message.trim()}
              className="btn-premium disabled:opacity-50 font-bold"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

