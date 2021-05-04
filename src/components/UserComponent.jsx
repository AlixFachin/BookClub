import React from 'react';
import PropTypes from 'prop-types';

function UserComponent(props) {
  function userChange(selectEvent) {
    // function called when user clicks on button
    if (!isNaN(Number(selectEvent.target.value)) && Number(selectEvent.target.value) > 0) {
      console.log(`User ${selectEvent.target.value} selected!`);
      props.selectUser(Number(selectEvent.target.value));
    }
  }
  return (
    <>
      <div className="userComponent panel">
        <div className="miniPanel"> Current user:  </div>
        <div className="miniPanel">
          <select name="userSelect" id="userSelect" onChange={userChange}>
            <option value="">--Choose an user--</option>
            {props.userList.map((user, index) => {
              return <option key={`user-${user.id}`} value={user.id}>{user.nickName} </option>;
            })}
          </select>
        </div>
      </div>
    </>
  );
}

UserComponent.propTypes = {
  userList: PropTypes.array,
  selectUser: PropTypes.func,
};

export default UserComponent;
