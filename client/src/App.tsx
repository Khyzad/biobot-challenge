import React, { CSSProperties } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchBar } from './SearchBar';

function App() {
  return (
    <div className="App">
      <div style={searchPanelStyle}>
        <img src="/biobot_logo.svg" width="150px" height="75px" />
        <SearchBar />
      </div>

    </div>
  );
}

const searchPanelStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  minWidth: "50%"
}

export default App;
