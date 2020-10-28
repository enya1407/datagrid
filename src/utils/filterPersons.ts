import {PersonType, VisibilityBoolean} from "../types";

const stringFilter = (filterBy: string, key: keyof PersonType) =>
  (el: PersonType) => (el[key] as string).toLowerCase().includes(filterBy.toLowerCase())


const sortFunctionMap = (filterBy: string) => ({
  gender: stringFilter(filterBy, "gender"),
  "first_name": stringFilter(filterBy, "first_name"),
  "last_name": stringFilter(filterBy, "last_name"),
  "shirt_size": stringFilter(filterBy, "shirt_size"),
  "app_name": stringFilter(filterBy, "app_name"),
})
export const filterPersons = (filteredPersons: Array<PersonType>, filterBy: Partial<Record<keyof PersonType, string>>) => {

  if (filterBy.gender) {
    return filteredPersons.filter(sortFunctionMap(filterBy.gender).gender);
  }
  if (filterBy.first_name) {
    return filteredPersons.filter(sortFunctionMap(filterBy.first_name).first_name);
  }
  if (filterBy.last_name) {
    return filteredPersons.filter(sortFunctionMap(filterBy.last_name).last_name);
  }
  if (filterBy.shirt_size) {
    return filteredPersons.filter(sortFunctionMap(filterBy.shirt_size).shirt_size);
  }
  if (filterBy.app_name) {
    return filteredPersons.filter(sortFunctionMap(filterBy.app_name).app_name);
  } else {
    return filteredPersons
  }

}


export const filterPersonsByBoolean = (
  dataPersons: Array<PersonType>,
  visibilityBoolean: VisibilityBoolean,
): PersonType[] => {
  if (visibilityBoolean.showTrue && visibilityBoolean.showFalse) {
    return dataPersons;
  } else if (!visibilityBoolean.showTrue && !visibilityBoolean.showFalse) {
    return [];
  } else if (!visibilityBoolean.showTrue) {
    return dataPersons.filter(person => !person.boolean)
  } else { // !visibilityBoolean.false
    return dataPersons.filter(person => person.boolean)
  }
}
