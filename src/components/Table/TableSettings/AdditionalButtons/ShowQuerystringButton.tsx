import {Button, Popover} from "antd";
import React from "react";
import styles from "./AdditionalButtons.module.css";
import {useSelector} from "react-redux";
import {commonSelector} from "../../../../selector/selector";

const ShowQuerystringButton = () => {
  const {visibilityGender, visibilityShirtSize, visibilityBoolean, searchedValue} = useSelector(commonSelector)

  const writeDataToTheQuerystring = () => {
    const gender = Object.entries(visibilityGender).filter(el => el[1] === true).map(el => el[0]).join("+")
    const shirtSize = Object.entries(visibilityShirtSize).filter(el => el[1] === true).map(el => el[0]).join("+")
    const boolean = Object.entries(visibilityBoolean).filter(el => el[1] === true).map(el => el[0]).join("+")

    return `?gender=${gender}&shirtSize=${shirtSize}&boolean=${boolean}&searchedValue=${searchedValue}`
  }

  const content = (<input
    type="text"
    value={`https://enya1407-datagrid.netlify.app/${writeDataToTheQuerystring()}`}
    onClick={(evt: React.SyntheticEvent<HTMLInputElement>): void => {
      const target: HTMLInputElement = evt.target as HTMLInputElement;
      target.select();
      document.execCommand('copy');
    }}
    readOnly
  />)
  return (
    <Popover content={content} trigger="click">
      <Button title="copy querystring with current filters" className={styles.button}>Show querystring</Button>
    </Popover>
  )
}
export default ShowQuerystringButton
