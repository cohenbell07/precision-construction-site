-- Optional Supabase schema for storing leads and referrals
-- Run this in your Supabase SQL editor if you want to use the database features

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  project_details TEXT,
  address TEXT,
  timeline TEXT,
  budget TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_name TEXT NOT NULL,
  referrer_email TEXT NOT NULL,
  friend_name TEXT NOT NULL,
  friend_email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_email ON referrals(referrer_email);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON referrals(created_at);

-- Enable Row Level Security (optional, adjust policies as needed)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts (adjust based on your needs)
CREATE POLICY "Allow public inserts on leads" ON leads
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public inserts on referrals" ON referrals
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow service role to read all (for admin access)
CREATE POLICY "Allow service role to read leads" ON leads
  FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role to read referrals" ON referrals
  FOR SELECT
  USING (auth.role() = 'service_role');

