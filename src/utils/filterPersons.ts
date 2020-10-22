import {PersonType} from "../types";

const stringFilter = (key: keyof PersonType, filterBy: string) =>
  (el: PersonType) => (el[key] as string).toLowerCase().includes(filterBy.toLowerCase())

const filterPersons = (currentDataPersons: Array<PersonType>, key: keyof PersonType, filterBy: string) => {
  const newPersons = [...currentDataPersons];

  return newPersons.filter(stringFilter(key, filterBy));
}

export default filterPersons