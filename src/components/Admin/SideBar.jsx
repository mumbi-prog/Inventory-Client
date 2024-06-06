import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; 
import { MdOutlineDashboard } from "react-icons/md";
import { BsBoxes } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { Link } from 'react-scroll';
import logo from '../../images/logo.png';
import '../Admin/admin.css'
import api from '../Api/api.jsx'
import { TbLogout2 } from 'react-icons/tb';

function Sidebar({ children, setSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navItem = [
    { id: 'dashboard', name: 'Dashboard', icon: <MdOutlineDashboard /> },
    { id: 'createProduct', name: 'Create Product', icon: <BsBoxes /> },
    { id: 'myUsers', name: 'All Users', icon: <FiUsers /> },
    { id: 'adminLogout', name: 'Logout', icon: <TbLogout2 /> }
  ]

  const handleLogout = async () => {
    try {
      const response = await api.delete('/logout');
      if (response.status === 204) {
        window.location.href = '/login'; 
      } else {
        console.error('Failed, Try Again!!');
      }
    } catch (error) {
      console.error('Error while logging out customer:', error);
    }
  }

  return (
    <div className={`main-container font-dm-sans h-full ${isOpen ? 'open' : ''}`}>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo-container flex">
          <img src={logo} alt="" className="logo" />
          <h3 className="font-dm-sans text-lg mt-[1px]">InventoHub</h3>
          <div className="menu-bars ml-[30px]" onClick={toggle}>
            <FaBars />
          </div>
        </div>
        {navItem.map((item) => (
          <Link key={item.id} to={item.id} className='link' onClick={() => item.id === 'adminLogout' ? handleLogout() : setSelectedOption(item.id)} activeClassName="active">
            <div className="icon">{item.icon}</div>
            <div className="link-text">{item.name}</div>
          </Link>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
