import React from "react";
import styles from "./TableRow.module.css"
import {PersonType} from "../../../types";
import {useDispatch, useSelector} from "react-redux";
import {highlightedRowsSelector, visibilityColumnsSelector} from "../../../selector/selector";
import {changeHighlightedRowsAction, deleteRowsAction} from "../../../actions";
import {Button} from "antd";

interface TableRowProps {
  person: PersonType;
}

const TableRow: React.FC<TableRowProps> = ({person}) => {
  const isVisibility = useSelector(visibilityColumnsSelector)
  const highlightedRows = useSelector(highlightedRowsSelector)
  const dispatch = useDispatch()

  const onCtrlKeyHandler = (event: any) => {
    if (event.ctrlKey) {
      return dispatch(changeHighlightedRowsAction(person.id, "ctrl"))
    } else if (event.shiftKey) {
      return dispatch(changeHighlightedRowsAction(person.id, "shift"))
    } else dispatch(changeHighlightedRowsAction(person.id, ""))

  }

  const ArrCellName: Array<keyof PersonType> = ["id", "first_name", "last_name", "gender", "shirt_size", "app_name", "boolean"]


  const cellWidth = (data: keyof PersonType) => {
    switch (data) {
      case "id" :
        return `${styles.td} ${styles.narrow}`
      case "shirt_size":
      case "gender":
      case"boolean":

        return `${styles.td} ${styles.average}`
      default:
        return `${styles.td} ${styles.wide}`
    }
  }

  const tableData = ArrCellName.map((data: keyof PersonType, i: number) => {
    if (isVisibility[data]) {
      return (<div className={cellWidth(data)} key={i}>{person[data].toString()}</div>
      )
    }
  })

  const styleRow = highlightedRows.includes(person.id) ? styles.tr_active : styles.tr
  const cellDelRow = highlightedRows.includes(person.id) ? styles.del__row_active : styles.del__row
  return (

    <div className={styleRow} onClick={(event) => onCtrlKeyHandler(event)}>
      {tableData}
      <div className={cellDelRow}><Button className={styles.delRowButton}
                                          onClick={() => dispatch(deleteRowsAction(person.id))}>del</Button></div>
    </div>
  )
}
export default TableRow