import React from 'react'
import styled from 'styled-components';
import { menus } from '../constant/menu';
import {GiHamburgerMenu} from 'react-icons/gi'

function Submenu() {
    return (
        <Wrapper>
            
          <div className="menu_one"> 
           
             <span className="menu_item"> <span className='menu_icon'><GiHamburgerMenu/></span>  All</span>
            {menus.map((menu, index) => {
                return (
                   <span className="menu_item" key={index}>
                       {menu}</span>
                )
            })}
          </div>

          <div className="menu_two">
              <span className="menu_item">Amazon's response to covid-19</span>
          </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  background:#2a2a2a;
  height:40px;
  display:flex;
  justify-content: space-between;
  align-items: center;

  .menu_item{
   padding: 0 0;
   margin: 0 0.5rem;
   color:#fff;
   font-size:14px;
   font-weight:600;
   align-items:center;
  };

  .menu_icon{
      font-size:20px;
      padding:0px;
      margin-left:10px;
      color: #fff;
      text-align: center;
  }

  .menu_two{
      margin-right:10px;
  }
`

export default Submenu
