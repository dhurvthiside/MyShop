import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [all_product, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const token = '741aeedb9814ad3c211c98a1bd5fe35e82e0cdef52654110f79fb33f7a40161ed51d53b5275e117ed314ef3716ea33ee4600931b2362f770515eb8781b540a6afd3a3faf643ffe3c46f92e8b25cb456b7824ee9b68f6a0560aafa93bab5dafac353a5551dffcf44d5fd00533fdde805cd0b10a7785d2a7d7a212d7f2414b8aa2'; // Replace with your actual Strapi token

    // Fetch data from Strapi with token authentication
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/products?populate=*', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the headers correctly
                    }
                });

                const products = response.data.data; // Adjust to the structure of your API response
                setAllProduct(products);

                // Initialize the cart with product IDs from Strapi
                let initialCart = {};
                products.forEach(product => {
                    initialCart[product.id] = 0;
                });
                setCartItems(initialCart);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [token]);  // token is included in dependencies to ensure updates if it changes

    // Add product to cart
    const addToCart = (itemId) => {
        console.log(`Adding item with ID: ${itemId}`);
        setCartItems((prev) => {
            const updatedCount = (prev[itemId] || 0) + 1;
            const updatedCart = { ...prev, [itemId]: updatedCount };
            console.log('Updated cart items:', updatedCart);
            return updatedCart;
        });
    };

    // Remove product from cart
    const removeFromCart = (itemId) => {
        console.log(`Removing item with ID: ${itemId}`);
        setCartItems((prev) => {
            const updatedCount = Math.max((prev[itemId] || 0) - 1, 0); // Ensure count doesn't go below 0
            const updatedCart = { ...prev, [itemId]: updatedCount };
            console.log('Updated cart items after removal:', updatedCart);
            return updatedCart;
        });
    };

    // Clear the cart
    const clearCart = () => {
        console.log('Clearing cart');
        let clearedCart = {};
        all_product.forEach(product => {
            clearedCart[product.id] = 0; // Reset each product's cart count to 0
        });
        setCartItems(clearedCart);
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {  // Check if itemInfo is defined
                    totalAmount += itemInfo.price * cartItems[item]; // Use new_price from API response
                } else {
                    console.warn(`Product with ID ${item} not found in all_product`);
                }
            }
        }
        return totalAmount;
    };

    // Get total cart items count
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = { 
        getTotalCartAmount, 
        getTotalCartItems, 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart 
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
