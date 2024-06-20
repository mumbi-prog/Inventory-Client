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

  return (
    <div>UpdateProdModal</div>
  )
}

export default UpdateProdModal