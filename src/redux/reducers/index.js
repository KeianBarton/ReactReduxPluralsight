import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses, // corresponds to courseReducer
  authors,
  apiCallsInProgress
});

export default rootReducer;