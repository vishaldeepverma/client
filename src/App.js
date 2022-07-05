import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Home from './component/home/home';
import Login from './component/login/login';
import SignUP from './component/signup/signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const user = localStorage.getItem('token');


  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  }


  return (
    <React.Fragment >
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUP />} />
      </Routes>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
