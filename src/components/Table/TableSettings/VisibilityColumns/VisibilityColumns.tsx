import { Button, Popover } from 'antd';
import React from 'react';
import { PersonType } from '../../../../types';
import styles from './VisibilityColumns.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { visibilityColumnsSelector } from '../../../../selector/selector';
import { changeVisibilityColumnsAction } from '../../../../actions';

const VisibilityColumns = () => {
  const isVisibility = useSelector(visibilityColumnsSelector);
  const dispatch = useDispatch();
  const ArrCellName: Array<keyof PersonType> = [
    'id',
    'first_name',
    'last_name',
    'gender',
    'shirt_size',
    'app_name',
    'boolean',
  ];

  const columns = ArrCellName.map(
    (data: Partial<keyof PersonType>, i: number) => (
      <div key={i}>
        <input
          type="checkbox"
          checked={isVisibility[data]}
          className={styles.input}
          onChange={() => dispatch(changeVisibilityColumnsAction(data))}
        />
        {data}
      </div>
    )
  );

  return (
    <Popover content={columns}>
      <Button>Show columns</Button>
    </Popover>
  );
};

export default VisibilityColumns;
