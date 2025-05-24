import React from 'react'
import Navbar from '../../Components/Navbar'
import Signup from '../../Components/Signup'
import Footer from '../../Components/Footer'
import "../page.css"

function SignupPage(){

    return(
        <div className='page'>
            <Navbar/>
            <div className='content-wrapper'>
                <Signup/>
            </div>
            <Footer/>
        </div>
    )
}

export default SignupPage;