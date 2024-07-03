import React from 'react';
import Modal from 'react-modal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './comp-specific.css';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!user) {
    return null;
  }

  const handleDownloadPDF = () => {
    const content = document.getElementById('modal-content');

    const buttons = content.querySelectorAll('button');
    buttons.forEach(button => {
      button.style.display = 'none';
    });

    html2canvas(content, {
      scale: 2, 
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'px', 'a4');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 20;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position -= pdf.internal.pageSize.getHeight();
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save(`${user.first_name} ${user.last_name} products.pdf`);
      // pdf.save('User Products.pdf');

      buttons.forEach(button => {
        button.style.display = '';
      });
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="user-details-modal"
      overlayClassName="user-details-modal-overlay"
    >
      <div className='modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50'>
        <div className='modal-content bg-white border border-gray-300 rounded-md p-5 shadow-md text-left' id='modal-content'>
          <h2 className='font-bold text-[25px] text-text-color text-center w-full bg-main-blue py-[15px]'>User Products Report</h2>
          <div className="user-info py-[15px] text-[16px] font-playfair">
            <div className="fname flex">
              <p className='w-[150px] font-bold'><strong>Full Name</strong></p>
              <p>{user.first_name} {user.last_name}</p>
            </div>
            <div className="email flex">
              <p className='w-[150px] font-bold'><strong>Email</strong></p>
              <p>{user.email}</p>
            </div>
            <div className="department flex">
              <p className='w-[150px] font-bold'><strong>Department</strong></p>
              <p>{user.department}</p>
            </div>
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
          <div className="flex justify-center mt-5">
            <button onClick={handleDownloadPDF} className='download-btn' type="button">
                <span className="button__text">Download</span>
                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" className="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
            </button>
            <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 mx-[40px]"> Close </button> 
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;

