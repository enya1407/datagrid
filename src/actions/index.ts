import {PersonType} from "../types";

export const changeInitialPersonAction = (persons: Array<PersonType>) => ({
  type: "CHANGE_INITIAL_PERSON",
  payload: {persons},
})
export const sortDataAction = (keyName: keyof PersonType) => ({
  type: "SORT_DATA",
  payload: {keyName},
})
export const changeLoadingAction = (isLoading: boolean) => ({
  type: "CHANGE_LOADING",
  payload: {isLoading},
})


