/*
  # Initial Schema Setup

  1. New Tables
    - users: Stores user profiles and authentication data
    - credentials: Stores academic credentials
    - verifications: Stores credential verification requests

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  user_type text NOT NULL CHECK (user_type IN ('student', 'institution', 'employer')),
  wallet_address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Credentials table
CREATE TABLE IF NOT EXISTS credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issuer_id uuid REFERENCES users NOT NULL,
  recipient_id uuid REFERENCES users NOT NULL,
  title text NOT NULL,
  description text,
  issue_date timestamptz DEFAULT now(),
  blockchain_tx_hash text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Institutions can create credentials"
  ON credentials FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND user_type = 'institution'
    )
  );

CREATE POLICY "Users can read their own credentials"
  ON credentials FOR SELECT
  USING (
    auth.uid() = issuer_id 
    OR auth.uid() = recipient_id
  );

-- Verifications table
CREATE TABLE IF NOT EXISTS verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  credential_id uuid REFERENCES credentials NOT NULL,
  verifier_id uuid REFERENCES users NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'verified', 'rejected')),
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employers can create verification requests"
  ON verifications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND user_type = 'employer'
    )
  );

CREATE POLICY "Users can read their own verifications"
  ON verifications FOR SELECT
  USING (
    auth.uid() = verifier_id 
    OR EXISTS (
      SELECT 1 FROM credentials 
      WHERE credentials.id = credential_id 
      AND (credentials.issuer_id = auth.uid() OR credentials.recipient_id = auth.uid())
    )
  );