import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";

const rootReducer = combineReducers({
  courses, // corresponds to courseReducer
  authors
});

export default rootReducer;