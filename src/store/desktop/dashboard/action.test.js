import * as actions from '../../../store/desktop/dashboard/action';
import * as ActionTypes from '../../actionTypes';

describe('actions', () => {

  it('should create an action to update selected details', () => {
    const selectedStatus = 'All';
    const selectedRequestTime = 'All Time';    
    const expectedAction = {
      type: ActionTypes.UPDATE_SELECTED_DETAILS,
      selectedStatus,
      selectedRequestTime
    };
    expect(actions.updateSelectedDetails(selectedStatus, selectedRequestTime)).toEqual(expectedAction);
  });
});