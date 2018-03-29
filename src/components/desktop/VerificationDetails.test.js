import React from 'react';
import { shallow } from 'enzyme';
import VerificationDetails from './VerificationDetails';

describe('Component: VerificationDetails', () => {
  const props = {
    productIdentifier:
      '(01)10350881006602(21)12345678904321(17)ABC1234(10)20190321',
    verificationResult: [
      {
        srn: 1425,
        gtin: 12586,
        status: 'VERIFIED',
        transactionID: '',
        requestorID: '',
        expDate: '',
        product: '',
        requestSentTime: '',
        lot: '',
        events: [
          {
            eventTime: '2018-02-15T07:31:43.996Z',
            eventStatus: 'VERIFIED',
            eventMessage: '',
          },
        ],
      },
      {
        srn: 1425,
        gtin: 12586,
        status: 'VERIFIED',
        transactionID: '',
        requestorID: '',
        expDate: '',
        product: '',
        requestSentTime: '',
        lot: '',
        events: [
          {
            eventTime: '2018-02-15T07:31:43.996Z',
            eventStatus: 'VERIFIED',
            eventMessage: '',
          },
        ],
      },
    ],
  };

  const spy = jest.fn();

  const wrapper = shallow(
    <VerificationDetails
      productIdentifier={props.productIdentifier}
      data={props.verificationResult}
      handleBackToVerifications={spy}
      expirationDateFormat={spy}
      transactionEventDateFormat={spy}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders an arrow', () => {
    expect(wrapper.find('.VerificationDetails__arrow-back').exists()).toBe(
      true
    );
  });

  it('renders the serial number as header', () => {
    expect(wrapper.find('.VerificationDetails__srn').exists()).toBe(true);
  });

  it('renders the icon of verification status', () => {
    expect(wrapper.find('.VerificationDetails__quick-icon').exists()).toBe(
      true
    );
  });

  it('renders the label of the verification status', () => {
    expect(wrapper.find('.VerificationDetails__status').exists()).toBe(true);
  });

  it('renders status icon with in the transaction details card', () => {
    expect(
      wrapper.find('.VerificationDetails__status--Thumbnail').exists()
    ).toBe(true);
  });

  it('renders no.of transactions on loading', () => {
    expect(wrapper.find('.VerificationDetails__table').length).toBe(2);
    expect(wrapper.find('.VerificationDetails__header-column').length).toBe(2);
    expect(wrapper.find('.VerificationDetails__body--row').length).toBe(2);
  });
});
