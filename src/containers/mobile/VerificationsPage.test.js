import React from 'react';
import { shallow } from 'enzyme';

import VerificationsPage from './VerificationsPage';

describe('Component: VerificationsPage', () => {
  const dispatchStub = () => {
    return new Promise(() => {});
  };
  let wrapper;
  let verifications = [];

  beforeEach(() => {
    wrapper = shallow(
      <VerificationsPage.WrappedComponent
        dispatch={dispatchStub}
        verificationList={verifications}
      />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a proper  verifications page', () => {
    expect(wrapper.find('.VerificationsPage').exists()).toBe(true);
  });

  it('renders a proper verification page container', () => {
    expect(wrapper.find('.VerificationsPage-container').exists()).toBe(true);
  });

  it('renders a proper verification page layout', () => {
    expect(wrapper.find('.VerificationsPage-layout').exists()).toBe(true);
  });
});
