import React, { useState, useEffect } from 'react';
import api from '../Api/api';
import './comp-specific.css';

function UpdateProdModal({ onClose, onUpdate, prodData }) {
  const [formData, setFormData] = useState(prodData);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(formData.user_id);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("http://localhost:3000/users");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProductData = {
      ...formData,
      user_id: selectedUser 
    };

    try {
      const response = await api.patch(`/products/${formData.id}`, updatedProductData);
      if (response.status === 200) {
        console.log('Product updated successfully');
        onUpdate(updatedProductData);
        onClose();
      } else {
        console.log('Failed to update product');
      }
    } catch (error) {
      console.error('Error occurred while updating product:', error);
    }
  };
    

  return (
    <div>
      <div>
        <form onClick={handleSubmit}>
          <div className="form-group">
            <label htmlFor="serial_number">Serial Number</label>
            <input type="text" placeholder='Serial Number' name='serial_number' value={formData.serial_number} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select type="text" placeholder='Category' name='category' value={formData.category} onChange={handleInputChange}>
              <option value="desktop">Desktop</option>
              <option value="phone">Phone</option>
              <option value="modem">Modem</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Name' name='name' value={formData.name} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="unit-price">Unit Price</label>
            <input type="number" placeholder='Unit Price' name='unit-price' value={formData.unit_price} onChange={handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date Bought</label>
            <input type="date" placeholder='Date Bought' name='date-bought' value={formData.date_bought} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <select name="status" id="status">
              <option value="assigned">Assigned</option>
              <option value="available">Available</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="user">Assign User</label>
            <select name="user" id="user" value={selectedUser} onChange={handleUserChange} >
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
      </div>
    </div>
  )
}

export default UpdateProdModal