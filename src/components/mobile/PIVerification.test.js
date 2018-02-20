import React from 'react';
import { shallow } from 'enzyme';
import PIVerification from './PIVerification';

describe('Component: PIVerification', () => {
  const props = {
    productIdentifier: '',
  };
  const spy = jest.fn();
  const wrapper = shallow(
    <PIVerification
      productIdentifier={props.productIdentifier}
      handleSubmit={spy}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the instruction heading', () => {
    expect(wrapper.find('.pi-verification__instruction').text()).toEqual(
      'Enter a product identifier to verify'
    );
  });

  it('renders the PIVerification input field', () => {
    expect(wrapper.find('.pi-verification__serial-number-input').exists()).toBe(
      true
    );
  });

  it('renders the Inactive Verify Button', () => {
    expect(
      wrapper.find('.pi-verification__verify-button-inActive').exists()
    ).toBe(true);
  });

  it('renders the Active Verify Button', () => {
    const wrapper = shallow(<PIVerification productIdentifier={'456'} />);
    expect(
      wrapper.find('.pi-verification__verify-button-active').exists()
    ).toBe(true);
  });

  it('should call onClick when the verify button is clicked', () => {
    const wrapper = shallow(
      <PIVerification productIdentifier={'456'} handleSubmit={spy} />
    );
    wrapper.find('.pi-verification__verify-button-active').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
