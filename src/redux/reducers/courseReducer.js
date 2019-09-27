import * as types from "../actions/actionTypes";

const courseReducer = (state = [], action) => {
  switch(action.type) {
    case types.CREATE_COURSE:
      // Redux Flow part 3 - debugger;
      // state.push(action.course); - don't do this - mutating state
      return [...state, { ...action.course }];
    default:
      return state;
  }
};
export default courseReducer;