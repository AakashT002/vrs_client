import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import keycloak from './keycloak-config';

import App from './containers/App';
import MobileApp from './containers/MobileApp';
import configureStore from './store/configureStore';
import { authenticate } from './store/user/action.js';
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
keycloak
  .init({ onLoad: 'check-sso', checkLoginIframe: false })
  .success(authenticated => {
    if (authenticated) {
      sessionStorage.setItem('kctoken', keycloak.token);
      sessionStorage.setItem('username', keycloak.tokenParsed.name);
      sessionStorage.setItem('user', keycloak.tokenParsed.preferred_username);
      store.dispatch(
        authenticate({
          id: sessionStorage.username,
          name: sessionStorage.username,
        })
      );
      setInterval(() => {
        keycloak.updateToken(10).error(() => keycloak.logout());
        sessionStorage.setItem('kctoken', keycloak.token);
      }, 10000);

      if (deviceType === DESKTOP) {
        render(App);
      } else if (deviceType === MOBILE) {
        render(MobileApp);
      }
    } else {
      keycloak.login();
    }
  });

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
