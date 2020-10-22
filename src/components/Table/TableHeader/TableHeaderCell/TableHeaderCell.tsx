import {changeFilterByAction, filterDataAction, sortDataAction} from "../../../../actions";
import React from "react";
import styles from "./TableHeaderCell.module.css"
import {useDispatch, useSelector} from "react-redux";
import {filterBySelector, sortedBySelector} from "../../../../selector/selector";
import {PersonType} from "../../../../types";
import {CaretDownOutlined, CaretUpOutlined, SearchOutlined} from "@ant-design/icons";
import {Button, Input, Popover} from "antd";

interface TableHeaderCellProps {
  name: Partial<keyof PersonType>;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({name}) => {
  const dispatch = useDispatch();
  const isSorted = useSelector(sortedBySelector)
  const text = useSelector(filterBySelector)[name]

  const imgAscentStyle = isSorted[name] === "ascent" ? styles.img__ascent_active : styles.img__ascent
  const imgDecentStyle = isSorted[name] === "decent" ? styles.img__decent_active : styles.img__decent
  const cellStyle = isSorted[name]
    ? `${styles.th_active} ${styles.th_container}`
    : styles.th_container;


  const onKeyPressHandler = (event: any) => {
    if (event.keyCode === 13) {
      dispatch(filterDataAction(name, true))
    }
  }

  const title = <div>
    <Input value={text} placeholder={`Search ${name}`} onKeyDown={(event) => onKeyPressHandler(event)}
           onChange={(event) =>
             dispatch(changeFilterByAction(name, event.target.value))}/>
  </div>

  const content = (
    <div>
      <Button onClick={(event) =>
        dispatch(filterDataAction(name, true))}>search</Button>
      <Button onClick={(event) =>
        dispatch(filterDataAction(name, false))}>reset</Button>
    </div>
  );

  return (
    <th className={styles.th}>
      <div className={cellStyle}>
        <span className={styles.sort__btn}>
          <CaretUpOutlined
            className={imgAscentStyle}
            onClick={() => dispatch(sortDataAction(name, "ascent"))}/>
            <CaretDownOutlined
              className={imgDecentStyle}
              onClick={() => dispatch(sortDataAction(name, "decent"))}/>
        </span>
        <p>{name}</p>
        <Popover content={content}
                 title={title}
                 trigger="click"
                 className={styles.search}>
          <SearchOutlined/>
        </Popover>
      </div>
    </th>
  )
}
export default TableHeaderCell