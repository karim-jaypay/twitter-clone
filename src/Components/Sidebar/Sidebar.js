import React from 'react'
import { useLocation } from 'react-router'

import '../../App.css'

import logo from '../../public/twitterlogo.png'
import home from '../../public/home.png'
import explore from '../../public/hashtag.svg'
import feather from '../../public/feather.svg'
import { IoPersonOutline, IoPersonSharp, IoHomeOutline, IoHome } from 'react-icons/io5'

import { getLocalStorage } from '../../storage'


export default function Sidebar(props) {

    const { history } = props

    const location = useLocation()

    const user = getLocalStorage('ui')

    console.log(user)
    return (
        <div className="slide">
            <div className="slide-content h-100">
                <img className="slideimage slidepng" src={logo} alt="home" onClick={() => history.push('/home')} />
                {location.pathname.includes('home') ? 
                    <IoHome className="slideimage slidesvg" style={{width:'27px', height:'27px'}} alt="home"/>
                    :
                    <IoHomeOutline className="slideimage slidesvg" style={{width:'27px', height:'27px'}} alt="home" onClick={() => history.push('/home')}/>
                }
                <img className="slideimage slidesvg" src={explore} alt="explore"/>
                <div className="slideimage mb-0" onClick={() => history.push(`/profile/${user.username}`)}>
                    {location.pathname.includes('profile') ? 
                    <IoPersonSharp className="slideimage slidesvg" style={{width:'27px', height:'27px'}} alt="profile"/>
                    :
                    <IoPersonOutline className="slideimage slidesvg" style={{width:'27px', height:'27px'}} alt="profile"/>
                    }
                </div>
                <div className="tweet-icon slideimage">
                <img src={feather} alt="tweet"/>
                </div>
                <div className="profile-icon slideimage" >
                <img className="profile-image" src={`http://localhost:5000/` + user.picture} alt="account"/>
                </div>
            </div>
            
        </div>
    )
}
