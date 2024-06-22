import React, {useState} from 'react'
import './comp-specific.css'

function UpdateUserModal({onClose, onUpdate, userData}) {
    const[formData, setFormData] = useState(userData);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const CATEGORIES= ['Stores', 'IT', 'Maintenance', 'Operations', 'Drivers', 'Finance'];
    const handleCategoryChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onUpdate(formData);
        onClose();
    }
  return (
    <div className='modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50'>
        <div className='modal-content bg-white border border-gray-300 rounded-md p-5 w-[400px] shadow-md text-left'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" name='first_name' placeholder='First Name' value={formData.first_name} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" name='last_name' placeholder='Last Name' value={formData.last_name} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name='remail' placeholder='Email' value={formData.email} onChange={handleInputChange} required/>
                </div>
                 <div className="form-group mb2 mb-[10px]">
                        <label htmlFor="department" className='label text-sm font-medium text-gray-700'> Department:</label>
                           <select
                                name="department" value={formData.department} onChange={handleCategoryChange}
                                className="input mt-3 p-2 rounded-md bg-gray-bkg focus:outline-none" required
                            >
                                <option value="">Select department</option>
                                {CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>


                </div>
                
                <div className="button-container">
                    <button type='submit'>Update</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            
            </form>
        </div>
    </div>
  )
}

export default UpdateUserModal