import React from 'react';
import { shallow } from 'enzyme';
import VerificationDetails from './VerificationDetails';

describe('Component: VerificationDetails', () => {
  const props = {
    pi: '31346131',
    verifiedProduct: {
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
    <VerificationDetails
      pi={props.pi}
      verifiedProduct={props.verifiedProduct}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders Status Icon', () => {
    expect(wrapper.find('.material-icons').exists()).toBe(true);
  });

  it('renders Status of verification', () => {
    expect(wrapper.find('.verification-details__status').exists()).toBe(true);
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
      wrapper.find('.verification-details_status-icon-small').exists()
    ).toBe(true);
  });

  it('renders details with in the transaction details card', () => {
    expect(wrapper.find('CardText p').length).toBe(2);
  });
});
