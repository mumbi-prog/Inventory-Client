import React from 'react'
import './logins.css'

function AdminLogin() {
  return <div className='auth-container bg-gray-bkg h-screen flex justify-center items-center'>
  <div className='auth-wrapper ml-[100px] flex w-[1000px]'>
      <div className="login-bkg w-[50%]">
          <h3 className='font-playfair text-6xl font-bold text-white text-center py-[55%]'>Welcome <br /> Back</h3>
      </div>
      <div className='form-content bg-white w-[50%]  px-[3%]'>
          <h5 className="text-4xl font-bold mt-[60px] mb-[20px] text-black"> Log In </h5>
          <p className="text-black mb-[50px]">Not a member? <span>Sign up</span> instead</p>

          <div className="form">
              <form action="">
                  <div className="mb2 mb-[20px]">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>
                      <input
                          placeholder="email@example.com" type="email" id="email" name="email"
                          className="mt-3 p-2 w-full rounded-md bg-gray-bkg focus:outline-none" required 
                      />
                  </div>
                  <div className="mb2 mb-[20px]">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password </label>
                      <input
                          placeholder="Enter password" type="password" id="password" name="password"
                          className="mt-3 p-2 w-full rounded-md bg-gray-bkg focus:outline-none" required 
                      />
                  </div>
              </form>
              <div className="auth-button flex justify-center items-center">
                  <button className='account-login uppercase bg-other-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-800 w-full mt-7'>
                  Login
                  </button>
              </div>
          </div>

      </div>
  </div>
</div>

}

export default AdminLogin