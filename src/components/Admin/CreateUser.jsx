import React, { useState } from 'react'; 
import api from './../Api/api'; 
import './admin.css';

function CreateUser() {
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

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await api.post("http://localhost:3000/users", userDeets);
            if (response.status === 201) { 
                console.log("User created successfully");
                setUserDeets({
                    first_name: '',
                    last_name: '',
                    email: '',
                    department: ''
                });
            } else {
                console.log("Can't create User, try again later", response.status);
            }
        } catch (error) {
            console.error(error); 
        }
    };

    return (
        <div className='sect-container mt-[20px]'>

          <h1 className='comp-title text-hover-blue font-bold capitalize text-3xl mb-[15px]'>Create New User</h1>

            <div className="user-form">
                <form className="user-details block" onSubmit={handleSubmit}>
                    <div className="form-group mb2 mb-[10px]">
                        <label htmlFor="first_name" className='label text-sm font-medium text-gray-700'>First Name</label>
                        <input className='input mt-3 p-2 rounded-md bg-gray-bkg focus:outline-none' 
                            type="text" placeholder='First Name' name="first_name" value={userDeets.first_name}  onChange={handleInputChange}  required                        
                        />
                    </div>
                    <div className="form-group mb2 mb-[10px]">
                        <label htmlFor="last_name" className='label text-sm font-medium text-gray-700'>Last Name</label> 
                        <input className='input mt-3 p-2 rounded-md bg-gray-bkg focus:outline-none'
                            type="text" placeholder='Last Name' name="last_name" value={userDeets.last_name} onChange={handleInputChange} required
                        />
                    </div>
                    <div className="form-group mb2 mb-[10px]">
                        <label htmlFor="email" className='label text-sm font-medium text-gray-700'>Email</label>
                        <input className='input mt-3 p-2 rounded-md bg-gray-bkg focus:outline-none'
                            type="text" placeholder='Email' name="email" value={userDeets.email} onChange={handleInputChange} required
                        />
                    </div>
                    <div className="form-group mb2 mb-[10px]">
                        <label htmlFor="department" className='label text-sm font-medium text-gray-700'>Department</label>
                        <input className='input mt-3 p-2 rounded-md bg-gray-bkg focus:outline-none'
                            type="text" placeholder='Department' name="department" value={userDeets.department} onChange={handleInputChange} required
                        />
                    </div>
                    
                    <button type="submit" className='btn'>Create User</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
