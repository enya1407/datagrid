import {StateType} from '../types/index';
import {
  changeFilterByAction,
  changeHighlightedRowsAction,
  changeInitialPersonAction,
  changeLoadingAction,
  changeVisibilityBooleansAction,
  changeVisibilityColumnsAction,
  changeVisibilityGenderAction,
  changeVisibilityRowsAction,
  changeVisibilityRowsDataAction,
  changeVisibilityShirtSizeAction,
  deleteRowsAction,
  filterDataAction,
  isAsyncAction,
  sortDataAction
} from "../actions";
import {createRootReducer} from "../utils/createRootReducer";
import sortPersons from "../utils/sortPersons";
import {
  filterPersons,
  filterPersonsByBoolean,
  filterPersonsByGender,
  filterPersonsByShirtSize
} from "../utils/filterPersons";
import deleteRows from "../utils/deleteRows";

const initialState: StateType = {
  isLoading: false,
  initialDataPersons: [],
  currentDataPersons: [],
  sortedBy: {},
  filterBy: {},
  visibilityGender: {Male: true, Female: true},
  visibilityShirtSize: {"3XL": true, "2XL": true, "XL": true, "L": true, "M": true, "S": true, "XS": true},
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
  isAsync: false,
  highlightedRows: []
}
const changeHighlightedRowsReducer = (state: StateType, action: ReturnType<typeof changeHighlightedRowsAction>) => {
  const {keyName, ctrl} = action.payload;

  const oneLine = state.highlightedRows.includes(keyName)
    ? state.highlightedRows.filter(el => el !== keyName)
    : [...[], keyName];

  const multipleLine = state.highlightedRows.includes(keyName)
    ? state.highlightedRows.filter(el => el !== keyName)
    : [...state.highlightedRows, keyName];

  const highlightedRows = ctrl ? multipleLine : oneLine

  return ({
    ...state,
    highlightedRows
  });
}
const deleteRowsReducer = (state: StateType, action: ReturnType<typeof deleteRowsAction>) => ({
  ...state,
  initialDataPersons: deleteRows(state.initialDataPersons, state.highlightedRows),
  currentDataPersons: deleteRows(state.currentDataPersons, state.highlightedRows),
});


const changeVisibilityShirtSizeReducer = (state: StateType, action: ReturnType<typeof changeVisibilityShirtSizeAction>) => {
  const {keyName} = action.payload;
  const visibilityShirtSize = {
    ...state.visibilityShirtSize,
    [keyName]: !state.visibilityShirtSize[keyName]
  };
  const filteredByBoolean = filterPersonsByBoolean(state.initialDataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  const filterByGender = filterPersonsByGender(filteredByBoolean, state.visibilityGender)
  const filterByShirtSize = filterPersonsByShirtSize(filterByGender, visibilityShirtSize)
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy)
  const sortedPersons = sortPersons(filteredPersons, state.sortedBy)

  return ({
    ...state,
    currentDataPersons: sortedPersons,
    visibilityShirtSize
  });
}

const changeVisibilityGenderReducer = (state: StateType, action: ReturnType<typeof changeVisibilityGenderAction>) => {
  const {keyName} = action.payload;
  const visibilityGender = {
    ...state.visibilityGender,
    [keyName]: !state.visibilityGender[keyName]
  };
  const filteredByBoolean = filterPersonsByBoolean(state.initialDataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  const filterByGender = filterPersonsByGender(filteredByBoolean, visibilityGender)
  const filterByShirtSize = filterPersonsByShirtSize(filterByGender, state.visibilityShirtSize)
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy)
  const sortedPersons = sortPersons(filteredPersons, state.sortedBy)

  return ({
    ...state,
    currentDataPersons: sortedPersons,
    visibilityGender
  });
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
  const filterByGender = filterPersonsByGender(filteredByBoolean, state.visibilityGender)
  const filterByShirtSize = filterPersonsByShirtSize(filterByGender, state.visibilityShirtSize)
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy);
  const sortedPersons = sortPersons(filteredPersons, state.sortedBy)

  return ({
    ...state,
    currentDataPersons: sortedPersons,
    visibilityBoolean,
  })
}


const changeVisibilityRowsReducer = (state: StateType, action: ReturnType<typeof changeVisibilityRowsAction>) => {
  const filteredByBoolean = filterPersonsByBoolean(state.initialDataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  const filterByGender = filterPersonsByGender(filteredByBoolean, state.visibilityGender)
  const filterByShirtSize = filterPersonsByShirtSize(filterByGender, state.visibilityShirtSize)
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy);
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
  const filterByGender = filterPersonsByGender(filteredByBoolean, state.visibilityGender)
  const filterByShirtSize = filterPersonsByShirtSize(filterByGender, state.visibilityShirtSize)
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy)
  const sortedPersons = sortPersons(filteredPersons, state.sortedBy)

  return action.payload.searchButton
    ? {
      ...state,
      currentDataPersons: sortedPersons
    }
    : {
      ...state,
      currentDataPersons: filterPersons(filteredPersons, filterBy),
      filterBy
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

const changeInitialPersonReducer = (state: StateType, action: ReturnType<typeof changeInitialPersonAction>) => {
  const dataPersons = action.payload.persons
  const filteredByBoolean = filterPersonsByBoolean(dataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  return ({
    ...state,
    initialDataPersons: dataPersons,
    currentDataPersons: filteredByBoolean,
    isLoading: false,
  })
}

const sortDataReducer = (state: StateType, action: ReturnType<typeof sortDataAction>) => {
  const keyName = action.payload.keyName;
  const direction = action.payload.direction;

  const sortedBy = {
    [keyName]: direction
  };
  const filteredByBoolean = filterPersonsByBoolean(state.initialDataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  const filterByGender = filterPersonsByGender(filteredByBoolean, state.visibilityGender)
  const filterByShirtSize = filterPersonsByShirtSize(filterByGender, state.visibilityShirtSize)
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy);

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
  [isAsyncReducer, isAsyncAction],
  [changeVisibilityGenderReducer, changeVisibilityGenderAction],
  [changeVisibilityShirtSizeReducer, changeVisibilityShirtSizeAction],
  [changeHighlightedRowsReducer, changeHighlightedRowsAction],
  [deleteRowsReducer, deleteRowsAction]
]);