import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

// export const createCourse = course => {
//   // Redux Flow part 2 - debugger;
//   return {
//     type: types.CREATE_COURSE,
//     course
//   };
// };

export const loadCoursesSuccess = courses => {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
};

export const createCourseSuccess = courses => {
  return { type: types.CREATE_COURSE_SUCCESS, courses };
};

export const updateCourseSuccess = courses => {
  return { type: types.UPDATE_COURSE_SUCCESS, courses };
};

export const loadCourses = () => {
  return dispatch => {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const saveCourse = (course) => {
  //eslint-disable-next-line no-unused-vars
  return (dispatch, getState) => {  // All of Redux store state inside getState if needed
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}