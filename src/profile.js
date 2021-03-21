import Header from './header';
import {useEffect, useState} from 'react';
function Profile() {
    

    let user = JSON.parse(localStorage.getItem('user-info'))
    const [file,setFile]=useState("");
   async function uploadprofile(){
        console.warn(file);
        const formData = new FormData();
        formData.append('file',file);
        formData.append('email',user.email);
        let result = await fetch("http://localhost:8000/api/uploadProfileImage",{
            method: 'POST',
            body: formData
        });
        alert("Profile picture has been updated!");
    }
    return(
        
        <div>
            <Header />
            <div style={{marginTop:10}}>
            <h5 >{user.name}'s Profile</h5>
            
                <img src={"http://localhost:8000/"+user.profile_picture} width="150" height="150" style={{borderRadius:70}}/>
            
            <br/>
            <input style={{marginTop:40}} type="file" className="form" placeholder="file" onChange={(e)=>setFile(e.target.files[0])}/>
            <br/>
            <button style={{marginTop:20}} onClick={uploadprofile} className="btn btn-primary">Upload Profile Image</button>
            </div>
        </div>
    )
}

export default Profile;