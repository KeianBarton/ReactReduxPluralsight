import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     course: {
  //       title: ""
  //     }
  //   };
  // required when not using arrow function for handleChange
  // this.handleChange = this.handleChange.bind(this);
  // }

  // class field without constructor
  state = {
    course: {
      title: ""
    }
  };

  handleChange = event => {
    // Copying the state, changing the title
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course }); // short-hand for { course: course }
  };

  handleSubmit = event => {
    event.preventDefault();
    // Redux Flow part 1 - debugger;
    // When not using mapDispatchToProps, you have to dispatch this way:
    //this.props.dispatch(courseActions.createCourse(this.state.course));
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

// expectations of things to be pulled in to props
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  // dispatch: PropTypes.func.isRequired - only passed in if mapDispatchToProps is not used
  // createCourse: PropTypes.func.isRequired - use if manually pulling in actions to mapDispatchToProps
  actions: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  // Redux Flow part 4 - debugger;
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // Manually hooking up passing actions to props
    //createCourse: course => dispatch(courseActions.createCourse(course))

    // Hooking up with bindActionCreators
    actions: bindActionCreators(courseActions, dispatch)
  };
};

// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse // each property automatically bound to dispatch
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
