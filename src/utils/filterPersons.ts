import {PersonType} from "../types";

const stringFilter = (filterBy: string, key: keyof PersonType) =>
  (el: PersonType) => (el[key] as string).toLowerCase().includes(filterBy.toLowerCase())

const numberFilter = (filterBy: string, key: keyof PersonType) =>
  (el: PersonType) => (el[key].toString()).includes(filterBy)

const sortFunctionMap = (filterBy: string) => ({
  id: numberFilter(filterBy, "id"),
  gender: stringFilter(filterBy, "gender"),
  "first_name": stringFilter(filterBy, "first_name"),
  "last_name": stringFilter(filterBy, "last_name"),
  "shirt_size": stringFilter(filterBy, "shirt_size"),
  "app_name": stringFilter(filterBy, "app_name"),
  "app_version": numberFilter(filterBy, "app_version"),
})
const filterPersons = (currentDataPersons: Array<PersonType>, key: keyof PersonType, filterBy: string) => {
  const newPersons = [...currentDataPersons];
  return newPersons.filter(sortFunctionMap(filterBy)[key]);
}

export default filterPersons