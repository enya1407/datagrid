import {StateType} from '../types/index';
import {
  changeFilterByAction,
  changeInitialPersonAction,
  changeLoadingAction,
  changeVisibilityColumnsAction,
  changeVisibilityRowsAction,
  changeVisibilityRowsDataAction,
  filterDataAction,
  sortDataAction
} from "../actions";
import {createRootReducer} from "../utils/createRootReducer";
import sortPersons from "../utils/sortPersons";
import filterPersons from "../utils/filterPersons";

const initialState: StateType = {
  isLoading: false,
  initialDataPersons: [],
  currentDataPersons: [],
  sortedBy: {
    id: undefined,
    gender: undefined,
    "first_name": undefined,
    "last_name": undefined,
    "shirt_size": undefined,
    "app_name": undefined,
    "app_version": undefined,
  },
  filterBy: {
    id: "",
    gender: "",
    "first_name": "",
    "last_name": "",
    "shirt_size": "",
    "app_name": "",
    "app_version": "",
  },
  visibilityColumns: {
    id: true,
    gender: true,
    "first_name": true,
    "last_name": true,
    "shirt_size": true,
    "app_name": true,
    "app_version": true,
  },
  visibilityRows: 1000
}

const changeVisibilityRowsReducer = (state: StateType, action: ReturnType<typeof changeVisibilityRowsAction>) => ({
  ...state,
  currentDataPersons: state.currentDataPersons.slice(0, state.visibilityRows)
})
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
  return action.payload.searchButton
    ? {
      ...state,
      currentDataPersons: filterPersons(state.currentDataPersons, action.payload.keyName, state.filterBy[action.payload.keyName])
    }
    : {
      ...state,
      currentDataPersons: state.initialDataPersons.slice(0, state.visibilityRows),
      filterBy: {
        ...initialState.filterBy,
        [action.payload.keyName]: "",
      },
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
  switch (state.sortedBy[action.payload.keyName]) {
    case action.payload.direction:
      return ({
        ...state,
        currentDataPersons: state.initialDataPersons.slice(0, state.visibilityRows),
        sortedBy: {
          ...state.sortedBy,
          [action.payload.keyName]: undefined,
        }
      })

    default:
      return ({
        ...state,
        currentDataPersons: sortPersons(state.currentDataPersons, action.payload.keyName, action.payload.direction),
        sortedBy: {
          ...state.sortedBy,
          [action.payload.keyName]: action.payload.direction,
        }
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
  [changeVisibilityRowsReducer, changeVisibilityRowsAction]
]);