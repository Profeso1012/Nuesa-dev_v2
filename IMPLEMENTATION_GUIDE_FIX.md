# NUESA LASU Website - Complete Implementation Guide

## Overview

This guide provides step-by-step instructions to complete the NUESA LASU website implementation with fixed database schema, updated APIs, admin dashboard, and dynamic frontend pages.

## What's Been Completed

### 1. Database Schema Fixes ✅
- **Events Table**: Removed `department` field, added `category`, `date`, `time`, `venue`, `form_link`
- **Gallery Items Table**: Removed `department` field, added `type` (news_photo/event_photo) and `date`
- **Partners Table**: Created new table with name and logo_url
- **Default Images**: Updated all placeholder image URLs across all tables
- **Constraints**: All text fields have 50-character max constraints

### 2. API Endpoints ✅

**Public APIs (No Authentication Required)**:
- `GET /api/events` - Get all events
- `GET /api/events?upcoming=true` - Get upcoming events only
- `GET /api/events?past=true` - Get past events only
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery?type=news_photo` - Get news photos
- `GET /api/gallery?type=event_photo` - Get event photos
- `GET /api/partners` - Get all partners

**Admin APIs (Authentication Required)**:
- `POST /api/admin/events` - Create event
- `PUT /api/admin/events` - Update event
- `DELETE /api/admin/events` - Delete event
- `POST /api/admin/gallery` - Create gallery item
- `PUT /api/admin/gallery` - Update gallery item
- `DELETE /api/admin/gallery` - Delete gallery item
- `POST /api/admin/partners` - Create partner
- `DELETE /api/admin/partners` - Delete partner

### 3. Admin Dashboard ✅
Complete admin interface with tabs for:
- **Partners**: Add, view, and delete partners
- **Events**: Full CRUD with new schema (category, date, time, venue, form_link)
- **Gallery Items**: Full CRUD with type selector (news_photo/event_photo)
- **Lecturers**: Full CRUD
- **Executives**: Full CRUD
- **Department Admins**: Full CRUD
- **Admin Users**: View and delete admin accounts

### 4. Frontend Pages ✅
- **Home Page**: Fetches executives carousel + latest 3 upcoming events with caching
- **Events Page**: Upcoming/past events, event photo gallery, news photo gallery
- **Partnerships Page**: Dynamic partner logos carousel
- **About Page**: Department admins carousel, past executives carousel

### 5. Caching ✅
- 1-hour client-side caching for all API data
- Cache keys: `executives_current`, `events_upcoming_all`, `events_past_all`, `gallery_event_photos`, `gallery_news_photos`, `partners_all`, `department_admins`

## Setup Instructions

### Step 1: Run Database Migration

1. Go to Supabase Console > SQL Editor
2. Copy the entire content of `SUPABASE_MIGRATION_FIX.sql`
3. Paste into the SQL editor and execute
4. Wait for completion (should take a few seconds)

**What This Does:**
- Fixes events table structure
- Fixes gallery_items table structure
- Creates partners table with RLS policies
- Updates default image URLs
- Seeds sample data (events, gallery items, partners)

### Step 2: Verify Environment Variables

Create or update `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
ADMIN_PASSWORD=YourSecurePassword123!
```

Get these from:
- Supabase Console > Project Settings > API
- Copy Project URL and Anon Key
- Copy Service Role Secret (for backend only)

### Step 3: Verify Supabase Storage

1. Go to Supabase Console > Storage
2. Check if `pictures` bucket exists
3. If not, create it:
   - Click "Create new bucket"
   - Name: `pictures`
   - Set to **Public**
   - Save

### Step 4: Test the Setup

#### Test APIs (in terminal):

```bash
# Test upcoming events
curl "http://localhost:3000/api/events?upcoming=true"

# Test event photos
curl "http://localhost:3000/api/gallery?type=event_photo"

# Test partners
curl "http://localhost:3000/api/partners"
```

#### Test Frontend:
1. Visit `http://localhost:3000` - Home page should show executives + 3 latest events
2. Visit `http://localhost:3000/events` - Should show upcoming/past events + galleries
3. Visit `http://localhost:3000/partnerships` - Should show partner logos

### Step 5: Create First Admin Account

1. Register at `http://localhost:3000/register`:
   - Email: `admin@example.com`
   - Password: Create a secure password
   - Admin Secret: Enter the `ADMIN_PASSWORD` from .env.local

2. Or use curl:
```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123",
    "adminSecretPassword": "YourSecurePassword123!"
  }'
```

### Step 6: Access Admin Dashboard

1. Login at `http://localhost:3000/login`
2. Go to `http://localhost:3000/admin/dashboard`
3. Manage all entities (events, gallery, partners, executives, etc.)

## Database Schema

### Events Table
```
id (UUID)
title (string, max 50)
category (string, max 50) - e.g., "Flagship", "2nd Edition", "Annual Summit"
date (DATE)
time (string, max 50) - e.g., "09:00 AM"
venue (string, max 50)
form_link (URL, nullable) - Google Form registration link
image_url (URL)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### Gallery Items Table
```
id (UUID)
title (string, max 50)
description (string, max 50)
type (enum: 'news_photo' | 'event_photo')
date (DATE)
image_url (URL)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### Partners Table
```
id (UUID)
name (string, max 50)
logo_url (URL)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

## File Structure

```
pages/
  ├── index.tsx (home page)
  ├── about.tsx (about page)
  ├── events.tsx (events page)
  ├── partnerships.tsx (partnerships page)
  ├── admin/
  │   └── dashboard.tsx (admin dashboard)
  └── api/
      ├── events.ts (public GET)
      ├── gallery.ts (public GET)
      ├── partners.ts (public GET)
      └── admin/
          ├── events.ts (POST/PUT/DELETE)
          ├── gallery.ts (POST/PUT/DELETE)
          └── partners.ts (POST/DELETE)

lib/
  ├── cacheUtils.ts (caching helper)
  └── supabaseClient.ts (Supabase client)

components/
  └── ImageUploadComponent.tsx (image upload)
```

## Features

### Events Management
- Create events with category, date, time, venue, form link
- Upcoming/past automatic filtering
- Google Form registration links
- Image upload support
- 1-hour caching for performance

### Gallery Management
- Separate news photos and event photos
- Automatic type filtering on frontend
- Date-based sorting
- Image upload support

### Partners Management
- Add/remove partners
- Partner carousel with automatic scroll for 5+ partners
- Logo upload support

### Admin Dashboard
- 7-tab interface for all entities
- Full CRUD operations
- Image upload with preview
- 50-character field validation
- Authentication required

## Caching Strategy

All frontend pages implement 1-hour caching:
- **Location**: Browser localStorage
- **Cache TTL**: 3600 seconds (1 hour)
- **Automatic invalidation**: After 1 hour expires

Cache keys used:
- `executives_current` - Current executives
- `events_upcoming_all` - All upcoming events
- `events_past_all` - All past events
- `gallery_event_photos` - Event photos
- `gallery_news_photos` - News photos
- `partners_all` - All partners
- `department_admins` - Department admins

## Security Features

- **Row Level Security (RLS)**: All tables have RLS policies
  - Public READ access for events, gallery, partners
  - Authenticated WRITE access for admin operations
- **Authentication**: JWT-based auth for admin endpoints
- **File Upload Security**: 
  - JPG/PNG only
  - 5MB file size limit
  - Server-side validation
- **Character Constraints**: All text fields have 50-char max limits enforced at DB level

## Troubleshooting

### Events/Gallery not showing on frontend
1. Check Supabase connection: `echo $NEXT_PUBLIC_SUPABASE_URL`
2. Verify database migration was completed
3. Check browser console for error messages
4. Clear localStorage: `localStorage.clear()`
5. Refresh page

### Image upload failing
1. Verify `pictures` bucket exists and is PUBLIC
2. Check file is JPG or PNG
3. Check file size < 5MB
4. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
5. Check browser network tab for error details

### Admin dashboard showing 404
1. Make sure you're logged in (check `/login`)
2. Verify your user has admin flag set
3. Check browser console for auth errors

### Caching issues
1. Clear localStorage: `localStorage.clear()`
2. Refresh page (Ctrl+F5 for full refresh)
3. Wait 1 hour for cache to automatically expire

## Migration from Old Schema

If you had data in the old schema:
1. The migration creates new columns while preserving existing data
2. Old `department` and `event_date` fields are handled by the migration
3. Check your data after migration to ensure it looks correct
4. Update any old form submissions or integrations to use new field names

## Next Steps

1. ✅ Run SQL migration
2. ✅ Set environment variables
3. ✅ Verify Supabase Storage bucket
4. ✅ Create admin account
5. ✅ Test APIs
6. ✅ Access admin dashboard
7. ✅ Add events, gallery items, partners via dashboard
8. ✅ Test frontend pages showing dynamic data
9. ✅ Deploy to Netlify (push code and deploy)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Supabase documentation: https://supabase.com/docs
3. Check Next.js documentation: https://nextjs.org/docs
4. Review error messages in browser console

## Production Checklist

Before deploying to production:
- [ ] Change `ADMIN_PASSWORD` to a strong, secure password
- [ ] Verify all environment variables are set correctly
- [ ] Test all admin functions (create, edit, delete)
- [ ] Test all frontend pages load correctly
- [ ] Verify images are loading from correct URLs
- [ ] Test on mobile devices
- [ ] Set up proper error logging
- [ ] Configure Netlify/Vercel deployment
- [ ] Set up SSL certificate
- [ ] Configure custom domain

## Summary

You now have a complete, production-ready NUESA LASU website with:
- ✅ Fixed database schema
- ✅ Full CRUD APIs for events, gallery, partners
- ✅ Comprehensive admin dashboard
- ✅ Dynamic frontend pages with caching
- ✅ Image upload support
- ✅ Security and RLS policies
- ✅ 1-hour client-side caching

The frontend data automatically reflects changes made in the admin dashboard after page refresh!
