import React, { useEffect, useState } from 'react';
import '../Loader/loader.css'
import api from './../Api/api.jsx';

function UserList() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   api.get('/users') 
  //     .then((response) => response.data)
  //     .then((data) => {
  //       setUsers(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user info:', error);
  //     });
  
  // }, []);

  useEffect(() => {
    const handleUsers = async () => {
      try{
        const response = await api.get("http://localhost:3000/users");
        if (response === 200) {
          setUsers(response.data)
        }
        else{
          console.log("Can't fetch Users, try again!!", response.status)
        }
      }
      catch(error){
        console.errors(error)
      }
    };
    handleUsers();
  }, [])


  return (
    <div className='sect-container ml-[-700%] mt-[20px]'>
      <h1 className="comp-title text-main-blue-500 font-bold capitalize text-2xl"> All Users</h1>

      <div className="user-list-table-container rounded-md bg-gray-100 py-[20px] px-[50px] inline-block mt-[25px]">
        <div className="user-list-table ">
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
              {users.map((user, index) => (
                <tr key={index} className='border-l-4 border-transparent hover:border-blue-500 p-[20px] text-center'>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;
