import React, { useState, useEffect } from 'react'
import api from '../Api/api.jsx'

function UserList() {
    const [userDetails, setUserDetails] = useState([]);
    
    useEffect(() => {
        const fetchUserList = async () =>{
            try{
                const response = await api.get("http://localhost:3000/users");
                if (response.status === 200 ){
                    console.log("All users fetched successfully!!")
                } else {
                    console.log("Error fetching users", response.status)
                }
            }
            catch(error){
                console.error(error)
            }

        };
        fetchUserList();
    }, [])
  return (
    <div className='sect-container'>
        <h1>All Users</h1>
    </div>
  )
}

export default UserList