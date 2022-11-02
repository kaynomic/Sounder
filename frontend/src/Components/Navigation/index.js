import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from './ProfileButton';
import LoginFormModal from "../LoginFormModal";
import './Navigation.css';
import logo from '../../images/sc-logo.png';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <div className="logged-in-nav">
                <ProfileButton user={sessionUser} />
                <NavLink to="/songs">All Songs</NavLink>
                <NavLink to="/albums">All Albums</NavLink>
            </div>
        );
    } else {
        sessionLinks = (
            <>               
            <div className="nav-container">
                <div>
                    <NavLink exact to="/"><img src={logo} alt="sc-logo" className="sc-logo"></img></NavLink>
                </div>
                <div>
                    <NavLink to="/" className="login-button"><LoginFormModal /></NavLink>
                </div>
                <div>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
            </div>
            </>
        );
    }

    return (
    <>
        <div>
            {isLoaded && sessionLinks}
        </div>
    </>
    )
}

export default Navigation;
