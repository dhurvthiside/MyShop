import React from 'react';
import './App.css';
import ScrollToTop from './ScrollToTop';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import AboutUs from './Pages/AboutUs';
import Popular from './Components/Popular/Popular';
import Footer from './Components/Footer/Footer';
import OrderSuccess from './Components/OrderSuccess/OrderSuccess'; // Fixed the import path

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/earrings' element={<ShopCategory category="Earrings" />} />
          <Route path='/necklace' element={<ShopCategory category="Necklace" />} />
          <Route path='/rings' element={<ShopCategory category="Rings" />} />
          <Route path='/bracelet' element={<ShopCategory category="Bracelet" />} />
          <Route path='/accessories' element={<ShopCategory category="Accessories" />} />
          <Route path='/faux-polki' element={<ShopCategory category="Faux Polki" />} />
          <Route path='/faux-diamond' element={<ShopCategory category="Faux Diamond" />} />
          <Route path='/temple' element={<ShopCategory category="Temple" />} />
          <Route path='/oxidised-silver' element={<ShopCategory category="Oxidised Silver" />} />
          <Route path='/under-5k' element={<ShopCategory category="Under 5k" />} />
          <Route path='/modern' element={<ShopCategory category="Modern" />} />
          <Route path='/ethnic' element={<ShopCategory category="Ethnic" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/popular" element={<Popular />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path="/order-success" element={<OrderSuccess />} /> {/* Fixed the closing tag */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
