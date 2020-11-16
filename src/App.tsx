import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {commonSelector} from "./selector/selector";
import {changeLoadingAction, loadDataQueryStringParamsAction, loadOldParamsAction, writeRawDataAction} from "./actions";
import data from "./data";
import loadPersonsAction from "./actions/thunkLoadData";

const App = () => {
  const {
    sortedBy,
    searchedValue,
    filterBy,
    visibilityGender,
    visibilityShirtSize,
    visibilityColumns,
    visibilityRows,
    visibilityBoolean,
    isAsync,
    isVirtualize,
    highlightedRows
  } = useSelector(commonSelector)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeLoadingAction(true))
    const dataLocalStorage = window.localStorage.getItem('params');
    const dataQueryString = window.location.search

    dataLocalStorage != null
      ? dispatch(loadOldParamsAction(JSON.parse(dataLocalStorage)))
      : dispatch(writeRawDataAction(data))

    if (dataQueryString) dispatch(loadDataQueryStringParamsAction(dataQueryString))
  }, [])

  useEffect(() => {
      dispatch(changeLoadingAction(true))
      isAsync ? dispatch(loadPersonsAction()) : dispatch(writeRawDataAction(data))
    },
    [isAsync])

  useEffect(() => {
    const params = {
      isAsync,
      isVirtualize,
      sortedBy,
      searchedValue,
      filterBy,
      visibilityGender,
      visibilityShirtSize,
      visibilityColumns,
      visibilityRows,
      visibilityBoolean,
      highlightedRows
    };
    window.localStorage.setItem("params", JSON.stringify(params))
  }, [
    isAsync,
    isVirtualize,
    sortedBy,
    searchedValue,
    filterBy,
    visibilityGender,
    visibilityShirtSize,
    visibilityColumns,
    visibilityRows,
    visibilityBoolean,
    highlightedRows])

  return (
    <div className="App">
      <Header/>
      <Table/>
    </div>
  );
}

export default App
