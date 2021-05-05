import React, {useState, useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import '../styles/App.css';

// Components
import UserComponent from './UserComponent';
import BookInventory from './BookInventory';
import AuthHeader from './authHeader';
// Chat engine
import {ChatEngine} from 'react-chat-engine';

function App() {
  const [selectedUserId, selectUserId] = useState(-1);

  const {user, isAuthenticated, isLoading} = useAuth0();

  // const result = dotenv.config();
  // if (result.error) {
  //   console.log(JSON.stringify(dotenv));
  //   console.error('Error in the config import');
  // }
  require('dotenv').config();
  // console.log(`Environment ${JSON.stringify(process.env)}`);

  // useEffect on isAuthenticated changes
  useEffect(()=> {
    if (!isLoading && isAuthenticated) {
      // Need to check in the DB if things are working
      fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          query: `{ 
            userByAuthId(authId:"${user.sub}") {
              id
            }
          }`}),
      }).then((data) => data.json())
          .then((jsonData) => {
            console.log(`Reply from the new query: ${JSON.stringify(jsonData)}`);
            if (jsonData.data.userByAuthId.length === 0) {
              // USER NOT DEFINED -> WE NEED TO CREATE A NEW ONE
              console.log(`Authenticated user = ${JSON.stringify(user)}`);
              fetch('/graphql', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  query: `
                    mutation { 
                      createUser(userData: {
                      nickName: "${user.nickname}",
                      fullName: "${user.name}",
                      authId: "${user.sub}"}) {
                      id
                      fullName
                      authId
                    }
                  }`}),
              }).then((data)=> data.json())
                  .then((jsonData) => {
                    console.log(`results from the user creation: ${JSON.stringify(jsonData)}`);
                    if (jsonData.data.createUser && jsonData.data.createUser.id !== null) {
                      selectUserId(Number(jsonData.data.createUser.id));
                    } else {
                      console.error(`Err in the DB user create. ${JSON.stringify(jsonData)} null`);
                    }
                  });
            } else {
              // The authenticated user exists in the database. We need to update internal state
              const userInDB = jsonData.data.userByAuthId[0];
              selectUserId(Number(userInDB.id));
              console.log(`Known user authenticated - local ID ${userInDB.id}`);
            }
          });
    }
  }, [isAuthenticated, user, isLoading]);

  const chatEngineJSX = <ChatEngine
    projectID={process.env.REACT_APP_CHAT_PROJECT_ID}
    userName={process.env.REACT_APP_CHAT_USER_NAME}
    userSecret={process.env.REACT_APP_CHAT_USER_PWD}
  />;

  return (
    <div className="App">
      <AuthHeader/>
      <main>
        <UserComponent user={user}/>
        <BookInventory userId={selectedUserId} />
        {isAuthenticated? chatEngineJSX : undefined}
      </main>
    </div>
  );
}

export default App;
