import React, { useState, useRef } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import '../styles/ChatRoom.css';

// Component containing chat message
function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === props.user.uid ? 'sent' : 'received';

  console.log(uid);

  return (
    <div className={`message ${messageClass}`}> 
      <img src={photoURL} className="photoId" alt={`${uid} profile`}/>
      <p> {text} </p> 
    </div>);
}

const ChatRoom = (props) => {

  const messagesRef = props.firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [inputValue, setInputValue] = useState('');

  const dummy = useRef();

  const sendMessage = async(e) => {
    e.preventDefault();

    const [ uid, photoURL ] = [ props.user.uid, props.user.photoURL ];

    await messagesRef.add( {
      // send a new document to the FireStore DB
      text: inputValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setInputValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth'});

  };

  console.log(messages);

  return (
  <div id="chatContainer"> 
    <h3> {props.user? props.user.displayName : '' }  </h3>  
    <div id="messageList">
      { messages && 
        messages.map(msg => <ChatMessage key={msg.id} message={msg} user={props.user} />)}
      <div ref={dummy}> </div> 
    </div>
    <form onSubmit={sendMessage} >
      <input value={inputValue} onChange={ (e) => setInputValue(e.target.value) } />
      <button type="submit"><span role="img" aria-label="send">✍️</span></button>
    </form>
  </div>);

};


export default ChatRoom;