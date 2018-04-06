import React from 'react';
import { shallow } from 'enzyme';
import createBrowserHistory from 'history/createBrowserHistory';

import VerificationsPage from './VerificationsPage';

describe('Component: VerificationsPage', () => {
  const dispatchStub = () => {
    return new Promise(() => {});
  };
  let wrapper;
  let verifications = [];
  let verificationResult = [];
  const history = createBrowserHistory();

  beforeEach(() => {
    wrapper = shallow(
      <VerificationsPage.WrappedComponent
        dispatch={dispatchStub}
        verificationList={verifications}
        verificationResult={verificationResult}
        history={history}
      />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a proper verifications page', () => {
    expect(wrapper.find('.VerificationsPage').exists()).toBe(true);
  });

  it('renders a proper verification page container', () => {
    expect(wrapper.find('.VerificationsPage__container').exists()).toBe(true);
  });

  it('renders a proper verification page layout', () => {
    expect(wrapper.find('.VerificationsPage__layout').exists()).toBe(true);
  });
});
