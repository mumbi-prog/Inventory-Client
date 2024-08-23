import React, { useState, useEffect } from 'react';
import api from './../Api/api';
import './admin.css';
import NotificationCard from './NotificationCard'; 

function CreateUser() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [userDeets, setUserDeets] = useState({
        first_name: '',
        last_name: '',
        email: '',
        department: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDeets({
            ...userDeets,
            [name]: value
        });
    };

    const CATEGORIES = ['Stores', 'IT', 'Maintenance', 'Operations', 'Drivers', 'Finance', 'HSSE', 'HR'];

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setUserDeets({
            ...userDeets,
            [name]: value
        });
    };

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userDeets.email.endsWith('@dakawou.com')) {
            setError('Email must end with @dakawou.com');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/users", userDeets);
            if (response.status === 201) {
                setSuccess("User created successfully.");
                setUserDeets({
                    first_name: '',
                    last_name: '',
                    email: '',
                    department: ''
                });
            } else {
                setError("Could not create user. Try Again.");
            }
        } catch (error) {
            setError("Could not create user. Try Again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='sect-container mt-[20px]'>
            <h1 className='comp-title text-hover-blue font-bold capitalize text-3xl mb-[15px]'>Create New User</h1>

            <div className="user-form bg-gray-bkg p-[20px] rounded-md">
                <form className="user-details block" onSubmit={handleSubmit}>
                    <div className="form-group mb2 mb-[10px]">
                        <label htmlFor="first_name" className='label text-sm font-medium text-gray-700'>First Name</label>
                        <input
                            className='input mt-3 p-2 rounded-md bg-light-blue focus:outline-none'
                            type="text"
                            placeholder='First Name'
                            name="first_name"
                            value={userDeets.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mb2 mb-[10px]">
                        <label htmlFor="last_name" className='label text-sm font-medium text-gray-700'>Last Name</label>
                        <input
                            className='input mt-3 p-2 rounded-md bg-light-blue focus:outline-none'
                            type="text"
                            placeholder='Last Name'
                            name="last_name"
                            value={userDeets.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mb2 mb-[10px]">
                        <label htmlFor="email" className='label text-sm font-medium text-gray-700'>Email</label>
                        <input
                            className='input mt-3 p-2 rounded-md bg-light-blue focus:outline-none'
                            type="text"
                            placeholder='Email'
                            name="email"
                            value={userDeets.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mb2 mb-[10px]">
                        <label htmlFor="department" className='label text-sm font-medium text-gray-700'>Department:</label>
                        <select
                            name="department"
                            value={userDeets.department}
                            onChange={handleCategoryChange}
                            className="input mt-3 p-2 rounded-md bg-light-blue focus:outline-none"
                            required
                        >
                            <option value="">Select department</option>
                            {CATEGORIES.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className='btn' disabled={loading}>
                        {loading ? 'Submitting...' : 'Create User'}
                    </button>
                </form>

                {error && <NotificationCard message={error} type="error"  />}
                {success && <NotificationCard message={success} type="success"  />}
            </div>
        </div>
    );
}

export default CreateUser;
