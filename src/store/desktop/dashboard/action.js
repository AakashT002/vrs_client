import * as ActionTypes from '../../actionTypes';

export const getStatsForUser = () => {
  const statsForUser = {
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
          field1: '30',
          field2: '30',
          field3: '30',
        },
      },
    ],
  };

  return {
    type: ActionTypes.FETCH_STATS_USERS_SUCCESS,
    users: statsForUser,
  };
};

export const getStatsForDevices = () => {
  const statsForDevices = {
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
  };
  return {
    type: ActionTypes.FETCH_STATS_DEVICES_SUCCESS,
    devices: statsForDevices,
  };
};
