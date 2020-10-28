import React from "react";
import VisibilityColumns from "./VisibilityColumns/VisibilityColumns";
import VisibilityRow from "./VisibilityRow/VisibilityRow";
import TogglesBoolean from "./ToggleBoolean/ToggleBoolean";

const TableSettings = () => {

  return (
    <div>
      <VisibilityColumns/>
      <VisibilityRow></VisibilityRow>
      <TogglesBoolean/>

    </div>


  )
}
export default TableSettings