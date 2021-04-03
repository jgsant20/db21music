import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentJson, setJson] = useState(0);

  useEffect(() => {
    fetch('./api/time').then(res => res.json()).then(date => {
      setCurrentTime(date.time);
    });
  }, []);

  useEffect(() => {
    fetch('./api/albums').then(res => res.json()).then(json => {
      setJson(json);
    });
  }, []);

  console.log(currentJson)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          The current time is {currentTime}.
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
    </div>
  );
}

export default App;
