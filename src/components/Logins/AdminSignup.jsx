import React from 'react'
//import bkg from '../../images/bkg.jpg'
import './logins.css'

function AdminSignup() {

    // const [formData, setFormData] = useState({
    //     email: "",
    //     password: "",
    //   });
    //   const [errorMsg, setErrMsg] = useState("");
    //   const [successMsg, setSuccessMsg] = useState("");
    
    //   const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    //   };
    
    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       const response = await axios.post("/login", formData);
    //       if (response.status === 200) {
    //         const data = response?.data;
    //         setSuccessMsg("Login successful!");
    //         localStorage.setItem("userID", data.id);
    //       } else {
    //         setErrMsg("An error occurred while logging in");
    //         setTimeout(() => {
    //           setErrMsg("");
    //         }, 3000);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       setErrMsg("An error occurred while logging in");
    //       setTimeout(() => {
    //         setErrMsg("");
    //       }, 3000);
    //     }
    //   };

  return (
    <div className='auth-container bg-gray-bkg h-screen flex justify-center items-center'>
        <div className='auth-wrapper m-[0] flex w-[900px]'>
            <div className="login-bkg w-[50%]">
                <h3 className='font-playfair text-4xl font-bold text-white text-center py-[65%]'>Welcome Back</h3>
            </div>
            <div className='form-content w-[50%] bg-white'>
                <h5 className="text-4xl font-medium mt-[20px] mb-[10px] text-center text-black"> Log In </h5>
                <p className="text-center text-black mb-[10px]">Not a member? </p>

                <div className="form">

                </div>
            </div>

        </div>
    </div>
  )
}

export default AdminSignup