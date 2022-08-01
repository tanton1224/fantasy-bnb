import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
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
  };

  return (
    <>
      <button className="menu-button" onClick={openMenu}>
        <i className="fa-solid fa-bars fa-lg"></i>
        <i className="fa-solid fa-circle-user fa-2xl"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="profile-dropdown-item">{`${user.firstName} ${user.lastName}`}</div>
          <div className="profile-dropdown-item">{user.username}</div>
          <div className="profile-dropdown-item">{user.email}</div>
          <div className="pro-drop-button" onClick={logout}>Log Out</div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
