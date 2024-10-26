import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  console.log(footer_logo);
  return (
    

    <footer className='footer'>
      <div className="footer-logo-container">
        <img src={footer_logo} alt="Footer Logo" className="footer-logo" />
      </div>

      <div className="footer-social-container">
        <a href="https://www.instagram.com/elabyaashima" target="_blank" rel="noopener noreferrer" className="social-link">
          <img src={instagram_icon} alt="Instagram" />
        </a>
        <a href="https://wa.me/+918955273610" target="_blank" rel="noopener noreferrer" className="social-link">
          <img src={whatsapp_icon} alt="WhatsApp" />
        </a>
      </div>

      <div className="footer-copyright">
        <p>Copyright © 2024 - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
