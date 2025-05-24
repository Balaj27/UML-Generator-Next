import React from 'react'
import './components.css'
function LandingBody(){

    return(
    <div className="banner-container">
      <div className="banner-content">
        <h1 className='highlight'>
          Instant UML Generation
        </h1>
        <p>
          Transform Ideas into Visual Masterpieces with seamless UML Generation!
        </p>
        <a href='/generate'><button className="register-button">Generate Now!</button></a>
      </div>
      <div className="banner-image">
        <img src='https://d2ms8rpfqc4h24.cloudfront.net/software_architecture_approach_e14db643bb.png' alt="Illustration" style={{}}/>
      </div>
    </div>
    )
}

export default LandingBody;