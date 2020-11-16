import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {personsSelector} from "../selector/selector";
import {PersonType} from "../types";
import TableRow from "../components/Table/TableRow/TableRow";

const Virtualization = () => {
  // const dispatch = useDispatch()
  const currentDataPersons = useSelector(personsSelector)
  // const {numberVisibilityRows, heightEmptyContainers} = useSelector(visibleRowVirtualizationSelector)

  const [numberVisibilityRows, setNumberVisibilityRows] = useState([0, 55]);
  const [heightEmptyContainers, setHeightEmptyContainers] = useState([0, 33193 - 30 * 33]);

  const fixedPartHeight = 193
  const rowHeight = 33
  const totalHeight = fixedPartHeight + rowHeight * currentDataPersons.length;
  let currentYOffset = window.pageYOffset

  const stringVirtualization = () => {
    const windowHeight = window.innerHeight
    const yOffset = window.pageYOffset
    const visiblePartTableHeight = windowHeight - fixedPartHeight;
    const numberRowRendered = Math.floor(visiblePartTableHeight / rowHeight) + 5
    const indexOfFirstElement = Math.floor(Math.floor(yOffset) / rowHeight)

    const newHeightEmptyContainers = (rowHeight * currentDataPersons.length < visiblePartTableHeight)
      ? [0, 0]
      : [indexOfFirstElement * rowHeight, totalHeight - fixedPartHeight - indexOfFirstElement * rowHeight]

    const newNumberVisibilityRows = (yOffset < currentYOffset)
      ? [indexOfFirstElement, numberRowRendered + indexOfFirstElement]
      : [indexOfFirstElement, numberRowRendered + indexOfFirstElement + 30]

    setNumberVisibilityRows(newNumberVisibilityRows)
    setHeightEmptyContainers(newHeightEmptyContainers)
    // dispatch(changeVisibleRowVirtualizationAction(
    //   [indexOfFirstElement, numberRowRendered + indexOfFirstElement],
    //   heightEmptyContainers,
    //   ),
    // );
    currentYOffset = yOffset

  }

  // console.log(virtualization[1][0], virtualization[1][1])
  useEffect(() => {
    document.addEventListener('scroll', stringVirtualization);
    // stringVirtualization();
    return (): void => {
      document.removeEventListener('scroll', stringVirtualization);
    };
  }, []);

  const rows = currentDataPersons.slice(numberVisibilityRows[0], numberVisibilityRows[1]).map((person: PersonType) => {
    return <TableRow key={person.id} person={person}/>
  })

  return (
    <div>
      <div style={{height: `${heightEmptyContainers[0]}px`}}/>
      <div>{rows}</div>
      <div style={{height: `${heightEmptyContainers[1]}px`}}/>
    </div>
  )
}
export default Virtualization
