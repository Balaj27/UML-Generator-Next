import React from 'react';
import Navbar from './Components/Navbar';
import UmlComponent from './Components/UmlComponent';
import LandingBody from './Components/LandingBody';
import Footer from './Components/Footer';
import './Pages/page.css';
import Services from './Components/Services';

function UmlPage() {
  return (
    <div className="page home">
      <Navbar />
      <div className="content-wrapper">
        <LandingBody />
        <Services />
      </div>
      <Footer />
    </div>
  );
}

export default UmlPage;
