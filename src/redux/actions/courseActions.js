import * as types from "./actionTypes";

export const createCourse = course => {
  // Redux Flow part 2 - debugger;
  return {
    type: types.CREATE_COURSE,
    course
  };
};
