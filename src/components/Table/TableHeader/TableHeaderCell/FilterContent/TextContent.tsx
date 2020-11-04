import React from "react";
import {Button, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {changeFilterByAction, filterDataAction} from "../../../../../actions";
import {PersonType} from "../../../../../types";
import {filterBySelector} from "../../../../../selector/selector";

import styles from "./FilterContent.module.css"

interface TextContentProps {
  name: Partial<keyof PersonType>;
}

const TextContent: React.FC<TextContentProps> = ({name}) => {
  const dispatch = useDispatch();
  const text = useSelector(filterBySelector)[name]

  const onKeyPressHandler = (event: any) => {
    if (event.keyCode === 13) {
      dispatch(filterDataAction(name, true))
    }
  }

  return (<div>
      <Input value={text} className={styles.input} autoFocus={true} placeholder={`Search ${name}`}
             onKeyDown={(event) => onKeyPressHandler(event)}
             onChange={(event) =>
               dispatch(changeFilterByAction(name, event.target.value))}/>
      <div>
        <Button onClick={(event) =>
          dispatch(filterDataAction(name, true))}>search</Button>
        <Button onClick={(event) =>
          dispatch(filterDataAction(name, false))}>reset</Button>
      </div>
    </div>
  )
}

export default TextContent