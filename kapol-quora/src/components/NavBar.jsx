import React from 'react'
import {Nav,Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function NavBar({userPhoto,admin}) {
    return (
        <div >
        <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand  as={Link} to="/" className="logo" style={{color:"cyan"}}>
        
        Kapol Quora
        </Navbar.Brand>
        <img src={userPhoto} alt="Profile Picture" height="40vh" style={{marginRight:20,marginLeft:20,borderRadius:"50%"}} />
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto" />
        
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/ask">Ask A Question</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            {admin===true?(
                <Nav.Link as={Link} to="/admin" >Admin</Nav.Link>
            ):(
                <Nav.Link></Nav.Link>
            )}
            
           </Nav>
        </Navbar.Collapse>
        
        </Navbar>

        </div>
    )
}

export default NavBar
