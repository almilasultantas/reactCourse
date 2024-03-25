import { combineReducers } from "redux";
import counterReducer from "./index";
const reducers = combineReducers({
  counterReducer,
});

export default reducers;
