import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import ImageUploadComponent from '../../components/ImageUploadComponent';

interface Partner {
  id: string;
  logo_url: string;
  name: string;
  created_at: string;
}

interface Lecturer {
  id: string;
  name: string;
  specialization: string;
  department: string;
  image_url: string;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  department: string;
  image_url: string;
  event_date: string;
  created_at: string;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  department: string;
  image_url: string;
  created_at: string;
}

interface Executive {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  type: string;
  council: string;
  year: string;
  image_url: string;
  created_at: string;
}

interface DepartmentAdmin {
  id: string;
  name: string;
  department: string;
  bio: string;
  image_url: string;
  created_at: string;
}

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

type Tab = 'partners' | 'lecturers' | 'events' | 'gallery' | 'executives' | 'department-admins' | 'admin-users';

const departments = [
  { name: 'Mechanical Engineering', slug: 'mechanical' },
  { name: 'Aerospace Engineering', slug: 'aerospace' },
  { name: 'Chemical Engineering', slug: 'chemical' },
  { name: 'Electronics & Computer Engineering', slug: 'electronics-computer' },
  { name: 'Civil Engineering', slug: 'civil' },
  { name: 'Industrial Engineering', slug: 'industrial' },
];

const positions = ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5', 'Post 6', 'Post 7', 'Post 8', 'Post 9'];
const councils = ['SEC', 'SPC'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('partners');
  const [token, setToken] = useState<string>('');
  
  // Partner state
  const [partners, setPartners] = useState<Partner[]>([]);
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerUrl, setNewPartnerUrl] = useState('');

  // Lecturer state
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [lecturerForm, setLecturerForm] = useState({
    name: '',
    specialization: '',
    department: 'aerospace',
    image_url: '',
  });
  const [editingLecturerId, setEditingLecturerId] = useState<string | null>(null);

  // Event state
  const [events, setEvents] = useState<Event[]>([]);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    department: 'aerospace',
    image_url: '',
    event_date: '',
  });
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    department: 'aerospace',
    image_url: '',
  });
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);

  // Executive state
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [executiveForm, setExecutiveForm] = useState({
    name: '',
    position: 'Post 1',
    bio: '',
    email: '',
    type: 'current',
    council: 'SEC',
    year: '',
    image_url: '',
  });
  const [editingExecutiveId, setEditingExecutiveId] = useState<string | null>(null);

  // Department Admin state
  const [departmentAdmins, setDepartmentAdmins] = useState<DepartmentAdmin[]>([]);
  const [departmentAdminForm, setDepartmentAdminForm] = useState({
    name: '',
    department: 'mechanical',
    bio: '',
    image_url: '',
  });
  const [editingDepartmentAdminId, setEditingDepartmentAdminId] = useState<string | null>(null);

  // Admin Users state
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (token) {
      if (activeTab === 'partners') fetchPartners();
      else if (activeTab === 'lecturers') fetchLecturers();
      else if (activeTab === 'events') fetchEvents();
      else if (activeTab === 'gallery') fetchGalleryItems();
      else if (activeTab === 'executives') fetchExecutives();
      else if (activeTab === 'department-admins') fetchDepartmentAdmins();
      else if (activeTab === 'admin-users') fetchAdminUsers();
    }
  }, [activeTab, token]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
      return;
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.user_metadata?.is_admin) {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (currentSession?.access_token) {
        setToken(currentSession.access_token);
        setLoading(false);
      }
    } else {
      router.push('/');
    }
  };

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLecturers = async () => {
    try {
      const { data, error } = await supabase
        .from('lecturers')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setLecturers(data || []);
    } catch (error) {
      console.error('Error fetching lecturers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExecutives = async () => {
    try {
      const { data, error } = await supabase
        .from('executives')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setExecutives(data || []);
    } catch (error) {
      console.error('Error fetching executives:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartmentAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('department_admins')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setDepartmentAdmins(data || []);
    } catch (error) {
      console.error('Error fetching department admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch admin users');
      const data = await response.json();
      setAdminUsers(data || []);
    } catch (error) {
      console.error('Error fetching admin users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (partners.length >= 4) {
      alert('Maximum of 4 partners allowed.');
      return;
    }

    setUploading(true);
    try {
      const { error } = await supabase
        .from('partners')
        .insert([{ name: newPartnerName, logo_url: newPartnerUrl }]);

      if (error) throw error;
      setNewPartnerName('');
      setNewPartnerUrl('');
      fetchPartners();
      alert('Partner added successfully!');
    } catch (error: any) {
      alert('Error adding partner: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPartners();
    } catch (error: any) {
      alert('Error deleting partner: ' + error.message);
    }
  };

  const handleSaveLecturer = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (editingLecturerId) {
        const response = await fetch('/api/admin/lecturers', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id: editingLecturerId, ...lecturerForm }),
        });

        if (!response.ok) throw new Error('Failed to update lecturer');
      } else {
        const response = await fetch('/api/admin/lecturers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(lecturerForm),
        });

        if (!response.ok) throw new Error('Failed to add lecturer');
      }

      setLecturerForm({ name: '', specialization: '', department: 'aerospace', image_url: '' });
      setEditingLecturerId(null);
      fetchLecturers();
      alert(editingLecturerId ? 'Lecturer updated!' : 'Lecturer added!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteLecturer = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch('/api/admin/lecturers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete');
      fetchLecturers();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (editingEventId) {
        const response = await fetch('/api/admin/events', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id: editingEventId, ...eventForm }),
        });

        if (!response.ok) throw new Error('Failed to update event');
      } else {
        const response = await fetch('/api/admin/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(eventForm),
        });

        if (!response.ok) throw new Error('Failed to add event');
      }

      setEventForm({ title: '', description: '', department: 'aerospace', image_url: '', event_date: '' });
      setEditingEventId(null);
      fetchEvents();
      alert(editingEventId ? 'Event updated!' : 'Event added!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch('/api/admin/events', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete');
      fetchEvents();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (editingGalleryId) {
        const response = await fetch('/api/admin/gallery', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id: editingGalleryId, ...galleryForm }),
        });

        if (!response.ok) throw new Error('Failed to update item');
      } else {
        const response = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(galleryForm),
        });

        if (!response.ok) throw new Error('Failed to add item');
      }

      setGalleryForm({ title: '', description: '', department: 'aerospace', image_url: '' });
      setEditingGalleryId(null);
      fetchGalleryItems();
      alert(editingGalleryId ? 'Item updated!' : 'Item added!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete');
      fetchGalleryItems();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleSaveExecutive = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (editingExecutiveId) {
        const response = await fetch('/api/admin/executives', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id: editingExecutiveId, ...executiveForm }),
        });

        if (!response.ok) throw new Error('Failed to update executive');
      } else {
        const response = await fetch('/api/admin/executives', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(executiveForm),
        });

        if (!response.ok) throw new Error('Failed to add executive');
      }

      setExecutiveForm({
        name: '',
        position: 'Post 1',
        bio: '',
        email: '',
        type: 'current',
        council: 'SEC',
        year: '',
        image_url: '',
      });
      setEditingExecutiveId(null);
      fetchExecutives();
      alert(editingExecutiveId ? 'Executive updated!' : 'Executive added!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteExecutive = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch('/api/admin/executives', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete');
      fetchExecutives();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleSaveDepartmentAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (editingDepartmentAdminId) {
        const response = await fetch('/api/admin/department-admins', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id: editingDepartmentAdminId, ...departmentAdminForm }),
        });

        if (!response.ok) throw new Error('Failed to update department admin');
      } else {
        const response = await fetch('/api/admin/department-admins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(departmentAdminForm),
        });

        if (!response.ok) throw new Error('Failed to add department admin');
      }

      setDepartmentAdminForm({ name: '', department: 'mechanical', bio: '', image_url: '' });
      setEditingDepartmentAdminId(null);
      fetchDepartmentAdmins();
      alert(editingDepartmentAdminId ? 'Department admin updated!' : 'Department admin added!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDepartmentAdmin = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch('/api/admin/department-admins', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete');
      fetchDepartmentAdmins();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleDeleteAdminUser = async (email: string) => {
    if (!confirm('Are you sure you want to delete this admin user? This action cannot be undone.')) return;

    try {
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to delete');
      fetchAdminUsers();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#212121]">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {(['partners', 'lecturers', 'events', 'gallery', 'executives', 'department-admins', 'admin-users'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold capitalize transition whitespace-nowrap ${
                activeTab === tab
                  ? 'text-[#E6731F] border-b-2 border-[#E6731F]'
                  : 'text-gray-600 hover:text-[#E6731F]'
              }`}
            >
              {tab === 'department-admins' ? 'Dept Admins' : tab === 'admin-users' ? 'Admin Users' : tab}
            </button>
          ))}
        </div>

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">Add New Partner</h2>
              <form onSubmit={handleAddPartner} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Partner Name</label>
                  <input
                    type="text"
                    value={newPartnerName}
                    onChange={(e) => setNewPartnerName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    placeholder="Enter partner name"
                    required
                    disabled={partners.length >= 4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Logo URL</label>
                  <input
                    type="url"
                    value={newPartnerUrl}
                    onChange={(e) => setNewPartnerUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    placeholder="https://example.com/logo.png"
                    required
                    disabled={partners.length >= 4}
                  />
                </div>
                <button
                  type="submit"
                  disabled={uploading || partners.length >= 4}
                  className="px-8 py-3 bg-[#E6731F] text-white rounded-lg font-semibold hover:bg-[#C45D16] disabled:opacity-50"
                >
                  {uploading ? 'Adding...' : 'Add Partner'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">Partners ({partners.length}/4)</h2>
              {partners.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No partners</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {partners.map((partner) => (
                    <div key={partner.id} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center gap-4">
                      <img src={partner.logo_url} alt={partner.name} className="h-24 w-auto object-contain" />
                      <h3 className="font-semibold text-[#212121]">{partner.name}</h3>
                      <button
                        onClick={() => handleDeletePartner(partner.id)}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Lecturers Tab */}
        {activeTab === 'lecturers' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">
                {editingLecturerId ? 'Edit Lecturer' : 'Add New Lecturer'}
              </h2>
              <form onSubmit={handleSaveLecturer} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Name (Max 50 chars)</label>
                  <input
                    type="text"
                    value={lecturerForm.name}
                    onChange={(e) => setLecturerForm({ ...lecturerForm, name: e.target.value.slice(0, 50) })}
                    maxLength={50}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Specialization (Max 50 chars)</label>
                  <input
                    type="text"
                    value={lecturerForm.specialization}
                    onChange={(e) => setLecturerForm({ ...lecturerForm, specialization: e.target.value.slice(0, 50) })}
                    maxLength={50}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Department</label>
                  <select
                    value={lecturerForm.department}
                    onChange={(e) => setLecturerForm({ ...lecturerForm, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                  >
                    {departments.map((dept) => (
                      <option key={dept.slug} value={dept.slug}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <ImageUploadComponent
                  onImageUrlChange={(url) => setLecturerForm({ ...lecturerForm, image_url: url })}
                  currentImageUrl={lecturerForm.image_url}
                  token={token}
                  isUploading={uploading}
                  onUploadStatusChange={setUploading}
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-8 py-3 bg-[#E6731F] text-white rounded-lg font-semibold hover:bg-[#C45D16] disabled:opacity-50"
                  >
                    {uploading ? 'Saving...' : 'Save Lecturer'}
                  </button>
                  {editingLecturerId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingLecturerId(null);
                        setLecturerForm({ name: '', specialization: '', department: 'aerospace', image_url: '' });
                      }}
                      className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">Lecturers</h2>
              {lecturers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No lecturers</div>
              ) : (
                <div className="space-y-4">
                  {lecturers.map((lecturer) => (
                    <div key={lecturer.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#212121]">{lecturer.name}</h3>
                          <p className="text-sm text-gray-600">{lecturer.specialization}</p>
                          <p className="text-sm text-gray-600">
                            {departments.find(d => d.slug === lecturer.department)?.name}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingLecturerId(lecturer.id);
                              setLecturerForm({
                                name: lecturer.name,
                                specialization: lecturer.specialization,
                                department: lecturer.department,
                                image_url: lecturer.image_url,
                              });
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteLecturer(lecturer.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">
                {editingEventId ? 'Edit Event' : 'Add New Event'}
              </h2>
              <form onSubmit={handleSaveEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Title (Max 50 chars)</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value.slice(0, 50) })}
                    maxLength={50}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Description (Max 50 chars)</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value.slice(0, 50) })}
                    maxLength={50}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Department</label>
                  <select
                    value={eventForm.department}
                    onChange={(e) => setEventForm({ ...eventForm, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                  >
                    {departments.map((dept) => (
                      <option key={dept.slug} value={dept.slug}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Event Date</label>
                  <input
                    type="datetime-local"
                    value={eventForm.event_date}
                    onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                  />
                </div>
                <ImageUploadComponent
                  onImageUrlChange={(url) => setEventForm({ ...eventForm, image_url: url })}
                  currentImageUrl={eventForm.image_url}
                  token={token}
                  isUploading={uploading}
                  onUploadStatusChange={setUploading}
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-8 py-3 bg-[#E6731F] text-white rounded-lg font-semibold hover:bg-[#C45D16] disabled:opacity-50"
                  >
                    {uploading ? 'Saving...' : 'Save Event'}
                  </button>
                  {editingEventId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEventId(null);
                        setEventForm({ title: '', description: '', department: 'aerospace', image_url: '', event_date: '' });
                      }}
                      className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">Events</h2>
              {events.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No events</div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#212121]">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <p className="text-sm text-gray-600 mt-2">
                            {departments.find(d => d.slug === event.department)?.name}
                          </p>
                          {event.event_date && (
                            <p className="text-sm text-gray-600">
                              {new Date(event.event_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingEventId(event.id);
                              setEventForm({
                                title: event.title,
                                description: event.description,
                                department: event.department,
                                image_url: event.image_url,
                                event_date: event.event_date,
                              });
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">
                {editingGalleryId ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </h2>
              <form onSubmit={handleSaveGalleryItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Title (Max 50 chars)</label>
                  <input
                    type="text"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value.slice(0, 50) })}
                    maxLength={50}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Description (Max 50 chars)</label>
                  <textarea
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value.slice(0, 50) })}
                    maxLength={50}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Department</label>
                  <select
                    value={galleryForm.department}
                    onChange={(e) => setGalleryForm({ ...galleryForm, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                  >
                    {departments.map((dept) => (
                      <option key={dept.slug} value={dept.slug}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <ImageUploadComponent
                  onImageUrlChange={(url) => setGalleryForm({ ...galleryForm, image_url: url })}
                  currentImageUrl={galleryForm.image_url}
                  token={token}
                  isUploading={uploading}
                  onUploadStatusChange={setUploading}
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-8 py-3 bg-[#E6731F] text-white rounded-lg font-semibold hover:bg-[#C45D16] disabled:opacity-50"
                  >
                    {uploading ? 'Saving...' : 'Save Item'}
                  </button>
                  {editingGalleryId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingGalleryId(null);
                        setGalleryForm({ title: '', description: '', department: 'aerospace', image_url: '' });
                      }}
                      className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">Gallery Items</h2>
              {galleryItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No gallery items</div>
              ) : (
                <div className="space-y-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#212121]">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="text-sm text-gray-600 mt-2">
                            {departments.find(d => d.slug === item.department)?.name}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingGalleryId(item.id);
                              setGalleryForm({
                                title: item.title,
                                description: item.description,
                                department: item.department,
                                image_url: item.image_url,
                              });
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteGalleryItem(item.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Executives Tab */}
        {activeTab === 'executives' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">
                {editingExecutiveId ? 'Edit Executive' : 'Add New Executive'}
              </h2>
              <form onSubmit={handleSaveExecutive} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Name (Max 50 chars)</label>
                  <input
                    type="text"
                    value={executiveForm.name}
                    onChange={(e) => setExecutiveForm({ ...executiveForm, name: e.target.value.slice(0, 50) })}
                    maxLength={50}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Position (Max 50 chars)</label>
                  <select
                    value={executiveForm.position}
                    onChange={(e) => setExecutiveForm({ ...executiveForm, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                  >
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Bio (Max 50 chars)</label>
                  <textarea
                    value={executiveForm.bio}
                    onChange={(e) => setExecutiveForm({ ...executiveForm, bio: e.target.value.slice(0, 50) })}
                    maxLength={50}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Email</label>
                  <input
                    type="email"
                    value={executiveForm.email}
                    onChange={(e) => setExecutiveForm({ ...executiveForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Type</label>
                  <select
                    value={executiveForm.type}
                    onChange={(e) => setExecutiveForm({ ...executiveForm, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                  >
                    <option value="current">Current</option>
                    <option value="past">Past</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Council</label>
                  <select
                    value={executiveForm.council}
                    onChange={(e) => setExecutiveForm({ ...executiveForm, council: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                  >
                    {councils.map((council) => (
                      <option key={council} value={council}>
                        {council}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Year (e.g., 2024/2025)</label>
                  <input
                    type="text"
                    value={executiveForm.year}
                    onChange={(e) => setExecutiveForm({ ...executiveForm, year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    placeholder="2024/2025"
                  />
                </div>
                <ImageUploadComponent
                  onImageUrlChange={(url) => setExecutiveForm({ ...executiveForm, image_url: url })}
                  currentImageUrl={executiveForm.image_url}
                  token={token}
                  isUploading={uploading}
                  onUploadStatusChange={setUploading}
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-8 py-3 bg-[#E6731F] text-white rounded-lg font-semibold hover:bg-[#C45D16] disabled:opacity-50"
                  >
                    {uploading ? 'Saving...' : 'Save Executive'}
                  </button>
                  {editingExecutiveId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingExecutiveId(null);
                        setExecutiveForm({
                          name: '',
                          position: 'Post 1',
                          bio: '',
                          email: '',
                          type: 'current',
                          council: 'SEC',
                          year: '',
                          image_url: '',
                        });
                      }}
                      className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">Executives</h2>
              {executives.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No executives</div>
              ) : (
                <div className="space-y-4">
                  {executives.map((executive) => (
                    <div key={executive.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#212121]">{executive.name}</h3>
                          <p className="text-sm text-gray-600">{executive.position}</p>
                          <p className="text-sm text-gray-600">{executive.bio}</p>
                          <p className="text-xs text-gray-500 mt-1">{executive.type} | {executive.council} {executive.year && `(${executive.year})`}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingExecutiveId(executive.id);
                              setExecutiveForm({
                                name: executive.name,
                                position: executive.position,
                                bio: executive.bio,
                                email: executive.email,
                                type: executive.type,
                                council: executive.council,
                                year: executive.year,
                                image_url: executive.image_url,
                              });
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteExecutive(executive.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Department Admins Tab */}
        {activeTab === 'department-admins' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">
                {editingDepartmentAdminId ? 'Edit Department Administrator' : 'Add New Department Administrator'}
              </h2>
              <form onSubmit={handleSaveDepartmentAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Name (Max 50 chars)</label>
                  <input
                    type="text"
                    value={departmentAdminForm.name}
                    onChange={(e) => setDepartmentAdminForm({ ...departmentAdminForm, name: e.target.value.slice(0, 50) })}
                    maxLength={50}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Department</label>
                  <select
                    value={departmentAdminForm.department}
                    onChange={(e) => setDepartmentAdminForm({ ...departmentAdminForm, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                  >
                    {departments.map((dept) => (
                      <option key={dept.slug} value={dept.slug}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Bio (Max 50 chars)</label>
                  <textarea
                    value={departmentAdminForm.bio}
                    onChange={(e) => setDepartmentAdminForm({ ...departmentAdminForm, bio: e.target.value.slice(0, 50) })}
                    maxLength={50}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    rows={3}
                  />
                </div>
                <ImageUploadComponent
                  onImageUrlChange={(url) => setDepartmentAdminForm({ ...departmentAdminForm, image_url: url })}
                  currentImageUrl={departmentAdminForm.image_url}
                  token={token}
                  isUploading={uploading}
                  onUploadStatusChange={setUploading}
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-8 py-3 bg-[#E6731F] text-white rounded-lg font-semibold hover:bg-[#C45D16] disabled:opacity-50"
                  >
                    {uploading ? 'Saving...' : 'Save Administrator'}
                  </button>
                  {editingDepartmentAdminId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingDepartmentAdminId(null);
                        setDepartmentAdminForm({ name: '', department: 'mechanical', bio: '', image_url: '' });
                      }}
                      className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">Department Administrators</h2>
              {departmentAdmins.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No department administrators</div>
              ) : (
                <div className="space-y-4">
                  {departmentAdmins.map((admin) => (
                    <div key={admin.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#212121]">{admin.name}</h3>
                          <p className="text-sm text-gray-600">
                            {departments.find(d => d.slug === admin.department)?.name}
                          </p>
                          <p className="text-sm text-gray-600">{admin.bio}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingDepartmentAdminId(admin.id);
                              setDepartmentAdminForm({
                                name: admin.name,
                                department: admin.department,
                                bio: admin.bio,
                                image_url: admin.image_url,
                              });
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteDepartmentAdmin(admin.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Admin Users Tab */}
        {activeTab === 'admin-users' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#C45D16] mb-4">Admin Users Management</h2>
              <p className="text-sm text-red-600 font-semibold">⚠️ Warning: Only remove admin accounts if you're certain the credentials have been compromised.</p>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {adminUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No admin users</div>
              ) : (
                adminUsers.map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-[#212121]">{user.email}</p>
                      <p className="text-xs text-gray-600">Created: {new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAdminUser(user.email)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
