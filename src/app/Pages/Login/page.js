import React from 'react';
import Navbar from '../../Components/Navbar';
import Login from '../../Components/Login';
import Footer from '../../Components/Footer';
import '../page.css';

function LoginPage() {
  return (
    <div className='page'>
        <Navbar/>
        <div className='content-wrapper'>
          <Login />
        </div>
        <Footer />
    </div>
  )
}

export default LoginPage;