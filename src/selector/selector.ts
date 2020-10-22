import {PersonType, StateType} from "../types";

export const commonSelector = (state: StateType) => state

export const personsSelector = (state: StateType): Array<PersonType> => state.currentDataPersons;
export const loadingSelector = (state: StateType): boolean => state.isLoading;
export const sortedBySelector = (state: StateType): Record<keyof PersonType, string | undefined> => state.sortedBy;
export const filterBySelector = (state: StateType): Record<keyof PersonType, string> => state.filterBy;

