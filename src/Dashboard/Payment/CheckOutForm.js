import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({payment}) => {
  const [clientSecret, setClientSecret] = useState("");
    const [cardError,setCardError]=useState('');
    const stripe = useStripe();
    const elements = useElements();
    const {price}=payment;
// console.log(stripe,elements);
    const handleSubmit=async(event)=>{

        event.preventDefault();
        // console.log(stripe,elements);

        if (!stripe || !elements) {
         
          return;
        }
        const card = elements.getElement(CardElement);
        // console.log(card);
        if (card == null) {
            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
        
          if(error){
            // console.log(error.message);
            setCardError(error.message)
           

          }
          else{
            setCardError('');
          }

       

    }
    console.log(price);
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch('http://localhost:5000/create-payment-intent', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ price }),
      })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setClientSecret(data.clientSecret)
          });
  }, [price]);
    // useEffect(() => {
    //   // Create PaymentIntent as soon as the page loads
    //   fetch("http://localhost:5000/create-payment-intent", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json",
    //     // authorization:`bearer ${localStorage.getItem('token')}`,
    //   },
    //     body: JSON.stringify({ items: [{price}] }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //                 // setClientSecret(data.clientSecret)
    //     });
    // }, [price]);
    
    
    return (
        <>
        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-primary' type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>
      <p>{cardError}</p>
        </>
    );
};

export default CheckOutForm;