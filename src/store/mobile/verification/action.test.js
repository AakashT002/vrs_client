import * as actions from '../../../store/mobile/verification/action';
import * as ActionTypes from '../../actionTypes';

describe('actions', () => {

  var verificationList = [
    {
      userId: 'f1e710ab-c3eb-4b0d-8617-844af593e8dc',
      firstName: 'Shankar',
      lastName: 'Sharma',
      id: '74dd3ec0-2058-495b-92f2-8953cf5218fd',
      requestorId: 'AXBW-1232',
      responderId: 'Pfizer',
      vrsProviderId: null,
      requestSentTime: '2018-04-11T06:44:31.836Z',
      responseRcvTime: '2018-04-11T06:44:32.601Z',
      status: 'VERIFIED',
      deviceType: 'desktop',
      gtin: '10350881006602',
      srn: '12345678904321',
      lot: 'ABC1234',
      expDate: '20190321',
      productName: 'Jakafi 60 ct bottle'
    }
  ];

  it('should create an action to clear search field', () => {
    const expectedAction = {
      type: ActionTypes.CLEAR_SEARCH_SUCCESS,
      verificationList
    };
    expect(actions.clearSearchField(verificationList)).toEqual(expectedAction);
  });

  it('should create an action to clear verification result', () => {
    const expectedAction = {
      type: ActionTypes.CLEAR_VERIFICATION_RESULT,
    };
    expect(actions.clearVerificationResult()).toEqual(expectedAction);
  });

  it('should create an action to sort verification list', () => {
    const isDescending = true;
    const expectedAction = {
      type: ActionTypes.SORT_DATE_SUCCESS,
      verificationList,
      isDescending,
    };
    expect(actions.sort(verificationList, isDescending)).toEqual(expectedAction);
  });

  it('should create an action to update device type', () => {
    const expectedAction = {
      type: ActionTypes.UPDATE_DEVICE_TYPE,
    };
    expect(actions.updateDeviceType()).toEqual(expectedAction);
  });

  it('should create an action to perform search on verification list', () => {
    const newList = verificationList;
    const searchField = '12345678904321';
    const expectedAction = {
      newList,
      type: ActionTypes.SEARCH_FIELD_SUCCESS,
    };
    expect(actions.search(newList, searchField)).toEqual(expectedAction);
  });
});