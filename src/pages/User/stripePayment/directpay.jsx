import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const DirectAccountPaymentComponent = () => {
  const stripe = useStripe();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe) {
      return;
    }

    try {
      const { data: clientSecret } = await axios.post('/create-setup-intent', { email });

      const result = await stripe.confirmSetup({
        clientSecret,
        payment_method: {
          type: 'us_bank_account',
          billing_details: {
            email,
          },
          us_bank_account: {
            account_holder_type: 'individual',
            account_number: '000123456789',
            routing_number: '110000000',
          },
        },
      });

      if (result.error) {
        console.error(result.error);
      } else {
        console.log('Setup successful!');
        // Now you can create a subscription with the setup payment method
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
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Subscribe'}
      </button>
    </form>
  );
};

export default DirectAccountPaymentComponent;
