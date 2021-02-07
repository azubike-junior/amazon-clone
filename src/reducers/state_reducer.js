const state_reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state, 
                basket: [...state.basket, action.payload]
            }
        case 'GET_SUBTOTAL':
            const {basket} = state;
            const {total_amount} = basket?.reduce((amount, item) => {
                amount.total_amount += item.price 
                return amount
            }, {total_amount:0});
            return {...state, subtotal: total_amount.toFixed(2)}
        case 'EMPTY_BASKET':
            return {...state, basket:[]}
        case 'REMOVE_ITEM':
            const {id} = action.payload;
            const index = state.basket.findIndex(item => item.id === id)
            let newBasket = [...state.basket];
            if(index >= 0){
                newBasket.splice(index, 1)
            }
            return {...state, basket: newBasket}
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        default: 
            return state
    }
}

export default state_reducer;