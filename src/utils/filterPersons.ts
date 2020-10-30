import {Gender, PersonType, ShirtSize, VisibilityBoolean} from "../types";

const stringFilter = (filterBy: string, key: keyof PersonType) =>
  (el: PersonType) => (el[key] as string).toLowerCase().includes(filterBy.toLowerCase())

export const filterPersons = (filteredPersons: Array<PersonType>, filterBy: Partial<Record<keyof PersonType, string>>,) => {
  if (filterBy.first_name) {
    return filteredPersons.filter(stringFilter(filterBy["first_name"], "first_name"));
  }
  if (filterBy.last_name) {
    return filteredPersons.filter(stringFilter(filterBy["last_name"], "last_name"));
  }
  if (filterBy.app_name) {
    return filteredPersons.filter(stringFilter(filterBy["app_name"], "app_name"));
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

export const filterPersonsByGender = (dataPersons: Array<PersonType>, visibilityGender: Record<keyof Gender, boolean>) => {
  if (!visibilityGender.Male && !visibilityGender.Female) {
    return []
  }
  if (visibilityGender.Male && visibilityGender.Female) {
    return dataPersons
  } else if (visibilityGender.Male) {
    return dataPersons.filter(person => person.gender === "Male")
  } else {
    return dataPersons.filter(person => person.gender === "Female")
  }
}
export const filterPersonsByShirtSize = (dataPersons: Array<PersonType>, visibilityShirtSize: Record<keyof ShirtSize, boolean>) => {
  const visibilityValue = Object.entries(visibilityShirtSize).filter(el => el[1] === true).map(el => el[0])
  console.log(visibilityValue)
  if (
    !visibilityShirtSize["2XL"] &&
    !visibilityShirtSize.XL &&
    !visibilityShirtSize.L &&
    !visibilityShirtSize.M &&
    !visibilityShirtSize.S &&
    !visibilityShirtSize.XS) {
    return []
  } else if (
    visibilityShirtSize["2XL"] &&
    visibilityShirtSize.XL &&
    visibilityShirtSize.L &&
    visibilityShirtSize.M &&
    visibilityShirtSize.S &&
    visibilityShirtSize.XS
  ) {
    return dataPersons
  } else {
    return dataPersons.filter((el) => visibilityValue.includes(el["shirt_size"]))
  }
}