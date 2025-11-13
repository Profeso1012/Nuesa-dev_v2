import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!serviceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verify authentication
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      const { title, category, date, time, venue, form_link, image_url } = req.body;

      if (!title || !category || !date || !venue) {
        return res.status(400).json({ error: 'Missing required fields: title, category, date, venue' });
      }

      const { data, error } = await supabaseAdmin
        .from('events')
        .insert([{ title, category, date, time, venue, form_link, image_url }])
        .select();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json(data[0]);
    }

    if (req.method === 'PUT') {
      const { id, title, category, date, time, venue, form_link, image_url } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Missing event ID' });
      }

      const { data, error } = await supabaseAdmin
        .from('events')
        .update({ title, category, date, time, venue, form_link, image_url, updated_at: new Date() })
        .eq('id', id)
        .select();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Missing event ID' });
      }

      const { error } = await supabaseAdmin
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ message: 'Event deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
