import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './NewCollections.css';

const NewCollections = () => {
  const [collections, setCollections] = useState([]);

  // Function to fetch collections from Strapi
  const fetchCollections = async () => {
    try {
      const token = '741aeedb9814ad3c211c98a1bd5fe35e82e0cdef52654110f79fb33f7a40161ed51d53b5275e117ed314ef3716ea33ee4600931b2362f770515eb8781b540a6afd3a3faf643ffe3c46f92e8b25cb456b7824ee9b68f6a0560aafa93bab5dafac353a5551dffcf44d5fd00533fdde805cd0b10a7785d2a7d7a212d7f2414b8aa2'; // Your Strapi auth token
      const response = await axios.get(
        'http://localhost:1337/api/collection-main-images?populate=*',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Extract collection names and images from the response
      const collectionsData = response.data.data.map((collection) => ({
        name: collection.collectionname,
        image: `${process.env.REACT_APP_STRAPI_BASE_URL}${collection.collectionimage.formats.thumbnail.url}`, // Fetch thumbnail image URL
      }));

      setCollections(collectionsData); // Update state with fetched collections
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  // Fetch collections when the component mounts
  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className='new-collections'>
      <h1>COLLECTIONS</h1>
      <div className='new-collections-container'>
        {collections.map((collection, index) => (
          <Link key={index} to={`/${collection.name.toLowerCase().replace(/\s+/g, '-')}`} className='new-collection-item'> {/* Link to category page */}
            <div className='collection-content'>
              <img src={collection.image} alt={collection.name} />
              <span>{collection.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NewCollections;
