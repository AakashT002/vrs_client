import React from 'react';
import { shallow } from 'enzyme';
import { VerificationsPage } from './VerificationsPage';

describe('Container: VerificationsPage', () => {
  const props = {
    verificationResult: [],
  };
  const spy = jest.fn();

  const wrapper = shallow(
    <VerificationsPage
      verificationResult={props.verificationResult}
      dispatch={spy}
      onSubmit={spy}
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

  it('renders the verifications page title', () => {
    expect(wrapper.find('.VerificationsPage__title').exists()).toBe(true);
  });

  it('renders the verifications page title', () => {
    expect(wrapper.find('.VerificationsPage__title--text').exists()).toBe(true);
  });

  it('renders the verifications page title', () => {
    expect(
      wrapper.find('.VerificationsPage__title--text').text()
    ).toContain('Verifications');
  });

  it('renders the verifications page verify product button', () => {
    expect(wrapper.find('.VerificationsPage__verify-product--button').exists()).toBe(true);
  });

  it('should call onSubmit when the verify product button is clicked', () => {
    const submitButton = wrapper.find('.VerificationsPage__verify-product--button');
    submitButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});