import {Switch} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {isAsyncSelector, isVirtualizeSelector} from "../../../../selector/selector";
import {isAsyncAction, isVirtualizeAction} from "../../../../actions";
import styles from "./ToggleContainer.module.css"

const ToggleContainer = () => {
  const isAsync = useSelector(isAsyncSelector)
  const isVirtualize = useSelector(isVirtualizeSelector)
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
        <Switch className={styles.toggle__virtualize} checked={isVirtualize}
                onChange={() => {
                  dispatch(isVirtualizeAction());
                }}
        />virtualize
      </div>
    </div>

  )
}
export default ToggleContainer