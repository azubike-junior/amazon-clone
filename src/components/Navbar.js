import React from 'react'
import styled from 'styled-components'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {BsSearch} from 'react-icons/bs'
import HeaderItems from './HeaderItems'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <Wrapper>
            <Link to='/'>
                <img 
                className="header-logo"
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
            </Link>
            <div className='header-location'>
                <LocationOnIcon className="location-icon"/>
                <span className="location-title"> Deliver to <br/>
                <h3 className="location-place">Nigeria</h3>
                </span>
            </div>

            <div className="header-search">
                <input 
                className="header-searchInput"
                type="text" />
                <BsSearch className="header-searchIcon"/>
            </div>
            <HeaderItems/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    height:60px;
    background-color:#131921;
    align-items: center;
    position:sticky;
    top:0;
    z-index:100;

    .header-logo {
        object-fit:contain;
        width:100px;
        margin: auto 12px;
        margin-top: 20px;
    }
    .header-location{
        display:grid;
        align-items:center;
        width:100px;
        margin: auto 8px;
        grid-template-columns: auto 1fr;
        /* padding: 0.5rem; */
        .location-icon{
            padding:0.3rem;
            margin-top:7px;
            font-size: 1.3rem;
            color: #fff !important;
        }
        .location-title {
            font-size:12px;
            color: #bdc9d9;
        }
        .location-place {
            color: #fff;
        }  
    }
    .header-search{
        display:flex;
        flex:1;
        align-items: center;
        border-radius: 5px;
    }
    .header-searchInput {
        padding:9px;
        width:95%;
        border:none;
        border-radius: 5px;
    }
    .header-searchIcon{
        padding: 10px;
        background:#d3883d;
    }

`

export default Navbar
