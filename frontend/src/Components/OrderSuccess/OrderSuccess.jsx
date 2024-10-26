import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate('/');
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="order-success-container">
      <h1>Thank you for Shopping with Us!</h1>
      <p>We will confirm your payment and get back to you shortly.</p>
      <p>You will be redirected to the homepage in {countdown} seconds.</p>
    </div>
  );
};

export default OrderSuccess;
