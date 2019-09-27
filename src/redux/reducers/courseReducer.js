const courseReducer = (state = [], action) => {
  switch(action.type) {
    case "CREATE_COURSE":
      // Redux Flow part 3 - debugger;
      // state.push(action.course); - don't do this - mutating state
      return [...state, { ...action.course }];
    default:
      return state;
  }
};
export default courseReducer;