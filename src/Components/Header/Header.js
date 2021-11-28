import { Navbar } from 'react-bootstrap';

import '../../App.css'
export default function Header({ headerTitle, back, history }){
  
  return(
        <div className="header px-4">
        <Navbar >
        <Navbar.Brand href="/home" className="d-flex">
          {back &&
          <div style={{width: '7%'}} >
            <img onClick={() => history.goback()} src={'/left-arrow.svg'} alt="" style={{width: '50%'}}/>
          </div>
          }
          <span style={{fontWeight:'bold'}}>{headerTitle ? headerTitle : 'Home'}</span>
        </Navbar.Brand>
      </Navbar>
      </div>
    )
}
