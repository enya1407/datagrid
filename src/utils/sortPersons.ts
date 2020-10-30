import {PersonType} from "../types";

const genderMap = {
  Male: 1,
  Female: 2,
}

const sizeMap = {
  "3XL": 1,
  "2XL": 2,
  "XL": 3,
  "L": 4,
  "M": 5,
  "S": 6,
  "XS": 7,
}
const numberSort = (sortedBy: "ascent" | "decent", key: keyof PersonType) =>
  sortedBy === "ascent"
    ? (a: PersonType, b: PersonType) => a[key] > b[key] ? 1 : -1
    : (a: PersonType, b: PersonType) => a[key] > b[key] ? -1 : 1;

const stringSort = (sortedBy: "ascent" | "decent", key: keyof PersonType) =>
  sortedBy === "ascent"
    ? (a: PersonType, b: PersonType) => (a[key] as string).toLowerCase() > (b[key] as string).toLowerCase() ? 1 : -1
    : (a: PersonType, b: PersonType) => (a[key] as string).toLowerCase() > (b[key] as string).toLowerCase() ? -1 : 1;

const genderSort = (sortedBy: "ascent" | "decent") =>
  sortedBy === "ascent"
    ? (a: PersonType, b: PersonType) => {
      if (genderMap[a.gender] > genderMap[b.gender]) {
        return 1;
      }
      if (genderMap[a.gender] < genderMap[b.gender]) {
        return -1;
      }
      return 0;
    }
    : (a: PersonType, b: PersonType) => {
      if (genderMap[a.gender] > genderMap[b.gender]) {
        return -1;
      }
      if (genderMap[a.gender] < genderMap[b.gender]) {
        return 1;
      }
      return 0;
    }

const sizeSort = (sortedBy: "ascent" | "decent") =>
  sortedBy === "ascent"
    ? (a: PersonType, b: PersonType) => {
      if (sizeMap[a.shirt_size] > sizeMap[b.shirt_size]) {
        return 1;
      }
      if (sizeMap[a.shirt_size] < sizeMap[b.shirt_size]) {
        return -1;
      }
      return 0;
    }
    : (a: PersonType, b: PersonType) => {
      if (sizeMap[a.shirt_size] > sizeMap[b.shirt_size]) {
        return -1;
      }
      if (sizeMap[a.shirt_size] < sizeMap[b.shirt_size]) {
        return 1;
      }
      return 0;
    }


const booleanSort = (sortedBy: "ascent" | "decent", key: keyof PersonType) =>
  sortedBy === "ascent"
    ? (a: PersonType, b: PersonType) => {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
      return 0;
    }
    : (a: PersonType, b: PersonType) => {
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] < b[key]) {
        return 1;
      }
      return 0;
    }

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
  if (sortedBy.id) {
    return newPersons.sort(sortFunctionMap(sortedBy.id).id);
  } else if (sortedBy.gender) {
    return newPersons.sort(sortFunctionMap(sortedBy.gender).gender);
  } else if (sortedBy.first_name) {
    return newPersons.sort(sortFunctionMap(sortedBy.first_name).first_name);
  } else if (sortedBy.last_name) {
    return newPersons.sort(sortFunctionMap(sortedBy.last_name).last_name);
  } else if (sortedBy.shirt_size) {
    return newPersons.sort(sortFunctionMap(sortedBy.shirt_size).shirt_size);
  } else if (sortedBy.app_name) {
    return newPersons.sort(sortFunctionMap(sortedBy.app_name).app_name);
  } else if (sortedBy.boolean) {
    return newPersons.sort(sortFunctionMap(sortedBy.boolean).boolean);
  } else {
    return newPersons
  }

}
export default sortPersons