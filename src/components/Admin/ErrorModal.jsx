import React from 'react';
import './ErrorModal.css';
import { CgClose } from 'react-icons/cg';

const ErrorModal = ({ errorMessage, onClose }) => {
  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="modal-content bg-white border border-gray-300 rounded-[30px] py-[30px] px-[40px] w-[400px] shadow-md text-left">
        <CgClose className='text-center m-auto font-bold text-red-700 text-2xl'/>
        <h2 className="modal-title mb-[10px] text-[24px] font-bold text-center py-[15px]">Unauthorized</h2>
        <p className="modal-message mb-[20px] text-left px-[12px] font-medium">{errorMessage}</p>
        <button onClick={onClose} className="modal-close-button bg-purple-900 w-full text-text-color rounded-full p-[12px] text-xl" >Got it</button>
        
      </div>
    </div>
  );
};

export default ErrorModal;
