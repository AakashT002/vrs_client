import React from 'react';
import { shallow } from 'enzyme';
import VerificationResult from './VerificationResult';

describe('Component: VerificationResults', () => {
  const props = {
    productIdentifier:
      '(01)10350881006602(21)12345678904321(17)ABC1234(10)20190321',
    verificationResult: [
      {
        srn: 1231,
        gtin: 13425,
        status: 'Verified',
        expDate: '20190321',
        productName: 'jakafi 60 ct bottle',
        lot: 'ABC1234',
      },
      {
        srn: 1231,
        gtin: 13425,
        status: 'Verified',
        expDate: '20190321',
        productName: 'jakafi 60 ct bottle',
        lot: 'ABC1234',
      },
    ],
  };
  const spy = jest.fn();
  const wrapper = shallow(
    <VerificationResult
      productIdentifier={props.productIdentifier}
      data={props.verificationResult}
      expirationDateFormat={spy}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});