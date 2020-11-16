import {Gender, PersonType, ShirtSize, VisibilityBoolean} from "../types";

const stringFilter = (filterBy: keyof PersonType, searchedValue: string,) =>
  (el: PersonType) => (el[filterBy] as string).toLowerCase().includes(searchedValue.toLowerCase())

export const filterPersons = (filteredPersons: Array<PersonType>, filterBy: Partial<Record<keyof PersonType, boolean>>, searchedValue: string | undefined) => {
  if ((!filterBy.first_name && !filterBy.last_name && !filterBy.app_name) || !searchedValue) return filteredPersons;
  let newArray = [...filteredPersons]

  if (filterBy.first_name) {
    newArray = newArray.filter(stringFilter("first_name", searchedValue));
  }
  if (filterBy.last_name) {
    newArray = newArray.filter(stringFilter("last_name", searchedValue));
  }
  if (filterBy.app_name) {
    newArray = newArray.filter(stringFilter("app_name", searchedValue));
  }
  return newArray
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
  if (
    !visibilityShirtSize["3XL"] &&
    !visibilityShirtSize["2XL"] &&
    !visibilityShirtSize.XL &&
    !visibilityShirtSize.L &&
    !visibilityShirtSize.M &&
    !visibilityShirtSize.S &&
    !visibilityShirtSize.XS) {
    return []
  } else if (
    visibilityShirtSize["3XL"] &&
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