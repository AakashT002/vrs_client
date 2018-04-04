import React from 'react';
import { shallow } from 'enzyme';
import PercentageStats from './PercentageStats';

describe('Component: PercentageStats For Users', () => {
  const props = {
    statsForUser: {
      type: 'Users',
      headers: ['name', 'requests', 'responses'],
      data: [
        {
          value1: 'Jim Thomson',
          value2: '100',
          value3: {
            field1: '50',
            field2: '30',
            field3: '20',
          },
        },
        {
          value1: 'Anna Kate',
          value2: '90',
          value3: {
            field1: '40',
            field2: '30',
            field3: '20',
          },
        },
      ],
    },
  };

  const wrapper = shallow(<PercentageStats stats={props.statsForUser} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the card title', () => {
    expect(wrapper.find('.PercentageStats__title').exists()).toBe(true);
  });

  it('renders the name as header', () => {
    expect(wrapper.find('.PercentageStats__table-header0').exists()).toBe(true);
  });

  it('renders the requests as header', () => {
    expect(wrapper.find('.PercentageStats__table-header1').exists()).toBe(true);
  });

  it('renders the responses as header', () => {
    expect(wrapper.find('.PercentageStats__table-header2').exists()).toBe(true);
  });

  it('renders the name in a table row', () => {
    expect(wrapper.find('.PercentageStats__table-row-name').exists()).toBe(
      true
    );
  });

  it('renders the requests in a table row', () => {
    expect(wrapper.find('.PercentageStats__table-row-requests').exists()).toBe(
      true
    );
  });

  it('renders the responses in a table row', () => {
    expect(wrapper.find('.PercentageStats__table-row-response').exists()).toBe(
      true
    );
  });

  it('renders no.of users on loading', () => {
    expect(wrapper.find('.PercentageStats__table-row').length).toBe(2);
  });
});

describe('Component: PercentageStats For Devices', () => {
  const props = {
    statsForDevices: {
      type: 'Devices',
      headers: ['device id', 'requests', 'responses'],
      data: [
        {
          value1: 'ABCD-123',
          value2: '100',
          value3: {
            field1: '50',
            field2: '30',
            field3: '20',
          },
        },
        {
          value1: 'MOTOG-455',
          value2: '90',
          value3: {
            field1: '40',
            field2: '30',
            field3: '20',
          },
        },
      ],
    },
  };

  const wrapper = shallow(<PercentageStats stats={props.statsForDevices} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the card title', () => {
    expect(wrapper.find('.PercentageStats__title').exists()).toBe(true);
  });

  it('renders the device id as header', () => {
    expect(wrapper.find('.PercentageStats__table-header0 p').text()).toContain(
      'DEVICE ID'
    );
  });

  it('renders the requests as header', () => {
    expect(wrapper.find('.PercentageStats__table-header1 p').text()).toContain(
      'REQUESTS'
    );
  });

  it('renders the responses as header', () => {
    expect(wrapper.find('.PercentageStats__table-header2 p').text()).toContain(
      'RESPONSES'
    );
  });
});
