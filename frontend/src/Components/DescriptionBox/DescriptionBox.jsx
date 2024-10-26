import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p> An e-commerece platform that allows platform that faciliates 
            buying and selling of products online at a huge discount, free cash on delivery services available.
             Top brand in the country for getting you your to quality goods in no time.</p>
        <p>Each product has its own dedicated page with relevant information available.
        </p> 
      </div>
    </div>
  )
}

export default DescriptionBox
