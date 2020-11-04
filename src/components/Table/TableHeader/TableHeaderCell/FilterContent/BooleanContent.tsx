import React from "react";
import {Switch} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {visibilityBooleanSelector} from "../../../../../selector/selector";
import {changeVisibilityBooleansAction} from "../../../../../actions";
import styles from "./FilterContent.module.css"


const BooleanContent = () => {
  const visibilityBoolean = useSelector(visibilityBooleanSelector)
  const dispatch = useDispatch();
  return (
    <div className={styles.visibilityBoolean}>
      <div><Switch checked={visibilityBoolean.showTrue}
                   size="small" onChange={() => dispatch(changeVisibilityBooleansAction("showTrue"))}/> true
      </div>
      <div><Switch checked={visibilityBoolean.showFalse}
                   size="small" onChange={() => dispatch(changeVisibilityBooleansAction("showFalse"))}/> false
      </div>


    </div>
  )
}

export default BooleanContent