import React, { useState } from 'react'; 
import api from './../Api/api'; 

function CreateUser() {
    const [userDeets, setUserDeets] = useState({
        first_name: '',
        last_name: '',
        email: '',
        department: ''
    });



    return (
        <div>CreateUser
           
        </div>
    );
}

export default CreateUser;