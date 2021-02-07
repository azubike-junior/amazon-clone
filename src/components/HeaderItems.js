import React from 'react'
import styled from 'styled-components'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/StateProvider';
import { auth } from '../firebase';

function HeaderItems() {
    const {basket} = useStateContext();
    const {user} = useStateContext()

    const handleAuthentication = () => {
        if(user) {
            auth.signOut();
        }
    }
    return (
         <Wrapper>
                <div className="header-option">
                    <Link to={!user && '/login'}>
                    <span onClick={handleAuthentication} className="option_one">Hello {user ? user.email : 'Guest'}, {user ? 'sign out' : 'sign in' } </span>
                    </Link>
                    <span className="option_two">account & lists</span>
                </div>
                 <div className="header-option">
                     <Link to='/orders'>
                    <span className="option_one">returns </span>
                    <span className="option_two">& Orders</span>
                    </Link>
                </div>
                <Link to='/checkout'>
                 <div className="header-option">
                     <span className="option_three">
                        <span className="option_three_item1">
                        <ShoppingCartIcon className='option_three_icon'/> 
                        <span className='option_three_amount'>{basket?.length}</span>
                        </span>
                        <span className="option_three_item2">Cart</span>
                     </span>
                </div>
                </Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
        display:flex;
        justify-content: space-evenly;

    .header-option{
       display:flex;
       flex-direction:column;
       margin-left:10px;
       margin-right: 10px;
       color: #fff;
       a {
           text-decoration: none;
       }
       .option_one{
           font-size:11px;
           text-transform:capitalize;
           color: #fff;
       }
        .option_two{
           font-size:13px;
           font-weight:800;
           text-transform: capitalize;
           color: #fff; 
       }
       .option_three{
        display:grid;
        grid-template-columns: 1fr 30px;
        justify-content: space-between;
        .option_three_item1{
    
            .option_three_icon{
                font-size:2.3rem;
                 position: relative;
                 display:flex;
                 align-items:center;
            }
            .option_three_amount{
                position:absolute;
                top:-1px;
                right:29px;
                padding:2px;
                color:#fff;
                background:#d3883d;
                width: 3px;
                height: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                font-size: 0.75rem;
                padding: 12px;
            }
        }
        .option_three_item2{
            margin-top:0.9rem;
            font-size:13px;
            font-weight:800;
        }
       }
    }
`

export default HeaderItems
