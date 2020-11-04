import {deleteRowsAction} from "../../../../actions";
import {Button} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {highlightedRowsSelector} from "../../../../selector/selector";

const DeleteSelectedButton = () => {
  const dispatch = useDispatch()
  const highlightedRows = useSelector(highlightedRowsSelector)

  return (<Button disabled={highlightedRows.length === 0} onClick={() => dispatch(deleteRowsAction(0))}>
    Delete selected rows
  </Button>)
}
export default DeleteSelectedButton
