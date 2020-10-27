import React from "react";
import {Button, Col, InputNumber, Row} from "antd";
import {changeVisibilityRowsAction, changeVisibilityRowsDataAction} from "../../../../actions";
import {useDispatch, useSelector} from "react-redux";
import {visibilityRowsSelector} from "../../../../selector/selector";

const VisibilityRow = () => {
  const isVisibility = useSelector(visibilityRowsSelector)
  const dispatch = useDispatch();
  const onKeyPressHandler = (event: any) => {
    if (event.keyCode === 13) {
      dispatch(changeVisibilityRowsAction())
    }
  }

  return (
    <Row justify="center" gutter={24} style={{marginTop: "16px"}}>
      <Col>
        Row count(1-1000):
      </Col>
      <Col>
        <InputNumber min={1} max={1000} precision={0} value={isVisibility}
                     onChange={(event) => dispatch(changeVisibilityRowsDataAction(Number(event)))}
                     onKeyDown={(event) => onKeyPressHandler(event)}
        />
      </Col>
      <Col>
        <Button onClick={() => dispatch(changeVisibilityRowsAction())}>
          Send
        </Button>
      </Col>
    </Row>
  )
}
export default VisibilityRow