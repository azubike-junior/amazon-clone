import React, {forwardRef} from 'react'
import styled from 'styled-components'
import CheckoutProduct from '../components/CheckoutProduct'
import Subtotal from '../components/Subtotal'
import { useStateContext } from '../context/StateProvider';
import FlipMove from 'react-flip-move';

function Checkout() {
    const {basket} = useStateContext();
    const CheckProduct = forwardRef((item, ref) => {
       return ( 
       <div ref={ref}>
           <CheckoutProduct {...item}/>
        </div>)
    })
    return (
        <Wrapper>
            <div className='checkout__left'>
                <img 
                    className='checkout__ad' 
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="ad_image" />

                <div className="check__title">
                    <h2>Your shopping Basket</h2> 
                </div>
                
                {basket?.length <= 0 ? <div className="empty__basket"><h4>your basket is empty</h4></div> :  
                basket.map(item => {
                        return (
                        <FlipMove
                            enterAnimation="elevator" leaveAnimation="elevator"
                        >
                         <CheckProduct key={item.id} {...item} />
                         </FlipMove>
                        )
                    }) }
            </div>

            <div className="checkout__right">
               <Subtotal />
            </div>
        </Wrapper>
    )
}

export default Checkout

const Wrapper = styled.div`
    display:flex;
    padding: 20px;
    background: #fff;
    height: max-content;

    .checkout__ad {
        width:100%;
        margin-bottom: 10px;
    }

    .check__title {
        margin-right: 10px;
        padding: 10px;
        border-bottom: 1px solid lightgrey;
    }

    .empty__basket {
        text-align: center;
        padding: 20px;
        margin-top:30px;
        color: #556f7d;
        border: 0.5px solid #ccc;
        border-radius: 2px;
    }
`