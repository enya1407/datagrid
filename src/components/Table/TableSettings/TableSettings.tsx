import React from "react";
import VisibilityColumns from "./VisibilityColumns/VisibilityColumns";
import VisibilityRow from "./VisibilityRow/VisibilityRow";
import {Button} from "antd";
import {deleteRowsAction} from "../../../actions";
import {useDispatch} from "react-redux";
import styles from "./TableSettings.module.css"
import ToggleContainer from "./ToggleContainer/ToggleContainer";

const TableSettings = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles.setting}>
      <VisibilityColumns/>
      <VisibilityRow></VisibilityRow>
      <ToggleContainer/>
      <Button onClick={() => dispatch(deleteRowsAction(0))}>delete selected lines rows</Button>
    </div>


  )
}
export default TableSettings