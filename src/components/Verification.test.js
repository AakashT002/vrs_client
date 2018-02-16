import React from 'react';
import { shallow } from 'enzyme';
import Verification from './Verification';

describe('Component: Verification', () => {
  const props = {
    pi: '',
  };
  const spy = jest.fn();
  const wrapper = shallow(<Verification pi={props.pi} handleClick={spy} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the instruction heading', () => {
    expect(wrapper.find('.verification__instruction').text()).toEqual(
      'Enter a product identifier to verify'
    );
  });

  it('renders the Verification input field', () => {
    expect(wrapper.find('.verification__serial-number-input').exists()).toBe(
      true
    );
  });

  it('renders the Inactive Verify Button', () => {
    expect(wrapper.find('.verification__verify-button-inActive').exists()).toBe(
      true
    );
  });

  it('renders the Active Verify Button', () => {
    const wrapper = shallow(<Verification pi={'456'} />);
    expect(wrapper.find('.verification__verify-button-active').exists()).toBe(
      true
    );
  });

  it('should call onClick when the verify button is clicked', () => {
    const wrapper = shallow(<Verification pi={'456'} handleClick={spy} />);
    wrapper.find('.verification__verify-button-active').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
