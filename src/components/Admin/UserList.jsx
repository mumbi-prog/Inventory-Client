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
    <div className='sect-container mt-[20px]'>
        <h1 className='comp-title text-hover-blue font-bold capitalize text-3xl mb-[15px]'>All Users</h1>
        <div className="users-table-container">
            <div className="users-table">
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default UserList