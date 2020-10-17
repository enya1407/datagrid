import {PersonType} from "../types";

export const changeNameAction = (name: string) => ({
  type: "CHANGE_NAME",
  payload: {name},
})

export const changeSecondNameAction = (secondName: string) => ({
  type: "CHANGE_SECOND_NAME",
  payload: {secondName},
})
export const changePersonAction = (persons: Array<PersonType>) => ({
  type: "CHANGE_PERSON",
  payload: {persons},
})
export const changeLoadingAction = (isLoading: boolean) => ({
  type: "CHANGE_LOADING",
  payload: {isLoading},
})


