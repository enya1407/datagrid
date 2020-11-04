import React from "react";
import {Button, Col, InputNumber, Row} from "antd";
import {changeVisibilityRowsAction, changeVisibilityRowsDataAction} from "../../../../actions";
import {useDispatch, useSelector} from "react-redux";
import {visibilityRowsSelector} from "../../../../selector/selector";
import styles from "./VisibilityRow.module.css"

const VisibilityRow = () => {
  const isVisibility = useSelector(visibilityRowsSelector)
  const dispatch = useDispatch();
  const onKeyPressHandler = (event: any) => {
    if (event.keyCode === 13) {
      dispatch(changeVisibilityRowsAction())
    }
  }

  return (
    <Col>
      <Row justify="center" gutter={10}>
        <Col>
          <p className={styles.p}>Row count</p>
          <p className={styles.p}>(1-1000):</p>
        </Col>
        <Col>
          <InputNumber min={1} max={1000} precision={0} value={isVisibility}
                       onChange={(event) => dispatch(changeVisibilityRowsDataAction(Number(event)))}
                       onKeyDown={(event) => onKeyPressHandler(event)}
          />
        </Col>

      </Row>
      <Row justify="center">
        <Button className={styles.button} onClick={() => dispatch(changeVisibilityRowsAction())}>
          Send
        </Button>
      </Row>
    </Col>
  )
}
export default VisibilityRow