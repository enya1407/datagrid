import React from "react";
import styles from "./TableRow.module.css"
import {useSelector} from "react-redux";
import {StateType} from "../../../types";

interface TableRowProps {
  id: number;
}

const TableRow: React.FC<TableRowProps> = ({id}) => {
  const {persons} = useSelector((state: StateType) => ({
    persons: state.currentDataPersons,
  }));

  return (
    <tbody>
    <tr className={styles.tr} key={persons[id]?.id}>
      <td className={styles.td}>{persons[id]?.id}</td>
      <td className={styles.td}>{persons[id]?.first_name}</td>
      <td className={styles.td}>{persons[id]?.last_name}</td>
      <td className={styles.td}>{persons[id]?.gender}</td>
      <td className={styles.td}>{persons[id]?.shirt_size}</td>
      <td className={styles.td}>{persons[id]?.app_name}</td>
      <td className={styles.td}>{persons[id]?.app_version}</td>
    </tr>
    </tbody>
  )
}
export default TableRow