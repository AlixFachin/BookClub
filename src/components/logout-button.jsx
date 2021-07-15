import React from 'react';

const LogoutButton = (props) => {
  // const {logout} = useAuth0();
  // TO DO AUTH0 STUFF -> logout redirect function
  const logout = () => {
    props.auth.signOut()
  }
  
  return (
    <button className="authButton" onClick={ logout }>
    Log out</button>
  );
};

export default LogoutButton;
