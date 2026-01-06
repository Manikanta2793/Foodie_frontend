import React from 'react'
import './Navbar.css'
const Navbar = ({showLoginHandler,showRegisterHandler,showlogOut,logoutHandler}) => {
   const firmName = localStorage.getItem('firmName');
  return (
    <div className='navSection'>
        <div className="company">Vendor Dashboard</div>
        <div className="firmName"><h4>Firm Name : {firmName}</h4></div>
        <div className="userAuth">
          {!showlogOut?<><span onClick={showLoginHandler}>Login</span>
            <span onClick = {showRegisterHandler}>Register</span></>:<><span onClick={logoutHandler}>Logout</span></>}
            
            
        </div>
    </div>
  )
}

export default Navbar