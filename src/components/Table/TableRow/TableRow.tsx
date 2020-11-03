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
    (event.ctrlKey)
      ? dispatch(changeHighlightedRowsAction(person.id, true))
      : dispatch(changeHighlightedRowsAction(person.id, false))
  }

  const ArrCellName: Array<keyof PersonType> = ["id", "first_name", "last_name", "gender", "shirt_size", "app_name", "boolean"]
  const tableData = ArrCellName.map((data: keyof PersonType, i: number) => {
    if (isVisibility[data]) {
      return (
        <td className={styles.td} key={i}>{person[data].toString()}</td>
      )
    }
  })

  const styleRows = highlightedRows.includes(person.id) ? styles.tr_active : styles.tr
  const cellDelRow = highlightedRows.includes(person.id) ? styles.del__row_active : styles.del__row
  return (
    <tr className={styleRows} onClick={(event) => onCtrlKeyHandler(event)}>
      {tableData}
      <td className={cellDelRow}><Button className={styles.delRowButton}
                                         onClick={() => dispatch(deleteRowsAction())}>del</Button></td>
    </tr>
  )
}
export default TableRow