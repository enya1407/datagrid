import React from "react";
import {Switch} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {visibilityBooleanSelector} from "../../../../selector/selector";
import {changeVisibilityBooleansAction} from "../../../../actions";


const TogglesBoolean = () => {
  const visibilityBoolean = useSelector(visibilityBooleanSelector)
  const dispatch = useDispatch();
  return (
    <div>
      <Switch checked={visibilityBoolean.showTrue}
              onChange={() => dispatch(changeVisibilityBooleansAction("showTrue"))}/> true
      <Switch checked={visibilityBoolean.showFalse}
              onChange={() => dispatch(changeVisibilityBooleansAction("showFalse"))}/> false
    </div>
  )
}

export default TogglesBoolean