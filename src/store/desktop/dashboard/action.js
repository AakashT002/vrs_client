import * as ActionTypes from '../../actionTypes';
import Dashboard from '../../../services/desktop/Dashboard';
import { REQUESTS, ALL_STATUS } from '../../../utils/constants';

export const getStatsForUser = requestedTime => ({
  types: [
    ActionTypes.FETCH_STATS_USERS_REQUEST,
    ActionTypes.FETCH_STATS_USERS_SUCCESS,
    ActionTypes.FETCH_STATS_USERS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Dashboard.getStatsForUser(requestedTime);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const getStatsForDevices = requestedTime => ({
  types: [
    ActionTypes.FETCH_STATS_DEVICES_REQUEST,
    ActionTypes.FETCH_STATS_DEVICES_SUCCESS,
    ActionTypes.FETCH_STATS_DEVICES_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Dashboard.getStatsForDevices(requestedTime);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const getStatsForNumbers = requestedTime => ({
  types: [
    ActionTypes.FETCH_STATS_NUMBERS_REQUEST,
    ActionTypes.FETCH_STATS_NUMBERS_SUCCESS,
    ActionTypes.FETCH_STATS_NUMBERS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Dashboard.getStatsForNumbers(requestedTime);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const updateSelectedDetails = (selectedStatus, selectedRequestTime) => {
  if (selectedStatus === REQUESTS) {
    selectedStatus = ALL_STATUS;
  }

  return {
    type: ActionTypes.UPDATE_SELECTED_DETAILS,
    selectedStatus: selectedStatus,
    selectedRequestTime: selectedRequestTime,
  };
};
export const setVerificationPerformed = isVerifyUsed => {
  return {
    type: ActionTypes.RELOAD_STATS,
    isVerifyUsed: isVerifyUsed,
  };
};
