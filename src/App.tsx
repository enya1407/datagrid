import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {commonSelector} from "./selector/selector";
import {changeInitialPersonAction, changeLoadingAction, loadOldDataAction} from "./actions";
import loadPersonsAction from "./actions/thunkLoadData";
import data from "./data";

const App = () => {
  const {
    initialDataPersons,
    currentDataPersons,
    sortedBy,
    filterBy,
    visibilityGender,
    visibilityShirtSize,
    visibilityColumns,
    visibilityRows,
    visibilityBoolean,
    isAsync,
    highlightedRows
  } = useSelector(commonSelector)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeLoadingAction(true))
    const dataLocalStorage = window.localStorage.getItem('state')

    if (dataLocalStorage != null) dispatch(loadOldDataAction(JSON.parse(dataLocalStorage)))
  }, [])

  useEffect(() => {
      dispatch(changeLoadingAction(true))
      isAsync ? dispatch(loadPersonsAction()) : dispatch(changeInitialPersonAction(data))
    },
    [isAsync])

  useEffect(() => {
    const state = {
      initialDataPersons,
      currentDataPersons,
      sortedBy,
      filterBy,
      visibilityGender,
      visibilityShirtSize,
      visibilityColumns,
      visibilityRows,
      visibilityBoolean,
      isAsync,
      highlightedRows
    };
    window.localStorage.setItem("state", JSON.stringify(state))
  }, [initialDataPersons,
    currentDataPersons,
    sortedBy,
    filterBy,
    visibilityGender,
    visibilityShirtSize,
    visibilityColumns,
    visibilityRows,
    visibilityBoolean,
    isAsync,
    highlightedRows])

  return (
    <div className="App">
      <Header/>
      <Table/>
    </div>
  );
}

export default App
