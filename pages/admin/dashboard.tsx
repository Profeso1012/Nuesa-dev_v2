import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import ImageUploadComponent from '../../components/ImageUploadComponent';

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface Partner { id: string; logo_url: string; name: string; created_at: string; }
interface Lecturer { id: string; name: string; specialization: string; department: string; bio: string; linkedin_url: string; x_url: string; image_url: string; created_at: string; }
interface Event { id: string; title: string; category: string; date: string; time: string; venue: string; form_link: string | null; description: string; image_url: string; created_at: string; }
interface GalleryItem { id: string; title: string; description: string; type: 'news_photo' | 'event_photo'; date: string; image_url: string; created_at: string; }
interface Executive { id: string; name: string; position: string; bio: string; email: string; linkedin_url: string; x_url: string; type: string; council: string; year: string; image_url: string; created_at: string; }
interface DepartmentAdmin { id: string; name: string; department: string; bio: string; linkedin_url: string; x_url: string; image_url: string; created_at: string; }
interface DepartmentExecutive { id: string; name: string; position: string; department: string; bio: string; email: string; linkedin_url: string; x_url: string; type: string; year: string; image_url: string; created_at: string; }
interface AdminUser { id: string; email: string; created_at: string; }

type Tab = 'partners' | 'lecturers' | 'events' | 'gallery' | 'executives' | 'dept-executives' | 'department-admins' | 'admin-users' | 'subscribers';

const departments = [
  { name: 'Mechanical Engineering', slug: 'mechanical' },
  { name: 'Aerospace Engineering', slug: 'aerospace' },
  { name: 'Chemical Engineering', slug: 'chemical' },
  { name: 'Electronics & Computer Engineering', slug: 'electronics-computer' },
  { name: 'Civil Engineering', slug: 'civil' },
  { name: 'Industrial Engineering', slug: 'industrial' },
  { name: 'Dean of Faculty', slug: 'faculty-dean' },
];
const councils = ['SEC', 'SPC'];

// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const authHeaders = (token: string) => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

async function apiCall(url: string, method: string, token: string, body?: object) {
  const res = await fetch(url, { method, headers: authHeaders(token), body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Request failed'); }
  return res.json();
}

// â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('partners');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // Data
  const [partners, setPartners] = useState<Partner[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [deptExecutives, setDeptExecutives] = useState<DepartmentExecutive[]>([]);
  const [departmentAdmins, setDepartmentAdmins] = useState<DepartmentAdmin[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [subscribers, setSubscribers] = useState<{id: string; email: string; created_at: string}[]>([]);

  // Partner form
  const [partnerForm, setPartnerForm] = useState({ name: '', logo_url: '' });
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);

  // Lecturer form
  const [lecturerForm, setLecturerForm] = useState({ name: '', specialization: '', department: 'mechanical', bio: '', linkedin_url: '', x_url: '', image_url: '' });
  const [editingLecturerId, setEditingLecturerId] = useState<string | null>(null);

  // Event form
  const [eventForm, setEventForm] = useState({ title: '', category: '', date: '', time: '', venue: '', form_link: '', description: '', image_url: '' });
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Gallery form
  const [galleryForm, setGalleryForm] = useState({ title: '', description: '', type: 'news_photo' as 'news_photo' | 'event_photo', date: '', image_url: '' });
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);

  // Executive form
  const [executiveForm, setExecutiveForm] = useState({ name: '', position: 'Post 1', bio: '', email: '', linkedin_url: '', x_url: '', type: 'current', council: 'SEC', year: '', image_url: '' });
  const [editingExecutiveId, setEditingExecutiveId] = useState<string | null>(null);

  // Dept executive form
  const [deptExecForm, setDeptExecForm] = useState({ name: '', position: 'President', department: 'mechanical', bio: '', email: '', linkedin_url: '', x_url: '', type: 'current', year: '', image_url: '' });
  const [editingDeptExecId, setEditingDeptExecId] = useState<string | null>(null);

  // Dept admin form
  const [deptAdminForm, setDeptAdminForm] = useState({ name: '', department: 'mechanical', bio: '', linkedin_url: '', x_url: '', image_url: '' });
  const [editingDeptAdminId, setEditingDeptAdminId] = useState<string | null>(null);

  useEffect(() => { checkAuth(); }, []);
  useEffect(() => {
    if (!token) return;
    const fetchers: Record<Tab, () => void> = {
      partners: fetchPartners, lecturers: fetchLecturers, events: fetchEvents,
      gallery: fetchGallery, executives: fetchExecutives, 'dept-executives': fetchDeptExecutives,
      'department-admins': fetchDeptAdmins, 'admin-users': fetchAdminUsers, subscribers: fetchSubscribers,
    };
    fetchers[activeTab]?.();
  }, [activeTab, token]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push('/login'); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.user_metadata?.is_admin) {
      setToken(session.access_token);
      setLoading(false);
    } else { router.push('/'); }
  };

  // â”€â”€ Fetchers â”€â”€
  const fetchPartners = async () => { const { data } = await supabase.from('partners').select('*').order('created_at'); setPartners(data || []); };
  const fetchLecturers = async () => { const { data } = await supabase.from('lecturers').select('*').order('name'); setLecturers(data || []); };
  const fetchEvents = async () => { const { data } = await supabase.from('events').select('*').order('date', { ascending: false }); setEvents(data || []); };
  const fetchGallery = async () => { const { data } = await supabase.from('gallery_items').select('*').order('date', { ascending: false }); setGalleryItems(data || []); };
  const fetchExecutives = async () => { const { data } = await supabase.from('executives').select('*').order('council').order('type').order('created_at'); setExecutives(data || []); };
  const fetchDeptExecutives = async () => { const { data } = await supabase.from('department_executives').select('*').order('department').order('type').order('created_at'); setDeptExecutives(data || []); };
  const fetchDeptAdmins = async () => { const { data } = await supabase.from('department_admins').select('*').order('department'); setDepartmentAdmins(data || []); };
  const fetchAdminUsers = async () => {
    const res = await fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } });
    setAdminUsers(await res.json() || []);
  };
  const fetchSubscribers = async () => {
    const res = await fetch('/api/admin/subscribers', { headers: { Authorization: `Bearer ${token}` } });
    setSubscribers(await res.json() || []);
  };

  // â”€â”€ Promote to past â”€â”€
  const handlePromoteToPast = async (id: string, year: string) => {
    const y = prompt('Confirm year for this past term (e.g. 2024/2025):', year || '');
    if (!y) return;
    try {
      await apiCall('/api/admin/executives', 'PUT', token, { id, type: 'past', year: y });
      fetchExecutives();
    } catch (e: any) { alert(e.message); }
  };

  const handlePromoteDeptExecToPast = async (id: string, year: string) => {
    const y = prompt('Confirm year for this past term (e.g. 2024/2025):', year || '');
    if (!y) return;
    try {
      await apiCall('/api/admin/department-executives', 'PUT', token, { id, type: 'past', year: y });
      fetchDeptExecutives();
    } catch (e: any) { alert(e.message); }
  };

  // â”€â”€ Save/Delete handlers â”€â”€
  const savePartner = async (e: React.FormEvent) => {
    e.preventDefault(); setUploading(true);
    try {
      if (editingPartnerId) {
        await apiCall('/api/admin/partners', 'PUT', token, { id: editingPartnerId, ...partnerForm });
      } else {
        await apiCall('/api/admin/partners', 'POST', token, { name: partnerForm.name, logo_url: partnerForm.logo_url });
      }
      setPartnerForm({ name: '', logo_url: '' }); setEditingPartnerId(null); fetchPartners();
    } catch (e: any) { alert(e.message); } finally { setUploading(false); }
  };

  const saveLecturer = async (e: React.FormEvent) => {
    e.preventDefault(); setUploading(true);
    try {
      if (editingLecturerId) await apiCall('/api/admin/lecturers', 'PUT', token, { id: editingLecturerId, ...lecturerForm });
      else await apiCall('/api/admin/lecturers', 'POST', token, lecturerForm);
      setLecturerForm({ name: '', specialization: '', department: 'mechanical', bio: '', linkedin_url: '', x_url: '', image_url: '' });
      setEditingLecturerId(null); fetchLecturers();
    } catch (e: any) { alert(e.message); } finally { setUploading(false); }
  };

  const saveEvent = async (e: React.FormEvent) => {
    e.preventDefault(); setUploading(true);
    try {
      if (editingEventId) await apiCall('/api/admin/events', 'PUT', token, { id: editingEventId, ...eventForm });
      else await apiCall('/api/admin/events', 'POST', token, eventForm);
      setEventForm({ title: '', category: '', date: '', time: '', venue: '', form_link: '', description: '', image_url: '' });
      setEditingEventId(null); fetchEvents();
    } catch (e: any) { alert(e.message); } finally { setUploading(false); }
  };

  const saveGallery = async (e: React.FormEvent) => {
    e.preventDefault(); setUploading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const data = { ...galleryForm, date: galleryForm.date || today };
      if (editingGalleryId) await apiCall('/api/admin/gallery', 'PUT', token, { id: editingGalleryId, ...data });
      else await apiCall('/api/admin/gallery', 'POST', token, data);
      setGalleryForm({ title: '', description: '', type: 'news_photo', date: today, image_url: '' });
      setEditingGalleryId(null); fetchGallery();
    } catch (e: any) { alert(e.message); } finally { setUploading(false); }
  };

  const saveExecutive = async (e: React.FormEvent) => {
    e.preventDefault(); setUploading(true);
    try {
      if (editingExecutiveId) await apiCall('/api/admin/executives', 'PUT', token, { id: editingExecutiveId, ...executiveForm });
      else await apiCall('/api/admin/executives', 'POST', token, executiveForm);
      setExecutiveForm({ name: '', position: 'Post 1', bio: '', email: '', linkedin_url: '', x_url: '', type: 'current', council: 'SEC', year: '', image_url: '' });
      setEditingExecutiveId(null); fetchExecutives();
    } catch (e: any) { alert(e.message); } finally { setUploading(false); }
  };

  const saveDeptExec = async (e: React.FormEvent) => {
    e.preventDefault(); setUploading(true);
    try {
      if (editingDeptExecId) await apiCall('/api/admin/department-executives', 'PUT', token, { id: editingDeptExecId, ...deptExecForm });
      else await apiCall('/api/admin/department-executives', 'POST', token, deptExecForm);
      setDeptExecForm({ name: '', position: 'President', department: 'mechanical', bio: '', email: '', linkedin_url: '', x_url: '', type: 'current', year: '', image_url: '' });
      setEditingDeptExecId(null); fetchDeptExecutives();
    } catch (e: any) { alert(e.message); } finally { setUploading(false); }
  };

  const saveDeptAdmin = async (e: React.FormEvent) => {
    e.preventDefault(); setUploading(true);
    try {
      if (editingDeptAdminId) await apiCall('/api/admin/department-admins', 'PUT', token, { id: editingDeptAdminId, ...deptAdminForm });
      else await apiCall('/api/admin/department-admins', 'POST', token, deptAdminForm);
      setDeptAdminForm({ name: '', department: 'mechanical', bio: '', linkedin_url: '', x_url: '', image_url: '' });
      setEditingDeptAdminId(null); fetchDeptAdmins();
    } catch (e: any) { alert(e.message); } finally { setUploading(false); }
  };

  const del = async (url: string, id: string, refresh: () => void) => {
    if (!confirm('Delete this record?')) return;
    try { await apiCall(url, 'DELETE', token, { id }); refresh(); } catch (e: any) { alert(e.message); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Loading...</div></div>;

  const inp = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]';
  const btn = (color: string) => `px-4 py-2 ${color} text-white rounded hover:opacity-90 text-sm font-semibold`;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#212121]">Admin Dashboard</h1>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }} className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">Logout</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {(['partners','lecturers','events','gallery','executives','dept-executives','department-admins','subscribers','admin-users'] as Tab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold capitalize transition whitespace-nowrap ${activeTab === tab ? 'text-[#E6731F] border-b-2 border-[#E6731F]' : 'text-gray-600 hover:text-[#E6731F]'}`}>
              {tab === 'department-admins' ? 'HODs' : tab === 'admin-users' ? 'Admin Users' : tab === 'dept-executives' ? 'Dept Execs' : tab === 'subscribers' ? 'Subscribers' : tab}
            </button>
          ))}
        </div>

        {/* â”€â”€ PARTNERS â”€â”€ */}
        {activeTab === 'partners' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">{editingPartnerId ? 'Edit Partner' : 'Add Partner'}</h2>
              <form onSubmit={savePartner} className="space-y-4">
                <div><label className="block text-sm font-medium mb-1">Name (max 50)</label>
                  <input className={inp} value={partnerForm.name} onChange={e => setPartnerForm({ ...partnerForm, name: e.target.value.slice(0,50) })} maxLength={50} required /></div>
                <ImageUploadComponent onImageUrlChange={url => setPartnerForm({ ...partnerForm, logo_url: url })} currentImageUrl={partnerForm.logo_url} token={token} folder="partners" isUploading={uploading} onUploadStatusChange={setUploading} />
                <div className="flex gap-3">
                  <button type="submit" disabled={uploading} className={btn('bg-[#E6731F]')}>{uploading ? 'Saving...' : editingPartnerId ? 'Update' : 'Add Partner'}</button>
                  {editingPartnerId && <button type="button" onClick={() => { setEditingPartnerId(null); setPartnerForm({ name: '', logo_url: '' }); }} className={btn('bg-gray-400')}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-4">Partners ({partners.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {partners.map(p => (
                  <div key={p.id} className="border rounded-lg p-4 flex flex-col items-center gap-3">
                    <img src={p.logo_url} alt={p.name} className="h-20 object-contain" />
                    <p className="text-sm font-semibold text-center">{p.name}</p>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingPartnerId(p.id); setPartnerForm({ name: p.name, logo_url: p.logo_url }); }} className={btn('bg-blue-600')}>Edit</button>
                      <button onClick={() => del('/api/admin/partners', p.id, fetchPartners)} className={btn('bg-red-600')}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* â”€â”€ LECTURERS â”€â”€ */}
        {activeTab === 'lecturers' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">{editingLecturerId ? 'Edit Lecturer' : 'Add Lecturer'}</h2>
              <form onSubmit={saveLecturer} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Name (max 50)</label><input className={inp} value={lecturerForm.name} onChange={e => setLecturerForm({ ...lecturerForm, name: e.target.value.slice(0,50) })} maxLength={50} required /></div>
                  <div><label className="block text-sm font-medium mb-1">Specialization (max 50)</label><input className={inp} value={lecturerForm.specialization} onChange={e => setLecturerForm({ ...lecturerForm, specialization: e.target.value.slice(0,50) })} maxLength={50} required /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Department</label>
                  <select className={inp} value={lecturerForm.department} onChange={e => setLecturerForm({ ...lecturerForm, department: e.target.value })}>
                    {departments.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
                  </select></div>
                <div><label className="block text-sm font-medium mb-1">Bio (max 150)</label>
                  <textarea className={inp} rows={3} value={lecturerForm.bio} onChange={e => setLecturerForm({ ...lecturerForm, bio: e.target.value.slice(0,150) })} maxLength={150} /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">LinkedIn URL</label><input className={inp} type="url" value={lecturerForm.linkedin_url} onChange={e => setLecturerForm({ ...lecturerForm, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." /></div>
                  <div><label className="block text-sm font-medium mb-1">X (Twitter) URL</label><input className={inp} type="url" value={lecturerForm.x_url} onChange={e => setLecturerForm({ ...lecturerForm, x_url: e.target.value })} placeholder="https://x.com/..." /></div>
                </div>
                <ImageUploadComponent onImageUrlChange={url => setLecturerForm({ ...lecturerForm, image_url: url })} currentImageUrl={lecturerForm.image_url} token={token} folder={`lecturers/${lecturerForm.department}`} isUploading={uploading} onUploadStatusChange={setUploading} />
                <div className="flex gap-3">
                  <button type="submit" disabled={uploading} className={btn('bg-[#E6731F]')}>{uploading ? 'Saving...' : 'Save Lecturer'}</button>
                  {editingLecturerId && <button type="button" onClick={() => { setEditingLecturerId(null); setLecturerForm({ name: '', specialization: '', department: 'mechanical', bio: '', linkedin_url: '', x_url: '', image_url: '' }); }} className={btn('bg-gray-400')}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-4">Lecturers ({lecturers.length})</h2>
              <div className="space-y-3">
                {lecturers.map(l => (
                  <div key={l.id} className="border rounded-lg p-4 flex items-start justify-between">
                    <div><p className="font-semibold">{l.name}</p><p className="text-sm text-gray-600">{l.specialization} â€” {departments.find(d => d.slug === l.department)?.name}</p></div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingLecturerId(l.id); setLecturerForm({ name: l.name, specialization: l.specialization, department: l.department, bio: l.bio || '', linkedin_url: l.linkedin_url || '', x_url: l.x_url || '', image_url: l.image_url }); }} className={btn('bg-blue-600')}>Edit</button>
                      <button onClick={() => del('/api/admin/lecturers', l.id, fetchLecturers)} className={btn('bg-red-600')}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* â”€â”€ EVENTS â”€â”€ */}
        {activeTab === 'events' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">{editingEventId ? 'Edit Event' : 'Add Event'}</h2>
              <form onSubmit={saveEvent} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Title (max 50)</label><input className={inp} value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value.slice(0,50) })} maxLength={50} required /></div>
                  <div><label className="block text-sm font-medium mb-1">Category (max 50)</label><input className={inp} value={eventForm.category} onChange={e => setEventForm({ ...eventForm, category: e.target.value.slice(0,50) })} maxLength={50} placeholder="e.g. Flagship, Annual Summit" required /></div>
                  <div><label className="block text-sm font-medium mb-1">Date</label><input className={inp} type="date" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} required /></div>
                  <div><label className="block text-sm font-medium mb-1">Time</label><input className={inp} value={eventForm.time} onChange={e => setEventForm({ ...eventForm, time: e.target.value.slice(0,50) })} placeholder="e.g. 09:00 AM" required /></div>
                  <div><label className="block text-sm font-medium mb-1">Venue (max 50)</label><input className={inp} value={eventForm.venue} onChange={e => setEventForm({ ...eventForm, venue: e.target.value.slice(0,50) })} maxLength={50} required /></div>
                  <div><label className="block text-sm font-medium mb-1">Registration Form Link (optional)</label><input className={inp} type="url" value={eventForm.form_link} onChange={e => setEventForm({ ...eventForm, form_link: e.target.value })} placeholder="https://forms.google.com/..." /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Event Write-up / Description (max 1000 chars â€” for past events)</label>
                  <textarea className={inp} rows={6} value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value.slice(0,1000) })} maxLength={1000} placeholder="Write a summary of how the event went..." />
                  <p className="text-xs text-gray-400 mt-1">{eventForm.description.length}/1000</p></div>
                <ImageUploadComponent onImageUrlChange={url => setEventForm({ ...eventForm, image_url: url })} currentImageUrl={eventForm.image_url} token={token} folder={`events/${eventForm.title || 'new-event'}`} isUploading={uploading} onUploadStatusChange={setUploading} />
                <div className="flex gap-3">
                  <button type="submit" disabled={uploading} className={btn('bg-[#E6731F]')}>{uploading ? 'Saving...' : 'Save Event'}</button>
                  {editingEventId && <button type="button" onClick={() => { setEditingEventId(null); setEventForm({ title: '', category: '', date: '', time: '', venue: '', form_link: '', description: '', image_url: '' }); }} className={btn('bg-gray-400')}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-4">Events ({events.length})</h2>
              <div className="space-y-3">
                {events.map(ev => (
                  <div key={ev.id} className="border rounded-lg p-4 flex items-start justify-between">
                    <div><p className="font-semibold">{ev.title}</p><p className="text-sm text-gray-600">{ev.category} Â· {ev.venue} Â· {new Date(ev.date).toLocaleDateString()} {ev.time}</p>{ev.form_link && <a href={ev.form_link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600">Registration link â†—</a>}</div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingEventId(ev.id); setEventForm({ title: ev.title, category: ev.category, date: ev.date, time: ev.time, venue: ev.venue, form_link: ev.form_link || '', description: ev.description || '', image_url: ev.image_url }); }} className={btn('bg-blue-600')}>Edit</button>
                      <button onClick={() => del('/api/admin/events', ev.id, fetchEvents)} className={btn('bg-red-600')}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* â”€â”€ GALLERY â”€â”€ */}
        {activeTab === 'gallery' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">{editingGalleryId ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
              <form onSubmit={saveGallery} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Title (max 50)</label><input className={inp} value={galleryForm.title} onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value.slice(0,50) })} maxLength={50} required /></div>
                  <div><label className="block text-sm font-medium mb-1">Type</label>
                    <select className={inp} value={galleryForm.type} onChange={e => setGalleryForm({ ...galleryForm, type: e.target.value as 'news_photo' | 'event_photo' })}>
                      <option value="event_photo">Event Photo</option>
                      <option value="news_photo">News Photo</option>
                    </select></div>
                  <div><label className="block text-sm font-medium mb-1">Date</label><input className={inp} type="date" value={galleryForm.date} onChange={e => setGalleryForm({ ...galleryForm, date: e.target.value })} required /></div>
                  <div><label className="block text-sm font-medium mb-1">Description (max 500)</label><input className={inp} value={galleryForm.description} onChange={e => setGalleryForm({ ...galleryForm, description: e.target.value.slice(0,500) })} maxLength={500} /></div>
                </div>
                <ImageUploadComponent onImageUrlChange={url => setGalleryForm({ ...galleryForm, image_url: url })} currentImageUrl={galleryForm.image_url} token={token} folder={`gallery/${galleryForm.type}`} isUploading={uploading} onUploadStatusChange={setUploading} />
                <div className="flex gap-3">
                  <button type="submit" disabled={uploading} className={btn('bg-[#E6731F]')}>{uploading ? 'Saving...' : 'Save Item'}</button>
                  {editingGalleryId && <button type="button" onClick={() => { setEditingGalleryId(null); setGalleryForm({ title: '', description: '', type: 'news_photo', date: new Date().toISOString().split('T')[0], image_url: '' }); }} className={btn('bg-gray-400')}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-4">Gallery Items ({galleryItems.length})</h2>
              <div className="space-y-3">
                {galleryItems.map(g => (
                  <div key={g.id} className="border rounded-lg p-4 flex items-start justify-between">
                    <div><p className="font-semibold">{g.title}</p><p className="text-xs text-gray-500">{g.type === 'news_photo' ? 'News Photo' : 'Event Photo'} Â· {new Date(g.date).toLocaleDateString()}</p></div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingGalleryId(g.id); setGalleryForm({ title: g.title, description: g.description || '', type: g.type, date: g.date, image_url: g.image_url }); }} className={btn('bg-blue-600')}>Edit</button>
                      <button onClick={() => del('/api/admin/gallery', g.id, fetchGallery)} className={btn('bg-red-600')}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* â”€â”€ NUESA EXECUTIVES â”€â”€ */}
        {activeTab === 'executives' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">{editingExecutiveId ? 'Edit NUESA Executive' : 'Add NUESA Executive'}</h2>
              <form onSubmit={saveExecutive} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Name (max 50)</label><input className={inp} value={executiveForm.name} onChange={e => setExecutiveForm({ ...executiveForm, name: e.target.value.slice(0,50) })} maxLength={50} required /></div>
                  <div><label className="block text-sm font-medium mb-1">Position</label>
                    <input className={inp} value={executiveForm.position} onChange={e => setExecutiveForm({ ...executiveForm, position: e.target.value.slice(0,50) })} maxLength={50} placeholder="e.g. President, Secretary, PRO..." required /></div>
                  <div><label className="block text-sm font-medium mb-1">Council</label>
                    <select className={inp} value={executiveForm.council} onChange={e => setExecutiveForm({ ...executiveForm, council: e.target.value })}>
                      {councils.map(c => <option key={c} value={c}>{c}</option>)}
                    </select></div>
                  <div><label className="block text-sm font-medium mb-1">Status</label>
                    <select className={inp} value={executiveForm.type} onChange={e => setExecutiveForm({ ...executiveForm, type: e.target.value })}>
                      <option value="current">Current</option>
                      <option value="past">Past</option>
                    </select></div>
                  <div><label className="block text-sm font-medium mb-1">Year (e.g. 2025/2026)</label><input className={inp} value={executiveForm.year} onChange={e => setExecutiveForm({ ...executiveForm, year: e.target.value })} placeholder="2025/2026" /></div>
                  <div><label className="block text-sm font-medium mb-1">Email</label><input className={inp} type="email" value={executiveForm.email} onChange={e => setExecutiveForm({ ...executiveForm, email: e.target.value })} /></div>
                  <div><label className="block text-sm font-medium mb-1">LinkedIn URL</label><input className={inp} type="url" value={executiveForm.linkedin_url} onChange={e => setExecutiveForm({ ...executiveForm, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." /></div>
                  <div><label className="block text-sm font-medium mb-1">X (Twitter) URL</label><input className={inp} type="url" value={executiveForm.x_url} onChange={e => setExecutiveForm({ ...executiveForm, x_url: e.target.value })} placeholder="https://x.com/..." /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Bio (max 150)</label>
                  <textarea className={inp} rows={3} value={executiveForm.bio} onChange={e => setExecutiveForm({ ...executiveForm, bio: e.target.value.slice(0,150) })} maxLength={150} />
                  <p className="text-xs text-gray-400">{executiveForm.bio.length}/150</p></div>
                <ImageUploadComponent onImageUrlChange={url => setExecutiveForm({ ...executiveForm, image_url: url })} currentImageUrl={executiveForm.image_url} token={token} folder={`executives/${executiveForm.council}/${executiveForm.year || 'current'}`} isUploading={uploading} onUploadStatusChange={setUploading} />
                <div className="flex gap-3">
                  <button type="submit" disabled={uploading} className={btn('bg-[#E6731F]')}>{uploading ? 'Saving...' : 'Save Executive'}</button>
                  {editingExecutiveId && <button type="button" onClick={() => { setEditingExecutiveId(null); setExecutiveForm({ name: '', position: 'Post 1', bio: '', email: '', linkedin_url: '', x_url: '', type: 'current', council: 'SEC', year: '', image_url: '' }); }} className={btn('bg-gray-400')}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-4">NUESA Executives ({executives.length})</h2>
              {['current','past'].map(status => {
                const group = executives.filter(e => e.type === status);
                if (!group.length) return null;
                return (
                  <div key={status} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 capitalize">{status} Executives</h3>
                    <div className="space-y-3">
                      {group.map(ex => (
                        <div key={ex.id} className="border rounded-lg p-4 flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{ex.name}</p>
                            <p className="text-sm text-gray-600">{ex.position} Â· {ex.council} {ex.year && `(${ex.year})`}</p>
                            <p className="text-sm text-gray-500">{ex.bio}</p>
                          </div>
                          <div className="flex gap-2 flex-wrap justify-end">
                            {ex.type === 'current' && (
                              <button onClick={() => handlePromoteToPast(ex.id, ex.year)} className={btn('bg-amber-500')}>â†’ Past</button>
                            )}
                            <button onClick={() => { setEditingExecutiveId(ex.id); setExecutiveForm({ name: ex.name, position: ex.position, bio: ex.bio || '', email: ex.email || '', linkedin_url: ex.linkedin_url || '', x_url: ex.x_url || '', type: ex.type, council: ex.council, year: ex.year || '', image_url: ex.image_url }); }} className={btn('bg-blue-600')}>Edit</button>
                            <button onClick={() => del('/api/admin/executives', ex.id, fetchExecutives)} className={btn('bg-red-600')}>Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* â”€â”€ DEPARTMENTAL EXECUTIVES â”€â”€ */}
        {activeTab === 'dept-executives' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">{editingDeptExecId ? 'Edit Departmental Executive' : 'Add Departmental Executive'}</h2>
              <form onSubmit={saveDeptExec} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Name (max 50)</label><input className={inp} value={deptExecForm.name} onChange={e => setDeptExecForm({ ...deptExecForm, name: e.target.value.slice(0,50) })} maxLength={50} required /></div>
                  <div><label className="block text-sm font-medium mb-1">Position</label>
                    <input className={inp} value={deptExecForm.position} onChange={e => setDeptExecForm({ ...deptExecForm, position: e.target.value.slice(0,50) })} maxLength={50} placeholder="e.g. President, Vice President..." required /></div>
                  <div><label className="block text-sm font-medium mb-1">Department</label>
                    <select className={inp} value={deptExecForm.department} onChange={e => setDeptExecForm({ ...deptExecForm, department: e.target.value })}>
                      {departments.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
                    </select></div>
                  <div><label className="block text-sm font-medium mb-1">Status</label>
                    <select className={inp} value={deptExecForm.type} onChange={e => setDeptExecForm({ ...deptExecForm, type: e.target.value })}>
                      <option value="current">Current</option>
                      <option value="past">Past</option>
                    </select></div>
                  <div><label className="block text-sm font-medium mb-1">Year (e.g. 2025/2026)</label><input className={inp} value={deptExecForm.year} onChange={e => setDeptExecForm({ ...deptExecForm, year: e.target.value })} placeholder="2025/2026" /></div>
                  <div><label className="block text-sm font-medium mb-1">Email</label><input className={inp} type="email" value={deptExecForm.email} onChange={e => setDeptExecForm({ ...deptExecForm, email: e.target.value })} /></div>
                  <div><label className="block text-sm font-medium mb-1">LinkedIn URL</label><input className={inp} type="url" value={deptExecForm.linkedin_url} onChange={e => setDeptExecForm({ ...deptExecForm, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." /></div>
                  <div><label className="block text-sm font-medium mb-1">X (Twitter) URL</label><input className={inp} type="url" value={deptExecForm.x_url} onChange={e => setDeptExecForm({ ...deptExecForm, x_url: e.target.value })} placeholder="https://x.com/..." /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Bio (max 150)</label>
                  <textarea className={inp} rows={3} value={deptExecForm.bio} onChange={e => setDeptExecForm({ ...deptExecForm, bio: e.target.value.slice(0,150) })} maxLength={150} />
                  <p className="text-xs text-gray-400">{deptExecForm.bio.length}/150</p></div>
                <ImageUploadComponent onImageUrlChange={url => setDeptExecForm({ ...deptExecForm, image_url: url })} currentImageUrl={deptExecForm.image_url} token={token} folder={`dept-executives/${deptExecForm.department}/${deptExecForm.year || 'current'}`} isUploading={uploading} onUploadStatusChange={setUploading} />
                <div className="flex gap-3">
                  <button type="submit" disabled={uploading} className={btn('bg-[#E6731F]')}>{uploading ? 'Saving...' : 'Save Executive'}</button>
                  {editingDeptExecId && <button type="button" onClick={() => { setEditingDeptExecId(null); setDeptExecForm({ name: '', position: 'President', department: 'mechanical', bio: '', email: '', linkedin_url: '', x_url: '', type: 'current', year: '', image_url: '' }); }} className={btn('bg-gray-400')}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-4">Departmental Executives ({deptExecutives.length})</h2>
              {departments.map(dept => {
                const group = deptExecutives.filter(e => e.department === dept.slug);
                if (!group.length) return null;
                return (
                  <div key={dept.slug} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">{dept.name}</h3>
                    <div className="space-y-3">
                      {group.map(ex => (
                        <div key={ex.id} className="border rounded-lg p-4 flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{ex.name}</p>
                            <p className="text-sm text-gray-600">{ex.position} Â· <span className={ex.type === 'current' ? 'text-green-600' : 'text-gray-400'}>{ex.type}</span> {ex.year && `(${ex.year})`}</p>
                          </div>
                          <div className="flex gap-2 flex-wrap justify-end">
                            {ex.type === 'current' && (
                              <button onClick={() => handlePromoteDeptExecToPast(ex.id, ex.year)} className={btn('bg-amber-500')}>â†’ Past</button>
                            )}
                            <button onClick={() => { setEditingDeptExecId(ex.id); setDeptExecForm({ name: ex.name, position: ex.position, department: ex.department, bio: ex.bio || '', email: ex.email || '', linkedin_url: ex.linkedin_url || '', x_url: ex.x_url || '', type: ex.type, year: ex.year || '', image_url: ex.image_url }); }} className={btn('bg-blue-600')}>Edit</button>
                            <button onClick={() => del('/api/admin/department-executives', ex.id, fetchDeptExecutives)} className={btn('bg-red-600')}>Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* â”€â”€ HODs â”€â”€ */}
        {activeTab === 'department-admins' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">{editingDeptAdminId ? 'Edit HOD' : 'Add HOD'}</h2>
              <form onSubmit={saveDeptAdmin} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Name (max 50)</label><input className={inp} value={deptAdminForm.name} onChange={e => setDeptAdminForm({ ...deptAdminForm, name: e.target.value.slice(0,50) })} maxLength={50} required /></div>
                  <div><label className="block text-sm font-medium mb-1">Department</label>
                    <select className={inp} value={deptAdminForm.department} onChange={e => setDeptAdminForm({ ...deptAdminForm, department: e.target.value })}>
                      {departments.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
                    </select></div>
                  <div><label className="block text-sm font-medium mb-1">LinkedIn URL</label><input className={inp} type="url" value={deptAdminForm.linkedin_url} onChange={e => setDeptAdminForm({ ...deptAdminForm, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." /></div>
                  <div><label className="block text-sm font-medium mb-1">X (Twitter) URL</label><input className={inp} type="url" value={deptAdminForm.x_url} onChange={e => setDeptAdminForm({ ...deptAdminForm, x_url: e.target.value })} placeholder="https://x.com/..." /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Bio (max 150)</label>
                  <textarea className={inp} rows={3} value={deptAdminForm.bio} onChange={e => setDeptAdminForm({ ...deptAdminForm, bio: e.target.value.slice(0,150) })} maxLength={150} />
                  <p className="text-xs text-gray-400">{deptAdminForm.bio.length}/150</p></div>
                <ImageUploadComponent onImageUrlChange={url => setDeptAdminForm({ ...deptAdminForm, image_url: url })} currentImageUrl={deptAdminForm.image_url} token={token} folder={`department-admins/${deptAdminForm.department}`} isUploading={uploading} onUploadStatusChange={setUploading} />
                <div className="flex gap-3">
                  <button type="submit" disabled={uploading} className={btn('bg-[#E6731F]')}>{uploading ? 'Saving...' : 'Save HOD'}</button>
                  {editingDeptAdminId && <button type="button" onClick={() => { setEditingDeptAdminId(null); setDeptAdminForm({ name: '', department: 'mechanical', bio: '', linkedin_url: '', x_url: '', image_url: '' }); }} className={btn('bg-gray-400')}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-4">HODs ({departmentAdmins.length})</h2>
              <div className="space-y-3">
                {departmentAdmins.map(a => (
                  <div key={a.id} className="border rounded-lg p-4 flex items-start justify-between">
                    <div><p className="font-semibold">{a.name}</p><p className="text-sm text-gray-600">{departments.find(d => d.slug === a.department)?.name}</p><p className="text-sm text-gray-500">{a.bio}</p></div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingDeptAdminId(a.id); setDeptAdminForm({ name: a.name, department: a.department, bio: a.bio || '', linkedin_url: a.linkedin_url || '', x_url: a.x_url || '', image_url: a.image_url }); }} className={btn('bg-blue-600')}>Edit</button>
                      <button onClick={() => del('/api/admin/department-admins', a.id, fetchDeptAdmins)} className={btn('bg-red-600')}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* â”€â”€ SUBSCRIBERS â”€â”€ */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#C45D16]">Subscribers ({subscribers.length})</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const csv = 'email,subscribed_at\n' + subscribers.map(s => `${s.email},${s.created_at}`).join('\n');
                    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
                    a.download = 'subscribers.csv'; a.click();
                  }}
                  className="px-4 py-2 bg-[#E6731F] text-white rounded text-sm font-semibold hover:bg-[#C45D16]"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => {
                    const text = subscribers.map(s => s.email).join('\n');
                    const a = document.createElement('a'); a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
                    a.download = 'subscribers.txt'; a.click();
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded text-sm font-semibold hover:bg-gray-700"
                >
                  Export Emails
                </button>
              </div>
            </div>
            {subscribers.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No subscribers yet.</p>
            ) : (
              <div className="space-y-2">
                {subscribers.map(s => (
                  <div key={s.id} className="border rounded-lg px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#212121]">{s.email}</p>
                      <p className="text-xs text-gray-400">{new Date(s.created_at).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={async () => {
                        if (!confirm(`Remove ${s.email} from subscribers?`)) return;
                        try { await apiCall('/api/admin/subscribers', 'DELETE', token, { id: s.id }); fetchSubscribers(); } catch (e: any) { alert(e.message); }
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* â”€â”€ ADMIN USERS â”€â”€ */}
        {activeTab === 'admin-users' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#C45D16] mb-4">Admin Users ({adminUsers.length})</h2>
            <p className="text-sm text-gray-500 mb-6">To add a new admin, use the <code className="bg-gray-100 px-1 rounded">/api/admin/register</code> endpoint with the ADMIN_PASSWORD from .env.</p>
            <div className="space-y-3">
              {adminUsers.map(u => (
                <div key={u.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div><p className="font-semibold">{u.email}</p><p className="text-xs text-gray-400">Added {new Date(u.created_at).toLocaleDateString()}</p></div>
                  <button onClick={async () => {
                    if (!confirm(`Delete admin ${u.email}? This cannot be undone.`)) return;
                    try { await apiCall('/api/admin/users', 'DELETE', token, { email: u.email }); fetchAdminUsers(); } catch (e: any) { alert(e.message); }
                  }} className={btn('bg-red-600')}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}



