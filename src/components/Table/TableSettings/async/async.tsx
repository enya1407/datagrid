import {Switch} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {isAsyncSelector} from "../../../../selector/selector";
import {isAsyncAction} from "../../../../actions";

const AsyncToggle = () => {
  const isAsync = useSelector(isAsyncSelector)
  const dispatch = useDispatch();
  return (
    <div><Switch checked={isAsync}
                 onChange={() => {
                   dispatch(isAsyncAction());

                 }}/> async
    </div>

  )
}
export default AsyncToggle