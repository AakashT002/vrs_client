import React from 'react';
import { shallow } from 'enzyme';
import { MobileApp } from './MobileApp';

describe('Container: MobileApp', () => {
  const wrapper = shallow(<MobileApp />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
