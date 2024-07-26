import React from 'react';
import './ErrorModal.css';
import { CgClose } from 'react-icons/cg';

const ErrorModal = ({ errorMessage, onClose }) => {
  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="modal-content bg-white border border-gray-300 rounded-md p-5 w-[400px] shadow-md text-left">
        <h2 className="modal-title mb-[10px] text-[24px] font-bold">Error</h2>
        <p className="modal-message mb-[20px] text-center font-medium">{errorMessage}</p>
        <CgClose onClick={onClose} className="modal-close-button bg-yellow-300" />
 
        
      </div>
    </div>
  );
};

export default ErrorModal;
