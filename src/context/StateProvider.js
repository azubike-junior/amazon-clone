import React, {createContext, useContext,useEffect, useReducer} from 'react'
import { auth } from '../firebase';
import reducer from '../reducers/state_reducer';
import {loadStripe} from '@stripe/stripe-js'

export const StateContext = createContext();

const promise = loadStripe('pk_test_zJyCPZKkmo17LCU0Y0cp6L3z00NV3cAzSo')

const initState = {
    basket: [],
    subtotal: 0,
    user:null
}

export const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const addToBasket = (id, title, image, price, rating) => {
        dispatch({type: 'ADD_TO_BASKET', payload: {id, title, image, price, rating}});
    }

    const removeItem = (id) => {
        dispatch({type: 'REMOVE_ITEM', payload: {id}});
    }

    const emptyBasket = () => {
        dispatch({type: 'EMPTY_BASKET'})
    }

     useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if(authUser) {
                dispatch({type:'SET_USER', user: authUser})
            } else {
                dispatch({type: 'SET_USER', user: null})
            }
        })
    }, [])

    useEffect(() => {
        dispatch({type: 'GET_SUBTOTAL'})
    }, [state.basket])

    return (
        <StateContext.Provider value={{...state, addToBasket, removeItem, promise, emptyBasket}}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => {
    return useContext(StateContext)
};