import { PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const GPayCheckoutForm = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [errormessage,setErrorMessage] = useState("")

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'IN',
        currency: 'usd',
        total: {
          label: 'Demo Total',
          amount: 1099,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      pr.canMakePayment().then((result) => {
        if (result === null) {
          setPaymentRequest(pr);
          setCanMakePayment(true);
        }
      });

      pr.on('paymentmethod', async (ev) => {
        try {
          // Create a PaymentIntent on your server with the payment method
          const { data: clientSecret } = await axios.post('https://api.stripe.com/v1/payment_intents', {
            amount: 1099, // replace with your amount
            currency: 'usd',
            payment_method: ev.paymentMethod.id,
          });

          // Confirm the payment
          const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: ev.paymentMethod.id,
          });

          if (confirmError) {
            ev.complete('fail');
            setErrorMessage(confirmError.message);
            return;
          }

          ev.complete('success');
          alert('Payment successful');
        } catch (error) {
          ev.complete('fail');
          setErrorMessage(error.message);
        }
      });
    }
  }, [stripe]);

  if (!canMakePayment) {
    return null;
  }

  return (
    <PaymentRequestButtonElement  options={{ paymentRequest }} />
  );
};
