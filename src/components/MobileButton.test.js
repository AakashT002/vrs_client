import React from 'react';
import MobileButton from './MobileButton';
import { shallow } from 'enzyme';

describe('Component: MobileButton', () => {
  let location = {};
  const spy = jest.fn();
  const wrapper = shallow(
    <MobileButton location={location} handleOnClick={spy} />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Dropdown Button is present or not', () => {
    expect(wrapper.find('#menu-drawer').length).toBe(1);
  });

  it('Logout button option', () => {
    expect(wrapper.find('.mobileHeader_drawer-options').length).toBe(3);
  });
});
