import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import CoursesPage from "./courses/CoursesPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
// eslint-disable-next-line import/no-named-as-default
import ManageCoursePage from "./courses/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <div className="container-fluid">
    {/* React Router will watch the URL and render the proper route
    - the header will always display above*/}
    <Header />
    {/* switch means only one route should match */}
    <Switch>
      {/* exact means only empty route "/" matches */}
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/courses" component={CoursesPage} />
      {/* slugs are like IDs but friendlier to read*/}
      {/* Declare more specific routes first as only one route in Switch can match*/}
      <Route path="/course/:slug" component={ManageCoursePage} />
      <Route path="/course/" component={ManageCoursePage} />
      <Route component={PageNotFound} />
    </Switch>
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);
export default App;
