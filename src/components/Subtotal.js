import styled from 'styled-components'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useStateContext } from '../context/StateProvider'
import {useHistory} from 'react-router-dom'

function Subtotal() {
    const {basket, user, subtotal} = useStateContext();
    console.log('========subtotal', subtotal)
    const history = useHistory()
    return (
        <Wrapper>
            <CurrencyFormat 
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket?.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={subtotal}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
            />

            <button onClick={e => user ? history.push('/payment') : history.push('/login')}> {user ? 'Proceed to Checkout' : 'Login to Continue'}</button>
        </Wrapper>
    )
}

export default Subtotal

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    height:100px;
    padding: 20px;
    background: #f3f3f3;
    border: 1px solid #dddddd;
    border-radius: 3px;

    .subtotal__gift{
        display: flex;
        align-items: center;
    }

    button {
        background: #f0c14b;
        border-radius: 2px;
        width:100%;
        height: 30px;
        margin-top:10px;
        border-color: #a88734 #9c7e31 #B46a29;
        color: #111;
        cursor: pointer;
    }
`