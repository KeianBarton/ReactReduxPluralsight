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

- createClass (mostly out of use - React.createClass({ ... }))
- ES class (class extends React.Component)
- Function (function HelloWorld(props) { ... })
- Arrow function ( const foo = (props) => <>..</> )

Functional component benefits:
Easier to understand; Avoid "this" keyword; Less transpiled code; High signal-to-noise ratio; Easy to test / performance; Classes may be removed in future due to React Hooks

Container (smart) components have state and little to no DOM markup - they typically pass data and actions down and know about Redux
Presentation (dumb) components are nearly all markup with often no state - receive data / actions via props - know nothing about Redux

# Initial app structure

Setup React Router and navigation

<Link> combined with react-router-dom allows you to make React links handled by client side
<NavLink> for navigation bar links handled by client side
