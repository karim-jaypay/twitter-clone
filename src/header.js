import {Navbar,Nav, NavDropdown} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
function Header(){
  let user = JSON.parse(localStorage.getItem('user-info'))
  const history = useHistory();
  function logout(){
   
    localStorage.clear();
    history.push('/register');
    
  }
  return(
        <div>
        <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Twitter Clone</Navbar.Brand>
        <Nav className="mr-auto navbar_wrapper">
          {
            localStorage.getItem('user-info') ?
            <>
               <Link class="link" to="/">Home</Link>
               <Link to="/Search">Explore</Link>
            </>
            :
            <>
               <Link class="link" to="/login">Login</Link>
               <Link class="link" to="/register">Register</Link>
        </>
}
        </Nav>
        {localStorage.getItem('user-info')?
        <>
          <img src={"http://localhost:8000/"+user.profile_picture} width="30" height="30" style={{borderRadius:10}}/>
         <Nav right>
          <NavDropdown title= {user && user.name} alignRight>
          <NavDropdown.Item>
            <Link class="link" to="/profile">Profile</Link>
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        </>
        :null}
      </Navbar>
      </div>
    )
}
export default Header;