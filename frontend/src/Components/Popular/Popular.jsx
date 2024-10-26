import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Popular.css';

const Popular = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the center image index

  // Fetch influencer images from Strapi API
  const fetchInfluencerImages = async () => {
    try {
      const token = '741aeedb9814ad3c211c98a1bd5fe35e82e0cdef52654110f79fb33f7a40161ed51d53b5275e117ed314ef3716ea33ee4600931b2362f770515eb8781b540a6afd3a3faf643ffe3c46f92e8b25cb456b7824ee9b68f6a0560aafa93bab5dafac353a5551dffcf44d5fd00533fdde805cd0b10a7785d2a7d7a212d7f2414b8aa2'; // Your Strapi auth token
      const response = await axios.get(
        'http://localhost:1337/api/influencer-spotlights?populate=*',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const imageData = response.data.data.flatMap((item) =>
        item.influencerimages?.map((image) => ({
          id: image.id,
          imageUrl: `${process.env.REACT_APP_STRAPI_BASE_URL}${image?.formats?.large?.url || ''}`,
        })) || []
      );

      setImages(imageData); // Update state with fetched images

      // Set currentIndex to the middle image upon loading
      const middleIndex = Math.floor(imageData.length / 2);
      setCurrentIndex(middleIndex);
    } catch (error) {
      console.error('Error fetching influencer images:', error);
    }
  };

  useEffect(() => {
    fetchInfluencerImages();
  }, []);

  const slideLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const getImageClass = (index) => {
    const leftIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    const rightIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;

    if (index === currentIndex) return 'center-item';
    if (index === leftIndex) return 'left-item';
    if (index === rightIndex) return 'right-item';
    return ''; // Hide any other images (only show 3 images)
  };

  return (
    <div className="popular">
      <h1>THE INFLUENCER SPOTLIGHT</h1>
      <div className="slider-container">
        <button className="slider-btn left-btn" onClick={slideLeft}>‹</button>
        <div className="slider">
          {images.length > 0 && (
            <div className="popular-items">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`popular-item-wrapper ${getImageClass(index)}`}
                  style={{ display: getImageClass(index) ? 'flex' : 'none' }}
                >
                  <img
                    src={image.imageUrl}
                    alt={`Influencer ${image.id}`}
                    className="influencer-image"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="slider-btn right-btn" onClick={slideRight}>›</button>
      </div>
    </div>
  );
};

export default Popular;
