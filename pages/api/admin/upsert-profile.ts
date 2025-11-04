import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { id, first_name, last_name, title } = req.body;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!serviceRoleKey) return res.status(500).json({ error: 'Missing service role key on server' });

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  try {
    const { data, error } = await supabaseAdmin.from('profiles').upsert(
      { id, first_name, last_name, title, created_at: new Date() },
      { onConflict: 'id' }
    );
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
