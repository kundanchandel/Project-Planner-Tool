import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "../../services/Axios";
import "./payment.css";

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
      const response=await axios.put("/markaspaid",{isPaid:true})

      console.log(response)

      handleClose(false);
      window.location.reload()
    }
  };

  const iframeStyles = {
    base: {
      width:"150px",
      color: "#000",
      margin:"100px",
      fontSize: "16px",
      iconColor: "#fff",
      backgroundColor:"white",
      // "::placeholder": {
      //   color: "#87bbfd"
      // }
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
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
      }}
    >
      <CardElement options={cardElementOpts} className="paymodal" />{" "}
      <button type="submit" disabled={!stripe} className="pay">
        Pay{" "}
      </button>{" "}
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51I3ZBfDldkZujMPvtnk24VEBXlrQTZPKeuBfVH0sFQ5YZVQbyixSmnECZ6GxfGqYDQVLhwp89O1NZ5NkABmOczBQ00RF9sCo8e"
);

export default function Payment({ amount, handleClose }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} handleClose={handleClose} />{" "}
    </Elements>
  );
}
