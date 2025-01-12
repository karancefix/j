/*
  # Initial Schema Setup for AI Image Generator

  1. New Tables
    - profiles
      - id (references auth.users)
      - credits
      - subscription_status
      - created_at
    - images
      - id
      - user_id (references profiles)
      - prompt
      - image_url
      - created_at
    - credits_log
      - id
      - user_id (references profiles)
      - amount
      - type (purchase, use, bonus)
      - created_at

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users,
    credits INTEGER DEFAULT 10,
    subscription_status TEXT DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create images table
CREATE TABLE images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    prompt TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create credits log table
CREATE TABLE credits_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    amount INTEGER NOT NULL,
    type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits_log ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Images policies
CREATE POLICY "Users can view own images"
    ON images FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own images"
    ON images FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Credits log policies
CREATE POLICY "Users can view own credits log"
    ON credits_log FOR SELECT
    USING (auth.uid() = user_id);

-- Function to create profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile after signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();