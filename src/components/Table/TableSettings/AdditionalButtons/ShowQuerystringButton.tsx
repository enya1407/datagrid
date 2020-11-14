import {Button, Popover} from "antd";
import React from "react";
import styles from "./AdditionalButtons.module.css";

const ShowQuerystringButton = () => {
  const content = (<input
    type="text"
    value={`${`https://enya1407-datagrid.netlify.app/?gender=Male`}`}
    readOnly
  />)
  return (
    <Popover content={content}>
      <Button className={styles.button}>Show querystring</Button>
    </Popover>
  )
}
export default ShowQuerystringButton
