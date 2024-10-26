import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo1.png';
import cart_icon from '../Assets/cart_icon.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link to='/' onClick={() => setMenu("shop")}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className='nav-bottom'>
        <div className='nav-left'>
          <ul ref={menuRef} className='nav-menu'>
            <li 
              className="nav-item"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link to='/' className='nav-link'>Shop</Link>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to='/necklace' className="dropdown-item">Necklace</Link></li>
                  <li><Link to='/earrings' className="dropdown-item">Earrings</Link></li>
                  <li><Link to='/bracelet' className="dropdown-item">Bracelet</Link></li>
                  <li><Link to='/rings' className="dropdown-item">Rings</Link></li>
                  <li><Link to='/accessories' className="dropdown-item">Accessories</Link></li>
                  <li><Link to='/under-5k' className="dropdown-item">Under 5k</Link></li>
                  <li 
                    className="nav-item"
                    onMouseEnter={() => setIsStyleDropdownOpen(true)}
                    onMouseLeave={() => setIsStyleDropdownOpen(false)}
                  >
                    <Link to='/style' className="dropdown-item">Style</Link>
                    {isStyleDropdownOpen && (
                      <ul className="style-dropdown-menu" >
                        <li><Link to='/modern' className="dropdown-item">Modern</Link></li>
                        <li><Link to='/ethnic' className="dropdown-item">Ethnic</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li onClick={() => setMenu("about")}>
              <Link to='/about' className='nav-link'>About Us</Link>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <Link to='/cart'><img src={cart_icon} className='nav-cart' alt="Cart" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown" />
    </div>
  );
}

export default Navbar;
