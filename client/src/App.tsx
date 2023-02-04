import React, { CSSProperties, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchBar } from './SearchBar';
import { HeaderComponent } from './HeaderComponent';
import { ResultsComponent } from './ResultsComponent';
import { ShippingInfo } from './ShippingInfo';
import axios from 'axios';

function App() {
  const [shippingInfos, setShippingInfos] = useState([]);

  const getSearchResults = async (query: string) => {
    setShippingInfos((await axios.get(`http://localhost:3001/api/search/${query}`)).data);
  }

  return (
    <div className="App">
      <HeaderComponent getSearch={getSearchResults} />      
      <ResultsComponent shippingInfos={shippingInfos} />
    </div>
  );
}

export default App;
