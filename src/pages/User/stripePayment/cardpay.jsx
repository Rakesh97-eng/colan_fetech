import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CardPaymentComponent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email,
      },
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/create-subscription', {
        paymentMethodId: paymentMethod.id,
        email,
      });

      const { clientSecret, status } = response.data;

      if (status === 'requires_action') {
        const result = await stripe.confirmCardPayment(clientSecret);
        if (result.error) {
          console.error(result.error);
        } else {
          console.log('Subscription successful!');
        }
      } else {
        console.log('Subscription successful!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
    </form>
  );
};

export default CardPaymentComponent;
