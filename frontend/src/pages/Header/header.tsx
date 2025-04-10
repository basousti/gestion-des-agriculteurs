import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Header=()=> {
  //localStorage is a place inside your web browser where your website can save small pieces of data and never forget
  const token = localStorage.getItem("token");
  const navigate= useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/login1");
    
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
          <img
              alt=""
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            AgroMap</Navbar.Brand>
            
          <Nav className="justify-content-end">
            {token ? (
              <>
              <Nav.Link as={Link} to="/DashboardA" className='nav-link '>Dashboard</Nav.Link>
              <Nav.Link className='nav-link' onClick={handleLogout}>Logout</Nav.Link>
              
              </>
            ) :(
            <>
              <Nav.Link as={Link} to="/login" className='nav-link'>Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className='nav-link'>SignUp</Nav.Link>
              </>
            )}

          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
