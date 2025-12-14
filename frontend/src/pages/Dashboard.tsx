import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SweetCard from '../components/SweetCard';
import SearchBar from '../components/SearchBar';
import AdminPanel from '../components/AdminPanel';
import './Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://sweetshop-abl3.onrender.com/';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    fetchSweets();
  }, [searchParams]);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchParams.name) params.append('name', searchParams.name);
      if (searchParams.category) params.append('category', searchParams.category);
      if (searchParams.minPrice) params.append('minPrice', searchParams.minPrice);
      if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice);

      const url = params.toString()
        ? `${API_URL}api/sweets/search?${params.toString()}`
        : `${API_URL}api/sweets`;

      const response = await axios.get(url);
      setSweets(response.data);
    } catch (error) {
      console.error('Error fetching sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (sweetId: string) => {
    try {
      await axios.post(`${API_URL}api/sweets/${sweetId}/purchase`, {
        quantity: 1,
      });
      fetchSweets();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Purchase failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🍬 Sweet Shop</h1>
          <div className="header-actions">
            <span className="user-info">
              Welcome, {user?.name} {user?.isAdmin && '(Admin)'}
            </span>
            {user?.isAdmin && (
              <button
                className="btn-secondary"
                onClick={() => setShowAdminPanel(!showAdminPanel)}
              >
                {showAdminPanel ? 'Hide Admin' : 'Show Admin'}
              </button>
            )}
            <button className="btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {showAdminPanel && user?.isAdmin && (
          <AdminPanel onSweetUpdate={fetchSweets} />
        )}

        <SearchBar
          searchParams={searchParams}
          onSearchChange={setSearchParams}
        />

        {loading ? (
          <div className="loading">Loading sweets...</div>
        ) : sweets.length === 0 ? (
          <div className="no-sweets">No sweets found</div>
        ) : (
          <div className="sweets-grid">
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={handlePurchase}
                isAdmin={user?.isAdmin || false}
                onUpdate={fetchSweets}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

