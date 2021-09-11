import React, {Suspense, lazy} from 'react'
import {BrowserRouter as Router,Route,Switch, useHistory, Redirect} from 'react-router-dom';

import Profile from './profile';
import Userprofile from './userprofile';
import Search from './Search';

import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';

import { getSessionInfo } from './storage';


const Welcome = lazy(() => import('./Welcome'));
const Login = lazy(() => import('./Pages/Login/Login.js'));
const Home = lazy(() => import('./Pages/Home/Home.js'))



export default function App() {
  console.log(getSessionInfo('LoggedIn'))
  const history = useHistory();

  const Auth = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                 getSessionInfo('LoggedIn') ? (
                  <>
                  <div className="d-flex">
                    <Sidebar {...props}/>
                    <div className="w-50">
                      <Header />
                      <Component {...props} />
                    </div>
                    <div style={{width:'41%',borderLeft:'1px solid #eff3f4'}}></div>
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

    
    

      {getSessionInfo('LoggedIn') === undefined ?
      <>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/welcome" component={Welcome} />
    </Switch>
    <Redirect to="/welcome" />
    </>
    :
    <>
    <Switch>
      <Auth path="/home" component={Home}/>
      <Auth path="/:username" component={Profile}/>
    </Switch>
    <Redirect to="/home"/>
    </>
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
