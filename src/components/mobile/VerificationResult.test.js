import React from 'react';
import { shallow } from 'enzyme';
import VerificationResult from './VerificationResult';

describe('Component: VerificationResults', () => {
  const props = {
    pi: '31346131',
    verificationResult: {
      srn: 1425,
      gtin: 12586,
      status: 'pending',
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
  };

  const wrapper = shallow(
    <VerificationResult
      pi={props.pi}
      verificationResult={props.verificationResult}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders Status Icon', () => {
    expect(wrapper.find('.verification-results__quick-icon').exists()).toBe(
      true
    );
  });

  it('renders Status of verification', () => {
    expect(wrapper.find('.verification-results__status').exists()).toBe(true);
  });

  it('renders Serial number field', () => {
    expect(wrapper.find('.verification-detail__serial-number').exists()).toBe(
      true
    );
  });

  it('renders Exact Serial number', () => {
    expect(wrapper.find('.verification-detail__serial-number').text()).toEqual(
      'Serial Number: 1425'
    );
  });

  it('renders status icon with in the transaction details card', () => {
    expect(
      wrapper.find('.verification-results_status-icon-small').exists()
    ).toBe(true);
  });

  it('renders details with in the transaction details card', () => {
    expect(wrapper.find('CardText p').length).toBe(2);
  });
});
