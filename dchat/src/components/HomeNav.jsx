import React from 'react'
import {Navbar,Button,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {auth} from '../firebase'
function HomeNav({userPhoto}) {
    function googleSignout() {
        auth.signOut()
       
        .then(function() { window.location.reload(true);
        }, function(error) {
           console.log('Signout Failed')  
        });
     }
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>
                <img
                    alt=""
                    src={userPhoto}
                    width="30"
                    height="30"
                    style={{borderRadius:"50%"}}
                    className="d-inline-block align-top"
                />{' '}
                DChat</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto" style={{marginLeft:'10px',marginRight:"10px"}}>
                        <Nav.Link as={Link} to="/new" style={{marginRight:"10px",marginLeft:"10px"}}>Add New Room</Nav.Link>
                        <Button variant="outline-info" onClick={googleSignout} >LogOut</Button>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
        </div>
    )
}

export default HomeNav
