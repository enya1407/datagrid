import { Button, Input, Popover } from 'antd';
import React from 'react';
import styles from './SearchButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFilterByAction,
  changeSearchedValueAction,
  filterDataAction,
} from '../../../../actions';
import {
  filterBySelector,
  searchedValueSelector,
} from '../../../../selector/selector';
import { PersonType } from '../../../../types';
import { SearchOutlined } from '@ant-design/icons';

const SearchButton = () => {
  const dispatch = useDispatch();
  const searchedValue = useSelector(searchedValueSelector);
  const filterBy = useSelector(filterBySelector);

  const onKeyPressHandler = (event: any) => {
    if (event.keyCode === 13) {
      dispatch(filterDataAction(true));
    }
  };

  const ArrCellName: Array<Partial<keyof PersonType>> = [
    'first_name',
    'last_name',
    'app_name',
  ];
  const content = ArrCellName.map((data: keyof PersonType, i: number) => (
    <div key={i}>
      <input
        type="checkbox"
        checked={filterBy[data]}
        className={styles.input}
        onChange={() => {
          dispatch(changeFilterByAction(data));
        }}
      />
      {data}
    </div>
  ));
  return (
    <div className={styles.search}>
      <Input
        type="text"
        value={searchedValue}
        placeholder="enter the string"
        className={styles.input__text}
        onKeyDown={(event) => onKeyPressHandler(event)}
        onChange={(event) => {
          dispatch(changeSearchedValueAction(event.target.value));
        }}
      />
      <Popover content={content}>
        <Button
          className={styles.button}
          onClick={() => dispatch(filterDataAction(true))}
        >
          <SearchOutlined />
        </Button>
        <Button
          className={styles.button}
          onClick={() => dispatch(filterDataAction(false))}
        >
          reset
        </Button>
      </Popover>
    </div>
  );
};

export default SearchButton;
