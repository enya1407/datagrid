import {StateType} from '../types/index';
import {
  changeFilterByAction,
  changeHighlightedRowsAction,
  changeLoadingAction,
  changeSearchedValueAction,
  changeVisibilityBooleansAction,
  changeVisibilityColumnsAction,
  changeVisibilityGenderAction,
  changeVisibilityRowsAction,
  changeVisibilityRowsDataAction,
  changeVisibilityShirtSizeAction,
  changeVisibleRowVirtualizationAction,
  deleteRowsAction,
  filterDataAction,
  isAsyncAction,
  isVirtualizeAction,
  loadDataQueryStringParamsAction,
  loadOldParamsAction,
  sortDataAction,
  writeRawDataAction
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
import selectRowsWithShift from "../utils/selectRowsWithShift";

const initialState: StateType = {
  isLoading: true,
  isAsync: false,
  isVirtualize: false,
  initialDataPersons: [],
  currentDataPersons: [],
  sortedBy: {},
  searchedValue: "",
  filterBy: {"first_name": true, "last_name": true, "app_name": true,},
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
  highlightedRows: [],
  visibleRowVirtualization: {
    numberVisibilityRows: [0, 30],
    heightEmptyContainers: [0, 0]
  }
}

const changeVisibleRowVirtualizationReducer = (state: StateType, action: ReturnType<typeof changeVisibleRowVirtualizationAction>) => ({
  ...state,
  visibleRowVirtualization: {
    numberVisibilityRows: action.payload.numberVisibilityRows,
    heightEmptyContainers: action.payload.heightEmptyContainers,

  }
});

const changeLoadingReducer = (state: StateType, action: ReturnType<typeof changeLoadingAction>) => ({
  ...state,
  isLoading: action.payload.isLoading,
});

const isAsyncReducer = (state: StateType, action: ReturnType<typeof isAsyncAction>) => ({
  ...state,
  isAsync: !state.isAsync
});

const isVirtualizeReducer = (state: StateType, action: ReturnType<typeof isVirtualizeAction>) => ({
  ...state,
  isVirtualize: !state.isVirtualize
});


const loadDataQueryStringParamsReducer = (state: StateType, action: ReturnType<typeof loadDataQueryStringParamsAction>) => {
  const [gender, ShirtSize, boolean, searchedValue] =
    action.payload.params.slice(1).split("&").map(el => el.split("=")[1])

  return ({
    ...state,
    visibilityGender: {
      Male: gender.includes("Male"),
      Female: gender.includes("Female")
    },
    visibilityShirtSize: {
      "3XL": ShirtSize.includes("3XL"),
      "2XL": ShirtSize.includes("2XL"),
      "XL": ShirtSize.includes("XL"),
      "L": ShirtSize.includes("L"),
      "M": ShirtSize.includes("M"),
      "S": ShirtSize.includes("S"),
      "XS": ShirtSize.includes("XS")
    },
    visibilityBoolean: {
      showTrue: boolean.includes("showTrue"),
      showFalse: boolean.includes("showFalse")
    },
    searchedValue: searchedValue,
  })
}

const loadOldParamsReducer = (state: StateType, action: ReturnType<typeof loadOldParamsAction>) => {
  const params = action.payload.params

  return ({
    ...state,
    sortedBy: params.sortedBy,
    filterBy: params.filterBy,
    searchedValue: params.searchedValue,
    visibilityGender: params.visibilityGender,
    visibilityShirtSize: params.visibilityShirtSize,
    visibilityColumns: params.visibilityColumns,
    visibilityRows: params.visibilityRows,
    visibilityBoolean: params.visibilityBoolean,
    isAsync: params.isAsync,
    isVirtualize: params.isVirtualize,
    highlightedRows: params.highlightedRows,
  })
}

const writeRawDataReducer = (state: StateType, action: ReturnType<typeof writeRawDataAction>) => {
  const initialDataPersons = action.payload.persons

  const filteredByBoolean = filterPersonsByBoolean(initialDataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  const filterByGender = filterPersonsByGender(filteredByBoolean, state.visibilityGender)
  const filterByShirtSize = filterPersonsByShirtSize(filterByGender, state.visibilityShirtSize)
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy, state.searchedValue)
  const sortedPersons = sortPersons(filteredPersons, state.sortedBy)

  return ({
    ...state,
    initialDataPersons,
    currentDataPersons: sortedPersons,
    isLoading: false,
  })
}

const changeHighlightedRowsReducer = (state: StateType, action: ReturnType<typeof changeHighlightedRowsAction>) => {
  const {id, pressedButton} = action.payload;

  const highlight = () => {

    switch (pressedButton) {
      case "ctrl":
        return [...state.highlightedRows, id];
      case "shift":
        return selectRowsWithShift(state.currentDataPersons, state.highlightedRows, id);
      default:
        return [...[], id];
    }
  }
  const highlightedRows = state.highlightedRows.includes(id)
    ? state.highlightedRows.filter(el => el !== id)
    : highlight()

  return ({
    ...state,
    highlightedRows
  });
}

const deleteRowsReducer = (state: StateType, action: ReturnType<typeof deleteRowsAction>) => {
  const {selected} = action.payload
  return ({
    ...state,
    initialDataPersons: deleteRows(state.initialDataPersons, state.highlightedRows, selected),
    currentDataPersons: deleteRows(state.currentDataPersons, state.highlightedRows, selected),
  });
}

const changeVisibilityShirtSizeReducer = (state: StateType, action: ReturnType<typeof changeVisibilityShirtSizeAction>) => {
  const {keyName} = action.payload;
  const visibilityShirtSize = {
    ...state.visibilityShirtSize,
    [keyName]: !state.visibilityShirtSize[keyName]
  };
  const filteredByBoolean = filterPersonsByBoolean(state.initialDataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  const filterByGender = filterPersonsByGender(filteredByBoolean, state.visibilityGender)
  const filterByShirtSize = filterPersonsByShirtSize(filterByGender, visibilityShirtSize)
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy, state.searchedValue)
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
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy, state.searchedValue)
  const sortedPersons = sortPersons(filteredPersons, state.sortedBy)

  return ({
    ...state,
    currentDataPersons: sortedPersons,
    visibilityGender
  });
}

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
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy, state.searchedValue)
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
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy, state.searchedValue)
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
  const searchedValue = action.payload.search ? state.searchedValue : undefined
  const filteredByBoolean = filterPersonsByBoolean(state.initialDataPersons.slice(0, state.visibilityRows), state.visibilityBoolean);
  const filterByGender = filterPersonsByGender(filteredByBoolean, state.visibilityGender)
  const filterByShirtSize = filterPersonsByShirtSize(filterByGender, state.visibilityShirtSize)
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy, searchedValue)
  const sortedPersons = sortPersons(filteredPersons, state.sortedBy)

  return {
    ...state,
    currentDataPersons: sortedPersons,
    searchedValue: searchedValue,
  }
}

const changeSearchedValueReducer = (state: StateType, action: ReturnType<typeof changeSearchedValueAction>) => ({
  ...state,
  searchedValue: action.payload.searchedValue
});

const changeFilterByReducer = (state: StateType, action: ReturnType<typeof changeFilterByAction>) => {
  const keyName = action.payload.filterBy
  return ({
    ...state,
    filterBy: {
      ...state.filterBy,
      [keyName]: !state.filterBy[keyName]
    }
  });
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
  const filteredPersons = filterPersons(filterByShirtSize, state.filterBy, state.searchedValue)

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
  [loadDataQueryStringParamsReducer, loadDataQueryStringParamsAction],
  [changeVisibleRowVirtualizationReducer, changeVisibleRowVirtualizationAction],
  [loadOldParamsReducer, loadOldParamsAction],
  [writeRawDataReducer, writeRawDataAction],
  [sortDataReducer, sortDataAction],
  [changeLoadingReducer, changeLoadingAction],
  [changeSearchedValueReducer, changeSearchedValueAction],
  [changeFilterByReducer, changeFilterByAction],
  [filterDataReducer, filterDataAction],
  [changeVisibilityColumnsReducer, changeVisibilityColumnsAction],
  [changeVisibilityRowsDataReducer, changeVisibilityRowsDataAction],
  [changeVisibilityRowsReducer, changeVisibilityRowsAction],
  [changeVisibilityBooleansReducer, changeVisibilityBooleansAction],
  [isAsyncReducer, isAsyncAction],
  [isVirtualizeReducer, isVirtualizeAction],
  [changeVisibilityGenderReducer, changeVisibilityGenderAction],
  [changeVisibilityShirtSizeReducer, changeVisibilityShirtSizeAction],
  [changeHighlightedRowsReducer, changeHighlightedRowsAction],
  [deleteRowsReducer, deleteRowsAction]
]);