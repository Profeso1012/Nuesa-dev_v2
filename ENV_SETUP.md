# Environment Variables Setup Guide

This guide explains all required environment variables and how to set them up for the NUESA LASU website.

## Overview

The application requires the following environment variables:

1. **Supabase Configuration** - Database and authentication
2. **Admin Password** - Secret key for admin registration
3. **Image Upload** - Supabase Storage bucket configuration

## Step 1: Supabase Setup

### 1.1 Get Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select existing one
3. Go to **Settings > API**
4. Copy the following values:
   - `Project URL` → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → Use as `SUPABASE_SERVICE_ROLE_KEY`

### 1.2 Run Database Migration

1. Go to Supabase SQL Editor
2. Open and run `SUPABASE_MIGRATION.sql` (creates all tables with constraints)
3. Open and run `SEED_DATA.sql` (populates sample data)

### 1.3 Setup Storage Bucket

1. In Supabase, go to **Storage**
2. Click **Create a new bucket**
3. Name it: `pictures`
4. Set to **Public** (so images are accessible via URL)
5. Click **Create bucket**
6. Go to bucket settings and add access policy:
   - Allow `SELECT` for public access
   - Allow `INSERT`, `UPDATE`, `DELETE` for authenticated users

## Step 2: Configure Environment Variables

### Create `.env.local` file

In the root directory of your project, create a `.env.local` file with:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Admin Password (used during admin registration)
# Change this to a secure, random password
ADMIN_PASSWORD=your-secure-password-here
```

### Example `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcd1234.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_PASSWORD=MySecurePassword123!@#
```

## Step 3: Create First Admin Account

After setting up environment variables:

1. Start the development server: `npm run dev`
2. Go to `/admin/register` (you'll need to create this page or use API directly)
3. Or use API endpoint directly:

```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123",
    "adminSecretPassword": "your-ADMIN_PASSWORD-from-.env.local"
  }'
```

## Step 4: Environment Variables Explanation

### Supabase Configuration

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://abcd1234.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key (safe for frontend) | Long JWT token |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin API key (server-side only) | Long JWT token with higher privileges |

### Admin Configuration

| Variable | Purpose | Example |
|----------|---------|---------|
| `ADMIN_PASSWORD` | Secret password for admin registration | `MySecurePassword123!@#` |

## Step 5: Verify Setup

Run these commands to verify everything is configured:

### Check Supabase Connection

```bash
# This will test your Supabase connection
npm run dev
```

Then navigate to any page - if you see data loading without errors, Supabase is connected.

### Test Admin Registration

```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "adminSecretPassword": "your-ADMIN_PASSWORD"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Admin user created successfully",
  "user": {
    "id": "uuid-here",
    "email": "test@example.com"
  }
}
```

## Security Best Practices

### DO:
✅ Use strong, random `ADMIN_PASSWORD` (min 12 characters)
✅ Keep `SUPABASE_SERVICE_ROLE_KEY` secret (server-side only)
✅ Rotate `ADMIN_PASSWORD` regularly
✅ Use `.env.local` (never commit to git)

### DON'T:
❌ Use simple passwords like "password123"
❌ Share `SUPABASE_SERVICE_ROLE_KEY` publicly
❌ Commit `.env.local` to git
❌ Use same password for admin and personal accounts
❌ Hardcode environment variables in code

## Deployment

When deploying to production (Netlify, Vercel, etc.):

1. **In Netlify**: Go to **Site Settings > Build & Deploy > Environment**
2. Add the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`

3. Trigger a redeploy after adding variables

## Troubleshooting

### "Supabase connection failed"
- Check `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Verify Supabase project is active

### "Unauthorized" errors from admin endpoints
- Check `SUPABASE_SERVICE_ROLE_KEY` is set
- Verify you're authenticated with valid token
- Check RLS policies are configured correctly

### "Upload failed" for images
- Check `pictures` bucket exists in Supabase Storage
- Verify bucket is set to Public
- Check file is JPG or PNG and under 5MB

### Admin registration fails
- Verify `ADMIN_PASSWORD` in `.env.local` matches what you're sending
- Check `adminSecretPassword` in request exactly matches env variable
- Ensure email is unique in Supabase Auth

## Resetting Everything

If you need to start fresh:

1. In Supabase, go to SQL Editor
2. Run: `DROP TABLE IF EXISTS admin_users, executives, department_admins, courses, lecturers, events, gallery_items CASCADE;`
3. Run `SUPABASE_MIGRATION.sql` again
4. Run `SEED_DATA.sql` again
5. Create new admin account

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase API Reference](https://supabase.com/docs/reference/javascript)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
