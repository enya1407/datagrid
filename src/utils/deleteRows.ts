import {PersonType} from "../types";

const deleteRows = (data: Array<PersonType>, highlightedRows: Array<number>) => {
  return data.filter(el => !highlightedRows.includes(el.id))
}
export default deleteRows