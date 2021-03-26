import Header from './header';
import {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';

function Userprofile(props) {

 const name = props.match.params.name;
  
 const [data,setData]=useState([]);
 useEffect(async ()=> {
    let result = await fetch("http://localhost:8000/api/getuser/"+props.match.params.id);
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

export default withRouter(Userprofile);