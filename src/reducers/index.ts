import {StateType} from '../types/index';
import {
  changeFilterByAction,
  changeInitialPersonAction,
  changeLoadingAction,
  changeVisibilityBooleansAction,
  changeVisibilityColumnsAction,
  changeVisibilityRowsAction,
  changeVisibilityRowsDataAction,
  filterDataAction,
  isAsyncAction,
  sortDataAction
} from "../actions";
import {createRootReducer} from "../utils/createRootReducer";
import sortPersons from "../utils/sortPersons";
import {filterPersons, filterPersonsByBoolean} from "../utils/filterPersons";

const initialState: StateType = {
  isLoading: false,
  initialDataPersons: [],
  currentDataPersons: [],
  sortedBy: {},
  filterBy: {},
  visibilityColumns: {
    id: true,
    gender: true,
    "first_name": true,
    "last_name": true,
    "shirt_size": true,
    "app_name": true,
    "boolean": true,
  },
  visibilityRows: 1000,
  visibilityBoolean: {showTrue: true, showFalse: true},
  isAsync: false
}

const isAsyncReducer = (state: StateType, action: ReturnType<typeof isAsyncAction>) => ({
  ...state,
  isAsync: !state.isAsync
});


const changeVisibilityBooleansReducer = (
  state: StateType,
  action: ReturnType<typeof changeVisibilityBooleansAction>,
) => {
  const {keyName} = action.payload;

  const visibilityBoolean = {
    ...state.visibilityBoolean,
    [keyName]: !state.visibilityBoolean[keyName]
  };
  const filteredByBoolean = filterPersonsByBoolean(state.initialDataPersons.slice(0, state.visibilityRows), visibilityBoolean);
  const filteredPersons = filterPersons(filteredByBoolean, state.filterBy);
  const sortedPersons = sortPersons(filteredPersons, state.sortedBy)

  return ({
    ...state,
    currentDataPersons: sortedPersons,
    visibilityBoolean,
  })
}


const changeVisibilityRowsReducer = (state: StateType, action: ReturnType<typeof changeVisibilityRowsAction>) => {
  const filteredByBoolean = filterPersonsByBoolean(state.initialDataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  const filteredPersons = filterPersons(filteredByBoolean, state.filterBy);
  const sortedPersons = sortPersons(filteredPersons, state.sortedBy)

  return ({
    ...state,
    currentDataPersons: sortedPersons
  })
}
const changeVisibilityRowsDataReducer = (state: StateType, action: ReturnType<typeof changeVisibilityRowsDataAction>) => ({
  ...state,
  visibilityRows: action.payload.num
})
const changeVisibilityColumnsReducer = (state: StateType, action: ReturnType<typeof changeVisibilityColumnsAction>) => ({
  ...state,
  visibilityColumns: {
    ...state.visibilityColumns,
    [action.payload.keyName]: !state.visibilityColumns[action.payload.keyName],
  }
})

const filterDataReducer = (state: StateType, action: ReturnType<typeof filterDataAction>) => {
  const {keyName} = action.payload;

  const filterBy = {
    ...state.filterBy,
    [keyName]: undefined
  };

  const filteredByBoolean = filterPersonsByBoolean(state.initialDataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  const filteredPersons = filterPersons(filteredByBoolean, state.filterBy)
  const sortedPersons = sortPersons(filteredPersons, state.sortedBy)

  return action.payload.searchButton
    ? {
      ...state,
      currentDataPersons: sortedPersons
    }
    : {
      ...state,
      currentDataPersons: filterPersons(filteredPersons, filterBy)

    };
}


const changeFilterByReducer = (state: StateType, action: ReturnType<typeof changeFilterByAction>) => ({
  ...state,
  filterBy: {
    ...initialState.filterBy,
    [action.payload.keyName]: action.payload.filterBy,
  },
});
const changeLoadingReducer = (state: StateType, action: ReturnType<typeof changeLoadingAction>) => ({
  ...state,
  isLoading: action.payload.isLoading,
});

const changeInitialPersonReducer = (state: StateType, action: ReturnType<typeof changeInitialPersonAction>) => ({
  ...state,
  initialDataPersons: action.payload.persons,
  currentDataPersons: action.payload.persons,
  isLoading: false,
});

const sortDataReducer = (state: StateType, action: ReturnType<typeof sortDataAction>) => {
  const keyName = action.payload.keyName;
  const direction = action.payload.direction;

  const sortedBy = {
    [keyName]: direction
  };
  const filteredByBoolean = filterPersonsByBoolean(state.initialDataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  const filteredPersons = filterPersons(filteredByBoolean, state.filterBy);

  switch (state.sortedBy[keyName]) {
    case direction:
      return ({
        ...state,
        currentDataPersons: filteredPersons,
        sortedBy: {
          ...sortedBy,
          [keyName]: undefined
        }
      })

    default:
      return ({
        ...state,
        currentDataPersons: sortPersons(filteredPersons, sortedBy),
        sortedBy
      })
  }

};

export const rootReducer = createRootReducer(initialState)([
  [changeInitialPersonReducer, changeInitialPersonAction],
  [sortDataReducer, sortDataAction],
  [changeLoadingReducer, changeLoadingAction],
  [changeFilterByReducer, changeFilterByAction],
  [filterDataReducer, filterDataAction],
  [changeVisibilityColumnsReducer, changeVisibilityColumnsAction],
  [changeVisibilityRowsDataReducer, changeVisibilityRowsDataAction],
  [changeVisibilityRowsReducer, changeVisibilityRowsAction],
  [changeVisibilityBooleansReducer, changeVisibilityBooleansAction],
  [isAsyncReducer, isAsyncAction]
]);