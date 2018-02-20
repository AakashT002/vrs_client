import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { loginReducer } from 'react-redux-modules/lib/reducers/loginReducer';
import user from './user/reducer';
import verification from './mobile/verification/reducer';

const root = combineReducers({
  router: routerReducer,
  user,
  verification,
  ...loginReducer('loginForm'),
});

export default root;
