import React from 'react'
//import bkg from '../../images/bkg.jpg'
import './logins.css'
// import {Link} from react-router-dom;

function AdminSignup() {

  return (
    <div className='auth-container bg-gray-bkg h-screen flex justify-center items-center'>
        <div className='auth-wrapper ml-[100px] flex w-[1000px]'>
            <div className="login-bkg w-[50%]">
                <h3 className='font-playfair text-6xl font-bold text-white text-center py-[55%]'>Create <br /> Account</h3>
            </div>
            <div className='form-content bg-white w-[50%]  px-[3%]'>
                <h5 className="text-4xl font-bold mt-[20px] mb-[20px] text-black"> Sign Up </h5>
                <p className="text-black mb-[50px]">Already a member? <span>Log in</span> instead</p>

                <div className="form">
                    <form action="">
                        <div className="name-container flex">
                            <div className="mb2">
                                <label htmlFor="f_name" className="block text-sm font-medium text-gray-700"> First Name</label>
                                <input
                                    placeholder="First Name" type="text" id="f_name" name="f_name"
                                    className="mt-3 p-2 w-full rounded-md bg-gray-bkg focus:outline-none" required 
                                />
                            </div>
                            <div className="mb2 ml-[20px]">
                                <label htmlFor="l_name" className="block text-sm font-medium text-gray-700"> Last Name </label>
                                <input
                                    placeholder="Last Name" type="text" id="l_name" name="l_name"
                                    className="mt-3 p-2 w-[112%] rounded-md bg-gray-bkg focus:outline-none" required 
                                />
                            </div>
                        </div>
                        <div className="mb2 mb-[20px]">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>
                            <input
                                placeholder="email@dakawou.com" type="email" id="email" name="email"
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
                        {/* <div className="mb2 mb-[20px]">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Confirm Password </label>
                            <input
                                placeholder="Confirm password" type="password" id="password" name="password"
                                className="mt-3 p-2 w-full rounded-md bg-gray-bkg focus:outline-none" required 
                            />
                        </div> */}
                    </form>
                    <div className="auth-button flex justify-center items-center">
                        <button className='create-account uppercase bg-other-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-hover-blue w-full mt-7'>
                        Sign Up
                        </button>
                    </div>
                    <div className='flex reverse'>
                        <label htmlFor="password" className="block text-sm font-medium text-main-blue"> Forgot Password? </label>
                        <input type="checkbox" />
                            Forgot Password 
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default AdminSignup