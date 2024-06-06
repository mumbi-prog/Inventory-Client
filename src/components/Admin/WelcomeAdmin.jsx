import React, { useState, useEffect } from 'react';
import api from '../Api/api.jsx'
import '../Loader/loader.css'


const WelcomeAdmin = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/mysession');

        if (response.status === 200) { 
          setUserData(response.data);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      {userData ? (
        <div>
              <p id="first_name" className="user-data text-acc-blue text-3xl font-medium mb-[10px]">
                Welcome,  {userData.first_name}
              </p>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default WelcomeAdmin;
