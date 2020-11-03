import {PersonType} from "../types";

const deleteRows = (data: Array<PersonType>, highlightedRows: Array<number>, selected: number | undefined) =>
  selected === 0
    ? data.filter(el => !highlightedRows.includes(el.id))
    : data.filter(el => el.id !== selected)


export default deleteRows