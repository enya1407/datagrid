import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  commonSelector,
  visibleRowVirtualizationSelector,
} from '../../selector/selector';
import TableRow from './TableRow/TableRow';
import { PersonType } from '../../types';
import { changeVisibleRowVirtualizationAction } from '../../actions';

const Virtualization = () => {
  const dispatch = useDispatch();
  const { currentDataPersons } = useSelector(commonSelector);
  const { numberVisibilityRows, heightEmptyContainers } = useSelector(
    visibleRowVirtualizationSelector
  );

  const windowHeight = window.innerHeight;
  const rowHeight = 33;
  const fixedPartHeight = 193;

  const stringVirtualization = () => {
    const yOffset = window.pageYOffset;
    const visiblePartTableHeight = windowHeight - fixedPartHeight;

    const numberRowRendered =
      Math.floor(visiblePartTableHeight / rowHeight) + 2;
    const indexOfFirstElement = Math.floor(Math.floor(yOffset) / rowHeight);
    const totalHeight = fixedPartHeight + rowHeight * currentDataPersons.length;

    const newNumberVisibilityRows =
      numberRowRendered + indexOfFirstElement > currentDataPersons.length
        ? [indexOfFirstElement, currentDataPersons.length]
        : [indexOfFirstElement, numberRowRendered + indexOfFirstElement];

    const newHeightEmptyContainers = () => {
      if (rowHeight * currentDataPersons.length < visiblePartTableHeight) {
        return [0, 0];
      } else if (
        newNumberVisibilityRows[1] - newNumberVisibilityRows[0] !==
        numberRowRendered
      ) {
        return [indexOfFirstElement * rowHeight, 0];
      } else {
        return [
          indexOfFirstElement * rowHeight,
          totalHeight - fixedPartHeight - indexOfFirstElement * rowHeight,
        ];
      }
    };

    dispatch(
      changeVisibleRowVirtualizationAction(
        newNumberVisibilityRows,
        newHeightEmptyContainers()
      )
    );
  };

  useEffect(() => {
    document.addEventListener('scroll', stringVirtualization);
    stringVirtualization();
    return (): void => {
      document.removeEventListener('scroll', stringVirtualization);
    };
  }, [currentDataPersons]);

  const rows = currentDataPersons
    .slice(numberVisibilityRows[0], numberVisibilityRows[1])
    .map((person: PersonType) => {
      return <TableRow key={person.id} person={person} />;
    });

  return (
    <div>
      <div style={{ height: `${heightEmptyContainers[0]}px` }} />
      <div>{rows}</div>
      <div style={{ height: `${heightEmptyContainers[1]}px` }} />
    </div>
  );
};
export default Virtualization;
