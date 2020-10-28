import React from "react";
import VisibilityColumns from "./VisibilityColumns/VisibilityColumns";
import VisibilityRow from "./VisibilityRow/VisibilityRow";
import TogglesBoolean from "./ToggleBoolean/ToggleBoolean";
import AsyncToggle from "./async/async";

const TableSettings = () => {

  return (
    <div>
      <VisibilityColumns/>
      <VisibilityRow></VisibilityRow>
      <AsyncToggle/>
      <TogglesBoolean/>
    </div>


  )
}
export default TableSettings