# LP02 - Team M : VRS Client

This is a react/redux app that will be used by wholesalers largely to interact with the VRS system for their drug verification. Two applications one for desktop and mobile are deployed. `<App/>` component loads the desktop version and `<MobileApp/>` component loads the mobile version. Mobile app is accessible only by returns specialists.

# Redux

Project template for create-react-app which includes useful Redux patterns.

This project was bootstrapped from a template using a forked version of [Create React App](https://github.com/facebookincubator/create-react-app). For more information view the [template](https://github.com/reedsa/create-react-app-templates) or the [forked Create React App](https://github.com/reedsa/create-react-app).

You can find the most recent version of the Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Getting Started

* `npm start` to run the application
* `npm test` to run tests
* `npm run lint-all` to run additional linter rules

## KeyCloak integration for AuthN/Authz

This app is configured to interact with Keycloak for providing AuthN/AuthZ. Edit .env.development for the below variables.

**For Desktop**

* **REACT_APP_AUTH_REALM**=`CognizantVRS`
* **REACT_APP_AUTH_URL**=http://localhost:8080/auth
* **REACT_APP_AUTH_CLIENT_ID**=`requestor-client`
* **REACT_APP_API_URL**=`http://localhost:5000`
* **REACT_APP_SASS**=`true`
* **REACT_APP_DEVICE_TYPE**=`desktop`
* **REACT_APP_REQUESTOR_ID**=`ABC_44545`

**For Mobile**

* **REACT_APP_AUTH_REALM**=`CognizantVRSMobile`
* **REACT_APP_AUTH_URL**=http://localhost:8080/auth
* **REACT_APP_AUTH_CLIENT_ID**=`requestor-client`
* **REACT_APP_API_URL**=`http://localhost:5000`
* **REACT_APP_SASS**=`true`
* **REACT_APP_DEVICE_TYPE**=`mobile`
* **REACT_APP_REQUESTOR_ID**=`ABC_44545`

## Local Keycloak setup 
* Download Keycloak and install it locally. Then create admin user at http://localhost:8080.
* Then follow below steps to setup realms required for `requestor-client(desktop and mobile)` namely `CognizantVRS` and `CognizantVRSMobile`.

* Please follow the screenshots provided in setup folder to create realm/client/user/roles as per the mode of an application i.e mobile/desktop.

* **Themes for login in keycloak locally:**
Please download and unzip the themes from [here](https://github.com/CognizantStudio/lp02-team-m-requestor-client/blob/master/setup).
Then copy the unzipped folders to the `\keycloak-3.4.3.Final\themes` folder of keycloak.

## Deployment

* **Heroku** - Use the create-react-app buildpack as described [here](https://blog.heroku.com/deploying-react-with-zero-configuration).

## Features

### React and Redux

* **create-react-app** - Facebook's [create-react-app](https://github.com/facebookincubator/create-react-app) is used to get a production-ready React application quickly off the ground. It configures things like Webpack and Babel, so you don't have to. In order to further customize this starter kit with some additional tools, like Sass, we leverage a fork of react-scripts, called [custom-react-scripts](https://github.com/kitze/custom-react-scripts).

* **Redux** - We use [Redux](https://github.com/reactjs/redux) to manage complex application state. In this app, you'll find an example for a user login flow, an example asynchronous request for a list, and how to maintain the value for a counter.

* **react-redux-modules** - [react-redux-modules](https://github.com/reedsa/react-redux-modules) are prebuilt React component modules that easily integrate with your Redux store.

### Testing

* **Jest** - Facebook's [Jest](https://github.com/facebook/jest/) is configured out of the box with create-react-app. This comprehensive testing tool is built on top of Jasmine and will satisfy most of your unit testing needs.

* **Enzyme** - [Enzyme](https://github.com/airbnb/enzyme) is pulled in to facilitate easier component testing.

### Routing

* **React Router** - The latest overhaul from [React Router](https://reacttraining.com/react-router/web). Please note that this library diverges significantly from previous versions.

* **react-router-redux** - [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) also underwent an overhaul to keep up with React Router, and has been merged into the React Router codebase.

### Styling

* **Sass** - [Sass](http://sass-lang.com/) is used as the CSS Preprocessor within the unejected create-react-app. The recommended package is [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar)

* **react-md** - A material design (md) component library for React. View the docs [here](https://react-md.mlaursen.com/).

* **material-design-icons** - Icons that can be used within react-md components. Available icons and docs are listed [here](https://material.io/icons/).

### Tooling

* **Prettier** - [Prettier](https://github.com/prettier/prettier) is wonderful magic that formats your JavaScript code for you. It is configured (using [Husky](https://github.com/typicode/husky)) to format JavaScript code in a precommit hook. You may also choose to configure Prettier with your editor of choice.

* **Hot Module Replacement (HMR)** -
[Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement) updates the application on code change, without refreshing. Redux state is maintained.

* **Redux DevTools - Chrome extension** - The app is configured to allow this [Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to display dispatched actions and state diffs.
