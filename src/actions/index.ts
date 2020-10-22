import {PersonType} from "../types";

export const changeInitialPersonAction = (persons: Array<PersonType>) => ({
  type: "CHANGE_INITIAL_PERSON",
  payload: {persons},
})
export const sortDataAction = (keyName: keyof PersonType, direction: "ascent" | "decent") => ({
  type: "SORT_DATA",
  payload: {keyName, direction},
})
export const changeLoadingAction = (isLoading: boolean) => ({
  type: "CHANGE_LOADING",
  payload: {isLoading},
})
export const changeFilterByAction = (keyName: keyof PersonType, filterBy: string) => ({
  type: "FILTER_BU",
  payload: {keyName, filterBy},
})
export const filterDataAction = (keyName: keyof PersonType, searchButton: boolean) => ({
  type: "START_FILTERING",
  payload: {keyName, searchButton},
})


