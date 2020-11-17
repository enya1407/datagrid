import {
  Gender,
  PersonType,
  ShirtSize,
  StateType,
  VisibilityBoolean,
} from '../types';

export const loadDataQueryStringParamsAction = (params: string) => ({
  type: 'LOAD_DATA_QUERY_STRING_ACTION',
  payload: { params },
});
export const loadOldParamsAction = (params: StateType) => ({
  type: 'LOAD_OLD_PARAMS_ACTION',
  payload: { params },
});
export const writeRawDataAction = (persons: Array<PersonType>) => ({
  type: 'CHANGE_INITIAL_PERSON',
  payload: { persons },
});
export const sortDataAction = (
  keyName: keyof PersonType,
  direction: 'ascent' | 'decent'
) => ({
  type: 'SORT_DATA',
  payload: { keyName, direction },
});
export const changeLoadingAction = (isLoading: boolean) => ({
  type: 'CHANGE_LOADING',
  payload: { isLoading },
});

export const changeSearchedValueAction = (searchedValue: string) => ({
  type: 'CHANGE_SEARCH_VALUE',
  payload: { searchedValue },
});
export const changeFilterByAction = (filterBy: keyof PersonType) => ({
  type: 'FILTER_BU',
  payload: { filterBy },
});
export const filterDataAction = (search: boolean) => ({
  type: 'START_FILTERING',
  payload: { search },
});
export const changeVisibilityColumnsAction = (keyName: keyof PersonType) => ({
  type: 'CHANGE_VISIBILITY_COLUMNS',
  payload: { keyName },
});
export const changeVisibilityRowsDataAction = (num: number) => ({
  type: 'CHANGE_VISIBILITY_ROWS_DATA',
  payload: { num },
});
export const changeVisibilityRowsAction = () => ({
  type: 'CHANGE_VISIBILITY_ROWS',
});
export const changeVisibilityBooleansAction = (
  keyName: keyof VisibilityBoolean
) => ({
  type: 'CHANGE_VISIBILITY_BOOLEAN',
  payload: { keyName },
});
export const isAsyncAction = () => ({
  type: 'IS_ASYNC',
});
export const isVirtualizeAction = () => ({
  type: 'IS_VIRTUALIZE',
});

export const changeVisibilityGenderAction = (keyName: keyof Gender) => ({
  type: 'CHANGE_VISIBILITY_GENDER',
  payload: { keyName },
});
export const changeVisibilityShirtSizeAction = (keyName: keyof ShirtSize) => ({
  type: 'CHANGE_VISIBILITY_SHIRT_SIZE',
  payload: { keyName },
});
export const changeHighlightedRowsAction = (
  id: number,
  pressedButton: string
) => ({
  type: 'CHANGE_HIGHLIGHTED_ROWS',
  payload: { id, pressedButton },
});
export const deleteRowsAction = (selected: number) => ({
  type: 'DELETE_ROWS',
  payload: { selected },
});
export const changeVisibleRowVirtualizationAction = (
  numberVisibilityRows: Array<number>,
  heightEmptyContainers: Array<number>
) => ({
  type: 'CHANGE_VISIBLE_ROWS_VIRTUALIZATION',
  payload: { numberVisibilityRows, heightEmptyContainers },
});
