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

export default function AdminDashboard() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerUrl, setNewPartnerUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchPartners();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
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

  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (partners.length >= 4) {
      alert('Maximum of 4 partners allowed. Please delete one before adding a new one.');
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
      alert('Partner deleted successfully!');
    } catch (error: any) {
      alert('Error deleting partner: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#212121]">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Add Partner Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">
            Add New Partner {partners.length >= 4 && '(Maximum reached)'}
          </h2>
          <form onSubmit={handleAddPartner} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#212121] mb-2">
                Partner Name
              </label>
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
              <label className="block text-sm font-medium text-[#212121] mb-2">
                Logo URL
              </label>
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
              className="px-8 py-3 bg-[#E6731F] text-white rounded-lg font-semibold hover:bg-[#C45D16] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Adding...' : 'Add Partner'}
            </button>
          </form>
        </div>

        {/* Partners List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#C45D16] mb-6">
            Current Partners ({partners.length}/4)
          </h2>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : partners.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No partners yet</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="border border-gray-200 rounded-lg p-4 flex flex-col items-center gap-4"
                >
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="h-24 w-auto object-contain"
                  />
                  <h3 className="font-semibold text-[#212121] text-center">
                    {partner.name}
                  </h3>
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
      </div>
    </div>
  );
}
