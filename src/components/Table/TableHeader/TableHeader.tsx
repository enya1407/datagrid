import React from "react";
import styles from "./TableHeader.module.css"
import {useDispatch} from "react-redux";
import {sortDataAction} from "../../../actions";

const TableHeader = () => {
  const dispatch = useDispatch();
  return (
    <thead>
    <tr className={styles.tr}>
      <th className={styles.th} onClick={() => dispatch(sortDataAction("id"))}>№</th>
      <th className={styles.th} onClick={() => dispatch(sortDataAction("first_name"))}>first_name</th>
      <th className={styles.th} onClick={() => dispatch(sortDataAction("last_name"))}>last_name</th>
      <th className={styles.th} onClick={() => dispatch(sortDataAction("gender"))}>gender</th>
      <th className={styles.th} onClick={() => dispatch(sortDataAction("shirt_size"))}>shirt_size</th>
      <th className={styles.th} onClick={() => dispatch(sortDataAction("app_name"))}>app_name</th>
      <th className={styles.th} onClick={() => dispatch(sortDataAction("app_version"))}>app_version</th>
    </tr>
    </thead>
  )
}
export default TableHeader