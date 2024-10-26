import React from 'react'
import Banner from '../Components/Hero/Banner'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import Categories from '../Components/Categories/Categories'
import './CSS/Shop.css'

const Shop = () => {
  return (
    <div className='Shop'>
      <Banner />
      <Categories />
      <NewCollections />
      <Popular />
      {/* <Offers /> */}
      {/* <NewsLetter /> */}
    </div>
  )
}

export default Shop
