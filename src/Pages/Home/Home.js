import React, {useContext, useEffect, useState} from 'react';

import {Button} from 'react-bootstrap';
import {IoHeartOutline,IoHeart,IoChatbubbleEllipsesOutline} from 'react-icons/io5';
import { TextareaAutosize } from '@material-ui/core';

import user from '../../public/user.svg'
import image from '../../public/image.svg'
import gif from '../../public/gif.svg'
import poll from '../../public/poll.svg'
import emoji from '../../public/happy.svg'
import profile_picture from '../../public/default.png'

import { createTweet } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { tweetContext } from '../../Context/loader';

export default function Home(props) {

    /* dispatch */
    const dispatch = useDispatch()
    /* get history */
    const { history } = props
    /* get contexts*/
    const { loader, changeLoader } = useContext(tweetContext)
    console.log(loader)

    /* states */
    const [tweet, setTweet] = useState()

  
    /* on change */
    const handleChange = (e) => {
        const { name, value } = e.target
        setTweet({...tweet, [name]: value})

    }

    /* tweet button function */
    const tweetAction = () => {
        changeLoader(true)
        dispatch(createTweet({user_id: user.id, text: tweet.text, history, changeLoader}))
    }
    
   /*  if(!localStorage.getItem('user-info')) history.push('/register')
    let user = JSON.parse(localStorage.getItem('user-info'));
    const name = user.name;
    const tweetid = user.id;
    const [text,setText]=useState("");
    //const [textcomment,setTextcomment]=useState("");

    const [data,setData] = useState([]);
    const [usernotfollowed,setUsernotfollowed] = useState([]);
    const [inputHidden,setinputHidden]= useState({});

    const [isliked,setisLiked]=useState({});
    const [getComment,setgetComment]=useState([]);



    useEffect( ()=>{
        getlike();
        getuser_notfollowed();
       gettweets();
    },[])

   async function tweet()
   {
    let item={tweetid,name,text}
       let result = await fetch("http://localhost:8000/api/tweet",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })
       gettweets();
    }

    async function deletetweet(id)
    {
            let result = await fetch("http://localhost:8000/api/delete/"+id,{
              method:'DELETE'  
            });
            result = await result.json();

            gettweets();
    }

    async function gettweets()
    {
        let result2 = await fetch("http://localhost:8000/api/gettweets/"+user.id);
        result2 = await result2.json();
        setData(result2);
    }

    async function getuser_notfollowed()
    {
    let result = await fetch("http://localhost:8000/api/getuser_notfollowed/"+user.id);
        result = await result.json();
        setUsernotfollowed(result);

    }

    async function like(tweet_id)
    {
        let item ={tweet_id};
        let result = await fetch("http://localhost:8000/api/like/"+user.id,{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        });
        
        getlike();
        gettweets();
    
    }
    async function getlike()
    {
        let result = await fetch("http://localhost:8000/api/getlike/"+user.id);
        result = await result.json();
        setisLiked(result);
       
    }
    async function deletelike(tweet_id)
    {
        let result = await fetch("http://localhost:8000/api/deletelike/"+user.id+"/"+tweet_id,{
              method:'DELETE'  
            });
            result = await result.json();

            getlike();
            gettweets();
    }
    async function comment(tweet_id)
    {
        let item = {text};
        let result = await fetch("http://localhost:8000/api/comment/"+tweet_id+"/"+user.id,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        gettweets();
    }
    async function getcomment(tweet_id)
    {
        let result = await fetch("http://localhost:8000/api/getcomment/"+tweet_id);
        result = await result.json();
        setgetComment(result);

    }
    async function deletecomment(id)
    {
        let result = await fetch("http://localhost:8000/api/deletecomment/"+id,{
              method:'DELETE'  
            });
            result = await result.json();

           // getlike();
            gettweets();
    }
     function toggleinput(id)
    {
      //  setinputHidden(!inputHidden);
      setinputHidden(previnputHidden => ({
          ...previnputHidden,
          [id]: !previnputHidden[id]
      }));
    } */
    //const inputClass = inputHidden ? 'hide' : '';
//console.warn(getComment);
    return(
        <div>
            <div className="tweet-box">
                <div className="d-flex">
                    <img className="profile-image mb-auto" src={profile_picture} alt="profile picture" />
                    <TextareaAutosize className="ml-2 mt-2 text_area" name="text" onChange={handleChange} aria-label="empty textarea" placeholder="What's Happening" />
                
                </div>
                <div className="image-tweet">
                    <div className="d-flex tweet-options">
                        <img width="20" height="20" src={image} alt="upload image" />
                        <img width="20" height="20" src={gif} alt="upload gif" />
                        <img width="20" height="20" src={poll} alt="upload poll" />
                        <img width="20" height="20" src={emoji} alt="upload emoji" />
                    </div>
                    <Button className="d-block py-1 px-3 ml-auto tweet_btn" onClick={tweetAction} disabled={(!tweet || !tweet.text) ? true : false}>Tweet</Button>

                </div>
            </div>

            <div style={{borderBottom:'1px solid #eff3f4', cursor:'pointer'}}>
                <div className="p-3">
                    <div className="d-flex">
                        <div style={{width:'10%', textAlign:'center'}}>
                            <img className="profile-image" src={profile_picture} alt="user profile" />
                        </div>
                        <div className="ml-2">
                            <div className="d-flex">
                                <div style={{fontWeight:'bold'}}>karim darakji</div>
                                <div style={{marginLeft:'3px'}}>@karimdarakji . 14h</div>
                            </div>
                            <div className="mb-2">my first tweet</div>
                            <div className="d-flex mb-2" style={{justifyContent:'space-between'}}>
                                <div>
                                    <IoChatbubbleEllipsesOutline />
                                </div>
                                <div>
                                    <IoHeartOutline style={{color:'red'}} />
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            {/* 
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
                    <div style={{}}>
                        <div style={{display:'inline'}}>
                            <Button variant="light" size='sm' onClick={()=>{toggleinput(item.id);getcomment(item.id);}}>
                            <IoChatbubbleEllipsesOutline style={{marginBottom:5}}/>
                            <span>{item.comments}</span>
                                </Button>

                        </div>
                        { 
                        //item.id == 
                        isliked.indexOf(item.id) >-1 == true ?
                        <Button variant="light" size='sm' onClick={()=>deletelike(item.id)}>
                            <div style={{color:'red',marginBottom:5}}>
                    <IoHeart />
                    </div>
                    </Button>
                    :
                    <Button variant="light" size='sm' onClick={()=>like(item.id)}>
                    <IoHeartOutline style={{color:'red',marginBottom:5}} />
                    </Button>
                     }
                    <span style={{marginLeft:10}}>{item.likes}</span>
                        
                    </div>
                    {  inputHidden[item.id] ?
                    <div>
                        <p style={{color:'grey',marginTop:5,marginRight:100}}>Replies:</p>
                 {   getComment.map((itemm, index)=>
                    item.id == itemm.tweet_id ?
                 <div>
                     
                    <img src={"http://localhost:8000/"+getComment[index].profile_picture} width="30" height="30" style={{borderRadius:10}}/>

                     <span style={{fontWeight:'bold',marginLeft:5}}>{getComment[index].name}</span>
                     {
                         user.name == itemm.name ?
                         <div style={{position:'absolute',right:20}}><span onClick={()=>deletecomment(itemm.id)} style={{color:'red',backgroundColor:'white',borderRadius:5,padding:5,cursor: 'pointer'}}>Delete</span></div>
                             :
                             <></>
                     }
                    <p>{getComment[index].text}</p>
                    </div>
                    : null
                 )}
                 {//   <></>
                   //  ) }
                
                    // {inputHidden[item.id] ?
                }
                    <input type="text" id={item} onChange={(e)=>setText(e.target.value)}/>
                
                    
                   
                
                    <Button variant="light" onClick={()=>{comment(item.id);}} className="btn btn-primary"><span style={{color:'#0693E3'}}>reply</span></Button> 
                    </div>
                    : null
            }
                    <hr style={{width:'200%'}}/>
                   
                    </div>
                    
                    )
                }
            </div> */}
        
        </div>
    )
}
