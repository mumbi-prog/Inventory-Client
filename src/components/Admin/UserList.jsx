import React, { useState, useEffect } from 'react';
import api from '../Api/api.jsx';
import UpdateUserModal from './UpdateUserModal.jsx';
import DeleteConfirmationModal from './DeleteConfirmationModal.jsx';
import UserDetailsModal from './UserDetailsModal.jsx';

import { CiEdit } from 'react-icons/ci';
import { RiDeleteBinLine } from "react-icons/ri";
import './comp-specific.css';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { WiRefresh } from 'react-icons/wi';

function UserList() {
    const [userDetails, setUserDetails] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null); 

    const usersPerPage = 9;

    const fetchUserList = async () => {
    try {
        const response = await api.get("http://localhost:3000/users");
        if (response.status === 200) {
            if (Array.isArray(response.data)) {
                const sortedUsers = response.data.sort((a, b) => {
                    const nameA = a.first_name.toUpperCase(); 
                    const nameB = b.first_name.toUpperCase(); 
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });
                setUserDetails(sortedUsers);
            } else {
                console.error("Expected an array but received:", response.data);
            }
        } else {
            console.log("Error fetching users", response.status);
        }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
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
                    api.get(`/users/${userToUpdate.id}`)
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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = userDetails.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const openUserDetailsModal = (user) => {
        setSelectedUser(user);
    };

    const closeUserDetailsModal = () => {
        setSelectedUser(null); 
    };

    return (
        <div className='sect-container mt-[20px]'>
            <h4 className='comp-title text-hover-blue font-bold capitalize mb-[15px]'>All Users</h4>
           
           <div className="helper-tools flex">
                <div className="refresh-button-container mt-[15px]  flex justify-center">
                    <button onClick={fetchUserList}
                    className="refresh-button border border-blue-500 text-white py-[3px] px-[3px] rounded-full hover:border-blue-900"
                    >
                    <WiRefresh className='text-blue-800 text-3xl'/>
                    </button>
                </div>

                <div className="search-container p-[5px] mt-[15px] mb-[5px] h-[35px] w-[300px] flex items-center justify-center ml-[30%]" style={{ justifyContent: 'center' }}>
                    <input type="text" className="search-feature border border-black rounded-md border-none outline-none py-[1px] px-[5px] w-[20px] font-light font-playfair text-sm bg-transparent"  
                    placeholder="Search by name/ email department" value={searchTerm} onChange={handleSearchChange}/>
                </div>
           </div>
            

            <div className="users-table-container rounded-md bg-gray-100 py-[20px] px-[50px] inline-block mt-[15px]">
                <div className="users-table flex">
                    <table>
                        <thead className='bg-hover-blue'>
                            <tr>
                                <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Full Name</th>
                                <th className="w-[200px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Email</th>
                                <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Department</th>
                                <th className="w-[50px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center text-sm"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map((user, index) => (
                                <tr key={index} className='row-detail border-l-4 border-transparent hover:border-blue-500 p-[20px] text-left hover:bg-blue-100 text-sm'>
                                    <td className='py-[10px] px-[20px]' onClick={() => openUserDetailsModal(user)} style={{ cursor: 'pointer' }}>{user.first_name} {user.last_name}</td>
                                    <td className='py-[10px] px-[30px]'>{user.email}</td>
                                    <td className='py-[10px] px-[30px]'>{user.department}</td>
                                    <td className='py-[10px] px-[30px]'>
                                        <div className="custom-edit-buttons flex gap-[20px]">
                                            <CiEdit onClick={() => openUpdateModal(user)} className="cursor-pointer" title='Update User'/>
                                            <RiDeleteBinLine onClick={() => openDeleteModal(user)} className='cursor-pointer' title='Delete User'/>
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
                <DeleteConfirmationModal onCancel={closeDeleteModal} onConfirm={() => confirmDeleteUser(userToDelete)} userData={userToDelete}/>
            )}

            {/* UserDetailsModal component */}
            {selectedUser && (
                <UserDetailsModal isOpen={true} onClose={closeUserDetailsModal} user={selectedUser} />
            )}

            <div className="pagination flex justify-center items-center my-[5px]">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="prev-next "
                >
                    <FcPrevious />
                </button>
                {Array.from(
                    { length: Math.ceil(filteredUsers.length / usersPerPage) },
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`page-button-num mx-[5px] ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    )
                )}
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
                    className="prev-next"
                >
                    <FcNext />
                </button>
            </div>
        </div>
    );
}

export default UserList;

