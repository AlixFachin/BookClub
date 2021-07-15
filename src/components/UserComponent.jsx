import React from 'react';
import PropTypes from 'prop-types';
import '../styles/UserComponent.css';

function UserComponent(props) {
  if (props.user) {
    return (
      <div className={"userComponent panel" + (props.className ? " " + props.className : "" )}>
        <div className="miniPanel userProfilePanel">
          <p id="profileHeader"> Current user </p>
          <img className="profileThumb" src={props.user.photoURL} alt={props.user.displayName} />
          <p id="profileName">username: {props.user.displayName} </p>
          <p id="profileEmail">email: {props.user.email}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="userComponent panel">
        <div><p> Please log in to see your profile </p> </div>
      </div>
    );
  }
}

UserComponent.propTypes = {
  user: PropTypes.object,
};

export default UserComponent;
