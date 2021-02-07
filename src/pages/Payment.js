import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import CheckoutProduct from '../components/CheckoutProduct'
import { useStateContext } from '../context/StateProvider'
import {Link, useHistory} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from '../constant/axios'
import { db } from '../firebase'

function Payment() {
    const {user, basket, subtotal, emptyBasket} = useStateContext()
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory()

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() => {
        const getClientSecret = async  () => {
            const response = await axios ({
                method:'post',
                url: `/payments/create?total=${subtotal * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    }, [basket])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {

            db
               .collection('users')
               .doc(user?.uid)
               .collection('orders')
               .doc(paymentIntent.id)
               .set({
                   basket: basket,
                   amount: paymentIntent.amount,
                   created: paymentIntent.created
               })
            

            setSucceeded(true)
            setError(null);
            setProcessing(false)

            emptyBasket()

            history.replace('/orders')
        })
    }

    const handleChange = (e) => {
        console.log(e)
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '') 
    }

    return (
        <Wrapper>
            <div className="payment__container">
                    <h1>
                        Checkout (<Link to='/checkout'>{basket?.length} items</Link>) 
                    </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123, React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map((item) => (
                            <CheckoutProduct {...item}  />
                            )
                        )}
                    </div>
                </div>

                <div className="payment__section">
                     <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                     <div className="payment__details">
                       <form onSubmit={handleSubmit}>
                           <CardElement onChange={handleChange} />
                           <div className="payment__priceContainer">
                                 <CurrencyFormat 
                                    renderText={(value) => (
                                        <h3>
                                            Order Total: {value}
                                        </h3>
                                    )}
                                    decimalScale={2}
                                    value={subtotal}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}
                                    </span>
                                </button>
                           </div>       
                           {error && <div>{error}</div>}
                       </form>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Payment

const Wrapper = styled.div`
    background: #fff;

    h1{
        text-align: center;
        padding: 10px;
        font-weight: 400;
        background: rgb(234, 237, 237);
        border-bottom: 1px solid lightgrey;
    }

    h1 a {
        text-decoration: none;
    }

    .payment__section {
        display: grid;
        grid-template-columns: 1fr 2fr;
        padding: 20px;
        margin: 0 20px;
        border-bottom: 1px solid lightgray;
    }

    .payment__details {
        form {
            max-width: 400px;
        }
        h3 {
            padding-bottom: 20px;
        }
        button {
            background: #f0c14b;
            border-radius: 2px;
            width: 100%;
            height: 30px;
            border: 1px solid;
            font-weight: bolder;
            margin-top: 10px;
            border-color: #a88734 #9c7e31 #846a29;
            color: #111;
            cursor:pointer;
        }
    }

`