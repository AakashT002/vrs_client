import React from 'react';
import { shallow } from 'enzyme';
import NumberStats from './NumberStats';

describe('Component: NumberStats', () => {
  const props = {
    status: 'VERIFIED',
    count: '6850',
  };

  const wrapper = shallow(
    <NumberStats status={props.status} noOfRequests={props.noOfRequests} />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the number of requests', () => {
    expect(
      wrapper.find('.NumberStats__title .NumberStats__verified').exists()
    ).toBe(true);
  });

  it('renders the status icon', () => {
    expect(wrapper.find('.NumberStats__check_circle').exists()).toBe(true);
  });

  it('renders the status label', () => {
    expect(wrapper.find('.NumberStats__verifiedStatusText').exists()).toBe(
      true
    );
  });
});
