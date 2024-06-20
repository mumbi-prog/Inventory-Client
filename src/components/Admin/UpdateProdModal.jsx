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
    <div>UpdateProdModal</div>
  )
}

export default UpdateProdModal