import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Banner.css'; // Importing the CSS file

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerIntervalRef = React.useRef(null);

  // Function to fetch banners from Strapi
  const fetchBanners = async () => {
    try {
      const token = '741aeedb9814ad3c211c98a1bd5fe35e82e0cdef52654110f79fb33f7a40161ed51d53b5275e117ed314ef3716ea33ee4600931b2362f770515eb8781b540a6afd3a3faf643ffe3c46f92e8b25cb456b7824ee9b68f6a0560aafa93bab5dafac353a5551dffcf44d5fd00533fdde805cd0b10a7785d2a7d7a212d7f2414b8aa2'; // Replace with your authentication token
      const response = await axios.get('http://localhost:1337/api/main-banners?populate=*', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Extracting banner images from the response
      const bannerImages = response.data.data.map((item) =>
        item.bannerimages.map((banner) =>
          `${process.env.REACT_APP_STRAPI_BASE_URL}${banner.formats.large.url}` // Construct full URL for large images
        )
      ).flat();

      console.log('Banner Images:', bannerImages); // Log extracted banner URLs
      setBanners(bannerImages); // Set the banners state
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  // Function to go to the next banner
  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Effect to fetch banners on component mount
  useEffect(() => {
    fetchBanners();

    // Set up interval for rotating banners
    bannerIntervalRef.current = setInterval(nextBanner, 5000); // Change banner every 5 seconds

    return () => {
      clearInterval(bannerIntervalRef.current); // Clear interval on component unmount
    };
  }, [banners.length]); // Dependency on banner length

  return (
    <div className="banner">
      {banners.length > 0 && (
        <img
          src={banners[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className="banner-image"
        />
      )}
      <div className="banner-dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`banner-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)} // Click to navigate to specific banner
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
