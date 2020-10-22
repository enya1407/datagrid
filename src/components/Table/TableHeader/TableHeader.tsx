import React from "react";
import styles from "./TableHeader.module.css"
import TableHeaderCell from "./TableHeaderCell/TableHeaderCell";
import {PersonType} from "../../../types";


const TableHeader = () => {

  const ArrCellName: Array<keyof PersonType> = ["id", "first_name", "last_name", "gender", "shirt_size", "app_name", "app_version"]
  const tableHeaderCell = ArrCellName.map((data: Partial<keyof PersonType>, i: number) => (
    <TableHeaderCell key={i} name={data}/>
  ))
  return (
    <thead>
    <tr className={styles.tr}>
      {tableHeaderCell}
    </tr>
    </thead>
  )
}
export default TableHeader