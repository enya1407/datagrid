import React, {useEffect} from "react";
import styles from "./Table.module.css"
import TableRow from "./TableRow/TableRow";
import TableHeader from "./TableHeader/TableHeader";
import loadPersonsAction from "../../actions/thunkLoadData";
import {useDispatch, useSelector} from "react-redux";
import {changeInitialPersonAction, changeLoadingAction} from "../../actions";
import {PersonType} from "../../types";
import {commonSelector} from "../../selector/selector";
import {Spin} from "antd";
import data from "../../data"

const Table = () => {
  const dispatch = useDispatch();
  const {isLoading, currentDataPersons, isAsync} = useSelector(commonSelector);
  const rows = currentDataPersons.map((person: PersonType) => {
    return <TableRow key={person.id} person={person}/>
  })

  useEffect(() => {
      console.log(data)
      dispatch(changeLoadingAction(true))
      isAsync ? dispatch(loadPersonsAction()) : dispatch(changeInitialPersonAction(data))


    },
    [isAsync])

  if (isLoading) {
    return (<div>
      <Spin size="large"/>
    </div>)
  }

  return (
    <table className={styles.table}>
      <caption className={styles.caption}>Таблица</caption>
      <TableHeader/>
      <tbody>
      {rows}
      </tbody>
    </table>
  )
}

export default Table


