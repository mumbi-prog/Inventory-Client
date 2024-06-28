import React, { useEffect, useState } from 'react'
import api from './../Api/api.jsx'

function UserProducts() {
  const [userId] = useState(null);
  const [userPrds, setUserProds] = useState('')

  useEffect(() => {
    const fetchUserProducts = async () => {
      try{
          const response = await api.get(`users/${userId}`);
          if (response.status === 200) {
            setUserProds(response.data);
          } else {
            console.log('D=Failed to fetch user products, try again!');
          }
      }
      catch(error){
        console.error('Error fetching user products', error)
      }
    }
  })
  return (
    <div className="prod-list">
      
    </div>
  )
}

export default UserProducts