import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Navbar,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function CreateNav() {
    return (
        <div>
              <Navbar bg="dark" variant="dark">
                    <Nav.Link as={Link} to="/" style={{color:'white'}} ><ArrowBackIcon /></Nav.Link>
                    <Navbar.Brand>New Room</Navbar.Brand>
                </Navbar>
        </div>
    )
}

export default CreateNav
