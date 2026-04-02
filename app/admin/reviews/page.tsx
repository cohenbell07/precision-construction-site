"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const PROJECT_TYPES = [
  "Kitchen Renovation",
  "Bathroom Renovation",
  "Basement Development",
  "Flooring",
  "Countertops",
  "Cabinets & Millwork",
  "Interior Carpentry",
  "Garage / Deck / Fence",
  "Full Home Renovation",
  "Commercial Project",
  "Other",
];

type Customer = {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  project_type: string | null;
  notes: string | null;
  status: string;
  rating: number | null;
  comment: string | null;
  google_review_clicked: boolean;
  created_at: string;
};

type StatusFilter = "all" | "sent" | "completed" | "feedback_received" | "expired" | "pending";

export default function AdminReviewsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const { toast } = useToast();

  // Check for saved password on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("review_admin_pw");
    if (saved) {
      setStoredPassword(saved);
      setAuthenticated(true);
    }
  }, []);

  const fetchCustomers = useCallback(async (pw: string) => {
    setLoadingCustomers(true);
    try {
      const res = await fetch("/api/review/customers", {
        headers: { "x-admin-password": pw },
      });
      if (res.status === 401) {
        sessionStorage.removeItem("review_admin_pw");
        setAuthenticated(false);
        setStoredPassword("");
        toast({ title: "Session expired", description: "Please log in again.", variant: "destructive" });
        return;
      }
      const data = await res.json();
      if (data.success) {
        setCustomers(data.customers);
      }
    } catch {
      toast({ title: "Error", description: "Failed to load customers.", variant: "destructive" });
    } finally {
      setLoadingCustomers(false);
    }
  }, [toast]);

  // Fetch customers when authenticated
  useEffect(() => {
    if (authenticated && storedPassword) {
      fetchCustomers(storedPassword);
    }
  }, [authenticated, storedPassword, fetchCustomers]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setAuthLoading(true);

    try {
      const res = await fetch("/api/review/customers", {
        headers: { "x-admin-password": password },
      });

      if (res.status === 401) {
        toast({ title: "Wrong password", variant: "destructive" });
      } else {
        sessionStorage.setItem("review_admin_pw", password);
        setStoredPassword(password);
        setAuthenticated(true);
      }
    } catch {
      toast({ title: "Error", description: "Could not connect.", variant: "destructive" });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmitCustomer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      toast({ title: "First name is required", variant: "destructive" });
      return;
    }
    if (!formData.email.trim()) {
      toast({ title: "Email is required", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/review/submit-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": storedPassword,
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim() || undefined,
          email: formData.email.trim(),
          projectType: formData.projectType || undefined,
          notes: formData.notes.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Feedback request sent!",
          description: data.warning
            ? `Customer created but: ${data.warning}`
            : `Email sent to ${formData.email.trim()}`,
        });
        setFormData({ firstName: "", lastName: "", email: "", projectType: "", notes: "" });
        fetchCustomers(storedPassword);
      } else {
        toast({ title: "Error", description: data.error || "Failed to submit.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to submit.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Password Gate ───
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-sm bg-[#1F1F1F] border-[#2E2E2E]">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-white">Review Dashboard</CardTitle>
            <p className="text-sm text-gray-400">Enter your admin password</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-[#2E2E2E] border-[#3A3A3A] text-white"
              />
              <Button type="submit" disabled={authLoading} className="w-full bg-gold hover:bg-gold-dark text-[#101820] font-semibold">
                {authLoading ? "Checking..." : "Unlock"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Status badge helper ───
  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-900/30 text-yellow-400 border-yellow-800",
      sent: "bg-blue-900/30 text-blue-400 border-blue-800",
      completed: "bg-green-900/30 text-green-400 border-green-800",
      feedback_received: "bg-orange-900/30 text-orange-400 border-orange-800",
      expired: "bg-gray-800/30 text-gray-500 border-gray-700",
    };
    const labels: Record<string, string> = {
      pending: "Pending",
      sent: "Sent",
      completed: "Reviewed",
      feedback_received: "Negative",
      expired: "Expired",
    };
    return (
      <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-600">—</span>;
    return (
      <span className="text-gold">
        {"★".repeat(rating)}
        <span className="text-gray-600">{"★".repeat(5 - rating)}</span>
      </span>
    );
  };

  const filteredCustomers = statusFilter === "all"
    ? customers
    : customers.filter((c) => c.status === statusFilter);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "America/Edmonton",
    });
  };

  // ─── Dashboard ───
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Review Dashboard</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem("review_admin_pw");
            setAuthenticated(false);
            setStoredPassword("");
          }}
          className="text-sm text-gray-500 hover:text-gray-300"
        >
          Log out
        </button>
      </div>

      {/* ─── Add Customer Form ─── */}
      <Card className="mb-8 bg-[#1F1F1F] border-[#2E2E2E]">
        <CardHeader>
          <CardTitle className="text-lg text-white">Send Feedback Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitCustomer} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">First Name *</label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  required
                  className="bg-[#2E2E2E] border-[#3A3A3A] text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Smith"
                  className="bg-[#2E2E2E] border-[#3A3A3A] text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                  className="bg-[#2E2E2E] border-[#3A3A3A] text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full h-10 rounded-md bg-[#2E2E2E] border border-[#3A3A3A] text-white px-3 text-sm focus:outline-none focus:border-gold"
                >
                  <option value="">Select project type</option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Notes (optional)</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any notes about this customer or project..."
                rows={2}
                className="bg-[#2E2E2E] border-[#3A3A3A] text-white resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="bg-gold hover:bg-gold-dark text-[#101820] font-semibold"
            >
              {submitting ? "Sending..." : "Send Feedback Request"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ─── Customer List ─── */}
      <Card className="bg-[#1F1F1F] border-[#2E2E2E]">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-lg text-white">
              Customers ({filteredCustomers.length})
            </CardTitle>
            <div className="flex gap-1 flex-wrap">
              {(["all", "sent", "completed", "feedback_received", "expired"] as const).map((filter) => {
                const labels: Record<string, string> = {
                  all: "All",
                  sent: "Pending",
                  completed: "Reviewed",
                  feedback_received: "Negative",
                  expired: "Expired",
                };
                return (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      statusFilter === filter
                        ? "bg-gold/20 text-gold border-gold"
                        : "bg-[#2E2E2E] text-gray-400 border-[#3A3A3A] hover:border-[#4A4A4A]"
                    }`}
                  >
                    {labels[filter]}
                  </button>
                );
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loadingCustomers ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : filteredCustomers.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {customers.length === 0
                ? "No customers yet. Submit your first feedback request above."
                : "No customers match this filter."}
            </p>
          ) : (
            <div className="overflow-x-auto -mx-6">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b border-[#2E2E2E]">
                    <th className="text-left py-3 px-6 text-gray-400 font-medium">Name</th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium">Email</th>
                    <th className="text-left py-3 px-3 text-gray-400 font-medium">Project</th>
                    <th className="text-center py-3 px-3 text-gray-400 font-medium">Status</th>
                    <th className="text-center py-3 px-3 text-gray-400 font-medium">Rating</th>
                    <th className="text-center py-3 px-3 text-gray-400 font-medium">Google</th>
                    <th className="text-right py-3 px-6 text-gray-400 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-[#2E2E2E]/50 hover:bg-[#2E2E2E]/30">
                      <td className="py-3 px-6 text-white">
                        {customer.first_name}
                        {customer.last_name ? ` ${customer.last_name}` : ""}
                      </td>
                      <td className="py-3 px-3 text-gray-400 text-xs">{customer.email}</td>
                      <td className="py-3 px-3 text-gray-300">{customer.project_type || "—"}</td>
                      <td className="py-3 px-3 text-center">{statusBadge(customer.status)}</td>
                      <td className="py-3 px-3 text-center">{renderStars(customer.rating)}</td>
                      <td className="py-3 px-3 text-center">
                        {customer.google_review_clicked ? (
                          <span className="text-green-400">✓</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-right text-gray-500 text-xs">
                        {formatDate(customer.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
