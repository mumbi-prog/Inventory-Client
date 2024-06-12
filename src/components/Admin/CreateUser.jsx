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


    return (
        <div>CreateUser
           
        </div>
    );
}

export default CreateUser;