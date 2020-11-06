import React from "react";
import VisibilityColumns from "./VisibilityColumns/VisibilityColumns";
import VisibilityRow from "./VisibilityRow/VisibilityRow";
import styles from "./TableSettings.module.css"
import ToggleContainer from "./ToggleContainer/ToggleContainer";
import ExportCSVButton from "./AdditionalButtons/ExportCSVButton";
import DeleteSelectedButton from "./AdditionalButtons/DeleteSelecteButton";
import ShowQuerystringButton from "./AdditionalButtons/ShowQuerystringButton";

const TableSettings = () => {

  return (
    <div className={styles.setting}>
      <VisibilityColumns/>
      <VisibilityRow/>
      <ToggleContainer/>
      <div className={styles.container}>
        <ExportCSVButton/>
        <ShowQuerystringButton/>
      </div>
      <DeleteSelectedButton/>
    </div>
  )
}
export default TableSettings