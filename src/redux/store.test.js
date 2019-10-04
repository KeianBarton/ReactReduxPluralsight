import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

it("Should handle creating courses", () => {
  // Arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Clean Code"
  };

  // Act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  // Assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});