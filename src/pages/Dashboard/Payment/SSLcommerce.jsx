import React, { useContext, useEffect } from 'react';
import useCart from '../../../hooks/useCart';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';

const SSLcommerce = () => {

    const [cart, refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)


    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    // useEffect(() => {
    //     if (totalPrice) {
    //         axiosSecure.post('/create-payment-intent', { price: totalPrice })
    //             .then(res => {
    //                 console.log(res.data.clientSecret);
    //                 setClientSecret(res.data.clientSecret)
    //             })
    //     }
    // }, [axiosSecure, totalPrice])

    const handleCreatePayment = async (e) => {
        e.preventDefault()
        const data = e.target.balance.value
        const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: "",
            date: new Date(), // utc date convert. use moment js
            cartIds: cart.map(item => item._id),
            menuItemIds: cart.map(item => item.menuId),
            status: 'pending',
        }

        const response = await axiosSecure.post('/create-ssl-payment', payment)

        if (response?.data?.gatewayUrl) {
            window.location.replace(response?.data?.gatewayUrl)
        }

        console.log(response);
    }

    return (
        <div>
            <div className="max-w-md mx-auto my-4">
                <form onSubmit={handleCreatePayment} className="flex gap-2">
                    <input
                        type="text"
                        name="balance"
                        placeholder="Enter SSLcommerce transaction id (optional)"
                        className="input input-bordered w-full"
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SSLcommerce;