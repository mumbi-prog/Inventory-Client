import React, {useState} from 'react'

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
    <div>
        
    </div>
  )
}

export default UpdateUserModal