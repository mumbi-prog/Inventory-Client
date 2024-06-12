import React, { useState } from 'react'; 
import api from './../Api/api'; 

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
        <div>CreateUser
           
        </div>
    );
}

export default CreateUser;