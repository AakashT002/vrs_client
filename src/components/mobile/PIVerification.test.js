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
      handleClear={spy}
      handleChange={spy}
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

  it('renders the Inactive Verify Button if product identifier field is empty', () => {
    expect(
      wrapper.find('.pi-verification__verify-button-inActive').exists()
    ).toBe(true);
  });

  it('renders the Active Verify Button if product identifier field is not empty', () => {
    const wrapper = shallow(<PIVerification productIdentifier={'456'} />);
    expect(
      wrapper.find('.pi-verification__verify-button-active').exists()
    ).toBe(true);
  });

  it('should call handleSubmit function when the verify button is clicked', () => {
    const handleSubmit = spy;
    const wrapper = shallow(
      <PIVerification productIdentifier={'456'} handleSubmit={handleSubmit} />
    );
    wrapper.find('.pi-verification__verify-button-active').simulate('click');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('renders the Inactive Clear Button if product identifier field is empty', () => {
    expect(
      wrapper.find('.pi-verification__clear-button-inActive').exists()
    ).toBe(true);
  });

  it('renders the Active Clear Button if product identifier field is not empty', () => {
    const wrapper = shallow(<PIVerification productIdentifier={'456'} />);
    expect(wrapper.find('.pi-verification__clear-button-active').exists()).toBe(
      true
    );
  });

  it('should call handleClear function when the Clear button is clicked', () => {
    const handleClear = jest.fn();
    const wrapper = shallow(
      <PIVerification productIdentifier={'456'} handleClear={handleClear} />
    );
    wrapper.find('.pi-verification__clear-button-active').simulate('click');
    expect(handleClear.mock.calls.length).toEqual(1);
  });

  it('should call handleChange function when productIdentifier is changed', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <PIVerification productIdentifier={'456'} handleChange={handleChange} />
    );
    wrapper.find('.pi-verification__serial-number-input').simulate('change');
    expect(handleChange.mock.calls.length).toEqual(1);
  });
});
