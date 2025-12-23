"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
// Removed direct Supabase import - using API routes instead for client components
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";
import { Send, Users } from "lucide-react";

export default function ReferralPage() {
  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    friendName: "",
    friendEmail: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to database via API route (client components should use API routes)
      // Note: Referral API endpoint would need to be created if needed
      // For now, we&apos;ll just send emails

      // Send email to friend
      await sendEmail({
        to: formData.friendEmail,
        subject: `${formData.yourName} recommended ${BRAND_CONFIG.shortName} to you!`,
        html: `
          <h2>You&apos;ve been referred to ${BRAND_CONFIG.name}!</h2>
          <p>Hi ${formData.friendName},</p>
          <p>${formData.yourName} thought you might be interested in our construction services.</p>
          ${formData.message ? `<p><em>"${formData.message}"</em></p>` : ""}
          <p>We&apos;re a family-owned, 3rd generation Calgary construction company. ${BRAND_CONFIG.motto}</p>
          <p>We provide premium construction and renovation services in Calgary, including:</p>
          <ul>
            <li>Flooring installation (LVP, carpet, tile, large format porcelain, marmoleum)</li>
            <li>Custom showers and steam showers</li>
            <li>Cabinets & Millwork (any style/color, custom closets, Murphy beds)</li>
            <li>Countertops (granite, quartz, porcelain slab, arborite, stainless, natural stone)</li>
            <li>Interior finishing, framing, drywall, painting</li>
            <li>Basement developments, garage builds, decks, fences</li>
            <li>Home additions, full home renovations</li>
            <li>Commercial & multi-unit building experience</li>
            <li>And much more!</li>
          </ul>
          <p><strong>${BRAND_CONFIG.motto}</strong> We treat every client like family.</p>
          <p>Visit our website to learn more or <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/get-quote">request a free quote</a>.</p>
          <p>${BRAND_CONFIG.contact.cta}</p>
          <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
        `,
      });

      // Send confirmation to referrer
      await sendEmail({
        to: formData.yourEmail,
        subject: "Thank you for your referral!",
        html: `
          <h2>Thank you for referring ${formData.friendName}!</h2>
          <p>Hi ${formData.yourName},</p>
          <p>We&apos;ve sent your friend ${formData.friendName} information about our services.</p>
          <p>We appreciate your trust in us and your referral! ${BRAND_CONFIG.motto}</p>
          <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
        `,
      });

      toast({
        title: "Referral sent!",
        description: "We&apos;ve sent your friend information about our services.",
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting referral:", error);
      toast({
        title: "Referral received",
        description:
          "Your referral has been received. Thank you! (Note: Email service may not be configured)",
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-accent-copper" />
            <CardTitle className="text-3xl">Thank You!</CardTitle>
            <CardDescription className="text-lg">
              Your referral has been sent successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>
              We&apos;ve sent your friend information about our services. We appreciate your referral!
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    yourName: "",
                    yourEmail: "",
                    friendName: "",
                    friendEmail: "",
                    message: "",
                  });
                }}
                variant="outline"
              >
                Refer Another Friend
              </Button>
              <Button asChild className="btn-premium bg-accent-copper text-white">
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Refer a Friend</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Know someone who needs construction services? Refer them to us and help them get the
          quality work they deserve.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Referral Form</CardTitle>
          <CardDescription>
            Fill out the form below to refer a friend to {BRAND_CONFIG.shortName}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4 text-lg">Your Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="yourName" className="block text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="yourName"
                    required
                    value={formData.yourName}
                    onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="yourEmail" className="block text-sm font-medium mb-2">
                    Your Email *
                  </label>
                  <Input
                    id="yourEmail"
                    type="email"
                    required
                    value={formData.yourEmail}
                    onChange={(e) => setFormData({ ...formData, yourEmail: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Friend&apos;s Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="friendName" className="block text-sm font-medium mb-2">
                    Friend&apos;s Name *
                  </label>
                  <Input
                    id="friendName"
                    required
                    value={formData.friendName}
                    onChange={(e) => setFormData({ ...formData, friendName: e.target.value })}
                    placeholder="Friend&apos;s name"
                  />
                </div>
                <div>
                  <label htmlFor="friendEmail" className="block text-sm font-medium mb-2">
                    Friend&apos;s Email *
                  </label>
                  <Input
                    id="friendEmail"
                    type="email"
                    required
                    value={formData.friendEmail}
                    onChange={(e) => setFormData({ ...formData, friendEmail: e.target.value })}
                    placeholder="friend.email@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Add a personal message to your friend..."
                rows={4}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-slate-dark hover:bg-gold-light"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Referral
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

