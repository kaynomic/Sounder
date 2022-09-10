import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import "./Navigation.css";
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    history.push("/me");
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push("/");
  };

  return (
    <>
      <div className="outer">
        <button className="dropdown-button" onClick={openMenu}>
          <i className="fa-brands fa-soundcloud"></i>
        </button>
        {showMenu && (
          <ul className="profile-dropdown" style={{zIndex: 1000}}>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
