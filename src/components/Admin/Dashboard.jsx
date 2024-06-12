import React, {useState, useEffect}from 'react'
import WelcomeAdmin from './WelcomeAdmin'
import api from '../Api/api'

function Dashboard() {
  const [products, setProducts] = useState("")

  useEffect(() => {
    const handleproductList = async() => {
      try {
        const response = await api.get("http://localhost:3000/products");
        if (response === 200){
          setProducts(response.data)
        }
        else{
          console.log("Can't fetch products", response.status)
        }
      }
      catch (error){
        console.errors(error)
      }
    }; 
    handleproductList();
  }, [])

  return (
    <div className='sect-container ml-[-800%] mt-[20px]'>
      <WelcomeAdmin />
      <h1 className='comp-title text-main-blue-500 font-bold capitalize text-2xl'>Dashboard</h1>
      <table className="prod-container">
        <thead>
          <tr>
            <th> Serial Number  </th>
            <th> Category  </th>
            <th> Name  </th>
            <th> Unit Price  </th>
            <th> Date Bought  </th>
            <th> Status  </th>
            <th> Assigned To:  </th>
          </tr>
        </thead>
        <tbody>
            {products.map((products, index) =>(
              <tr key={index}>
                  <td>{products.serial_number}</td>
                  <td>{products.category}</td>
                  <td>{products.name}</td>
                  <td>{products.unit_price}</td>
                  <td>{products.date_bought}</td>
                  <td>{products.status}</td>
                  <td>{products.user_id}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard