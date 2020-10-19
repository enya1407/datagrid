import {StateType} from '../types/index';
import {changeInitialPersonAction, changeLoadingAction, sortDataAction} from "../actions";
import {createRootReducer} from "../utils/createRootReducer";
import sortPersons from "../utils/sortPersons";

const initialState: StateType = {
  isLoading: false,
  initialDataPersons: [],
  currentDataPersons: [],
  sortedBy: {
    id: undefined,
    first_name: undefined,
    last_name: undefined,
    gender: undefined,
    shirt_size: undefined,
    app_name: undefined,
    app_version: undefined,
  }
}
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
    case 'ascent':
      return ({
        ...state,
        currentDataPersons: sortPersons(state.initialDataPersons, action.payload.keyName, "decent"),
        sortedBy: {
          ...state.sortedBy, [action.payload.keyName]: "decent"
        }
      })
    case 'decent':
      return ({
        ...state,
        currentDataPersons: state.initialDataPersons,
        sortedBy: {
          ...state.sortedBy, [action.payload.keyName]: undefined
        }
      })

    default:
      return ({
        ...state,
        currentDataPersons: sortPersons(state.currentDataPersons, action.payload.keyName, "ascent"),
        sortedBy: {
          ...state.sortedBy, [action.payload.keyName]: "ascent"
        }
      })
  }

};

export const rootReducer = createRootReducer(initialState)([
  [changeInitialPersonReducer, changeInitialPersonAction],
  [sortDataReducer, sortDataAction],
  [changeLoadingReducer, changeLoadingAction]
]);