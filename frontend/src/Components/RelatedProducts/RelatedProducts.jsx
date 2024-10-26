import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';
import './RelatedProduct.css'; // Ensure you have a CSS file for styles

const RelatedProducts = ({ productId }) => {
  const { all_product } = useContext(ShopContext);

  // Log to check if all_product is being fetched
  console.log('all_product:', all_product);
  console.log('Current productId:', productId);

  // Simple check to ensure we have products and a valid productId
  if (!all_product || all_product.length === 0) {
    return <div>No products available to show related products.</div>;
  }

  // Find the first 4 products (as a basic placeholder logic for related products)
  const relatedProducts = all_product.slice(0, 4);  // For testing, just take the first 4 products

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item, i) => {
          // Simplified fallback for missing image
          const imageUrl = item.image && item.image.length > 0 && item.image[0].formats.large
            ? `${process.env.REACT_APP_STRAPI_BASE_URL}${item.image[0].formats.large.url}`
            : 'fallback_image_url_here';  // Replace with actual fallback image

          // Log each product to ensure mapping works
          console.log('Rendering related product:', item);

          return (
            <div key={i} className="relatedproduct-wrapper"> {/* Added wrapper div */}
              <Item 
                id={item.id}
                title={item.title}
                image={imageUrl}
                price={item.price}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RelatedProducts;
