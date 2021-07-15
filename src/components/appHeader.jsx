import React from 'react';
import LoginButton from './login-button.jsx';
import LogoutButton from './logout-button.jsx';
import '../styles/AppHeader.css';
import { useAuthState } from 'react-firebase-hooks/auth';

function AppHeader(props) {
  const [user, isLoading] = useAuthState(props.auth);

  function searchLink() {
    return <li className="nav-link">Search</li>;
  }
  function userProfileLink() {
    return ( <React.Fragment>
              <li className="nav-link">Profile</li> 
              <li className="nav-link"><LogoutButton auth={props.auth}/> </li> 
             </React.Fragment>);
  }
  function pleaseLoginLink() {
    return <li className="nav-link"> <LoginButton auth={props.auth} firebase={props.firebase}/> </li>
  }
  function inventoryLink() {
    return <li className="nav-link">Inventory</li>;
  }
  function chatLink() {
    return <li className="nav-link">Chat</li>;
  }

  // MAIN MENU BAR:
  // | Search | Inventory* | Chat* | Profile*|

  const searchItem = searchLink();
  let inventoryItem, chatItem, profileItem;
  
  
  if (isLoading) {
    inventoryItem = "";
    chatItem = "";
    profileItem = <li className="nav-link"> Loading...</li>;
  } else if (user) {
    inventoryItem = inventoryLink();
    chatItem = chatLink();
    profileItem = userProfileLink();
  } else {
    inventoryItem = "";
    chatItem = "";
    profileItem = pleaseLoginLink();
  }

  return (<header className="App-header"> 
      <ul className="nav-links">
        { searchItem } 
        { inventoryItem }  
        { chatItem }  
        { profileItem } 
      </ul>
    </header>);

};

export default AppHeader;


