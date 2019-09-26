import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import CoursesPage from "./courses/CoursesPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";

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
      <Route component={PageNotFound} />
    </Switch>
  </div>
);
export default App;
