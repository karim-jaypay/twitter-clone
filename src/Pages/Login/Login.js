import React , {useState} from 'react';
import {Link} from 'react-router-dom';
import { TextField } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/actions'

import '../../Styles/login.scss'

import logo from '../../public/logo.png'

export default function Login(props) {

    const { history } = props
    const dispatch = useDispatch()

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    const login = () => dispatch(loginUser({email, password, history}))
      

    const result = useSelector(state => state.auth)

    return(
        <div className="contents">
            <img alt="twitter" src={logo} className="logo"/>
            <h1>Log in to Twitter</h1>
            <div style={{marginTop:20}}>
                <div className="mb-4">
                <TextField className="input-form Muiborder" label="Email, or Username" variant="outlined" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                <TextField className="input-form" label="Password" variant="outlined" type="password" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                {result.message && result.message !== 'success' &&
                    <p style={{color:'red',marginTop:20}}>Incorrect username or password</p>
                }
                <button className="d-block py-3 main__btn--primary w-100" onClick={login}>Login</button>
            
                <p className="mt-5 text-center"><Link to="">Forgot Password?</Link> . <Link to="/welcome">Sign Up for Twitter</Link>
                </p>
            </div>

        </div>
    )
}