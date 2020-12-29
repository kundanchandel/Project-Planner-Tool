import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "../../services/Axios";

const CheckoutForm = ({ amount, handleClose }) => {
  console.log(amount);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (paymentMethodReq.error) {
      console.log(error);
      return;
    }
    const { data: clientSecret } = await axios.post("/payment/intent", {
      amount: amount * 100,
    });
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });
    if (error) {
      window.alert("Something went wrong with online payment");
      
    } else {
      handleClose(false);
    }
  };

  const iframeStyles = {
    base: {
      color: "black",
      fontSize: "16px",
      "::placeholder": {
        color: "black",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
    complete: {
      iconColor: "#cbf4c9",
    },
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      <CardElement options={cardElementOpts} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51I2vBGHJNzwVqUQl9KmNCkm0JTSUcgX7QgT6BwYY0l4NLw4KUiAylKuVu4DxGuaSdkfzVl1894LZmhsK0cr4ckAN00OeazOidL"
);

export default function Payment({ amount, handleClose }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} handleClose={handleClose} />
    </Elements>
  );
}
