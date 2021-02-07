import React from 'react'
import styled from 'styled-components'
import { useStateContext } from '../context/StateProvider';
import FlipMove from 'react-flip-move';

function CheckoutProduct({id, image, title, price, rating, hideButton}) {
    const {removeItem} = useStateContext();
    return (
        <Wrapper>
            <img className='checkoutProduct__image' src={image} alt="" />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                     {Array(rating)
                    .fill()
                    .map((_, i) => (
                    <p>🌟</p>
                    ))}
                </div>
                {!hideButton && (<button onClick={()=> removeItem(id)}>Remove from basket</button>)}
                
            </div>
        </Wrapper>
    )
}

 export default CheckoutProduct

const Wrapper = styled.div`
    display:flex;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;

    .checkoutProduct__info {
        padding-left: 20px;

        button {
            background: #f0c14b;
            border: 1px;
            margin-top: 10px;
            border-color:#a88734 #9c7e31 #846a29;
            color: #111;
        }
    }

    .checkoutProduct__image {
        object-fit: contain;
        width: 180px;
        height:  180px;
    }

    .checkoutProduct__rating {
        display: flex;
    }

    .checkoutProduct__title {
        font-size: 17px;
    }

`