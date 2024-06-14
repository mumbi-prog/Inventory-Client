import React, { useState } from 'react'; 
import api from './../Api/api'; 
import './admin.css'

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
        <div classname='sect-container mt-[20px]'>

          <h1 className='comp-title text-hover-blue font-bold capitalize text-3xl mb-[15px]'>Create New User</h1>

            <form className="user-details block">
                <label htmlFor="first_name">First Name</label>
                <input
                    type="text" placeholder='First Name' name="first_name" value={userDeets.first_name}  onChange={handleInputChange}  required
                />
                <label htmlFor="last_name">Last Name</label> 
                <input
                    type="text" placeholder='Last Name' name="last_name" value={userDeets.last_name} onChange={handleInputChange} required
                />
                <label htmlFor="email">Email</label> 
                <input
                    type="email" placeholder='Email' name="email" value={userDeets.email} onChange={handleInputChange} required
                />
                <label htmlFor="department">Department</label>
                <input
                    type="text" placeholder='Department' name="department" value={userDeets.department} onChange={handleInputChange} required
                />
                <button type="submit" onClick={handleSubmit}>Create User</button>
            </form>
        </div>
    );
}

export default CreateUser;