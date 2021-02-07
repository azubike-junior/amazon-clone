import React from 'react'
import styled from 'styled-components'
import CheckoutProduct from './CheckoutProduct'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'

function Order({order}) {
    return (
        <Wrapper>
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format('MMM Do YYYY, h:mma')}</p>
        <p className="order__id">
            <small>{order.id}</small>
        </p>
        {order.data.basket?.map(item => (
            <CheckoutProduct {...item} hideButton/>
        ))}
        <CurrencyFormat 
                renderText={(value) => (
                    <h3 className="order__total">
                       Order total: {value}
                    </h3>
                
                )}
                decimalScale={2}
                value={order?.data.amount / 100}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 40px;
    margin:20px 0;
    border: 1px solid lightgray;
    background: #fff;
    position: relative;

    .order__id {
        position:absolute;
        top: 40px;
        right: 20px;
    }

    .order__total {
        font-weight: 500;
        text-align: right;
    }

`
export default Order
