import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

// This factory pattern will keep our tests simple
const renderCourseForm = (args) => {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render Add Course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course"); // has an assertion built in - will fail if can't find
});

it("should label save button as \"Save\" when not saving", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("should label save button as \"Saving...\" when saving", () => {
  const { getByText /*, debug */ } = renderCourseForm({ saving: true });
  //debug(); returns output in colour coded format
  getByText("Saving...");
});