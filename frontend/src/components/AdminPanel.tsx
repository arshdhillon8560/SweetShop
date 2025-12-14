import { useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://sweetshop-abl3.onrender.com/';

interface AdminPanelProps {
  onSweetUpdate: () => void;
}

const AdminPanel = ({ onSweetUpdate }: AdminPanelProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(`${API_URL}api/sweets`, {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        imageUrl: formData.imageUrl || undefined,
      });
      setFormData({ name: '', category: '', price: '', quantity: '', imageUrl: '' });
      onSweetUpdate();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create sweet');
    }
  };

  return (
    <div className="admin-panel">
      <h2>➕ Add New Sweet</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Sweet name"
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              placeholder="Category"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              min="0"
              placeholder="0.00"
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              min="0"
              placeholder="0"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Image URL (Optional)</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
              Enter a URL to an image. The image will be displayed to all customers.
            </small>
          </div>
        </div>
        <button type="submit" className="btn-add">
          Add Sweet
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;

