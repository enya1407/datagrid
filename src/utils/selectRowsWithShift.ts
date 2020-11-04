import {PersonType} from "../types";

const selectRowsWithShift = (persons: Array<PersonType>, highlightedRows: Array<number>, id: number) => {
  if (highlightedRows.length === 0) return [...highlightedRows, id]

  const activePersonsId = persons.map((el: PersonType) => el.id);
  const lastAddedIndex = activePersonsId.indexOf(highlightedRows[highlightedRows.length - 1]);
  const currentAddedIndex = activePersonsId.indexOf(id);
  let shiftAdded: Array<number> = [];

  if (currentAddedIndex > lastAddedIndex) {
    shiftAdded = activePersonsId.slice(lastAddedIndex, currentAddedIndex + 1);
  } else if (currentAddedIndex < lastAddedIndex) {
    shiftAdded = activePersonsId.slice(currentAddedIndex, lastAddedIndex + 1);
  } else {
    shiftAdded = [currentAddedIndex];
  }

  return [...highlightedRows, ...shiftAdded];
}

export default selectRowsWithShift