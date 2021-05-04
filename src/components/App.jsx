import React, {useState, useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import '../styles/App.css';

// Components
import UserComponent from './UserComponent';
import BookInventory from './BookInventory';
import AuthHeader from './authHeader';

function App() {
  const [selectedUserId, selectUserId] = useState(-1);

  const {user, isAuthenticated, isLoading} = useAuth0();

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
            if (jsonData.data.userByAuthId.id === null) {
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
                    if (jsonData.data.createUser.id !== null) {
                      selectUserId(Number(jsonData.data.createUser.id));
                    } else {
                      console.error(`Err in the DB user create. ${JSON.stringify(jsonData)} null`);
                    }
                  });
            } else {
              // The authenticated user exists in the database. We need to update internal state
              selectUserId(Number(jsonData.data.userByAuthId.id));
              console.log(`Known user authenticated - local ID ${jsonData.data.userByAuthId.id}`);
            }
          });
    }
  }, [isAuthenticated, user, isLoading]);

  return (
    <div className="App">
      <AuthHeader/>
      <main>
        <UserComponent user={user}/>
        <BookInventory userId={selectedUserId} />
      </main>
    </div>
  );
}

export default App;
