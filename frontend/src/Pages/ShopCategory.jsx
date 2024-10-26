import React, { useEffect, useContext, useState, useRef } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import axios from 'axios';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Replace with your actual token
  const token = '741aeedb9814ad3c211c98a1bd5fe35e82e0cdef52654110f79fb33f7a40161ed51d53b5275e117ed314ef3716ea33ee4600931b2362f770515eb8781b540a6afd3a3faf643ffe3c46f92e8b25cb456b7824ee9b68f6a0560aafa93bab5dafac353a5551dffcf44d5fd00533fdde805cd0b10a7785d2a7d7a212d7f2414b8aa2';

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/category-banners?populate=*', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const categoriesWithBanners = response.data.data;

        // Check for any matching category fields
        const categoryBanners = categoriesWithBanners.find(item =>
          item.categoryname.toLowerCase() === props.category.toLowerCase() ||
          item.category2?.toLowerCase() === props.category.toLowerCase() ||
          item.collection?.toLowerCase() === props.category.toLowerCase() ||
          item.style?.toLowerCase() === props.category.toLowerCase()
        );

        if (categoryBanners && categoryBanners.categorybannerimage) {
          const bannerImages = categoryBanners.categorybannerimage.map(image => `${process.env.REACT_APP_STRAPI_BASE_URL}${image.formats.large.url}`);
          setBanners(bannerImages);
        }
      } catch (error) {
        console.error("Error fetching category banners:", error);
      }
    };

    fetchBanners();
  }, [props.category, token]);

  // Function to start the rotation interval
  const startRotation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change the interval time as needed
  };

  // Function to reset the rotation interval
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startRotation();
  };

  // Start rotation on component mount
  useEffect(() => {
    if (banners.length > 0) {
      startRotation();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [banners]);

  // Handle dot click to change banner and reset interval
  const handleDotClick = (index) => {
    setCurrentIndex(index);
    resetInterval();
  };

  return (
    <div className='shop-category'>
      {banners.length > 0 ? (
        <div className="banner">
          <img className="banner-image" src={banners[currentIndex]} alt={`Banner for ${props.category}`} />
          <div className="banner-dots">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`banner-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div className='shopcategory-banner-placeholder'>No Banner Available</div>
      )}
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Sort" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product
          .filter(item =>
            props.category.toLowerCase() === item.category.toLowerCase() ||
            props.category.toLowerCase() === item.category2?.toLowerCase() ||
            props.category.toLowerCase() === item.collection?.toLowerCase() ||
            props.category.toLowerCase() === item.style?.toLowerCase()
          )
          .map((item, i) => {
            const imageUrl = item.image && item.image.length > 0 && item.image[0].formats.large 
              ? `${process.env.REACT_APP_STRAPI_BASE_URL}${item.image[0].formats.large.url}` 
              : 'fallback_image_url_here';

            return (
              <Item
                key={i}
                id={item.id}
                title={item.title}
                image={imageUrl}
                price={item.price}
              />
            );
          })
        }
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
