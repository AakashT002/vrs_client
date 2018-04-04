import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { loginReducer } from 'react-redux-modules/lib/reducers/loginReducer';
import user from './user/reducer';
import verification from './mobile/verification/reducer';
import dashboard from './desktop/dashboard/reducer';

const root = combineReducers({
  router: routerReducer,
  user,
  verification,
  dashboard,
  ...loginReducer('loginForm'),
});

export default root;
