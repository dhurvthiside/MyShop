import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img 
          onClick={() => window.scrollTo(0, 0)} 
          src={props.image} 
          alt={props.title} 
          className="item-image" 
        />
      </Link>
      <p className="item-title">{props.title}</p>
      <div className="item-prices">
        <div className="item-price">
          ₹{props.price}
        </div>
      </div>
    </div>
  );
}

export default Item;
