import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

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

type Tab = 'partners' | 'lecturers' | 'events' | 'gallery';

const departments = [
  { name: 'Mechanical Engineering', slug: 'mechanical' },
  { name: 'Aerospace Engineering', slug: 'aerospace' },
  { name: 'Chemical Engineering', slug: 'chemical' },
  { name: 'Electronics & Computer Engineering', slug: 'electronics-computer' },
  { name: 'Civil Engineering', slug: 'civil' },
  { name: 'Industrial Engineering', slug: 'industrial' },
];

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
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {(['partners', 'lecturers', 'events', 'gallery'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold capitalize transition ${
                activeTab === tab
                  ? 'text-[#E6731F] border-b-2 border-[#E6731F]'
                  : 'text-gray-600 hover:text-[#E6731F]'
              }`}
            >
              {tab}
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
                  <label className="block text-sm font-medium text-[#212121] mb-2">Name</label>
                  <input
                    type="text"
                    value={lecturerForm.name}
                    onChange={(e) => setLecturerForm({ ...lecturerForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Specialization</label>
                  <input
                    type="text"
                    value={lecturerForm.specialization}
                    onChange={(e) => setLecturerForm({ ...lecturerForm, specialization: e.target.value })}
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
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Image URL</label>
                  <input
                    type="url"
                    value={lecturerForm.image_url}
                    onChange={(e) => setLecturerForm({ ...lecturerForm, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
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
                  <label className="block text-sm font-medium text-[#212121] mb-2">Title</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
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
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Image URL</label>
                  <input
                    type="url"
                    value={eventForm.image_url}
                    onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
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
                  <label className="block text-sm font-medium text-[#212121] mb-2">Title</label>
                  <input
                    type="text"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Description</label>
                  <textarea
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
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
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">Image URL</label>
                  <input
                    type="url"
                    value={galleryForm.image_url}
                    onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E6731F]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
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
      </div>
    </div>
  );
}
