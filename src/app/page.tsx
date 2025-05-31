import React from 'react';
import Navbar from './Components/Navbar';
import LandingBody from './Components/LandingBody';
import Footer from './Components/Footer';
import './Pages/page.css';
import Services from './Components/Services';
import Work from './Components/Work';

function UmlPage() {
  return (
    <div className="page home">
      <Navbar />
      <div className="content-wrapper">
        <LandingBody />
        <Services />
        <Work />
      </div>
      <Footer />
    </div>
  );
}

export default UmlPage;
