import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const adminPassword = process.env.ADMIN_PASSWORD || '';

if (!serviceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
}

if (!adminPassword) {
  throw new Error('ADMIN_PASSWORD is not set');
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, adminSecretPassword } = req.body;

    if (!email || !password || !adminSecretPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify admin secret password
    if (adminSecretPassword !== adminPassword) {
      return res.status(401).json({ error: 'Invalid admin secret password' });
    }

    // Create Supabase Auth user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        is_admin: true,
      },
    });

    if (authError || !user) {
      return res.status(500).json({ error: authError?.message || 'Failed to create user' });
    }

    // Track admin email in admin_users table
    const { error: trackError } = await supabaseAdmin
      .from('admin_users')
      .insert([{ email, id: user.id }]);

    if (trackError) {
      console.error('Error tracking admin user:', trackError);
      // Don't fail the request if tracking fails, user is already created
    }

    return res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
