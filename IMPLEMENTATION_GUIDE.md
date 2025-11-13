# NUESA LASU Website - Implementation Guide

## Overview

This guide explains the changes made to integrate Supabase for dynamic content management. The system now supports:
- Dynamic department pages that fetch lecturer data
- Admin dashboard for managing lecturers, events, and gallery items
- Background decoration image that spans all sections
- Dynamic department names in header navigation

## Setup Instructions

### 1. Supabase Database Setup

Execute the SQL schema to create the necessary tables. Go to Supabase Console > SQL Editor and run:

```sql
-- From supabase/schema.sql
```

This creates:
- `lecturers` table - stores lecturer information
- `courses` table - stores courses taught by lecturers
- `events` table - stores department events
- `gallery_items` table - stores news/gallery photos
- Row Level Security (RLS) policies for public read and authenticated write

### 2. Environment Variables

Ensure your `.env.local` file has:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

The service role key should only be used server-side for admin operations.

### 3. Populate Sample Data

To add sample data, either:
1. Use the Admin Dashboard (/admin/dashboard) to manually add lecturers, events, and gallery items
2. Or insert data directly via Supabase SQL Editor

### 4. User Authentication

Currently, the admin dashboard checks for authentication but doesn't enforce admin role validation. To implement admin-only access:
1. Add an `is_admin` claim to user metadata in Supabase
2. Verify this in the admin dashboard `checkAuth()` function

## Key Files and Changes

### Frontend Components

#### BackgroundDecor.tsx
- Now uses a single background image that covers the entire viewport
- Applies to all sections except header and footer
- Image is centered and fixed

#### Header.tsx
- Shows dynamic department name based on current route
- When on a department page (e.g., /departments/aerospace), displays "Aerospace Engineering"
- Defaults to "Departments" on other pages
- Chevron dropdown shows all department options

#### Department Pages
All department pages (aerospace.tsx, mechanical.tsx, etc.) now:
- Fetch lecturer data from `/api/lecturers?department=<slug>`
- Display lecturers in a 3-column grid
- Show loading state while fetching
- Display error messages if fetch fails
- Use placeholder images if not provided

### API Endpoints

#### Public Endpoints (Read-only)

**GET /api/lecturers?department=<slug>**
- Returns all lecturers for a department
- Optional: Include courses relations
- Example: `/api/lecturers?department=aerospace`

**GET /api/events?department=<slug>**
- Returns all events for a department
- Sorted by event date (newest first)
- Example: `/api/events?department=aerospace`

**GET /api/gallery?department=<slug>**
- Returns all gallery items for a department
- Sorted by creation date (newest first)
- Example: `/api/gallery?department=aerospace`

#### Admin Endpoints (Authenticated)

**POST/PUT/DELETE /api/admin/lecturers**
- Requires Bearer token in Authorization header
- Methods:
  - POST: Create new lecturer
  - PUT: Update existing lecturer (requires id in body)
  - DELETE: Delete lecturer (requires id in body)

**POST/PUT/DELETE /api/admin/events**
- Requires Bearer token
- Same method structure as lecturers

**POST/PUT/DELETE /api/admin/gallery**
- Requires Bearer token
- Same method structure as lecturers

### Admin Dashboard

Access at `/admin/dashboard` after authentication.

**Features:**
- Tab-based interface (Partners, Lecturers, Events, Gallery)
- Add/Edit/Delete functionality for each content type
- Department selector for all content types
- Real-time data refresh after operations

**Department Options:**
- Aerospace
- Mechanical
- Chemical
- Electronics & Computer
- Civil
- Industrial

### Placeholder Images

The following placeholder images are automatically used when no custom image is provided:

- **Lecturer image**: `https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800`
- **Event image**: `https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2F052b7a9a1fe54b3993466cb2f9f0526f?format=webp&width=800`
- **Gallery image**: `https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2F9850dea013df467ebadc347003ca09a9?format=webp&width=800`

## Testing Workflow

1. **Add Sample Data**
   - Go to `/admin/dashboard`
   - Click "Lecturers" tab
   - Add a lecturer for the Aerospace department
   - Add a course for that lecturer

2. **View in Department Page**
   - Navigate to `/departments/aerospace`
   - Verify the lecturer appears in the "Lecturers' Directory" section

3. **Test Header**
   - Verify header shows "Departments" on home page
   - Verify header shows "Aerospace Engineering" on `/departments/aerospace`
   - Verify header shows "Mechanical Engineering" on `/departments/mechanical`, etc.

4. **Test Background**
   - Verify the background image appears on all department pages
   - Verify header and footer are not affected by the background
   - Verify content overlays correctly on the background

## Troubleshooting

### Lecturers not appearing
1. Check Supabase data is in the `lecturers` table
2. Verify the department slug matches exactly (e.g., 'aerospace', not 'Aerospace')
3. Check browser console for API errors
4. Verify CORS is enabled in Supabase

### Admin Dashboard not loading
1. Ensure Supabase authentication is configured
2. Check that SUPABASE_SERVICE_ROLE_KEY is set in environment
3. Verify user is authenticated in Supabase
4. Check console for authorization errors

### Images not loading
1. Verify image URLs are publicly accessible
2. Check CORS headers on image URLs
3. Use https URLs if available
4. Test image URL in browser directly

## Next Steps

### Optional Enhancements
1. Implement admin-only access control with role-based validation
2. Add course management interface to admin dashboard
3. Create events and gallery items sections on department pages
4. Implement image upload functionality using Supabase Storage
5. Add search and filter functionality to lecturers list
6. Implement caching for frequently accessed data

### Best Practices
1. Always use the service role key server-side only
2. Implement row-level security for sensitive data
3. Add rate limiting to API endpoints
4. Use proper error handling and validation
5. Keep placeholder images in CDN for fast loading

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Review API error responses in browser console
3. Check database logs in Supabase dashboard
4. Verify network requests in browser developer tools
