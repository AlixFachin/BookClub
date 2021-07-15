import React from 'react';

const LoginButton = (props) => {
  const signInWithGoogle = () => {
    const provider = new props.firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
  }

  return (

    <button className="authButton" onClick={signInWithGoogle}>Log in</button>
  );
};

export default LoginButton;
