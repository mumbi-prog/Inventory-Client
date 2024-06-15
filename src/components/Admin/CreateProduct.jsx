import React, { useState, useEffect } from 'react';
import api from '../Api/api.jsx'; 
function CreateProduct() {
    const [productDeets, setProductDeets] = useState({
        serial_number: '',
        category: '',
        name: '',
        unit_price: '',
        date_bought: '',
        status: 'Available',
        user_id: '' 
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("http://localhost:3000/users");
            if (response.status === 200) {
                setUsers(response.data); 
            } else {
                setError("Failed to fetch users.");
            }
        } catch (error) {
            setError("Error fetching users.");
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDeets({
            ...productDeets,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post("http://localhost:3000/products", productDeets);
            if (response.status === 201) {
                console.log("Product created successfully!");
                setProductDeets({
                    serial_number: '',
                    category: '',
                    name: '',
                    unit_price: '',
                    date_bought: '',
                    status: 'Available',
                    user_id: ''
                });
                setError('');
            } else {
                setError("Could not create product.");
            }
        } catch (error) {
            setError("Error creating product.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='sect-container mt-[20px]'>
            <h1 className='comp-title text-hover-blue font-bold capitalize text-3xl mb-[15px]'>Create Products</h1>
            <div className="form-container">
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="serial_number" className='prod-label'>Serial Number</label>
                        <input type="text" placeholder='Serial Number' name='serial_number' value={productDeets.serial_number} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" className='prod-label'>Category</label>
                        <input type="text" placeholder='Category' name='category' value={productDeets.category} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className='prod-label'>Name</label>
                        <input type="text" placeholder='Name' name='name' value={productDeets.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="unit_price" className='prod-label'>Unit Price</label>
                        <input type="text" placeholder='Unit Price' name='unit_price' value={productDeets.unit_price} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date_bought" className='prod-label'>Date Bought</label>
                        <input type="date" name='date_bought' value={productDeets.date_bought} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status" className='prod-label'>Status</label>
                        <select name="status" value={productDeets.status} onChange={handleInputChange}>
                            <option value="Available">Available</option>
                            <option value="Assigned">Assigned</option>
                        </select>
                    </div>
                    <button type="submit" className='btn' disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
