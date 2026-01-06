import React from 'react'
import './SideBar.css'

const SideBar = ({showFirmHandler,showProductHandler,showAllProductsHandler,showAddFirm}) => {
  return (
    <div className='SideBarSection'>
        <ul>
            {showAddFirm && <li onClick={showFirmHandler}>Add Firm</li>}
            <li onClick={showProductHandler}>Add products</li>
            <li onClick={showAllProductsHandler}>All products</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default SideBar