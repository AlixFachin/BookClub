import React, {useState, useEffect} from 'react';
import '../styles/App.css';

// Components
import UserComponent from './UserComponent';

function App() {
  const [userList, setUserList] = useState([]);

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
        Welcome to the Book Club
      </header>
      <main>
        <UserComponent userList={userList}/>
      </main>
    </div>
  );
}

export default App;
