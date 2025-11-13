import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: 'news_photo' | 'event_photo';
  date: string;
  image_url: string;
  created_at: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GalleryItem[] | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type } = req.query;

    let query = supabase
      .from('gallery_items')
      .select('id, title, description, type, date, image_url, created_at')
      .order('date', { ascending: false });

    if (type === 'news_photo' || type === 'event_photo') {
      query = query.eq('type', type);
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
