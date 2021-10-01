import { type } from "os";
import { combineReducers } from "redux";
import bankReducer from "./bankReducer";

const reducers = combineReducers({
  count: bankReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
