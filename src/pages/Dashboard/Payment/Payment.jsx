import React, { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import SSLcommerce from './SSLcommerce';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const [method, setMethod] = useState('stripe'); // 'stripe' or 'sslcommerce'

    return (
        <div>
            <SectionTitle heading={"payment"} subHeading={"Please Pay to eat"}></SectionTitle>

            <div className="max-w-md mx-auto my-4">
                <label className="label"><span className="label-text">Choose Payment Method</span></label>
                <select
                    value={method}
                    onChange={e => setMethod(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="stripe">Stripe</option>
                    <option value="sslcommerce">SSLcommerce</option>
                </select>
            </div>

            <div>
                {method === 'stripe' ? (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                ) : (
                    <div className="mt-6">
                        <h2 className='mt-4 font-bold text-xl text-center'>SSLcommerce</h2>
                        <SSLcommerce />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;