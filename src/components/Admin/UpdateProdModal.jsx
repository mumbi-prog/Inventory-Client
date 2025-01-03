import React, { useState, useEffect } from 'react';
import api from '../Api/api';
import './comp-specific.css';
import NotificationCard from './NotificationCard';

function UpdateProdModal({ onClose, onUpdate, prodData }) {
  const [formData, setFormData] = useState(prodData);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(formData.user_id);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.log("Failed to fetch users:", response.status);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const CATEGORIES = ['Phone', 'Modem', 'Monitor', 'Keyboard', 'Mouse', 'Charger', 'Laptop'];
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProductData = {
      ...formData,
      user_id: formData.status === "Available" ? null : selectedUser
    };

    try {
      const response = await api.patch(`/products/${formData.id}`, updatedProductData);
      if (response.status === 202) {
        console.log("Success:", response.data);
        setSuccess('Product updated successfully.');
        onUpdate(updatedProductData);
        
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        console.log("Failed to update product:", response.status);
        setError('Failed to update product.');
      }
    } catch (error) {
      console.error('Error occurred while updating product:', error);
      setError('Error occurred while updating product.');
    }
  };

  return (
    <div className='modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50'>
      <div className='modal-content bg-white border border-gray-300 rounded-md p-5 w-[450px] shadow-md text-left'>
        <form onSubmit={handleSubmit} className="prod-details block">
          <div className="form-group">
            <label htmlFor="serial_number" className='label text-sm font-medium text-gray-700'>Serial Number</label>
            <input type="text" placeholder='Serial Number' name='serial_number' value={formData.serial_number} onChange={handleInputChange} required/>
          </div>

          <div className="form-group mb-[20px]">
            <label htmlFor="category" className='label text-sm font-medium text-gray-700'> Category:</label>
            <select
              name="category" value={formData.category} onChange={handleCategoryChange} required>
              <option value="">Select category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name" className='label text-sm font-medium text-gray-700'>Name</label>
            <input type="text" placeholder='Name' name='name' value={formData.name} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="unit-price" className='label text-sm font-medium text-gray-700'>Unit Price</label>
            <input type="text" placeholder='Unit Price' name='unit_price' value={formData.unit_price} onChange={handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="date" className='label text-sm font-medium text-gray-700'>Date Bought</label>
            <input type="date" placeholder='Date Bought' name='date_bought' value={formData.date_bought} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor='status' className='label text-sm font-medium text-gray-700'>Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleInputChange}>
              <option value="null">Select Product Status</option>
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="user" className='label text-sm font-medium text-gray-700'>Assign User</label>
            <select name="user" id="user" value={selectedUser} onChange={handleUserChange} disabled={formData.status === "Available"}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {`${user.first_name} ${user.last_name}`}
                </option>
              ))}
            </select>
          </div>
          <div className="button-container flex justify-center items-center mt-[15px]">
            <button type='submit' className="update-btn  bg-red-500 text-white px-4 py-2 rounded-full mr-4 hover:bg-red-600">Update</button>
            <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400">Cancel</button>
          </div>
        </form>

        {error && <NotificationCard message={error} type="error" />}
        {success && <NotificationCard message={success} type="success" />}
      </div>
    </div>
  );
}

export default UpdateProdModal;
