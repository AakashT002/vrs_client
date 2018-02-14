import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';
import MobileApp from './containers/MobileApp';
import configureStore from './store/configureStore';

import 'lato-font';
import 'roboto-npm-webfont';
import 'interstate-js';
import 'typeface-muli';
import './assets/stylesheets/index.css';

import { DESKTOP, MOBILE } from './utils/constants';

const history = createBrowserHistory();
const store = configureStore(history);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
};

const deviceType = process.env.REACT_APP_DEVICE_TYPE;
if (deviceType === DESKTOP) {
  render(App);
} else if (deviceType === MOBILE) {
  render(MobileApp);
}

//In development, hot module replacement (HMR) updates the application
// when changes are made, without having to refresh.
if (module.hot) {
  if (deviceType === DESKTOP) {
    module.hot.accept('./containers/App', () => {
      const NextApp = require('./containers/App').default;
      render(NextApp);
    });
  } else if (deviceType === MOBILE) {
    module.hot.accept('./containers/MobileApp', () => {
      const NextApp = require('./containers/MobileApp').default;
      render(NextApp);
    });
  }
}

registerServiceWorker();
