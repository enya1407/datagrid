import React from "react";
import VisibilityColumns from "./VisibilityColumns/VisibilityColumns";
import VisibilityRow from "./VisibilityRow/VisibilityRow";
import AsyncToggle from "./async/async";

const TableSettings = () => {

  return (
    <div>
      <VisibilityColumns/>
      <VisibilityRow></VisibilityRow>
      <AsyncToggle/>
    </div>


  )
}
export default TableSettings