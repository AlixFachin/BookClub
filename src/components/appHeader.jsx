import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from './login-button.jsx';
import LogoutButton from './logout-button.jsx';
import '../styles/AppHeader.css';

function AppHeader(props) {
  const {isAuthenticated, isLoading} = useAuth0();

  function searchLink() {
    return <li class="nav-link">Search</li>;
  }
  function userProfileLink() {
    return ( <React.Fragment>
              <li class="nav-link">Profile</li> 
              <li class="nav-link"><LogoutButton /> </li> 
             </React.Fragment>);
  }
  function pleaseLoginLink() {
    return <li class="nav-link"> <LoginButton /> </li>
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
  } else if (isAuthenticated) {
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
        {chatItem}  
        { profileItem } 
      </ul>
    </header>);

};

export default AppHeader;


