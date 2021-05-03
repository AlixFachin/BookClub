import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [data, setData] = useState('');

  function connectToApi() {
    fetch('/testEndpoint').then((response) => response.json()).then((data) => {
      console.log(`Connected to API! Data ${JSON.stringify(data)}`);
      setData(data["express"]);
    }).catch((err) => {
      console.error("Error in connection to local API");
      console.error(err);
    })
  }

  useEffect(() => {
    // First version -> Connecting to the back-end on mount
    connectToApi();
  }, []);
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <p> { data } </p>
      </div>
    </div>
  );
}

export default App;
