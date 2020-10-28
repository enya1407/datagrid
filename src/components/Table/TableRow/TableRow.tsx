import React from "react";
import styles from "./TableRow.module.css"
import {PersonType} from "../../../types";
import {useSelector} from "react-redux";
import {visibilityColumnsSelector} from "../../../selector/selector";

interface TableRowProps {
  person: PersonType;
}

const TableRow: React.FC<TableRowProps> = ({person}) => {
  const isVisibility = useSelector(visibilityColumnsSelector)
  const ArrCellName: Array<keyof PersonType> = ["id", "first_name", "last_name", "gender", "shirt_size", "app_name", "boolean"]
  const tableData = ArrCellName.map((data: keyof PersonType, i: number) => {
    if (isVisibility[data]) {
      return (
        <td className={styles.td} key={i}>{person[data].toString()}</td>
      )
    }
  })
  return (
    <tr className={styles.tr}>
      {tableData}
    </tr>
  )
}
export default TableRow