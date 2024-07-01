import React from 'react';
import Modal from 'react-modal';
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import './comp-specific.css'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecoration: 'underline',
  },
  userInfo: {
    marginBottom: 10,
  },
  table: {
    width: '100%',
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f0f0f0',
    border: '1px solid black',
    padding: 8,
    textAlign: 'center',
    fontSize: 12,
  },
  td: {
    border: '1px solid black',
    padding: 8,
    textAlign: 'center',
    fontSize: 12,
  },
});

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!user) {
    return null;
  }

  const handleDownloadPDF = () => {
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>User Products</Text>
            <View style={styles.userInfo}>
              <Text><strong>Full Name:</strong> {user.first_name} {user.last_name}</Text>
              <Text><strong>Email:</strong> {user.email}</Text>
              <Text><strong>Department:</strong> {user.department}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.header}>Products</Text>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Serial Number</th>
                    <th style={styles.th}>Category</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Date Bought</th>
                    <th style={styles.th}>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {user.products.map(product => (
                    <tr key={product.id}>
                      <td style={styles.td}>{product.serial_number}</td>
                      <td style={styles.td}>{product.category}</td>
                      <td style={styles.td}>{product.name}</td>
                      <td style={styles.td}>{product.date_bought}</td>
                      <td style={styles.td}>{product.unit_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </View>
          </View>
        </Page>
      </Document>
    );

    const blob = new Blob([MyDocument], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'user_products.pdf');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="user-details-modal"
      overlayClassName="user-details-modal-overlay"
    >
      <div className='modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50'>
        <div className='modal-content bg-white border border-gray-300 rounded-md p-5 shadow-md text-left'>
          <h2 className='font-bold text-[25px] text-text-color text-center w-full bg-main-blue py-[15px]'>User Products Report</h2>
          <div className="user-info py-[15px] text-[16px] ">
            <div className="fname flex ">
              <p className='w-[150px]'><strong>Full Name</strong></p>
              <p>{user.first_name} {user.last_name}</p>
            </div>
            <div className="email flex">
              <p className='w-[150px]'><strong>Email</strong></p>
              <p>{user.email}</p>
            </div>
            <div className="department flex">
              <p className='w-[150px]'><strong>Department</strong></p>
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
                <span class="button__text">Download</span>
                <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" class="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
            </button>
            <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 mx-[40px]"> Close </button> 
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;

