import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import { useStateContext } from '../context/StateProvider';
import { auth } from '../firebase';


function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({msg:''})
    const {user} = useStateContext()

    console.log(error.msg)

    const mapError = ( msg='') => {
        return setError({msg})
    }

    const signIn = e => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
             .then((auth) => {
                history.push('/')
            })
            .catch(e => mapError(e.message));
    }

    const register = e => {
        e.preventDefault()
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push('/')
            })
            .catch(e => mapError(e.message));
    }

    return (   
        <Wrapper>
            <Link to='/'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'  alt="Amazon" className="login__logo" />
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>
                    {error.msg && (<p className="alert">{error.msg}</p>)}
                <form>
                    <h5>E-mail</h5>
                    <input 
                    type="text" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <h5>password</h5>
                    <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                     />

                    <button 
                        onClick={signIn} className="login__signinButton">sign in</button>
                </form>
                 <p>
                By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
            <button 
                className="login__registerButton" 
                onClick={register}> Create your Amazon Account</button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;

    .login__logo {
        width: 100px;
        object-fit: contain;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .alert {
        color:red;
        padding-bottom:5px;
    }

    .login__container{
        width: 300px;
        display: flex;
        flex-direction: column;
        height: fit-content;
        padding: 20px;
        border: 1px solid lightgrey;
        border-radius: 5px;

        h1{
            align-self: center;
            font-weight:500;
            margin-bottom: 15px;
        }

        h5 {
            margin-bottom: 10px;
        }

        input {
            height: 30px;
            margin-bottom: 10px;
            background-color: white;
            width: 98%;
        }
        .login__signinButton{
            background: #f0c14b;
            border-radius: 2px;
            width: 100%;
            height: 30px;
            border: 1px solid;
            margin-top: 10px;
            border-color: #a88734 #9c7e31 #846a29;
        }

        p {
             margin-top: 15px;
            font-size: 12px;
        }

        .login__registerButton{
            border-radius: 2px;
            width: 100%;
            height: 30px;
            border: 1px solid;
            margin-top: 10px;
            border-color: darkgray;
        }
    }
`

export default Login
