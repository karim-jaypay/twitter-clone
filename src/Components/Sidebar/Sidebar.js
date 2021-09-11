import React from 'react'

import '../../App.css'

import logo from '../../public/twitterlogo.png'
import home from '../../public/home.png'
import explore from '../../public/hashtag.svg'
import user from '../../public/user.svg'
import feather from '../../public/feather.svg'
import profile_picture from '../../public/default.png'

import { getSessionInfo } from '../../storage'

export default function Sidebar(props) {

    const { history } = props
    return (
        <div className="slide">
            <div className="slide-content h-100">
                <img className="slideimage slidepng" src={logo} alt="home"/>
                <img className="slideimage slidepng" src={home} alt="home"/>
                <img className="slideimage slidesvg" src={explore} alt="explore"/>
                <div className="slideimage mb-0" onClick={() => history.push(`/${getSessionInfo('user').username}`)}>
                <img className="slideimage slidesvg" src={user} alt="profile"/>
                </div>
                <div className="tweet-icon slideimage">
                <img src={feather} alt="tweet"/>
                </div>
                <div className="profile-icon slideimage" >
                <img className="profile-image" src={profile_picture} alt="account"/>
                </div>
            </div>
            
        </div>
    )
}
