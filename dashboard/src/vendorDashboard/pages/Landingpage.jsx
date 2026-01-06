import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import './Landingpage.css'
import AddFirm from '../components/forms/addFirm'
import AddProduct from '../components/forms/addProducts'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'


const Landingpage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const[showlogOut,setShowLogOut]= useState(false);
  const [showAddFirm,setShowAddFirm]= useState(false);


  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogOut(true);
    } else {
      setShowLogOut(false);
    }
  }, []);
  useEffect(()=>{const firmName = localStorage.getItem('firmName');
  if(firmName){
    setShowAddFirm(false);
  }else{
    setShowAddFirm(true);
  }
},[]);

  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false);
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }
  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }
  const showFirmHandler = () => {
    if(showlogOut){
    setShowFirm(true)
    setShowRegister(false)
    setShowLogin(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }else{
    alert('Please login to add a firm')
    showLoginHandler();
  }
    
  }
  const showProductHandler = () => {
    if(showlogOut){
    setShowProduct(true)
    setShowFirm(false)
    setShowRegister(false)
    setShowWelcome(false)
    setShowLogin(false)
    setShowAllProducts(false)}else{
      alert('Please login to add products')
      showLoginHandler();
    }
  }
  const showWelcomeHandler = () => {
    setShowWelcome(true);
    setShowProduct(false)
    setShowFirm(false)
    setShowRegister(false)
    setShowLogin(false)
    setShowAllProducts(false)
  }
  const showAllProductsHandler = () => {
    if(showlogOut){
    setShowAllProducts(true);
    setShowWelcome(false);
    setShowProduct(false)
    setShowFirm(false)
    setShowRegister(false)
    setShowLogin(false)}else{
      alert('Please login to view products')
      showLoginHandler();
    }
  }

const logoutHandler = () => {
  confirm('Are you sure you want to logout?');
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setShowLogOut(false);
    setShowAddFirm(true);
  }





  return (
    <>

      <section className='landingSection'>
        <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showlogOut={showlogOut} logoutHandler={logoutHandler} />
        <div className="collectionSection">
          <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler} showAddFirm={showAddFirm} />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && showlogOut && <AddFirm />}
          {showProduct && showlogOut &&<AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showlogOut && <AllProducts/>}



        </div>


      </section>




    </>
  )
}

export default Landingpage