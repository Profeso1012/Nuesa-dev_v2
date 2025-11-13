import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface EventResponse {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  form_link: string | null;
  image_url: string;
  created_at: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse[] | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { upcoming, past } = req.query;
    const today = new Date().toISOString().split('T')[0];

    let query = supabase
      .from('events')
      .select('id, title, category, date, time, venue, form_link, image_url, created_at');

    if (upcoming === 'true') {
      query = query.gte('date', today).order('date', { ascending: true });
    } else if (past === 'true') {
      query = query.lt('date', today).order('date', { ascending: false });
    } else {
      query = query.order('date', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data || []);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
