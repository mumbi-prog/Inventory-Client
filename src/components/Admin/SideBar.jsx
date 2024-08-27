import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; 
import { FiUsers } from "react-icons/fi";
import { Link } from 'react-scroll';
import logo from '../../images/snest-logo.png';
import '../Admin/admin.css'
import api from '../Api/api.jsx'
import { TbLogout2 } from 'react-icons/tb';
import { RxDashboard } from 'react-icons/rx';
import { VscNewFile } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { CgUserAdd } from 'react-icons/cg';
import WelcomeAdmin from './WelcomeAdmin.jsx'

function Sidebar({ children, setSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const navItem = [
    { id: 'dashboard', name: 'Dashboard', icon: <RxDashboard /> },
    { id: 'createProduct', name: 'Create Product', icon: <VscNewFile /> },
    { id: 'createUser', name: 'Create User', icon: <CgUserAdd /> },
    { id: 'myUsers', name: 'All Users', icon: <FiUsers /> },
    { id: 'adminLogout', name: 'Logout', icon: <TbLogout2 /> }
  ]

  const handleLogout = async () => {
    try {
      const response = await api.delete('/logout');
      if (response.status === 204) {
        navigate('/login')
      } else {
        console.error('Failed, Try Again!!');
      }
    } catch (error) {
      console.error('Error while logging out admin:', error);
    }
  }

  return (
    <div className={`main-container font-dm-sans h-full ${isOpen ? 'open' : ''}`}>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo-container flex">
          <div className="second-lc">
            <div className="lc-cont">
              <img src={logo} alt="" className="logo" />
              <h4 className='capitalise'>StockNest</h4>
            </div>
            <hr />
            <WelcomeAdmin />
          </div>
          <div className="menu-bars" onClick={toggle}>
            <FaBars />
          </div>
        </div>
        <div className="nav-links">
          {navItem.map((item) => (
            <Link key={item.id} to={item.id} className='link' onClick={() => item.id === 'adminLogout' ? handleLogout() : setSelectedOption(item.id)} activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div className="link-text">{item.name}</div>
            </Link>
          ))}
        </div>
        <footer className="sidebar-footer">
          <p>&copy; {new Date().getFullYear()} StockNest. All rights reserved. <br />Created by Sylvia Mwangi.</p>
        </footer>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
