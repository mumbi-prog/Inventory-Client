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
        const {name, value} = e.target;
        setProductDeets({
            ...productDeets,
            [name]: value
        });
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
    <div>CreateProductss
        <form onSubmit={handleSubmit} className="product-form">
            <label htmlFor="serial_number">Serial Number</label>
            <input type="text" placeholder='serial_number' name='serial_number' onChange={handleInputChange} required/>
        
             <label htmlFor="name">Category</label>
            <input type="text" placeholder='category' name='category' onChange={handleInputChange} required/>

             <label htmlFor="name">Name</label>
            <input type="text" placeholder='name' name='name' onChange={handleInputChange} required/>

            <label htmlFor="unit_price">Unit Price</label>
            <input type="text" placeholder='unit_price' name='unit_price' onChange={handleInputChange} required/>
        
            <label htmlFor="date_bought">Date Bought</label>
            <input type="date" placeholder='date' name='date' onChange={handleInputChange} required/>
        
             <label htmlFor="status">Status</label>
            <input type="options"  name='status' onChange={handleInputChange} required/>
        
        
        </form>
    </div>
  )
}

export default CreateProduct