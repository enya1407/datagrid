import React, {useEffect} from "react";
import styles from "./Table.module.css"
import TableRow from "./TableRow/TableRow";
import TableHeader from "./TableHeader/TableHeader";
import loadPersonsAction from "../../actions/thunkLoadData";
import {useDispatch, useSelector} from "react-redux";
import {changeLoadingAction} from "../../actions";
import {PersonType} from "../../types";
import {commonSelector} from "../../selector/selector";

const Table = () => {
  const dispatch = useDispatch();
  const {isLoading, currentDataPersons, sortedBy} = useSelector(commonSelector);
  console.log(sortedBy)
  const rows = currentDataPersons.map((data: PersonType) => (
    <TableRow key={data.id} id={data.id}/>
  ))

  useEffect(() => {
      dispatch(changeLoadingAction(true))
      dispatch(loadPersonsAction())
    },
    [])

  return (
    <table className={styles.table}>
      <caption>Таблица</caption>
      <TableHeader/>
      {
        isLoading
          ? "...spinner"
          : rows
      }
    </table>

  )
}

export default Table


