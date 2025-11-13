-- Create partners table
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.partners
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON public.partners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON public.partners
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON public.partners
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS partners_created_at_idx ON public.partners(created_at);
