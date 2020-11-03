import {Gender, PersonType, ShirtSize, VisibilityBoolean} from "../types";

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
export const changeVisibilityColumnsAction = (keyName: keyof PersonType) => ({
  type: "CHANGE_VISIBILITY_COLUMNS",
  payload: {keyName},
})
export const changeVisibilityRowsDataAction = (num: number) => ({
  type: "CHANGE_VISIBILITY_ROWS_DATA",
  payload: {num},
})
export const changeVisibilityRowsAction = () => ({
  type: "CHANGE_VISIBILITY_ROWS",
})
export const changeVisibilityBooleansAction = (keyName: keyof VisibilityBoolean) => ({
  type: "CHANGE_VISIBILITY_BOOLEAN",
  payload: {keyName},
})
export const isAsyncAction = () => ({
  type: "IS_ASYNC",
})
export const changeVisibilityGenderAction = (keyName: keyof Gender) => ({
  type: "CHANGE_VISIBILITY_GENDER",
  payload: {keyName},
})
export const changeVisibilityShirtSizeAction = (keyName: keyof ShirtSize) => ({
  type: "CHANGE_VISIBILITY_SHIRT_SIZE",
  payload: {keyName},
})
export const changeHighlightedRowsAction = (keyName: number, ctrl: boolean) => ({
  type: "CHANGE_HIGHLIGHTED_ROWS",
  payload: {keyName, ctrl},
})
export const deleteRowsAction = () => ({
  type: "CHANGE_ROWS",
})










