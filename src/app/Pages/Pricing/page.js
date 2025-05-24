import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import PricingCard from '../../Components/PricingCard';

import '../page.css';

function PricingPage() {
  return (
    <div className='page'>
      <Navbar />
      <div className="pricingBody content-wrapper">
        <PricingCard
          title="Basic"
          price="Free"
          features={["5 prompts per day", "No edit functionality"]}
          buttonText="Get Started"
        />
        <PricingCard
          title="Pro"
          price="$10/month"
          features={["Unlimited prompts", "Edit functionality"]}
          buttonText="Subscribe Now"
        />
      </div>
      <Footer />
    </div>
  );
}

export default PricingPage;
