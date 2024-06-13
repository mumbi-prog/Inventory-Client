import React, { useState } from 'react'
import Sidebar from './SideBar';
import Dashboard from './Dashboard';
import CreateProduct from './CreateProduct';
import UserList from './UserList';
import CreateUser from './CreateUser';

function MainPage() {
  const [selectedOption, setSelectedOption] = useState("dashboard");

  const renderContent = () => {
    switch (selectedOption) {
      case 'dashboard':
        return <Dashboard />;
      case 'createProduct':
        return <CreateProduct />;
      case 'myUsers':
        return <UserList />; 
      case 'createUser':
        return <CreateUser />
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main-wrapper">
      <Sidebar setSelectedOption={setSelectedOption} />
      <div className="content-wrapper">
        {renderContent()}
      </div>
    </div>
  );
}


export default MainPage