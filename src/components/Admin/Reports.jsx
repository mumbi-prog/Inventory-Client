import React, {useEffect, useState} from 'react'
import api from './../Api/api.jsx'

function Reports() {
  const [userProds, setUserProds] = useState('');

  useEffect(() => {
    const fetchUserProds = async () => {
      try{
      }
      catch(err){
        console.error("Could not fetch User Products", err)
      }
    }
  })

  return (
    <div>
      <div className="user-report">
        <h1>User's Report</h1>
        <p>Name</p>

      </div>
    </div>
  )
}

export default Reports