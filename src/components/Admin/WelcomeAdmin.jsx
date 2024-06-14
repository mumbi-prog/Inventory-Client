import React, { useState, useEffect } from 'react';
import api from '../Api/api.jsx'
import '../Loader/loader.css'
// import axios from 'axios'


const WelcomeAdmin = () => {
  const [adminData, setadminData] = useState(null);

  useEffect(() => {
    const fetchadminData = async () => {
      try {
        const response = await api.get('http://localhost:3000/mysession');

        if (response.status === 200) { 
          setadminData(response.data);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchadminData();
  }, []);

  return (
    <div className="profile-container">
      {adminData ? (
        <div>
              <p id="first_name" className="user-data text-acc-blue font-medium mb-[10px]">
                {/* Welcome,  {adminData.first_name} */}
                Welcome, <span className='font-bold'>{adminData.last_name}</span>
              </p>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default WelcomeAdmin;
