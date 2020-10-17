import React from "react";
import styles from "./TableHeader.module.css"
import {PersonType} from "../../../types";

interface TableHeaderProps {
  sortPersons: (key: keyof PersonType) => void;
}

const TableHeader = ({sortPersons}: TableHeaderProps) => {
  return (
    <thead>
    <tr className={styles.tr}>
      <th className={styles.th} onClick={() => sortPersons("first_name")}>first_name</th>
      <th className={styles.th} onClick={() => sortPersons("last_name")}>last_name</th>
      <th className={styles.th} onClick={() => sortPersons("gender")}>gender</th>
      <th className={styles.th} onClick={() => sortPersons("shirt_size")}>shirt_size</th>
      <th className={styles.th} onClick={() => sortPersons("app_name")}>app_name</th>
      <th className={styles.th} onClick={() => sortPersons("app_version")}>app_version</th>
    </tr>
    </thead>
  )
}
export default TableHeader