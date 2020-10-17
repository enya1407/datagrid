import React, {useEffect} from "react";
import styles from "./Table.module.css"
import TableRow from "./TableRow/TableRow";
import TableHeader from "./TableHeader/TableHeader";
import loadPersonsAction from "../../actions/thunkLoadData";
import {useDispatch, useSelector} from "react-redux";
import {changeLoadingAction, changePersonAction} from "../../actions";
import {PersonType} from "../../types";
import {commonSelector} from "../../selector/selector";

const Table = () => {
  const dispatch = useDispatch();
  const {isLoading, persons} = useSelector(commonSelector);

  const sortPersons = (key: keyof PersonType) => {
    const persons2 = [...persons];
    persons2.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a.gender > b.gender) {
        return 1;
      }
      return 0;
    });
    dispatch(
      changePersonAction(persons2)
    )
  }

  const rows = persons.map((data: PersonType) => (
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
      <TableHeader sortPersons={sortPersons}/>
      {
        isLoading
          ? "...spinner"
          : rows
      }
    </table>

  )
}

export default Table


