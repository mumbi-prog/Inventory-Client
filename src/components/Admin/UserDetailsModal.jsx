import React from 'react';
import Modal from 'react-modal';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
    if (!user) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="user-details-modal"
            overlayClassName="user-details-modal-overlay"
        >
                <div className='modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50'>
                     <div className='modal-content bg-white border border-gray-300 rounded-md p-5 w-fit-content shadow-md text-left'>
                         
                        <h2 className='font-bold text-[25px] text-main-blue underline'>User Products</h2>
                        <div className="user-info py-[15px] text-[16px] flex justify-around">
                            <p><strong>Full Name:</strong> {user.first_name} {user.last_name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Department:</strong> {user.department}</p>
                        </div>
                        <hr />
                        <div className="products-list">
                            <h3 className='font-bold text-[20px] text-main-blue items-center mb-[20px]'>Products</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Serial Number</th>
                                        <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Category</th>
                                        <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Name</th>
                                        <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Date Bought</th>
                                        <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center border-r-[20px] text-sm">Unit Price</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.products.map(product => (
                                        <tr key={product.id} className='row-detail border-l-4 border-transparent hover:border-blue-500 p-[20px] text-left hover:bg-blue-100 text-sm'>
                                            <td className='py-[10px] px-[20px]'>{product.serial_number}</td>
                                            <td className='py-[10px] px-[20px]'>{product.category}</td>
                                            <td className='py-[10px] px-[20px]'>{product.name}</td>
                                            <td className='py-[10px] px-[20px]'>{product.date_bought}</td>
                                            <td className='py-[10px] px-[20px]'>{product.unit_price}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                </div>
            </div>
            </div>
           
        </Modal>
    );
};

export default UserDetailsModal;
