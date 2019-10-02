# Building Applications with React and Redux

https://pluralsight.com/library/courses/react-redux-react-router-es6

# Intro

Tools:

- Redux
- Modern JS with Babel
- React Router
- Webpack
- npm scripts
- ESLint
- Jest, React Testing Library, Enzyme

Flux is an artchiectural pattern introduced by Facebook to work with React

- It is not a library or framework
- Uni-directional data flow

Redux is a library inspired by Flux (implementation of Flux)

- It is a library
- Easy to handle state of application - a predictable state continer for JS apps

# Environment Build

List of starter projects for React:
https://javascriptstuff.com/react-starter-projects/

In this course we create a custom dev environment

- 50 lines of Webpack config
- 1 npm script
- 1 Babel preset

Babel is a popular JavaScript compiler

- transpile modern JS to run in all browsers
- compile JSX to JS
  Babel can be configured via a .babelrc file - but can also be done in package.json like in this project
  babel-preset-react-app - transpiles JSX and modern JS features - same preset used as create-react-app

Webpack is the most popular bundler in the community
It also can be used to host a dev server and is used by create-react-app behind the scenes
Webpack can be configured via scripts in package.json

debugger; - handy way to set a breakpoint - you can see source mapped from bundle.js

ESLint package.json options:

- Each of the environments (e.g. Browser, Node, ES6) have global variables. The "env" property tells ESLint to ignore those globals.
- settings.react.version is required by eslint-plugin-react
- "root": true specifies the ESLint config in package.json applies to that project only

# React component approaches

- createClass (mostly out of use - `React.createClass({ ... })`)
- ES class (`class extends React.Component`)
- Function (`function HelloWorld(props) { ... }`)
- Arrow function ( `const foo = (props) => <>..</>` )

Functional component benefits:
Easier to understand; Avoid "this" keyword; Less transpiled code; High signal-to-noise ratio; Easy to test / performance; Classes may be removed in future due to React Hooks

Container (smart) components have state and little to no DOM markup - they typically pass data and actions down and know about Redux
Presentation (dumb) components are nearly all markup with often no state - receive data / actions via props - know nothing about Redux

# Initial app structure

Setup React Router and navigation

`<Link>` combined with react-router-dom allows you to make React links handled by client side
`<NavLink>` for navigation bar links handled by client side

# Intro to Redux

## Do I need Redux?

If you have a complex component tree with different components needing the same data - 3 solutions:

1. Lift state to a common ancestor (e.g. top-level component) - e.g. prop drilling
2. React context - needs context imported to consume it (not technically global)
3. Redux - centralised store (like a local client side database) - components can dispatch actions to it, the store is updated and any components using that data re-render

Useful for complex data flows, inter-component communication, non-hierarchical data, many (CRUD) actions, same data used in my many places

## 3 principles

- One immutable store
- Actions trigger changes
- Reducers update state (reducers are just a function that accept the current state and an action and returns the new state)

## Flux vs Redux

Data flows down - actions flow up
Both utilise unidirectional flow, actions and stores

- Flux uses a singleton dispatcher to connect actions to stores. Stores use eventEmitter to connect to the dispatcher. Redux doesn't have a dispatcher - it relies on reducers.
- Store and change logic are separate in Redux (not the same in Flux)

## Redux Flow Overview

e.g.

- Action `{ type: RATE_COURSE, rating: 5 }`
- Reducer `function appReducer (state = defaultState, action) { switch(action.type) { case RATE_COURSE: ... }}`
- Components are notified via the React-Redux companion library

# Actions, Stores, and Reducers


## Actions

Actions are plain JS Objects containing a description of an event - it must have a type property
`{ type: RATE_COURSE, rating: rating }`
You can pass around any serializable (to JSON) data - so don't pass around functions or promises

## Store

`let store = createStore(reducer);`    in app entry point
`store.dispatch(action), store.subscribe(listener), store.getState(), replaceReducer(nextReducer)`

## Immutability

In JS, the following are immutable (so new copied are created when you change value):
Number, String, Boolean, Undefined, Null
The following are mutable:
Objects, Arrays, Functions

Ways to copy objects. The following are shallow copies (so be careful to copy any nested objects if their values are changing - if not, avoid to avoid expensive re-renders)
- `Object.assign({}, state, { role: 'admin' });`   copy state object into {}, changing role property to 'admin'
- Spread operator    `const newState = { ...state, role: 'admin' };`  - copies into new object, changing role property to 'admin'  - also works for arrays `const newUsers = [...state.users]`
- Immer - package that can handle data changes

Arrays:
- Prefer `map, filter, reduce, concat` and `spread`, but avoid `push, pop, reverse` unless you clone first

Redux uses immutability for:
- Clarity - you know state is changed in reducers and nowhere else
- Performance - store can just do an object reference check in memory to see if state changed, rather than checking every property
- Great debugging support

To avoid mutating state (which will break Redux), you can install redux-immutable-state-invariant or make use of immutability packages like Immer

## Reducers

```javascript
function myReducer(state, action) { 
  switch(action.type)
  {
    case "INCREMENT_COUNTER":
      return {...state, counter: state.counter + 1 };   // returns copy
    default:
      return state;
  }
}
```
These should be pure functions (that always return the same outputs given the same inputs). Never:
- Mutate arguments
- Perform side effects
- Call non-pure functions

*All reducers* are called on every dispatch - so you should always return the same state by default

Each action can be handled by multiple reducers. Each reducer can handle multiple actions. So you don't need to write a 1-to-1 mapping between reducers and actions - "reducer composition".

# Connecting React to Redux

react-redux is a separate library because Redux isn't exclusive to React
- `Provider` component attaches app to store - utilised at app's root
```javascript
<Provider store={this.props.store}>
  <App />
</Provider>
```
- `Connect` function creates container components that connect to the store
```javascript
export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
// Both parameters are typically functions and are optional
```

`mapStateToProps` - what state do you want to pass to your component as props? If any of the state changes, the component will re-render
```javascript
const mapStateToProps = (state) => { appState: state };
// You can now access Redux store data at this.props.appState
const mapStateToProps = (state) => { users: state.users };
// You can now access each object key of users in this.props.user1 ...
```
Memoize for performance if expensive calculations in getting state (e.g. Reselect library)

`mapDispatchToProps` - what actions do you want to pass to your component as props?
Ways to handle mapDispatchToProps:
1. Ignore it - i.e. do not use as second parameter in `connect` - `dispatch` will be available in your props at `this.props.dispatch(loadCourses())`
2. Wrap manually the call to each action creator to access `this.props.loadCourses()`:
```javascript
const mapDispatchToProps = (dispatch) => {
  return {
    loadCourses: () => {
      dispatch(loadCourses));
    },
    createCourse: (course) => {
      dispatch(createCourse(course));
    }
  };
}
```
3. `bindActionCreators` wraps dispatch calls for you - `this.props.actions.loadCourses();`
```javascript
const mapDispatchToProps = (dispatch) => { actions: bindActionCreators(actions, dispatch) };
```
4. `mapDispatchToProps` as an Object e.g.
```javascript
const mapDispatchToProps = { loadCourses };
// In component:
this.props.loadCourses();
```

## Chat wih Redux

Undirectional data flow:
- React: "Hey CourseAction, someone just clicked this Save Course button."
- Action: "Thanks React! I will dispatch an action so that reducers that care can update state."
- Reducer: "Ah, thanks Action. I see that you passed me the current state and the action to perform. I'll make a new copy of the state and return it."
- Store: "Thanks for updating the state reducer. I'll make sure that all connected components are aware."
- React-Redux: "Woah, thanks for that new data Mr. Store. I'll now intelligently determine if I should tell React about this change so that it only has to bother with updating the UI when it's necessary.
- React: "Ooo, shiny new data that's been passed down via props from the store. I'll update the UI to reflect this."

# Redux Flow

Typically save files under src/redux/actions, src/redux/reducers ...
In this course, the data structure is simplified, but you should normalise state shape so your store acts more closely to a relational database: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape

Combine reducers in redux/reducers/index.js

Configure store in redux/configureStore.js - use applyMiddleware to add features to enhance Redux

Use PropTypes in a component to provide what is expected to be pulled into to the props object of a component

Reduce Boilerplate (more advanced topic)
https://redux.js.org/recipes/reducing-boilerplate

# Async in Redux

## Mock API

Added mock API and tools to the 'tools' folder by copying Cory's example - uses JSON Server
Any package.json scrips that start wtih "pre" run before their non-pre equivalents (e.g. prestart:api and start:api)

The run-p command of the npm-run-all package will run multiple npm scripts concurrently

Added API files by copying Cory's example to src/api that utilises 'fetch' - the API url is set into the webpack.config.dev.js

## Redux Middleware

Redux Middleware occurs beween dispatching an action and when it reaches a reducer.
You probably won't need to write your own middleware.

Redux Async Libraries:
- Redux-Thunk - Return functions from action creators
- Redux-Promise - Use promises for async
- Redux-Observable - Use RxJS observables
- Redux-Saga - Use generators

## Thunk Introduction

Thunk: A function that wraps an expression to delay its evaluation.
Recall that actions are just simple JS objects. To make them do somehing (e.g. API call), we can use Redux-Thunk which is a middleware that looks at every action passing through the system - if it's a function, it evaluates it.
Your components can then call sync and async actions the same way.

We add Thunk to the configureStore.js file.

## Action naming conventions

Common convention to use the following names of action creators:
- loadCourses         type - LOAD_COURSES
- loadCoursesSuccess  type - LOAD_COURSES_SUCCESS
- loadCoursesFailure  type - LOAD_COURSES_FAILURE   (or error)

## Implementing Async Redux

- Don't forget when adding a new action and reducer, to update the root reducer
- Centrailise initial Redux state into reducers in initialState.js - helps less hardcoded empty arrays, but also helps developers understand the overall application's structure

# Async writes in Redux

The formal term for `const { foo } = bla;` is destructuring

Avoid using Redux for all state. Use plain React state for data only a few components use (such as forms) - use Redux for more global values

## Redirect

You can add Redirect using the React Router Redirect tag - when rendered, it causes a redirect on the page.
You can also use history to cause a redirect. Any component loaded via a `<Route>` gets history passed in on props from React Router.

## Populate form for existing entity

mapStateToProps has an `ownProps` field that lets us access the component's props e.g. access URL parameters
Recall that it runs every time the Redux store state changes

# Async Status and Error Handling

You can simulate a delay on all requests by modifying `apiServer.js`

Remember that an action can be handled by multiple reducers.