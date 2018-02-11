import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialUserState = {
  id: null,
  isAuthenticated: !!sessionStorage.kctoken,
  name: null,
  respData: {},
  message: '',
};

export const user = createReducer(initialUserState, {
  [ActionTypes.AUTHENTICATE](state, action) {
    const { id, name } = action.user;
    return { ...state, isAuthenticated: true, id, name };
  },
  [ActionTypes.BEARER_AUTHENTICATE](state) {
    return { ...state, isAuthenticated: true };
  },
  [ActionTypes.BEARER_AUTHENTICATION_REQUEST](state) {
    return { ...state, isAuthenticated: false, message: '' };
  },
  [ActionTypes.BEARER_AUTHENTICATION_FAILURE](state, action) {
    return { ...state, isAuthenticated: false, message: action.message };
  },
  [ActionTypes.LOGOUT](state) {
    return { ...state, isAuthenticated: false };
  },
});

export default user;
