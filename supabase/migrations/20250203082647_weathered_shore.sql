/*
  # Newsletter Subscribers Table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `subscribed_at` (timestamp)
      - `status` (text) - For managing subscription status
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for authenticated users to read their own subscriptions
    - Add policy for public to create subscriptions
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Users can read their own subscriptions
CREATE POLICY "Users can read own subscriptions"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (email IN (
    SELECT email 
    FROM users 
    WHERE id = auth.uid()
  ));