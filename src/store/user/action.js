import * as ActionTypes from '../actionTypes';

export const authenticate = user => ({ type: ActionTypes.AUTHENTICATE, user });

export const authenticationSuccess = () => ({
  type: ActionTypes.BEARER_AUTHENTICATE,
});

export const authenticationRequest = () => ({
  type: ActionTypes.BEARER_AUTHENTICATION_REQUEST,
});

export const authenticationFailure = message => ({
  type: ActionTypes.BEARER_AUTHENTICATION_FAILURE,
  message,
});

export const logout = () => ({ type: ActionTypes.LOGOUT });

export function setUserName(userName) {
  return { type: ActionTypes.SET_USERNAME, userName };
}

export const userInfo = (type, data) => ({
  type,
  data,
});
