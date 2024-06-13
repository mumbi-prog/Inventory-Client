import React, { useState } from 'react'
import api from '../Api/api.jsx'

function CreateProduct() {
    const [productDeets, setProductDeets] = useState({
        serial_number : '',
        category: '',
        name: '', 
        unit_price: '',
        date_bought: '',
        status: ''
    })

    const handleInputChange = (e) => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post("http://localhost/3000/products", productDeets);
            if (response.status === 201){
                setProductDeets(response.data);
            } else {
                console.log("Could not create product.")
            }
        }
        catch(error){
            console.error(error);
        }
    }
  return (
    <div>CreateProduct

    </div>
  )
}

export default CreateProduct