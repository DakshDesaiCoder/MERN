import React from 'react'
import './Header.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import IconButton from '@material-ui/core/IconButton';
function Header() {
    return (
        <div className="header">
            <IconButton>
                <AccountCircleIcon fontSize="large" className="header__icon" />
            </IconButton>
            <img className="header__logo" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/338_Tinder_logo-512.png" alt="" />
            <IconButton>
                <ForumRoundedIcon fontSize="large" className="header__icon" />
            </IconButton>
        </div>
    )
}

export default Header
