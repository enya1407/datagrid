import React from 'react';
import styles from './Table.module.css';
import TableRow from './TableRow/TableRow';
import TableHeader from './TableHeader/TableHeader';
import { useSelector } from 'react-redux';
import { PersonType } from '../../types';
import { commonSelector } from '../../selector/selector';
import { Spin } from 'antd';
import TableSettings from './TableSettings/TableSettings';
import Virtualization from './Virtualization';

const Table = () => {
  const { isLoading, currentDataPersons, isVirtualize } = useSelector(
    commonSelector
  );

  const rows = currentDataPersons.map((person: PersonType) => {
    return <TableRow key={person.id} person={person} />;
  });

  if (isLoading) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.table}>
      <TableSettings />
      <TableHeader />
      <div style={{ backgroundColor: 'white' }}>
        {' '}
        {isVirtualize ? <Virtualization /> : rows}
      </div>
    </div>
  );
};

export default Table;
