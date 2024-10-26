import React, { useContext, useState, useRef, useEffect } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import qr_code from '../Assets/qr.jpg';
import { useNavigate } from 'react-router-dom';



const CartItems = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, clearCart } = useContext(ShopContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const checkoutRef = useRef(null);
  const paymentRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    altPhone: '',
    email: '',
    address1: '',
    address2: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
  });

  const token = '741aeedb9814ad3c211c98a1bd5fe35e82e0cdef52654110f79fb33f7a40161ed51d53b5275e117ed314ef3716ea33ee4600931b2362f770515eb8781b540a6afd3a3faf643ffe3c46f92e8b25cb456b7824ee9b68f6a0560aafa93bab5dafac353a5551dffcf44d5fd00533fdde805cd0b10a7785d2a7d7a212d7f2414b8aa2';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (showCheckout && checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCheckout]);

  useEffect(() => {
    if (showPayment && paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showPayment]);

  const handleProceedToCheckout = () => {
    if (Object.keys(cartItems).some(key => cartItems[key] > 0)) {
      setShowCheckout(true);
    }
  };

  const handleProceedToPayment = () => {
    const requiredFields = ['name', 'phone', 'address1', 'city', 'state', 'pincode', 'email'];
    const allFieldsFilled = requiredFields.every(field => formData[field].trim() !== '');

    if (allFieldsFilled) {
      setShowPayment(true);
    } else {
      alert('Please fill all required fields before proceeding to payment.');
    }
  };

  const generateOrderId = () => {
    return `order${Math.floor(100000 + Math.random() * 900000)}`;
  };


  const handlePaymentCompleted = async () => {
    // Check if the cart is empty
    const isCartEmpty = all_product.every(product => cartItems[product.id] <= 0);

    if (isCartEmpty) {
      alert('Your cart is empty. Please add items to the cart and try again.'); // Show an error message
      return; // Exit the function if the cart is empty
    }

    const orderData = {
      data: {
        email: formData.email,
        orderid: generateOrderId(),
        paymentinfo: {},
        Products: all_product
          .filter(product => cartItems[product.id] > 0)
          .map(product => ({
            title: product.title,
            price: product.price,
            quantity: cartItems[product.id],
            productid: product.id,
          })),
        addressLine1: formData.address1,
        addressLine2: formData.address2 || null,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        name: formData.name,
        phonenumber: formData.phone,
        transactionid: `txn_${generateOrderId()}`,
        amount: getTotalCartAmount(),
        statusofpayment: "Pending",
        alternatephonenumber: formData.altPhone || null,
        apartmentorblock: formData.apartment || null,
      }
    };

    try {
      const response = await fetch('http://localhost:1337/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        clearCart();
        setShowCheckout(false);
        setShowPayment(false);
        navigate('/order-success'); // Redirect to OrderSuccess page on success
      } else {
        const errorData = await response.json();
        console.error('Failed to complete the order:', errorData);
        alert('Failed to complete the order. Please check order details and try again.');
      }
    } catch (error) {
      console.error('Error completing the order:', error);
      alert('An error occurred while processing your order.');
    }
  };



  const getImageUrl = (images) => {
    return images && images.length > 0 && images[0].formats.small.url
      ? `${process.env.REACT_APP_STRAPI_BASE_URL}${images[0].formats.small.url}`
      : 'fallback_image_url_here';
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product && all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          const productImageUrl = getImageUrl(product.image);

          return (
            <div key={product.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={productImageUrl} alt={product.title} className="carticon-product-icon" />
                <p>{product.title}</p>
                <p>₹{product.price}</p>
                <button className="cartitems-quantity">{cartItems[product.id]}</button>
                <p>₹{product.price * cartItems[product.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(product.id)}
                  alt="Remove item"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>

      {showCheckout && (
        <div ref={checkoutRef} className="checkout-form">
          <h2>Shipping Details</h2>
          <form>
            <div className="form-group">
              <label>
                Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Phone Number <span>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Alternate Phone Number</label>
              <input
                type="tel"
                name="altPhone"
                value={formData.altPhone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                Address Line 1 <span>*</span>
              </label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Apartment/Block</label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                City <span>*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                State <span>*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Pincode <span>*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="button" className="proceed-to-payment-button" onClick={handleProceedToPayment}>
              Proceed to Payment
            </button>
          </form>
        </div>
      )}

      {showPayment && (
        <div ref={paymentRef} className="payment-section">
          <h2>Payment</h2>
          <p>Scan the QR code below to complete the payment.</p>
          <img src={qr_code} alt="QR Code" className="payment-qr-code" />
          <p>Please pay the required amount. We will match the payment details for order confirmation.</p>
          <button onClick={handlePaymentCompleted}>PAYMENT COMPLETED</button>
        </div>
      )}
    </div>
  );
};

export default CartItems;
