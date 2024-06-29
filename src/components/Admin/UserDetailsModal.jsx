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
            <div className="user-details-content">
                <h2>User Details</h2>
                <div className="user-info">
                    <p><strong>Full Name:</strong> {user.first_name} {user.last_name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Department:</strong> {user.department}</p>
                </div>
                <div className="products-list">
                    <h3>Products</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Date Bought</th>
                                <th>Unit Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.serial_number}</td>
                                    <td>{product.category}</td>
                                    <td>{product.name}</td>
                                    <td>{product.date_bought}</td>
                                    <td>{product.unit_price}</td>
                                    <td>{product.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    );
};

export default UserDetailsModal;
