import { useState } from 'react';
import axios from 'axios';
import './SweetCard.css';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: string) => void;
  isAdmin: boolean;
  onUpdate: () => void;
}

const SweetCard = ({ sweet, onPurchase, isAdmin, onUpdate }: SweetCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: sweet.name,
    category: sweet.category,
    price: sweet.price.toString(),
    quantity: sweet.quantity.toString(),
    imageUrl: sweet.imageUrl || '',
  });
  const [restockQuantity, setRestockQuantity] = useState('');

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://sweetshop-abl3.onrender.com/api/sweets/${sweet._id}`, {
        name: editForm.name,
        category: editForm.category,
        price: parseFloat(editForm.price),
        quantity: parseInt(editForm.quantity),
        imageUrl: editForm.imageUrl,
      });
      setIsEditing(false);
      onUpdate();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }
    try {
      await axios.delete(`https://sweetshop-abl3.onrender.com/api/sweets/${sweet._id}`);
      onUpdate();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleRestock = async () => {
    const quantity = parseInt(restockQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    try {
      await axios.post(`https://sweetshop-abl3.onrender.com/api/sweets/${sweet._id}/restock`, {
        quantity,
      });
      setRestockQuantity('');
      onUpdate();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Restock failed');
    }
  };

  if (isEditing) {
    return (
      <div className="sweet-card edit-mode">
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            required
            placeholder="Name"
          />
          <input
            type="text"
            value={editForm.category}
            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            required
            placeholder="Category"
          />
          <input
            type="number"
            step="0.01"
            value={editForm.price}
            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
            required
            placeholder="Price"
          />
          <input
            type="number"
            value={editForm.quantity}
            onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
            required
            placeholder="Quantity"
          />
          <input
            type="url"
            value={editForm.imageUrl}
            onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
            placeholder="Image URL (optional)"
          />
          <div className="card-actions">
            <button type="submit" className="btn-save">Save</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="sweet-card">
      {sweet.imageUrl && (
        <div className="sweet-image">
          <img src={sweet.imageUrl} alt={sweet.name} onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }} />
        </div>
      )}
      <div className="sweet-header">
        <h3>{sweet.name}</h3>
        <span className="category-badge">{sweet.category}</span>
      </div>
      <div className="sweet-details">
        <div className="price">${sweet.price.toFixed(2)}</div>
        <div className="quantity">
          In Stock: <strong>{sweet.quantity}</strong>
        </div>
      </div>
      <div className="card-actions">
        <button
          className="btn-purchase"
          onClick={() => onPurchase(sweet._id)}
          disabled={sweet.quantity === 0}
        >
          {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
        </button>
        {isAdmin && (
          <>
            <button
              className="btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
      {isAdmin && (
        <div className="restock-section">
          <input
            type="number"
            value={restockQuantity}
            onChange={(e) => setRestockQuantity(e.target.value)}
            placeholder="Restock quantity"
            min="1"
          />
          <button className="btn-restock" onClick={handleRestock}>
            Restock
          </button>
        </div>
      )}
    </div>
  );
};

export default SweetCard;

