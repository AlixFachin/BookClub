//eslint-disable-next-line
import React, {useState, useEffect} from 'react';
import '../styles/App.css';

// Styles etc
import firebase from 'firebase/app';
import 'firebase/firestore'; //Store contains the chat messages
import 'firebase/auth';

//eslint-disable-next-line
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
// import UserComponent from './UserComponent';
// import BookInventory from './BookInventory';
import ChatRoom from './ChatRoom';
import AppHeader from './appHeader';
import LoginButton from './login-button';

firebase.initializeApp({
  apiKey: "AIzaSyAcnaX7JF88DeZg4fBbyaGGnA7YH9q4CZE",
  authDomain: "bookclub-chat.firebaseapp.com",
  projectId: "bookclub-chat",
  storageBucket: "bookclub-chat.appspot.com",
  messagingSenderId: "991680073357",
  appId: "1:991680073357:web:58b9a7024359b8423ddcc4",
  measurementId: "G-521WN3GTWK"

});


const auth = firebase.auth();
// auth.useDeviceLanguage(); // forces pop-up etc to be displayed in the user language
//eslint-disable-next-line
const firestore = firebase.firestore();

function App() {
  //eslint-disable-next-line
  const [selectedUserId, selectUserId] = useState(-1);
  const [user] = useAuthState(auth);

  require('dotenv').config();

  // useEffect on isAuthenticated changes
  // useEffect(()=> {
  //   if (!isLoading && isAuthenticated) {
  //     // Need to check in the DB if we already have a user with this name
  //     fetch('/graphql', {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify({
  //         query: `{ 
  //           userByAuthId(authId:"${user.sub}") {
  //             id
  //           }
  //         }`}),
  //     }).then((data) => data.json())
  //         .then((jsonData) => {
  //           console.log(`Reply from the new query: ${JSON.stringify(jsonData)}`);
  //           if (jsonData.data.userByAuthId.length === 0) {
  //             // USER NOT DEFINED -> WE NEED TO CREATE A NEW ONE
  //             console.log(`Authenticated user = ${JSON.stringify(user)}`);
  //             fetch('/graphql', {
  //               method: 'POST',
  //               headers: {'Content-Type': 'application/json'},
  //               body: JSON.stringify({
  //                 query: `
  //                   mutation { 
  //                     createUser(userData: {
  //                     nickName: "${user.nickname}",
  //                     fullName: "${user.name}",
  //                     email:"${user.email}",
  //                     authId: "${user.sub}"}) {
  //                     id
  //                     fullName
  //                     authId
  //                   }
  //                 }`}),
  //             }).then((data)=> data.json())
  //                 .then((jsonData) => {
  //                   console.log(`results from the user creation: ${JSON.stringify(jsonData)}`);
  //                   if (jsonData.data.createUser && jsonData.data.createUser.id !== null) {
  //                     selectUserId(Number(jsonData.data.createUser.id));
  //                   } else {
  //                     console.error(`Err in the DB user create. ${JSON.stringify(jsonData)} null`);
  //                   }
  //                 });
  //           } else {
  //             // The authenticated user exists in the database. We need to update internal state
  //             const userInDB = jsonData.data.userByAuthId[0];
  //             selectUserId(Number(userInDB.id));
  //             console.log(`Known user authenticated - local ID ${userInDB.id}`);
  //           }
  //         });
  //   }
  // }, [isAuthenticated, user, isLoading]);

  return (
    <div className="App">
      <AppHeader auth={auth} firebase={firebase} user={user} />
      {/* <UserComponent user={user} className="side"/> */}
      <main>
        {/* <BookInventory userId={selectedUserId} /> */}
        { user ? <ChatRoom user={user} firestore={firestore} /> : <LoginButton firebase={firebase} auth={auth} /> }
      </main>
    </div>
  );
}

export default App;
