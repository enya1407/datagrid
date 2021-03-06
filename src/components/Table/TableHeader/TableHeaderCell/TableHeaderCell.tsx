import { sortDataAction } from '../../../../actions';
import React from 'react';
import styles from './TableHeaderCell.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { sortedBySelector } from '../../../../selector/selector';
import { PersonType } from '../../../../types';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { Popover } from 'antd';
import BooleanContent from './FilterContent/BooleanContent';
import GenderContent from './FilterContent/GenderContent';
import ShirtSizeContent from './FilterContent/ShirtSizeContent';

interface TableHeaderCellProps {
  name: Partial<keyof PersonType>;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ name }) => {
  const dispatch = useDispatch();
  const isSorted = useSelector(sortedBySelector);

  const cellWidth = () => {
    switch (name) {
      case 'id':
        return `${styles.th} ${styles.narrow}`;
      case 'gender':
      case 'boolean':
      case 'shirt_size':
        return `${styles.th} ${styles.average}`;
      default:
        return `${styles.th} ${styles.wide}`;
    }
  };

  const imgAscentStyle =
    isSorted[name] === 'ascent'
      ? styles.img__ascent_active
      : styles.img__ascent;
  const imgDecentStyle =
    isSorted[name] === 'decent'
      ? styles.img__decent_active
      : styles.img__decent;
  const cellStyle = isSorted[name]
    ? `${styles.th_active} ${styles.th_container}`
    : styles.th_container;

  const content = () => {
    switch (name) {
      case 'gender':
        return GenderContent();
      case 'shirt_size':
        return ShirtSizeContent();
      case 'boolean':
        return BooleanContent();
    }
  };

  const filterInPossible =
    name === 'gender' || name === 'shirt_size' || name === 'boolean' ? (
      <Popover content={content} trigger="click" className={styles.search}>
        <FilterOutlined className={styles.img__search} />
      </Popover>
    ) : (
      <span />
    );

  return (
    <div className={cellWidth()}>
      <div className={cellStyle}>
        <span className={styles.sort__btn}>
          <CaretUpOutlined
            className={imgAscentStyle}
            onClick={() => dispatch(sortDataAction(name, 'ascent'))}
          />
          <CaretDownOutlined
            className={imgDecentStyle}
            onClick={() => dispatch(sortDataAction(name, 'decent'))}
          />
        </span>
        <p className={styles.p}>{name}</p>
        {filterInPossible}
      </div>
    </div>
  );
};
export default TableHeaderCell;
