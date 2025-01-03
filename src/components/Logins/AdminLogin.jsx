import React, { useState } from 'react';
import api from '../Api/api.jsx';
import { useNavigate, Link } from 'react-router-dom';
import './logins.css';
import { PiEyeClosed, PiEyeBold } from 'react-icons/pi';
import ErrorModal from '../Admin/ErrorModal.jsx';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/login', {
        email,
        password
      });

      console.log('Login successful');
      navigate('/main');
    } catch (error) {
      const errorMessage = error.response.data.error;
      if (errorMessage === 'Unauthorized! Unauthorized!') {
        setError(errorMessage);
      } else {
        setError('Unauthorized to log in. Please use an authorized email address.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className='auth-container bg-gray-bkg h-screen flex justify-center items-center'>
      <div className='auth-wrapper ml-[100px] flex w-[1000px]'>
        <div className="login-bkg w-[50%]">
          <h3 className='font-playfair text-6xl font-bold text-white text-center py-[55%]'>Welcome <br /> Back</h3>
        </div>
        <div className='form-content bg-white w-[50%]  px-[3%]'>
          <h5 className="text-4xl font-bold mt-[60px] mb-[20px] text-black"> Log In </h5>
          <p className="text-black mb-[50px]">Not a member? <Link to="/signup" className='underline text-main-blue font-bold'>Sign Up</Link> instead</p>

          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="mb2 mb-[20px]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>
                <input
                  placeholder="email@dakawou.com" type="email" id="email" name="email"
                  className="mt-3 p-2 w-full rounded-md bg-gray-bkg focus:outline-none" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2 password-field">
                <PasswordInput
                  name="password" title="Password" placeholder="Enter Password"
                  value={password} onChange={(e) => setPassword(e.target.value)} showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
              </div>

              <div className="auth-button flex justify-center items-center">
                <button className='account-login uppercase bg-other-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-800 w-full mt-7'>
                  Login
                </button>
              </div>
              {error && <ErrorModal errorMessage={error} onClose={() => setError('')} />}
            </form>
          </div>
        </div>
      </div>
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
          type="button"
          onClick={onTogglePassword}
          className="absolute flex flex-end ml-[380px] text-gray-600 hover:text-gray-800"
        >
          {showPassword ? <PiEyeBold /> : <PiEyeClosed />}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
