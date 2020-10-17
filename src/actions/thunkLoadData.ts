import {changePersonAction} from "./index";
import {PersonType} from "../types";
import {ThunkDispatch} from "redux-thunk";

type TFetchPersons = () => Promise<PersonType[]>

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_DATAGRID_API_KEY;
const URL = `https://my.api.mockaroo.com/datagrid.json?key=${API_KEY}`;

const fetchPersons: TFetchPersons = async () => {
  const response = await fetch(URL);

  return await response.json();
}


const loadPersonsAction = () => {
  return (dispatch: ThunkDispatch<any, any, any>) =>
    fetchPersons()
      .then(persons => dispatch(changePersonAction(persons)))
      .catch(console.log)
}

export default loadPersonsAction;