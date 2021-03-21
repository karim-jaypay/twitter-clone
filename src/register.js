import React , {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Header from './header';

function Register() {
    useEffect(()=>{
        if(localStorage.getItem("user-info"))
        {
            history.push("/");
        }
    },[])
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const history = useHistory();
    async function signUp()
    {
        let item={name,password,email}
       let result = await fetch("http://localhost:8000/api/register",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })
        result = await result.json();
        
        localStorage.setItem("user-info",JSON.stringify(result));
        history.push("/");
        
    }
    return(
        <>
        <Header/>
        <div className="col-sm-6 offset-sm-3">
            <h1>Sign up</h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="name"/>
            <br />
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="email"/>
            <br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="password"/>
            <br />
            
            <button onClick={signUp} className="btn btn-primary">Sign up</button>
        </div>
        </>
    )
}
export default Register;