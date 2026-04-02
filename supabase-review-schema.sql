-- Google Review Capture & Feedback System
-- Run this in your Supabase SQL Editor to create the review system tables

-- Review Customers - one row per customer invited for feedback
CREATE TABLE IF NOT EXISTS review_customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  project_type TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'completed', 'feedback_received', 'expired')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  google_review_clicked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Review Requests - tracks each outreach attempt (initial + follow-ups)
CREATE TABLE IF NOT EXISTS review_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES review_customers(id) ON DELETE CASCADE,
  token UUID DEFAULT gen_random_uuid() NOT NULL,
  type TEXT DEFAULT 'initial' CHECK (type IN ('initial', 'followup')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'opened', 'completed', 'expired')),
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Negative Feedback - private feedback from unhappy customers
CREATE TABLE IF NOT EXISTS negative_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES review_customers(id) ON DELETE CASCADE,
  request_token UUID,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  detailed_feedback TEXT NOT NULL,
  contact_preference TEXT CHECK (contact_preference IN ('email', 'phone', 'none')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_review_requests_token ON review_requests(token);
CREATE INDEX IF NOT EXISTS idx_review_customers_status ON review_customers(status);
CREATE INDEX IF NOT EXISTS idx_review_customers_email ON review_customers(email);
CREATE INDEX IF NOT EXISTS idx_review_requests_customer_id ON review_requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_review_requests_status ON review_requests(status);
CREATE INDEX IF NOT EXISTS idx_negative_feedback_customer_id ON negative_feedback(customer_id);

-- Enable Row Level Security
ALTER TABLE review_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE negative_feedback ENABLE ROW LEVEL SECURITY;

-- Service role gets full access on all tables
CREATE POLICY "Service role full access on review_customers"
  ON review_customers FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on review_requests"
  ON review_requests FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on negative_feedback"
  ON negative_feedback FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Anon can read review_requests by token only (for public feedback page)
CREATE POLICY "Anon can read review_requests by token"
  ON review_requests FOR SELECT
  USING (auth.role() = 'anon');

-- Anon can insert negative feedback (from public feedback form)
CREATE POLICY "Anon can insert negative_feedback"
  ON negative_feedback FOR INSERT
  WITH CHECK (auth.role() = 'anon');
