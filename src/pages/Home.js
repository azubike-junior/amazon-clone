import React from 'react'
import styled from 'styled-components';
import Product from '../components/Product';
import { products } from '../constant/product';
import {Link} from 'react-router-dom'

function Home() {
    return (
       <Wrapper>
            <div className='home__container'>
                <img
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=""
                />

               <div className='home__row'>
                    {products.slice(0, 2).map((product) => {
                        return (
                            <Product key={product.id} {...product}/>
                        )
                    })}
               </div>

                 <div className='home__row'>
                    {products.slice(3, 6).map((product) => {
                        return (
                            <Product key={product.id} {...product}/>
                        )
                    })}
               </div>

               <div className='home__row'>
                    {products.slice(5).map((product) => {
                        return (
                            <Product key={product.id} {...product}/>
                        )
                    })}
               </div>
            </div>
       </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 1500px;

    .home__row {  
        display: flex; 
        z-index: 1; 
        margin-left: 5px;  
        margin-right: 5px;
    }

    .home__image {
        width: 100%;
        z-index: -1;
        margin-bottom: -150px;
        mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));

    }
`

export default Home
