import moment from 'moment';
import URLSearchParams from 'url-search-params';

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

export const userInfo = (type, data) => ({
  type,
  data,
});

export const getUserDetails = () => {
  return function(dispatch) {
    dispatch(userInfo(ActionTypes.FETCH_USER_DETAILS_REQUEST));

    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.kctoken}`,
      },
    })
      .then(resp => resp.json())
      .then(function(data) {
        dispatch(userInfo(ActionTypes.FETCH_USER_DETAILS_SUCCESS, data));
      })
      .catch(function(error) {
        dispatch(
          userInfo(ActionTypes.FETCH_USER_DETAILS_FAILURE, error.message)
        );
      });
  };
};

export const login = credentials => {
  return function(dispatch) {
    const searchParams = new URLSearchParams();
    const params = {
      grant_type: 'password',
      client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
      username: credentials.username,
      password: credentials.password,
    };

    for (let k in params) {
      searchParams.set(k, params[k]);
    }

    dispatch(authenticationRequest());

    fetch(
      `${
        process.env.REACT_APP_AUTH_URL
      }/realms/master/protocol/openid-connect/token`,
      {
        method: 'POST',
        body: searchParams,
      }
    )
      .then(resp => resp.json())
      .then(function(data) {
        const timeNow = moment();
        const timeNowInMilliSeconds = timeNow.valueOf();
        const expiryTimeInMilliSeconds = timeNow.add(
          data.expires_in - 10,
          'seconds'
        );
        sessionStorage.setItem('kctoken', data.access_token);
        sessionStorage.setItem('refresh_token', data.refresh_token);

        setInterval(
          () => dispatch(updateToken()),
          expiryTimeInMilliSeconds - timeNowInMilliSeconds
        );

        dispatch(authenticationSuccess());
      })
      .catch(function() {
        dispatch(authenticationFailure('Unable to login!'));
      });
  };
};

export const updateToken = () => {
  return function(dispatch) {
    const searchParams = new URLSearchParams();

    const params = {
      grant_type: 'refresh_token',
      client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
      refresh_token: sessionStorage.refresh_token,
    };

    for (let k in params) {
      searchParams.set(k, params[k]);
    }
    fetch(
      `${
        process.env.REACT_APP_AUTH_URL
      }/realms/master/protocol/openid-connect/token`,
      {
        method: 'POST',
        body: searchParams,
      }
    )
      .then(resp => resp.json())
      .then(function(data) {
        sessionStorage.setItem('kctoken', data.access_token);
        sessionStorage.setItem('refresh_token', data.refresh_token);
      })
      .catch(function(error) {
        sessionStorage.removeItem('kctoken');
        sessionStorage.removeItem('refresh_token');

        console.log('Error: ' + error.message);
      });
  };
};
