import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

// It can be useful to pass initial state into the store here if you're
// server rendering or initializing your Redux store with data from
// localStorage
const store = configureStore();

// function Hi() {
//   //debugger;
//   return <p>Hi.</p>;
// }

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
