import React, { useState, useEffect } from 'react'
import api from '../Api/api.jsx'
import './comp-specific.css'

function UserList() {
    const [userDetails, setUserDetails] = useState([]);
    
    useEffect(() => {
        const fetchUserList = async () =>{
            try{
                const response = await api.get("http://localhost:3000/users");
                if (response.status === 200 ){
                    console.log("All users fetched successfully!!")
                    setUserDetails(response.data);
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
        <div className="users-table-container rounded-md bg-gray-100 py-[20px] px-[50px] inline-block mt-[25px]">
            <div className="users-table">
                <table>
                    <thead className='bg-hover-blue'>
                        <tr>
                            <th className="w-[200px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px]">First Name</th>
                            <th className="w-[200px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px]">Last Name</th>
                            <th className="w-[300px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px]">Email</th>
                            <th className="w-[200px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px]">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDetails.map((user, index) => (
                           <tr key={index} className=' row-detail border-l-4 border-transparent hover:border-blue-500 p-[20px] text-center hover:bg-blue-100'>
                                <td className='py-[10px] px-[10px]'>{user.first_name}</td>
                                <td className='py-[10px] px-[10px]'>{user.last_name}</td>
                                <td className='py-[10px] px-[10px]'>{user.email}</td>
                                <td className='py-[10px] px-[10px]'>{user.department}</td>
                           </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default UserList