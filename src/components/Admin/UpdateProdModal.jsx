import React, { useState } from 'react'

function UpdateProdModal({onClose, onUpdate, prodData}) {
    const [formData, setFormData] = useState(prodData);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        onUpdate(formData);
        onClose();
    }

  return (
    <div>
      <div>
        <form onClick={handleSubmit}>
          <div className="form-group">
            <label htmlFor="serial_number">Serial Number</label>
            <input type="text" placeholder='Serial Number' name='serial_number' value={formData.serial_number} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" placeholder='Category' name='category' value={formData.category} onChange={handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="name">Serial Number</label>
            <input type="text" placeholder='Name' name='name' value={formData.name} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="unit-price">Unit Price</label>
            <input type="number" placeholder='Unit Price' name='unit-price' value={formData.unit_price} onChange={handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date Bought</label>
            <input type="date" placeholder='Date Bought' name='date-bought' value={formData.date_bought} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <select name="status" id="status">
              <option value="assigned">Assigned</option>
              <option value="available">Available</option>
            </select>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default UpdateProdModal