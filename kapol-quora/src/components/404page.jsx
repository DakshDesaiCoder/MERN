import React from 'react'
import {Link} from 'react-router-dom'
import './errorpage.css'
import {Button} from 'react-bootstrap'
function errorpage() {
    return (
        <div class="main_body">
        <div class="center_body">
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <Button  as={Link} to="/" variant="outline-info" style={{paddingLeft:"10px",borderRadius:"20px",marginRight:"10px"}} >Go To Home</Button>
        </div>
        </div>
    )
}

export default errorpage
