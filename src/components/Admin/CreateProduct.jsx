import React, {useState, useEffect} from 'react'
import api from '../Api/api.jsx';

function CreateProduct() {

  const [prodDeets, setProdDeets] = useState({
    serial_number : '',
    category : '',
    name : '',
    unit_price : '',
    date_bought : '',
    status : '',
    user_id: ''
  })

  useEffect(() => {
    const handleCreateProds = async() => {
      try{
          const response = await api.post("http://localhost:3000/products");
          if (response === 200){
            setProdDeets(response.data)
          } else {
            console.log("Can't create products", response.status)
          }
      }
      catch (error){
        console.errors(error)
      }
    };
    handleCreateProds();
  }, []);

  return (
    <div className='sect-container ml-[-640%] mt-[20px]'>
      <h1 className="comp-title text-main-blue-500 font-bold capitalize text-2xl"> Create Product</h1>
     
      
    </div>
  )
}

export default CreateProduct