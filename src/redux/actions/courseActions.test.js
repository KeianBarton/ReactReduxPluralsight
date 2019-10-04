import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "./../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      // Arrange
      fetchMock.mock("*", { // mimics API responses
        body: courses,
        headers: { "content-type": "application/json" }
      });
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];
      const store = mockStore({ courses: [] });
      
      // Act
      return store.dispatch(courseActions.loadCourses()).then(() => {

        // Assert
        expect(store.getActions()).toEqual(expectedActions);
      })
    });
  });
});

describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    // Arrange
    const course = courses[0];
    const expectedAction = {
      type:types.CREATE_COURSE_SUCCESS,
      course
    };

    // Act
    const action = courseActions.createCourseSuccess(course);

    // Assert
    expect(action).toEqual(expectedAction);
  })
})