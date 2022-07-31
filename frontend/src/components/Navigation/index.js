import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignUpFormPage';
import { demoLogin } from '../../store/session';
import logo from '../../images/Airbnb_Logo.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [ showMenu, setShowMenu ] = useState(false)
  const dispatch = useDispatch();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='not-signed-in'>
        <button className='demo-login-button' onClick={() => {
          dispatch(demoLogin())
          }} >Demo User Login</button>
        <button className='menu-button' onClick={() => setShowMenu(!showMenu)}>
          <i className="fa-solid fa-bars"></i>
          <i className="fa-solid fa-circle-user"></i>
        </button>
        {showMenu && (
          <>
            <LoginFormModal />
            <SignupFormModal />
          </>
        )}
      </div>
    );
  }

  return (
    <div className='nav-container'>
      <div className='nav-bar-container'>
        <div className='nav-bar'>
          <div className='nav-bar-left'>
            <NavLink exact to="/"><img className='logo' src={logo} /></NavLink>
          </div>
          <div className='nav-bar-right'>
            <div className='create-spot-button-container'>
              {sessionUser &&
                <NavLink to='/spots/new'>
                  <button>Become a Host</button>
                </NavLink>
              }
            </div>
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>
      <div className='nav-bar-bar'></div>
    </div>
  );
}

export default Navigation;
