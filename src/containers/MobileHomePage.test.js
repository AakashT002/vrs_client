import React from 'react';
import { shallow } from 'enzyme';
import { MobileHomePage } from './MobileHomePage';

describe('Container: MobileHomePage', () => {
  const props = {
    displayPage: 'Verification',
  };
  const spy = jest.fn();

  const wrapper = shallow(
    <MobileHomePage displayPage={props.displayPage} dispatch={spy} />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the mobile home page', () => {
    expect(wrapper.find('.mobileHomePage-layout').exists()).toBe(true);
  });
  it('renders the mobile layout', () => {
    expect(wrapper.find('.mobileHomePage-layout').exists()).toBe(true);
  });
});
