import React from 'react';

function DeleteConfirmationModal({ onCancel, onConfirm }) {
  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="modal-content bg-white border border-gray-300 rounded-md p-5 w-[400px] shadow-md text-left">
        <p className='text-center font-medium'>Are you sure you want to delete this event?</p>
        <div className="modal-buttons mt-4 flex justify-center">
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded-full mr-4 hover:bg-red-600"> Confirm </button>
          <button onClick={onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"> Cancel </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
