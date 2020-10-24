import React, {useEffect} from "react";
import styles from "./Table.module.css"
import TableRow from "./TableRow/TableRow";
import TableHeader from "./TableHeader/TableHeader";
import loadPersonsAction from "../../actions/thunkLoadData";
import {useDispatch, useSelector} from "react-redux";
import {changeLoadingAction} from "../../actions";
import {PersonType} from "../../types";
import {commonSelector} from "../../selector/selector";
import {Spin} from "antd";

const Table = () => {
  const dispatch = useDispatch();
  const {isLoading, currentDataPersons} = useSelector(commonSelector);

  const rows = currentDataPersons.map((person: PersonType) => {
    return <TableRow key={person.id} person={person}/>
  })

  useEffect(() => {
      dispatch(changeLoadingAction(true))
      dispatch(loadPersonsAction())
    },
    [])

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


