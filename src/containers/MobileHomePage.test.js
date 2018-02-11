import React from 'react';
import { shallow } from 'enzyme';
import { MobileHomePage } from './MobileHomePage';

describe('Container: MobileHomePage', () => {
  const wrapper = shallow(<MobileHomePage />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
