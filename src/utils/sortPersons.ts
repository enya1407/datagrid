import {PersonType} from "../types";

const genderMap = {
  Male: 1,
  Female: 2,
}

const sizeMap = {
  "3xl": 1,
  "2xl": 2,
  "xl": 3,
  "l": 4,
  "m": 5,
  "s": 6,
  "xs": 7,
}
const numberSort = (sortedBy: "ascent" | "decent", key: keyof PersonType) =>
  sortedBy === "ascent"
    ? (a: PersonType, b: PersonType) => a[key] > b[key] ? 1 : -1
    : (a: PersonType, b: PersonType) => a[key] > b[key] ? -1 : 1;

const genderSort = (sortedBy: "ascent" | "decent") =>
  sortedBy === "ascent"
    ? (a: PersonType, b: PersonType) => genderMap[a.gender] > genderMap[b.gender] ? 1 : -1
    : (a: PersonType, b: PersonType) => genderMap[a.gender] > genderMap[b.gender] ? -1 : 1;

const sizeSort = (sortedBy: "ascent" | "decent") =>
  sortedBy === "ascent"
    ? (a: PersonType, b: PersonType) => {
      console.log(sizeMap[a.shirt_size])
      if (sizeMap[a.shirt_size] > sizeMap[b.shirt_size]) {
        return 1;
      }
      if (sizeMap[a.shirt_size] < sizeMap[b.shirt_size]) {
        return -1;
      }
      return 0;
    }
    : (a: PersonType, b: PersonType) => {
      console.log("decent")
      if (sizeMap[a.shirt_size] > sizeMap[b.shirt_size]) {
        return -1;
      }
      if (sizeMap[a.shirt_size] < sizeMap[b.shirt_size]) {
        return 1;
      }
      return 0;
    }


const stringSort = (sortedBy: "ascent" | "decent", key: keyof PersonType) =>
  sortedBy === "ascent"
    ? (a: PersonType, b: PersonType) => (a[key] as string).toLowerCase() > (b[key] as string).toLowerCase() ? 1 : -1
    : (a: PersonType, b: PersonType) => (a[key] as string).toLowerCase() > (b[key] as string).toLowerCase() ? -1 : 1;

const booleanSort = (sortedBy: "ascent" | "decent", key: keyof PersonType) =>
  sortedBy === "ascent"
    ? (a: PersonType, b: PersonType) => a[key] > b[key] ? 1 : -1
    : (a: PersonType, b: PersonType) => a[key] > b[key] ? -1 : 1;


const sortFunctionMap = (sortedBy: "ascent" | "decent") => ({
  id: numberSort(sortedBy, "id"),
  gender: genderSort(sortedBy),
  "first_name": stringSort(sortedBy, "first_name"),
  "last_name": stringSort(sortedBy, "last_name"),
  "shirt_size": sizeSort(sortedBy),
  "app_name": stringSort(sortedBy, "app_name"),
  "boolean": booleanSort(sortedBy, "boolean"),
})

const sortPersons = (
  dataPersons: Array<PersonType>,
  sortedBy: Partial<Record<keyof PersonType, "ascent" | "decent">>
) => {
  const newPersons = [...dataPersons];

  if (sortedBy.gender) {
    return newPersons.sort(sortFunctionMap(sortedBy.gender).gender);
  }
  if (sortedBy.first_name) {
    return newPersons.sort(sortFunctionMap(sortedBy.first_name).first_name);
  }
  if (sortedBy.last_name) {
    return newPersons.sort(sortFunctionMap(sortedBy.last_name).last_name);
  }
  if (sortedBy.shirt_size) {
    return newPersons.sort(sortFunctionMap(sortedBy.shirt_size).shirt_size);
  }
  if (sortedBy.app_name) {
    return newPersons.sort(sortFunctionMap(sortedBy.app_name).app_name);
  } else {
    return newPersons
  }
  
}
export default sortPersons