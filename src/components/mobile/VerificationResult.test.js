import React from 'react';
import { shallow } from 'enzyme';

import VerificationResult from './VerificationResult';

describe('Component: VerificationResults', () => {
  const props = {
    productIdentifier:
      '(01)10350881006602(21)12345678904321(17)ABC1234(10)20190321',
    verificationResult: [
      {
        srn: 1425,
        gtin: 12586,
        status: 'Pending',
        transactionID: '',
        requestorID: '',
        expDate: '',
        product: '',
        requestSentTime: '',
        lot: '',
        events: [
          {
            eventTime: '2018-02-15T07:31:43.996Z',
            eventStatus: '',
            eventMessage: '',
          },
        ],
      },
      {
        srn: 1425,
        gtin: 12586,
        status: 'Pending',
        transactionID: '',
        requestorID: '',
        expDate: '',
        product: '',
        requestSentTime: '',
        lot: '',
        events: [
          {
            eventTime: '2018-02-15T07:31:43.996Z',
            eventStatus: '',
            eventMessage: '',
          },
        ],
      },
    ],
  };
  const spy = jest.fn();
  const wrapper = shallow(
    <VerificationResult
      productIdentifier={props.productIdentifier}
      data={props.verificationResult}
      expirationDateFormat={spy}
      transactionEventDateFormat={spy}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders status icon with in the transaction details card', () => {
    expect(
      wrapper.find('.verification-results_status-icon-small').exists()
    ).toBe(true);
  });

  it('renders no.of transactions on loading', () => {
    expect(wrapper.find('.verification-results__details-card').length).toBe(2);
    expect(
      wrapper.find('.verification-results__details-card CardText').length
    ).toBe(2);
  });
});
