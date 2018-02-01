import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialUserState = {
  id: null,
  isAuthenticated: !!sessionStorage.kctoken || !!sessionStorage.jwt,
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
  [ActionTypes.FETCH_USER_DETAILS_REQUEST](state) {
    return { ...state, respData: { data: '' } };
  },
  [ActionTypes.FETCH_USER_DETAILS_SUCCESS](state, action) {
    return { ...state, respData: action.data };
  },
  [ActionTypes.FETCH_USER_DETAILS_FAILURE](state, action) {
    return { ...state, respData: { data: `Error: ${action.data}` } };
  },
});

export default user;
