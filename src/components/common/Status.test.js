import React from 'react';
import { shallow } from 'enzyme';
import Status from './Status';

describe('Component: Status', () => {
  const props = {
    status: 'Verified'
  };
  
  const wrapper = shallow(
    <Status
     value={props.status}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders background color', () => {
    expect(wrapper.find(`.Status__bgColor-${process.env.REACT_APP_DEVICE_TYPE}`).exists()).toBe(true);
  });

  it('renders status icon', () => {
    expect(wrapper.find('.Status__icon').exists()).toBe(true);
  });

  it('renders status label', () => {
    expect(wrapper.find('.Status__label').exists()).toBe(true);
    expect(wrapper.find('.Status__label').text()).toEqual(
      'Verified'
    );
  });

});