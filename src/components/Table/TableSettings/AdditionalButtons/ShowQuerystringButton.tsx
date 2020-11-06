import {Button, Popover} from "antd";
import React from "react";
import styles from "./AdditionalButtons.module.css";

const ShowQuerystringButton = () => {
  const content = (<input
    type="text"
    value={`${`https://hopeful-kirch-b901c7.netlify.com/?stringFilterValue=er&gender=Male+Female&shirtSize=XS+S+M&isStable=true`}`}
    readOnly
    // onClick={(evt: React.SyntheticEvent<HTMLInputElement>): void => {
    //   const target: HTMLInputElement = evt.target as HTMLInputElement;
    //   target.select();
    //   document.execCommand('copy');
    // }}
  />)
  return (
    <Popover content={content}>
      <Button className={styles.button}>Show querystring</Button>
    </Popover>
  )
}
export default ShowQuerystringButton
