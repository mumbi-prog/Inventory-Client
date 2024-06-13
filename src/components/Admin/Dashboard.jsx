import React, { useState, useEffect } from 'react';
import WelcomeAdmin from './WelcomeAdmin';
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
      <WelcomeAdmin />
      <h1 className='comp-title text-hover-blue font-bold capitalize text-3xl mb-[15px]'>Dashboard</h1>
      <div className="products-table-container">
        <div className="products-table">
                  <table className="prod-container">
        <thead>
          <tr>
            <th> Serial Number </th>
            <th> Category </th>
            <th> Name </th>
            <th> Unit Price </th>
            <th> Date Bought </th>
            <th> Status </th>
            <th> Assigned To: </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.serial_number}</td>
              <td>{product.category}</td>
              <td>{product.name}</td>
              <td>{product.unit_price}</td>
              <td>{product.date_bought}</td>
              <td>{product.status}</td>
              <td>{userNames[product.user_id]}</td> {/* Display user name from userNames state */}
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
