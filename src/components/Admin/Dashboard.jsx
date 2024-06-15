import React, { useState, useEffect } from 'react';
// import WelcomeAdmin from './WelcomeAdmin';
import api from '../Api/api';
import './comp-specific.css'

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await api.get("http://localhost:3000/products");
        if (productResponse.status === 202) {
          setProducts(productResponse.data);
          const userIds = productResponse.data.map(product => product.user_id);
          const userNamesPromises = userIds.map(userId => fetchUserName(userId));
          const userNamesArray = await Promise.all(userNamesPromises);
          const userNamesMap = userIds.reduce((acc, userId, index) => {
            acc[userId] = userNamesArray[index];
            return acc;
          }, {});
          setUserNames(userNamesMap);
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
      return "Unknown User";
    } catch (error) {
      console.error("Error fetching user details:", error);
      return "Unknown User";
    }
  };

  return (
    <div className='sect-container mt-[20px]'>
      {/* <WelcomeAdmin /> */}
      <h1 className='comp-title text-hover-blue font-bold capitalize text-3xl mb-[15px]'>Dashboard</h1>
      <div className="products-table-container rounded-md bg-gray-100 py-[20px] px-[20px] inline-block mt-[25px]">
        <div className="products-table ">
          <table className="prod-container">
            <thead>
              <tr>
                <th className="w-[180px] py-[-5px] px-[0px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> S_Number </th>
                <th className="w-[170px] py-[-5px] px-[15px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Category </th>
                <th className="w-[170px] py-[-5px] px-[45px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Name </th>
                <th className="w-[150px] py-[-5px] px-[45px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Price </th>
                <th className="w-[200px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Date </th>
                <th className="w-[200px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Status </th>
                <th className="w-[200px] py-[10px] px-[20px] bg-gray-300 text-black font-medium text-center text-sm border-r-[20px]"> Assigned To: </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} classname='row-detail border-l-4 border-transparent hover:border-blue-500 p-[20px] text-left hover:bg-blue-100 text-sm'>
                  <td className='py-[10px] px-[10px]'>{product.serial_number}</td>
                  <td className='py-[10px] px-[10px]'>{product.category}</td>
                  <td className='py-[10px] px-[10px]'>{product.name}</td>
                  <td className='py-[10px] px-[10px]'>{product.unit_price}</td>
                  <td className='py-[10px] px-[10px]'>{product.date_bought}</td>
                  <td className='py-[10px] px-[10px]'>{product.status}</td>
                  <td className='py-[10px] px-[10px]'>{userNames[product.user_id]}</td>
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
