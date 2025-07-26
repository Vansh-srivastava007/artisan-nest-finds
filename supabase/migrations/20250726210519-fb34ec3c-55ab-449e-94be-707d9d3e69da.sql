-- Create table for storing temporary user data during OTP verification
CREATE TABLE public.pending_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  phone_number TEXT,
  date_of_birth DATE,
  address TEXT,
  otp_code TEXT NOT NULL,
  profile_photo_data TEXT, -- Base64 encoded image data
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '10 minutes')
);

-- Enable RLS
ALTER TABLE public.pending_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for signup)
CREATE POLICY "Anyone can insert pending users" 
ON public.pending_users 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow users to read their own pending record by email
CREATE POLICY "Users can read their own pending record" 
ON public.pending_users 
FOR SELECT 
USING (true);

-- Create policy to allow deletion of pending users
CREATE POLICY "Anyone can delete pending users" 
ON public.pending_users 
FOR DELETE 
USING (true);

-- Create function to clean up expired pending users
CREATE OR REPLACE FUNCTION public.cleanup_expired_pending_users()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
  DELETE FROM public.pending_users 
  WHERE expires_at < now();
$$;