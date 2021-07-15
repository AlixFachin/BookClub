import React from 'react';
import LoginButton from './login-button';
import LogoutButton from './logout-button';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthenticationButton = () => {
  const isAuthenticated  = false; // TODO AUTH HERE
  console.log(`Auth context: ${isAuthenticated}`);
  return isAuthenticated? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
