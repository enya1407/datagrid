import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import {useDispatch} from "react-redux";

const App = () => {
  const dispatch = useDispatch();
 
  return (
    <div className="App">
      <Header/>


      <Table/>
    </div>
  );
}

export default App