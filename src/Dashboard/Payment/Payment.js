import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const payment=useLoaderData();
    const {treatmentName,price,day,slot}=payment;
    console.log(stripePromise);
    return (
        <div className='w-1/2'>
            <h1>Payment for {treatmentName}</h1>
            <p>You have to  pay {price} tk for apointmnet on {day} for {slot}</p>
            <div>
            <Elements stripe={stripePromise}>
      <CheckOutForm payment={payment}></CheckOutForm>
    </Elements>
            </div>
        </div>
    );
};

export default Payment;