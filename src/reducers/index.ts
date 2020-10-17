import {StateType} from '../types/index';
import {changeLoadingAction, changePersonAction} from "../actions";
import {createRootReducer} from "../utils/createRootReducer";

const initialState: StateType = {
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/camelcase
  persons: [
    //   {
    //   id: 1, first_name: "Adolphe", last_name: "Brende", gender: "Male", shirt_size: "XL", app_name: "Otcom",
    //   // eslint-disable-next-line @typescript-eslint/camelcase
    //   app_version: true
    // }
  ],
  name: "a",
  secondName: "b",
}
const changeLoadingReducer = (state: StateType, action: ReturnType<typeof changeLoadingAction>) => ({
  ...state,
  isLoading: action.payload.isLoading,
});

const changePersonReducer = (state: StateType, action: ReturnType<typeof changePersonAction>) => ({
  ...state,
  persons: action.payload.persons,
  isLoading: false,
});


export const rootReducer = createRootReducer(initialState)([
  [changePersonReducer, changePersonAction],
  [changeLoadingReducer, changeLoadingAction]
]);