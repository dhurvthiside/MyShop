import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // State to track the current image index
    const [index, setIndex] = useState(0);

    // Extracting the image URLs from the product data
    const productImages = product.image.map(img => 
        `${process.env.REACT_APP_STRAPI_BASE_URL}${img.formats.large.url}` // Use the large format image URL
    );

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {/* Thumbnail images */}
                    {productImages.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            alt={`Thumbnail ${i}`}
                            className={i === index ? 'small-image selected-image' : 'small-image'}
                            onMouseEnter={() => setIndex(i)} // Update index on hover
                        />
                    ))}
                </div>
                <div className="productdisplay-img">
                    {/* Main image */}
                    <img className='productdisplay-main-img' src={productImages[index]} alt="Main product" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.title}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    {/* Displaying price; adjust if you have old and new price */}
                    <div className="productdisplay-right-price-new">
                        ₹{product.price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <div className="productdisplay-right-size">
                    {/* Size selection can be implemented here if needed */}
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category:</span> {product.category}</p>
                {product.collection && (
                    <p className="productdisplay-right-category"><span>Collection:</span> {product.collection}</p>
                )}
                {product.style && (
                    <p className="productdisplay-right-category"><span>Style:</span> {product.style}</p>
                )}
            </div>
        </div>
    );
}

export default ProductDisplay;
