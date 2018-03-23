import React from 'react';
import { shallow } from 'enzyme';
import PIVerificationForm from './PIVerificationForm';

describe('Component: PIVerificationForm', () => {
  const props = {
    productIdentifier: '',
  };
  const spy = jest.fn();
  const wrapper = shallow(
    <PIVerificationForm
      productIdentifier={props.productIdentifier}
      handleSubmit={spy}
      handleReset={spy}
      handleChange={spy}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the instruction heading', () => {
    expect(wrapper.find('.PIVerificationForm__instruction').text()).toEqual(
      'Enter a product identifier to verify'
    );
  });

  it('renders the Verification Form input field', () => {
    expect(wrapper.find('.PIVerificationForm__product-id-input').exists()).toBe(
      true
    );
  });

  it('renders the Verify Button if product identifier field is empty', () => {
    const wrapper = shallow(<PIVerificationForm productIdentifier={''} />);
    expect(
      wrapper.find('.PIVerificationForm__product-id-input').exists()
    ).toBe(true);
  });

  it('renders the Verify Button if product identifier field is not empty', () => {
    const wrapper = shallow(<PIVerificationForm productIdentifier={'456'} />);
    expect(
      wrapper.find('.PIVerificationForm__product-id-input').exists()
    ).toBe(true);
  });

  it('should call handleSubmit function when the verify button is clicked', () => {
    const handleSubmit = spy;
    const wrapper = shallow(
      <PIVerificationForm productIdentifier={'456'} handleSubmit={handleSubmit} />
    );
    wrapper.find('.PIVerificationForm__verify--button').simulate('click');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('renders the Clear Button if product identifier field is not empty', () => {
    const wrapper = shallow(<PIVerificationForm productIdentifier={'456'} />);
    expect(wrapper.find('.PIVerificationForm__reset--button').exists()).toBe(
      true
    );
  });

  it('should call handleClear function when the Clear or Cancel button is clicked', () => {
    const handleReset = jest.fn();
    const wrapper = shallow(
      <PIVerificationForm productIdentifier={'456'} handleReset={handleReset} />
    );
    wrapper.find('.PIVerificationForm__reset--button').simulate('click');
    expect(handleReset.mock.calls.length).toEqual(1);
  });

  it('should call handleChange function when productIdentifier is changed', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <PIVerificationForm productIdentifier={'456'} handleChange={handleChange} />
    );
    wrapper.find('.PIVerificationForm__product-id-input').simulate('change');
    expect(handleChange.mock.calls.length).toEqual(1);
  });
});