import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to fetch categories and images from Strapi
  const fetchCategories = async () => {
    try {
      const token = '741aeedb9814ad3c211c98a1bd5fe35e82e0cdef52654110f79fb33f7a40161ed51d53b5275e117ed314ef3716ea33ee4600931b2362f770515eb8781b540a6afd3a3faf643ffe3c46f92e8b25cb456b7824ee9b68f6a0560aafa93bab5dafac353a5551dffcf44d5fd00533fdde805cd0b10a7785d2a7d7a212d7f2414b8aa2'; // Your Strapi auth token
      const response = await axios.get(
        'http://localhost:1337/api/categories?populate=*', 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Extract categories and their images directly from the response
      const categoriesData = response.data.data.map((category) => ({
        name: category.categoryname,
        image: `${process.env.REACT_APP_STRAPI_BASE_URL}${category.categoryimage.formats.thumbnail.url}`
      }));

      setCategories(categoriesData); // Update state with fetched categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='categories'>
      <h2>Categories</h2>
      <div className='categories-container'>
        {categories.map((category, index) => (
          <div 
            key={index} 
            onClick={() => navigate(`/${category.name.toLowerCase()}`)} // Use navigate on click
            className='category-item'
          >
            <img src={category.image} alt={category.name} />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
