import React, {useState, useEffect} from 'react';
import '../styles/App.css';

// Components
import UserComponent from './UserComponent';
import BookInventory from './BookInventory';
import AuthenticationButton from './authentication-button';

function App() {
  const [userList, setUserList] = useState([]);
  const [selectedUserId, selectUserId] = useState(-1);
  // hook on initial render -> download the list of users
  useEffect(() => {
    async function getUserList() {
      const userList = await fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          query: `{ 
            allUsers {
              id
              fullName
              nickName
            }
          }`}),
      }).then((data) => data.json())
          .then((dataObj) => {
            return dataObj.data.allUsers;
          });
      setUserList(userList);
    }
    getUserList();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Welcome to the Book Club! <AuthenticationButton />
      </header>
      <main>
        <UserComponent userList={userList} selectUser={selectUserId}/>
        <BookInventory userId={selectedUserId} />
      </main>
    </div>
  );
}

export default App;
