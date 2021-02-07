import React, {useState, useEffect} from 'react'
import { useStateContext } from '../context/StateProvider';
import { db } from '../firebase';
import styled from 'styled-components'
import Order from '../components/Order';

function Orders() {
    const {basket, user} = useStateContext();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if(user) {
            db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created', 'desc')
          .onSnapshot(snapshot => (
              setOrders(snapshot.docs.map(doc => ({
                  id: doc.id,
                  data: doc.data()
              })))
          ))
        }else {
            setOrders([])
        }
    });

    return (
        <Wrapper>
            {!orders && (<h1>No product has been recently ordered.</h1>)}

            <h1>Your Orders</h1>

            <div className="orders_order">
                {orders.map(order => (
                    <Order order={order}/>
                ))}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 20px 80px;

    h1 {
        margin: 30px 0;
    }
`

export default Orders
