import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from './login-button.jsx';
import LogoutButton from './logout-button.jsx';

function AuthHeader(props) {
  const {user, isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return (<header className="App-header">
      <p> loading user parameters... </p>
    </header>);
  }

  if (isAuthenticated) {
    // console.log(`User=${JSON.stringify(useAuth0())}`);
    return (<header className="App-header">
      <p>Welcome to Book Club {user.name}!  </p>
      <div className="authBox"> <LogoutButton /> </div>
    </header>);
  }

  return (<header className="App-header">
    <p>Welcome to the Book Club! Please login or signup </p>
    <div className="authBox"> <LoginButton /> </div>
  </header>);
};

export default AuthHeader;


