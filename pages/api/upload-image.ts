import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!serviceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: 'Failed to parse form' });
      }

      const file = files.file as File[];
      if (!file || !file[0]) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const uploadedFile = file[0];
      const fileBuffer = fs.readFileSync(uploadedFile.filepath);
      const fileName = `${Date.now()}-${uploadedFile.originalFilename}`;

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(uploadedFile.mimetype || '')) {
        fs.unlinkSync(uploadedFile.filepath);
        return res.status(400).json({ error: 'Only JPG and PNG files are allowed' });
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (fileBuffer.length > maxSize) {
        fs.unlinkSync(uploadedFile.filepath);
        return res.status(400).json({ error: 'File size must be less than 5MB' });
      }

      try {
        const { data, error } = await supabaseAdmin.storage
          .from('pictures')
          .upload(fileName, fileBuffer, {
            contentType: uploadedFile.mimetype || 'application/octet-stream',
          });

        fs.unlinkSync(uploadedFile.filepath);

        if (error) {
          return res.status(500).json({ error: error.message });
        }

        // Get the public URL
        const {
          data: { publicUrl },
        } = supabaseAdmin.storage.from('pictures').getPublicUrl(fileName);

        return res.status(200).json({ url: publicUrl, fileName });
      } catch (uploadError: any) {
        fs.unlinkSync(uploadedFile.filepath);
        return res.status(500).json({ error: uploadError.message || 'Upload failed' });
      }
    });
  } catch (error: any) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
