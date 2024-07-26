// import './App.css';
// import AdminSignup from './components/Logins/AdminSignup';
// import { Router, Routes, Route } from 'react-router-dom';
// import MainPage from './components/Admin/MainPage';
// import AdminLogin from './components/Logins/AdminLogin';

// function App() {
//   return (
//    <Router>
//     <Routes>
//       <Route path='/signup' element></Route>
//     </Routes>
//    </Router>
//   );
  
// }

// export default App;


import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/Admin/MainPage';
import AdminLogin from './components/Logins/AdminLogin';
import AdminSignup from './components/Logins/AdminSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/signup' element={<AdminSignup />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/' element={<AdminLogin/>} />
      </Routes>
      <hr/>
    </Router>
  );
}

export default App;
