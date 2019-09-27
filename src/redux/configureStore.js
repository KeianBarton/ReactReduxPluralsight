import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers"; // implied it is index.js
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

const configureStore = initialState => {
  // Add support for Redux dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
  return createStore(
    rootReducer,
    initialState,
    // this middleware will warn us if we accidentally mutate Redux state in the store
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
};
export default configureStore;
