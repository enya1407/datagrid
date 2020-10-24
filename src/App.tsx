import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import TableSettings from "./components/Table/TableSettings/TableSettings";

const App = () => {

  return (
    <div className="App">
      <Header/>


      <TableSettings/>
      <Table/>
    </div>
  );
}

export default App