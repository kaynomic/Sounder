import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
        <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
        <>
            <div className="log-sign-container">
                <div>
                    <NavLink to="/login">Log In</NavLink>
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
        <div className="nav-container">
            <NavLink exact to="/"><i className="fa-brands fa-soundcloud" id="logo"></i></NavLink>
            {isLoaded && sessionLinks}
        </div>
    </>
    )
}

export default Navigation;
