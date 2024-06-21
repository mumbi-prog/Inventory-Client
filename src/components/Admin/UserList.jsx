import React, { useState, useEffect } from 'react';
import api from '../Api/api.jsx';
import './comp-specific.css';
import UpdateUserModal from './UpdateUserModal.jsx';
import DeleteConfirmationModal from './DeleteConfirmationModal.jsx';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBinLine } from "react-icons/ri";

function UserList() {
    const [userDetails, setUserDetails] = useState([]);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await api.get("http://localhost:3000/users");
                if (response.status === 200) {
                    console.log("All users fetched successfully!!");
                    setUserDetails(response.data);
                } else {
                    console.log("Error fetching users", response.status);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserList();
    }, []);

    const openUpdateModal = (user) => {
        setIsUpdateModalOpen(true);
        setUserToUpdate(user);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setUserToUpdate(null);
    };

     const openDeleteModal = (user) => {
        setIsDeleteModalOpen(true);
        setUserToDelete(user);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    const handleUpdateUser = (updatedUserData) => {
    api
        .patch(`/users/${userToUpdate.id}`, updatedUserData)
        .then((response) => {
            if (response.status === 200) {
                api.get(`http://localhost:3000/users/${userToUpdate.id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setUserDetails((prevUsers) =>
                                prevUsers.map((user) =>
                                    user.id === userToUpdate.id ? { ...user, ...response.data } : user
                                )
                            );
                            closeUpdateModal();
                        } else {
                            console.error('Failed to fetch updated user details');
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching updated user details:', error);
                    });
            } else {
                console.error('Failed to update user');
            }
        })
        .catch((error) => {
            console.error('Error updating user:', error);
        });
};

    const confirmDeleteUser = (user) => {
    closeDeleteModal();

    api
      .delete(`/users/${user.id}`)
      .then((response) => {
        if (response.status === 204) {
          setUserDetails((prevUsers) => prevUsers.filter((e) => e.id !== user.id));
        } else {
          console.error('Failed to delete user');
        }
      })
      .catch((err) => {
        console.error('Error while deleting user:', err);
      });
  };


    return (
        <div className='sect-container mt-[20px]'>
            <h1 className='comp-title text-hover-blue font-bold capitalize text-3xl mb-[15px]'>All Users</h1>
            <div className="users-table-container rounded-md bg-gray-100 py-[20px] px-[50px] inline-block mt-[25px]">
                <div className="users-table flex">
                    <table>
                        <thead className='bg-hover-blue'>
                            <tr>
                                <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">First Name</th>
                                <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Last Name</th>
                                <th className="w-[200px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Email</th>
                                <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Department</th>
                                <th className="w-[50px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center text-sm"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDetails.map((user, index) => (
                                <tr key={index} className='row-detail border-l-4 border-transparent hover:border-blue-500 p-[20px] text-left hover:bg-blue-100 text-sm'>
                                    <td className='py-[10px] px-[20px]'>{user.first_name}</td>
                                    <td className='py-[10px] px-[30px]'>{user.last_name}</td>
                                    <td className='py-[10px] px-[30px]'>{user.email}</td>
                                    <td className='py-[10px] px-[30px]'>{user.department}</td>
                                    <td className='py-[10px] px-[30px]'>
                                        <div className="custom-edit-buttons flex ">
                                            <CiEdit onClick={() => openUpdateModal(user)} className="cursor-pointer" />
                                            <RiDeleteBinLine onclick={() => openDeleteModal(user)} className='cursor-pointer'/>
                                        </div>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isUpdateModalOpen && (
                <UpdateUserModal onClose={closeUpdateModal} onUpdate={handleUpdateUser} userData={userToUpdate} />
            )}
            {isDeleteModalOpen && (
                <DeleteConfirmationModal onCancel={closeDeleteModal} onConfirm={() => confirmDeleteUser} userData={userToDelete}/>
            )}
        </div>
    );
}

export default UserList;
