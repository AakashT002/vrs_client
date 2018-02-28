import React from 'react';
import { shallow } from 'enzyme';

import Verifications from './Verifications';

import { VERIFIED } from '../../utils/constants';

describe('Component: Verifications', () => {
  let verificationsList = [
    {
      srn: '13268255316404',
      responseRcvTime: '2018-02-16T10:43:13.590Z',
      status: VERIFIED,
      gtin: '10350881006602',
      productName: 'Jakafi 60 ct bottle',
      lot: 'ABC1234',
      expDate: '20190321',
    },
  ];

  const wrapper = shallow(<Verifications data={verificationsList} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a verification table', () => {
    expect(wrapper.find('.DesktopVerifications__table').exists()).toBe(true);
  });

  it('renders a verification table header', () => {
    expect(wrapper.find('.DesktopVerifications__table--header').exists()).toBe(
      true
    );
  });

  it('renders a verification tabel header data', () => {
    expect(
      wrapper.find('.DesktopVerifications__table--header-data').exists()
    ).toBe(true);
  });

  it('renders a verification table row', () => {
    expect(wrapper.find('.DesktopVerifications__table--row').exists()).toBe(
      true
    );
  });

  it('renders a verifications table each column', () => {
    expect(wrapper.find('.DesktopVerifications__table--column').exists()).toBe(
      true
    );
  });

  it('renders a verifications status icon', () => {
    expect(wrapper.find('.DesktopVerifications__status--icon').exists()).toBe(
      true
    );
  });

  it('renders a verifications on loading', () => {
    expect(wrapper.find('.DesktopVerifications__table--row').length).toBe(1);
  });

  it('renders the verifications table columns on loading', () => {
    expect(wrapper.find('.DesktopVerifications__table--column').length).toBe(7);
  });

  it('renders a status for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__status').exists()).toBe(true);
  });

  it('renders a serial number for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__serial--number').exists()).toBe(
      true
    );
  });

  it('renders the last updated for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__last--updated').exists()).toBe(
      true
    );
  });

  it('renders a product name for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__product--name').exists()).toBe(
      true
    );
  });

  it('renders a gtin number for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__gtin').exists()).toBe(true);
  });

  it('renders the lot for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__lot').exists()).toBe(true);
  });

  it('renders the expiration for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__expiration').exists()).toBe(
      true
    );
  });
});
