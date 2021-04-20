import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Header from './header';
import {BrowserRouter,Route,Switch, RouteComponentProps} from 'react-router-dom';
import Login from './login';
import Register from './register';
import Home from './Home';
import Protected from './Protected';
import Profile from './profile';
import Userprofile from './userprofile';
import Search from './Search';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/userprofile/:id">
        <Protected Cmp={Userprofile}/>
      </Route>
      <Route path="/Search">
        <Protected Cmp={Search}/>
      </Route>
      <Route path="/">
        <Protected Cmp={Home}/>
      </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;