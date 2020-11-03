import {Switch} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {isAsyncSelector} from "../../../../selector/selector";
import {isAsyncAction} from "../../../../actions";
import styles from "./ToggleContainer.module.css"

const ToggleContainer = () => {
  const isAsync = useSelector(isAsyncSelector)
  const dispatch = useDispatch();
  return (
    <div className={styles.toggle__container}>
      <div>
        <Switch className={styles.toggle} checked={isAsync}
                onChange={() => {
                  dispatch(isAsyncAction());

                }}/>async
      </div>
      <div>
        <Switch className={styles.toggle} checked={isAsync}
        />virtualize
      </div>
    </div>

  )
}
export default ToggleContainer