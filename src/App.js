import React, {useEffect} from 'react'
import Navbar from './components/Navbar'
import Submenu from './components/Submenu'
import Home from './pages/Home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import { useStateContext } from './context/StateProvider'
import Payment from './pages/Payment'
import {Elements} from '@stripe/react-stripe-js'
import Orders from './pages/Orders'

function App() {
    const { promise } = useStateContext()

    return (
        <Router>
            <Navbar/>
             <Submenu />
            <Switch>
                <Route exact={true} path='/orders'>
                    <Orders />
                </Route>
                <Route exact={true} path='/checkout'>
                    <Checkout />
                </Route>
                <Route exact={true} path='/payment'>
                    <Elements stripe={promise}>
                        <Payment/>
                    </Elements>
                </Route>
                <Route exact={true} path='/login'>
                    <Login/>
                </Route>
                <Route exact={true} path='/'>
                    <Home/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App