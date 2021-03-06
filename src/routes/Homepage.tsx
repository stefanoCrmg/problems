import React from 'react'
import logo from './logo.svg';
import { Link } from "react-router-dom";
import './App.css';

const Homepage: React.FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link to='/form' className="App-link">Go to forms</Link>
      </header>
      
    </div>
  )
}

export { Homepage }