import React from "react";
import styles from "./TableRow.module.css"
import {PersonType} from "../../../types";

interface TableRowProps {
  person: PersonType;
}

const TableRow: React.FC<TableRowProps> = ({person}) => {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{person.id}</td>
      <td className={styles.td}>{person.first_name}</td>
      <td className={styles.td}>{person.last_name}</td>
      <td className={styles.td}>{person.gender}</td>
      <td className={styles.td}>{person.shirt_size}</td>
      <td className={styles.td}>{person.app_name}</td>
      <td className={styles.td}>{person.app_version}</td>
    </tr>
  )
}
export default TableRow