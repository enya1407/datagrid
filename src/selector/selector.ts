import {PersonType, StateType, VisibilityBoolean} from "../types";

export const commonSelector = (state: StateType) => state

export const personsSelector = (state: StateType): Array<PersonType> => state.currentDataPersons;
export const loadingSelector = (state: StateType): boolean => state.isLoading;
export const sortedBySelector = (state: StateType): Partial<Record<keyof PersonType, "ascent" | "decent">> => state.sortedBy;
export const filterBySelector = (state: StateType): Partial<Record<keyof PersonType, string>> => state.filterBy;
export const visibilityColumnsSelector = (state: StateType): Record<keyof PersonType, boolean> => state.visibilityColumns;
export const visibilityRowsSelector = (state: StateType): number => state.visibilityRows;
export const visibilityBooleanSelector = (state: StateType): VisibilityBoolean => state.visibilityBoolean;
export const isAsyncSelector = (state: StateType): boolean => state.isAsync;


