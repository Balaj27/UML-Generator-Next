import React from 'react';
import Navbar from '../../Components/Navbar';
import UmlComponent from '../../Components/UmlComponent';
import Footer from '../../Components/Footer';
import '../page.css';

function UmlPage() {
  return (
    <div className="page">
      <Navbar />
      <div className="content-wrapper">
        <UmlComponent />
      </div>
      <Footer />
    </div>
  );
}

export default UmlPage;
