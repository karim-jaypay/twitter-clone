import React, {Suspense, lazy, useContext, useCallback, useEffect } from 'react'
import {BrowserRouter as Router,Route,Switch, useHistory, Redirect} from 'react-router-dom';

import axios from 'axios'

import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';

import { getLocalStorage } from './storage';
import { TweetLoader } from './Context/loader';

import { Logout } from './Pages/Logout/Logout'

const Welcome = lazy(() => import('./Welcome'));
const Login = lazy(() => import('./Pages/Login/Login.js'));
const Home = lazy(() => import('./Pages/Home/Home.js'))
const Profile = lazy(() => import('./Pages/Profile.js'))





export default function App() {

  const history = useHistory();

  const userInfo = getLocalStorage('ui')

  const verifyUser = useCallback(() => {

    axios.post("http://localhost:5000/register/refreshToken", {
      withCredentials: true,
    }).then(response => {
 
      if (response.data.success) {
        localStorage.setItem('ui', response.data.data)
      }
       else if(response.success) {
        localStorage.setItem('ui', response.data)
      } 
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000)
    }).catch(error => {
      if(error) {
        localStorage.clear()
        if(userInfo) window.location.reload(false)
      }
    })
  }, [])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  /* console.log(token) */

  const Auth = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                 userInfo ? (
                  <>
                  <div className="d-flex">
                    <Sidebar {...props}/>
                    <div className="w-50">
                      <Header />
                      <Component {...props} />
                    </div>
                    <div style={{width:'41%',borderLeft:'1px solid #eff3f4'}}>
                      <Logout {...props} />
                    </div>
                  </div>
                        
                  </>
                )  : (
                        <Redirect to="/welcome" />
                    ) }
        />
        
    );
};

  return (
  <Router history={history}>
    <Suspense fallback={''}>
      <Switch>

      {!userInfo ?
      <>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/welcome" component={Welcome} />
    </Switch>
    <Redirect to="/welcome" />
    </>
    :
    <TweetLoader>
        <Switch>
          <Auth path="/home" component={Home}/>
          <Auth path="/profile/:username" component={Profile}/>
          <Redirect to="/home" />
        </Switch>
      
    </TweetLoader>
    }
     

      {/* <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/userprofile/:id">
        <Protected Cmp={Userprofile}/>
      </Route>
      <Route path="/Search">
        <Protected Cmp={Search}/>
      </Route> */}
      {/* <Route path="/">
        <Protected Cmp={Home}/>
      </Route> */}
      </Switch>
      
      </Suspense>
      </Router>
  )
}
