import createReducer from '../../createReducer';
import * as ActionTypes from '../../actionTypes';

import { ALL_STATUS,  ONE_DAY} from '../../../utils/constants';

const initialState = {
  statsForUser: {},
  statsForDevices: {},
  statsForNumbers: {},
  userRequesting: true,
  deviceRequesting: true,
  numberRequesting: true,
  selectedStatus: ALL_STATUS,
  selectedRequestTime: ONE_DAY,
  fetchStats: true,
};

export const dashboard = createReducer(initialState, {
  [ActionTypes.FETCH_STATS_USERS_REQUEST](state) {
    return { ...state, userRequesting: true };
  },
  [ActionTypes.FETCH_STATS_USERS_SUCCESS](state, action) {
    return {
      ...state,
      statsForUser: action.response.result,
      userRequesting: false,
    };
  },
  [ActionTypes.FETCH_STATS_USERS_FAILURE](state) {
    return { ...state, userRequesting: false };
  },

  [ActionTypes.FETCH_STATS_DEVICES_REQUEST](state) {
    return { ...state, deviceRequesting: true };
  },
  [ActionTypes.FETCH_STATS_DEVICES_SUCCESS](state, action) {
    return {
      ...state,
      statsForDevices: action.response.result,
      deviceRequesting: false,
    };
  },
  [ActionTypes.FETCH_STATS_DEVICES_FAILURE](state) {
    return { ...state, deviceRequesting: false };
  },

  [ActionTypes.FETCH_STATS_NUMBERS_REQUEST](state) {
    return { ...state, numberRequesting: true };
  },
  [ActionTypes.FETCH_STATS_NUMBERS_SUCCESS](state, action) {
    return {
      ...state,
      statsForNumbers: action.response.result,
      numberRequesting: false,
    };
  },
  [ActionTypes.FETCH_STATS_NUMBERS_FAILURE](state) {
    return { ...state, numberRequesting: false };
  },

  [ActionTypes.UPDATE_SELECTED_DETAILS](state = initialState, action) {
    return {
      ...state,
      selectedStatus: action.selectedStatus,
      selectedRequestTime: action.selectedRequestTime,
    };
  },
  [ActionTypes.RELOAD_STATS](state = initialState, action) {
    return {
      ...state,
      fetchStats: action.isVerifyUsed,
    };
  },
});
export default dashboard;
