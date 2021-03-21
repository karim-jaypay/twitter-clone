import React , {useState,useEffect} from 'react';
import {useHistory,Link} from 'react-router-dom';
import Header from './header';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const history = useHistory();
    const [error,setError] = useState("");
    useEffect(()=>{
        if(localStorage.getItem("user-info"))
        {
            history.push("/Home");
        }
    },[])
    async function login(){
        let item={email,password};
        try{
        let result = await fetch("http://localhost:8000/api/login",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result));
        history.push("/");
    } catch(e){
        setError("Email or password is incorrect");
    }

        
    }
    return(
        <div>
            <Header/>
            <h1>login page</h1>
            <div className="col-sm-6 offset-sm-3" style={{marginTop:20}}>
                <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} className="form-control"/>
                <br/>
                <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} className="form-control"/>
                <br/>
                <button onClick={()=>{login();}} className="btn btn-primary">Login</button>
            <p style={{color:'red',marginTop:20}}>{error}</p>
                <p style={{marginTop:10}}>Don't have an account?
                <Link to="/register" className="text-yellow"> Register</Link>
                </p>
            </div>

        </div>
    )
}

export default Login;