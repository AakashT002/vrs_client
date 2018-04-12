import React from 'react';
import { shallow } from 'enzyme';
import { VerificationsPage } from './VerificationsPage';
import createBrowserHistory from 'history/createBrowserHistory';

describe('Container: VerificationsPage', () => {
  const props = {
    verificationResult: [],
  };
  const spy = jest.fn();
  const history = createBrowserHistory();

  const wrapper = shallow(
    <VerificationsPage
      verificationResult={props.verificationResult}
      dispatch={spy}
      history={history}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the verifications page', () => {
    expect(wrapper.find('.DesktopVerificationsPage').exists()).toBe(true);
  });

  it('renders the verifications page header', () => {
    expect(wrapper.find('.VerificationsPage__header').exists()).toBe(true);
  });
});