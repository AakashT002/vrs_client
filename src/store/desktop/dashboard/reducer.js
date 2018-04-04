import createReducer from '../../createReducer';
import * as ActionTypes from '../../actionTypes';

const initialState = {
  statsForUser: {
    type: 'Users',
    headers: ['name', 'requests', 'responses'],
    data: [
      {
        value1: 'Jim Thomson',
        value2: '100',
        value3: {
          field1: '50',
          field2: '30',
          field3: '20',
        },
      },
      {
        value1: 'Anna Kate',
        value2: '90',
        value3: {
          field1: '40',
          field2: '30',
          field3: '20',
        },
      },
    ],
  },

  statsForDevices: {
    type: 'Devices',
    headers: ['device id', 'requests', 'responses'],
    data: [
      {
        value1: 'ABCD-123',
        value2: '100',
        value3: {
          field1: '50',
          field2: '30',
          field3: '20',
        },
      },
      {
        value1: 'MOTOG-455',
        value2: '90',
        value3: {
          field1: '40',
          field2: '30',
          field3: '20',
        },
      },
    ],
  },
};

export const dashboard = createReducer(initialState, {
  [ActionTypes.FETCH_STATS_USERS_SUCCESS](state = initialState, action) {
    return {
      ...state,
      statsForUser: action.users,
    };
  },

  [ActionTypes.FETCH_STATS_DEVICES_SUCCESS](state = initialState, action) {
    return {
      ...state,
      statsForDevices: action.devices,
    };
  },
});

export default dashboard;
