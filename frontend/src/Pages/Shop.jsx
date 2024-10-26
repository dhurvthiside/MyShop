import React from 'react'
import Banner from '../Components/Hero/Banner'
import Popular from '../Components/Popular/Popular'

import NewCollections from '../Components/NewCollections/NewCollections'

import Categories from '../Components/Categories/Categories'
import './CSS/Shop.css'

const Shop = () => {
  return (
    <div className='Shop'>
      <Banner />
      <Categories />
      <NewCollections />
      <Popular />
     
    </div>
  )
}

export default Shop
