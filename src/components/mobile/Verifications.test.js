import React from 'react';
import { shallow } from 'enzyme';

import Verifications from './Verifications';

import { PENDING, VERIFIED } from '../../utils/constants';

describe('Component: Verifications', () => {
  let verificationsList = [
    {
      srn: '1264837692650268',
      responseRcvTime: '2018-02-13T14:25:22.273Z',
      status: VERIFIED,
    },
    {
      serializationCode: '1264837692650268',
      TimeStamp: '2018-02-13T14:25:22.273Z',
      status: PENDING,
    },
  ];

  const wrapper = shallow(<Verifications data={verificationsList} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a verification table', () => {
    expect(wrapper.find('.Verifications__table').exists()).toBe(true);
  });

  it('renders a verification table header', () => {
    expect(wrapper.find('.Verifications__table--header').exists()).toBe(true);
  });

  it('renders a verification label', () => {
    expect(wrapper.find('.Verifications__label').exists()).toBe(true);
  });

  it('renders a verification hours label', () => {
    expect(wrapper.find('.Verifications__hours').exists()).toBe(true);
  });

  it('renders a verification table row', () => {
    expect(wrapper.find('.Verifications__table--row').exists()).toBe(true);
  });

  it('renders a verification code for each verification in the list', () => {
    expect(wrapper.find('.Verifications__serialization--code').exists()).toBe(
      true
    );
  });

  it('renders a status for each verification in the list', () => {
    expect(wrapper.find('.Verifications__status').exists()).toBe(true);
  });

  it('renders a timestamp for each verification in the list', () => {
    expect(wrapper.find('.Verifications__timestamp').exists()).toBe(true);
  });

  it('renders a verifications on loading', () => {
    expect(wrapper.find('.Verifications__table--row').length).toBe(2);
  });
});
