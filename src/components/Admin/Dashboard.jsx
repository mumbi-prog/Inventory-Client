import React, { useState, useEffect } from 'react';
import api from '../Api/api';
import './comp-specific.css';
import DeleteConfirmationModal from './DeleteConfirmationModal.jsx';
import { RiDeleteBinLine } from "react-icons/ri";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalAssignedProducts, setTotalAssignedProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [prodToDelete, setProdToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await api.get("http://localhost:3000/products");
        if (productResponse.status === 202) {
          setProducts(productResponse.data);
          setTotalProducts(productResponse.data.length);

          const userIds = productResponse.data.map(product => product.user_id);
          const userNamesPromises = userIds.map(userId => fetchUserName(userId));
          const userNamesArray = await Promise.all(userNamesPromises);
          const userNamesMap = userIds.reduce((acc, userId, index) => {
            acc[userId] = userNamesArray[index];
            return acc;
          }, {});
          setUserNames(userNamesMap);

          const assignedProductsCount = productResponse.data.filter(product => product.status === 'assigned').length;
          setTotalAssignedProducts(assignedProductsCount);

          const uniqueUserIds = [...new Set(userIds)];
          setTotalUsers(uniqueUserIds.length);
        } else {
          console.log("Can't fetch products", productResponse.status);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const fetchUserName = async (userId) => {
    try {
      const response = await api.get(`http://localhost:3000/users/${userId}`);
      if (response.status === 200) {
        return `${response.data.first_name} ${response.data.last_name}`;
      }
      return " - ";
    } catch (error) {
      console.error("Error fetching user details:", error);
      return " - ";
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='sect-container mt-[20px]'>
      <h1 className='comp-title text-hover-blue font-bold capitalize text-3xl mb-[15px]'>Dashboard</h1>

      <div className="dashcards-container">
        <div className="prod-card bg-rose-600 flex flex-col justify-center justify-around items-center text-center py-[10px] w-[230px] hover:bg-rose-700">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="assi-card bg-fuchsia-600 flex flex-col justify-center justify-around items-center text-center py-[10px] w-[230px] hover:bg-fuchsia-700">
          <h3>Total Assigned Products</h3>
          <p>{totalAssignedProducts}</p>
        </div>
        <div className="users-card bg-emerald-600 flex flex-col justify-center justify-around items-center text-center py-[10px] w-[230px] hover:bg-emerald-700">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
      </div>

    <div className="search-container p-[5px] mt-[10px] mb-[5px] h-[35px] w-[300px] flex items-center justify-center">
        <input type="text" className="search-feature border border-black rounded-md border-none outline-none py-[1px] px-[5px] font-light font-playfair text-sm bg-transparent"  
        placeholder="Search by serial number or category" value={searchTerm} onChange={handleSearchChange}/>
    </div> 

    <div className="products-table-container rounded-md bg-gray-100 py-[20px] px-[20px] inline-block mt-[15px]">
      
        <div className="products-table">
          <table className="prod-container">
            <thead>
              <tr>
                <th className="w-[180px] py-[-5px] px-[0px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Serial Number </th>
                <th className="w-[170px] py-[-5px] px-[15px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Category </th>
                <th className="w-[170px] py-[-5px] px-[45px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Name </th>
                <th className="w-[50px] py-[-5px] px-[25px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Price </th>
                <th className="w-[150px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Date </th>
                <th className="w-[140px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Status </th>
                <th className="w-[180px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center text-sm "> Assigned To: </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index} className='row-detail border-l-4 border-transparent hover:border-blue-500 p-[20px] text-left hover:bg-blue-100 text-sm'>
                  <td className='py-[10px] px-[10px]'>{product.serial_number}</td>
                  <td className='py-[10px] px-[25px]'>{product.category}</td>
                  <td className='py-[10px] px-[25px]'>{product.name}</td>
                  <td className='py-[10px] px-[25px]'>{product.unit_price}</td>
                  <td className='py-[10px] px-[25px]'>{product.date_bought}</td>
                  <td className='py-[10px] px-[25px]'>{product.status}</td>
                  <td className='py-[10px] px-[25px]'>{userNames[product.user_id]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
