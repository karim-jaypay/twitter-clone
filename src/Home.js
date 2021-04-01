import Header from './header';
import {useEffect, useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
function Home() {
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem('user-info'));
    const name = user.name;
    const tweetid = user.id;
    const [text,setText]=useState("");
    const [data,setData] = useState([]);
    const [usernotfollowed,setUsernotfollowed] = useState([]);
    useEffect( ()=>{
        getuser_notfollowed();
       gettweets();
    },[])
   // console.warn("result2",data);
   async function tweet(){
       // console.warn(name);
        let item={tweetid,name,text}
       let result = await fetch("http://localhost:8000/api/tweet",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })
       // alert("tweet uploaded!");
       // history.go(0);
       gettweets();
    }
    async function deletetweet(id)
    {
            let result = await fetch("http://localhost:8000/api/delete/"+id,{
              method:'DELETE'  
    });
    result = await result.json();
//console.warn(result);
gettweets();
    }
    async function gettweets()
    {
        let result2 = await fetch("http://localhost:8000/api/gettweets/"+user.id);
        result2 = await result2.json();
        setData(result2);
    }
    async function getuser_notfollowed(id)
{
    let result = await fetch("http://localhost:8000/api/getuser_notfollowed/"+user.id);
        result = await result.json();
        setUsernotfollowed(result);

}
    return(
        
        <div>
            <Header />
            <div style={{marginTop:10}}>
            <h5 style={{}}>Home</h5>
            
            <div style={{display:'flex',justifyContent:'center'}}>
            <img src={"http://localhost:8000/"+user.profile_picture} width="30" height="30" style={{borderRadius:10}}/>
            <textarea style={{marginLeft:10,}} rows='5' cols='50' onChange={(e)=>setText(e.target.value)} value={text} placeholder="What's on your mind?"/>
            </div>
            <div style={{marginTop:10}}>
            <button onClick={tweet} class="btn btn-primary">Tweet</button>
            </div>
            <hr/>
            <div style={{}}>
                <div style={{position:'absolute',left:'auto',border:'0.5px solid lightgrey', width:'23%',height:'100%',backgroundColor:'white',borderTopColor:'white'}}>
                    <h4 style={{color:'grey'}}>Who to follow</h4>
                    {
                        usernotfollowed.map((item)=>
                        <div>
                            <div style={{display:'flex',justifyContent:'center',marginTop:30}}>
                            <Link to={"userprofile/"+item.id} >
                            <img src={"http://localhost:8000/"+item.profile_picture} width="30" height="30" style={{borderRadius:10}}/>
                            </Link>
                            <p style={{marginLeft:10,fontWeight:'bold'}}>{item.name}</p>

                            </div>

                        </div>
                        )
                        
                    }
                </div>
                {
                    data.map((item)=>
                    <div style={{}}>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        { user.name == item.name ?
                        <Link to="/profile">
                            <img src={"http://localhost:8000/"+item.picture} width="30" height="30" style={{borderRadius:10}}/>
                    </Link>
                            :
                    <Link to={"userprofile/"+item.tweet_id} >
                    <img src={"http://localhost:8000/"+item.picture} width="30" height="30" style={{borderRadius:10}}/>
                    </Link>
                      }
                    <p style={{marginLeft:10,fontWeight:'bold'}}>{item.name}</p>
                    {
                        user.name == item.name ?
                        <div style={{position:'absolute',right:20}}><span onClick={()=>deletetweet(item.id)} style={{color:'red',backgroundColor:'white',borderRadius:5,padding:5,cursor: 'pointer'}}>Delete</span></div>
                            :
                            <></>
                        
                    }
                    <br/>
                    </div>
                    <div style={{}}>
                    <p style={{marginLeft:30}}>{item.text}</p>
                    </div>
                    
                    <hr style={{width:'200%'}}/>
                    </div>
                    
                    )
                }
            </div>
            </div>
        
        </div>
    )
}

export default Home;