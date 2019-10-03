import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

// export const createCourse = course => {
//   // Redux Flow part 2 - debugger;
//   return {
//     type: types.CREATE_COURSE,
//     course
//   };
// };

export const deleteCourseOptimistic = (course) => {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export const loadCoursesSuccess = courses => {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
};

export const createCourseSuccess = course => {
  return { type: types.CREATE_COURSE_SUCCESS, course };
};

export const updateCourseSuccess = course => {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
};

export const loadCourses = () => {
  return dispatch => {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
};

export const saveCourse = (course) => {
  //eslint-disable-next-line no-unused-vars
  return (dispatch, getState) => {  // All of Redux store state inside getState if needed
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export const deleteCourse = (course) => {
  return (dispatch) => {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  }; 
}