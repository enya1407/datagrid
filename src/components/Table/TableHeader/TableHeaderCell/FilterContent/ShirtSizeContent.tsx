import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {visibilityShirtSizeSelector} from "../../../../../selector/selector";
import {changeVisibilityShirtSizeAction} from "../../../../../actions";
import {ShirtSize} from "../../../../../types";
import styles from "../TableHeaderCell.module.css";


const ShirtSizeContent = () => {

  const shirtSizeCheckbox = useSelector(visibilityShirtSizeSelector)
  const dispatch = useDispatch();
  const arrShirtSize: Array<keyof ShirtSize> = ["3XL", "2XL", "XL", "L", "M", "S", "XS"]
  const contentByShirtSize = arrShirtSize.map((data: Partial<keyof ShirtSize>, i: number) => (
    <div key={i}>
      <input type="checkbox"
             checked={shirtSizeCheckbox[data]}
             className={styles.input}
             onChange={() => dispatch(changeVisibilityShirtSizeAction(data))}
      />
      {data}
    </div>));
  return (
    <div>{contentByShirtSize}</div>

  )
}

export default ShirtSizeContent