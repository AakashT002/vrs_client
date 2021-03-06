import React from 'react';
import { shallow } from 'enzyme';

import SessionStorage from '../../__mocks__/mockSessionStorage';

import Verifications from './Verifications';

import { VERIFIED } from '../../utils/constants';

describe('Component: Verifications', () => {
  window.sessionStorage = new SessionStorage();
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
  let deviceType = process.env.REACT_APP_DEVICE_TYPE;
  let verificationResult = [];

  const spy = jest.fn();
  const wrapper = shallow(
    <Verifications
      data={verificationsList}
      onSubmit={spy}
      handleVerifyProduct={spy}
      verificationResult={verificationResult}
      isPIVerificationModalVisible={true}
      handleCancel={spy}
      expirationDateFormat={spy}
      transactionEventDateFormat={spy}
      deviceType={deviceType}
    />
  );

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

  it('renders the verifications page title', () => {
    expect(wrapper.find('.DesktopVerifications__title').exists()).toBe(true);
  });

  it('renders the verifications page title', () => {
    expect(wrapper.find('.DesktopVerifications__title--text').exists()).toBe(
      true
    );
  });

  it('renders the verifications page title', () => {
    expect(wrapper.find('.DesktopVerifications__title--text').text()).toContain(
      'Verifications'
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
    expect(wrapper.find('.DesktopVerifications__table--column').length).toBe(6);
  });

  it('renders a status for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__status').exists()).toBe(true);
  });

  it('renders a sni for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__sni').exists()).toBe(true);
  });

  it('renders the last updated for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__requested').exists()).toBe(
      true
    );
  });

  it('renders a user for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__user').exists()).toBe(true);
  });

  it('renders the returned by for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__returned-by').exists()).toBe(
      true
    );
  });

  it('renders the shipped by for each verification in the list', () => {
    expect(wrapper.find('.DesktopVerifications__shipped-by').exists()).toBe(
      true
    );
  });
});
