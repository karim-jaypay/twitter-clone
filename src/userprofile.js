import Header from './header';
import {useEffect, useState} from 'react';
//import React from 'react';
//import props from 'prop-types';

function Userprofile(props) {
    

   // let user = JSON.parse(localStorage.getItem('user-info'))
    //const [file,setFile]=useState("");
 // const {user} = props.location.aboutProps;
 const name = props.match.params.name;
  

// const picture = props.match.params.picture;
 //.warn(picture);
 const [data,setData]=useState([]);
 useEffect(async ()=> {
     let item={name};
    let result = await fetch("http://localhost:8000/api/getuser",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })
     result = await result.json();
     setData(result);
 },[])
    return(
        
        <div>
            <Header />
            <div style={{marginTop:10}}>
            <h5 >{data.name}'s Profile</h5>
            
                <img src={"http://localhost:8000/"+data.profile_picture} width="150" height="150" style={{borderRadius:70}}/>
            
            <br/>
            </div>
        </div>
    )
}

export default Userprofile;