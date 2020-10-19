import {PersonType, StateType} from "../types";

export const commonSelector = (state: StateType) => state

export const personsSelector = (state: StateType): Array<PersonType> => state.currentDataPersons;
export const loadingSelector = (state: StateType): boolean => state.isLoading;
