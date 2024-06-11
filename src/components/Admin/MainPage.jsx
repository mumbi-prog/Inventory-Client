import React from 'react'
import Sidebar from './SideBar';
import Dashboard from './Dashboard';
import CreateProduct from './CreateProduct';
import UserList from './UserList';

function MainPage() {
  return (
    <div>
        <Sidebar />
        <Dashboard />
        <CreateProduct />
        <UserList />
    </div>
  )
}

export default MainPage