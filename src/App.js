import logo from './logo.svg';
import React from "react";
import './App.css';
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";

/// Pages
import EthereumPage from "./pages/ethereum";

function AppPage() {
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
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EthereumPage/>}/>
        <Route path="/ethereum" element={<EthereumPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
