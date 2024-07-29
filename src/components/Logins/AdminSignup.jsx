import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PiEyeClosed, PiEyeBold } from 'react-icons/pi';
import api from '../Api/api.jsx';
import './logins.css';
import ErrorModal from '../Admin/ErrorModal.jsx';

function AdminSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post('http://localhost:3000/signup', {
        admin: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        }
      });
      
      console.log('Signup successful');
      navigate('/login');
    } catch (error) {
      setError('Unauthorized to sign up. Please use an authorized email address.');
      console.error('Unauthorized to sign up');
    }
  };

  return (
    <div className='auth-container bg-gray-bkg h-screen flex justify-center items-center'>
      <div className='auth-wrapper ml-[100px] flex w-[1000px]'>
        <div className="login-bkg w-[50%]">
          <h3 className='font-playfair text-6xl font-bold text-white text-center py-[55%]'>Create <br /> Account</h3>
        </div>
        <div className='form-content bg-white w-[50%]  px-[3%]'>
          <h5 className="text-4xl font-bold mt-[20px] mb-[5px] text-black"> Sign Up </h5>
          <p className="text-black mb-[20px]">Already a member? <Link to="/login" className='underline text-main-blue font-bold'>Log in</Link> instead</p>

          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="name-container flex mb-[10px]">
                <div className="user-name mb2">
                  <label htmlFor="f_name" className="block text-sm font-medium text-gray-700"> First Name</label>
                  <input
                    placeholder="First Name" type="text" id="f_name" name="f_name"
                    className="mt-3 p-2 w-full rounded-md bg-gray-bkg focus:outline-none" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="user-name mb2 ml-[25px] ">
                  <label htmlFor="l_name" className="block text-sm font-medium text-gray-700"> Last Name </label>
                  <input
                    placeholder="Last Name" type="text" id="l_name" name="l_name"
                    className="mt-3 p-2 w-[112%] rounded-md bg-gray-bkg focus:outline-none" required value={lastName} onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb2 mb-[10px]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>
                <input
                  placeholder="email@dakawou.com" type="email" id="email" name="email"
                  className="mt-3 p-2 w-full rounded-md bg-gray-bkg focus:outline-none" required value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2 password-field">
                <PasswordInput name="password" title="Password" placeholder="Password"
                  value={password} onChange={(e) => setPassword(e.target.value)} showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)} />
              </div>
              <div className="mb-[20px] consfirm-pswd-field">
                <PasswordInput name="confirmPassword" title="Confirm Password" placeholder="Confirm Password" 
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)} />
              </div>
              <div className="auth-button flex justify-center items-center">
                <button className='create-account uppercase bg-other-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-hover-blue w-full mt-1'>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {error && <ErrorModal errorMessage={error} onClose={() => setError('')} />}
    </div>
  );
}

const PasswordInput = ({ name, title, placeholder, value, onChange, showPassword, onTogglePassword }) => {
  return (
    <div className="mb-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          className="mt-1 p-2 w-full rounded-md  focus:outline-none"
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
        />
        <button
          type="t-button"
          onClick={onTogglePassword}
          className="absolute flex flex-end ml-[380px] text-gray-600 hover:text-gray-800"
        >
          {showPassword ? <PiEyeBold /> : <PiEyeClosed />}
        </button>
      </div>
    </div>
  );
};

export default AdminSignup;
