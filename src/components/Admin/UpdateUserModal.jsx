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

  return (
    <div>UpdateUserModal</div>
  )
}

export default UpdateUserModal