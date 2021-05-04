import React from 'react';
import PropTypes from 'prop-types';

function UserComponent(props) {
  console.log(`Props inside the User Component: ${JSON.stringify(props)}`);
  return (
    <>
      <div className="userComponent panel">
        <div className="miniPanel"> Current user:  </div>
        <div className="miniPanel">
          <select name="userSelect" id="userSelect">
            <option value="">--Choose an user--</option>
            {props.userList.map((user, index) => {
              return <option key={`user-${user.id}`} value={'user.id'}>{user.nickName} </option>;
            })}
          </select>
        </div>
        <button id="changeUser"> </button>
      </div>
    </>
  );
}

UserComponent.propTypes = {
  userList: PropTypes.array,
};

export default UserComponent;
