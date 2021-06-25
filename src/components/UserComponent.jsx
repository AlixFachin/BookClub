import React from 'react';
import PropTypes from 'prop-types';
import '../styles/UserComponent.css';

function UserComponent(props) {
  if (props.user) {
    return (
      <div className={"userComponent panel" + (props.className ? " " + props.className : "" )}>
        <div className="miniPanel userProfilePanel">
          <p id="profileHeader"> Current user </p>
          <img className="profileThumb" src={props.user.picture} alt={props.user.nickname} />
          <p id="profileName">username: {props.user.nickname} </p>
          <p id="profileEmail">email: {props.user.email}</p>
          <p id="profileNickname">nickname: {props.user.nickname} </p>
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
