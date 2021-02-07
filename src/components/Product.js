import React from 'react'
import styled from 'styled-components'
import { useStateContext } from '../context/StateProvider'

function Product({id, title, price, rating, image}) {
    const {addToBasket, basket } = useStateContext();
  
    return (
        <Wrapper className="wrapper">
        <div className="product__info">
           <p>{title}</p>
           <p className="product__price">
               <small>$</small>
               <strong>{price}</strong>
           </p>
           <div className="product__rating">
               {Array(rating)
                .fill()
                .map((_, i) => (
                <p>🌟</p>
                ))}
           </div>
        </div>

        <img src={image} alt={title} />
        <button onClick={() => addToBasket(id, title, image, price, rating)}>Add to Basket</button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin: 10px;
    padding: 20px;
    width: 100%;
    max-height: 400px;
    min-width: 100px;
    background-color: white;
    z-index: 1;
    cursor:pointer;
    transition: ease-in-out 1s;
    :hover {
        box-shadow: 5px 5px 5px 2px #2e2e2e;
    }

    img {
        max-height:200px;
        width:100%;
        object-fit:contain;
        margin-bottom:15px;
    }

    button {
        background: #f0c14b;
        border: 1px solid;
        margin-top: 10px;
        border-color: #a88734 #9c7e31 #846a29;
        color: #111;
        cursor: pointer;
    }

    .product__price {
        margin-top: 5px;
    }

    .product__rating {
    display: flex;
    }

   .product__info {
    height: 100px;
    margin-bottom: 15px;
    }
`

export default Product
