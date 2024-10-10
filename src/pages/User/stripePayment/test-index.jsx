import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
// import GooglePayComponent from './gpay';
import CardPaymentComponent from './cardpay';
import DirectAccountPaymentComponent from './directpay';

const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: email,
      },
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // Call your backend to create the subscription
    try {
      const response = await axios.post('/create-subscription', {
        paymentMethodId: paymentMethod.id,
        email: email,
      });

      const { clientSecret, status } = response.data;

      if (status === 'requires_action') {
        const result = await stripe.confirmCardPayment(clientSecret);

        if (result.error) {
          console.error(result.error);
          setLoading(false);
        } else {
          console.log('Subscription successful!');
          setLoading(false);
        }
      } else {
        console.log('Subscription successful!');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      {/* <GooglePayComponent/> */}
      <CardPaymentComponent/>
      <DirectAccountPaymentComponent/>  
    {/* <p style={{color:"yellow"}}> My own page</p>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
      <CardElement />

      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Subscribe'}
      </button>
    </form> */}
        </>
  );
};

export default SubscriptionForm;
