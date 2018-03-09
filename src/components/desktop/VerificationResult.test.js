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

  const wrapper = shallow(
    <VerificationResult
      productIdentifier={props.productIdentifier}
      data={props.verificationResult}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the icon for verification', () => {
    expect(wrapper.find('.verification-results__quick-icon').exists()).toBe(
      true
    );
  });

  it('renders Status of verification', () => {
    expect(wrapper.find('.verification-results__status').exists()).toBe(true);
  });

  it('renders product identifier', () => {
    expect(wrapper.find('.verification-results__pi').text()).toEqual(
      '(01)10350881006602(21)12345678904321(17)ABC1234(10)20190321'
    );
  });

  it('renders the product details', () => {
    expect(wrapper.find('.verification-product__details').exists()).toBe(
      true
    );
    expect(wrapper.find('.verification-product__details--gtin').text()).toEqual(
      'GTIN: 13425'
    );
    expect(wrapper.find('.verification-product__details--serial-number').text()).toEqual(
      'Serial Number: 1231'
    );
    expect(wrapper.find('.verification-product__details--lot').text()).toEqual(
      'Lot: ABC1234'
    );
    expect(wrapper.find('.verification-product__details--expiration').text()).toEqual(
      'Expiration: 21 Mar 2019'
    );
    expect(wrapper.find('.verification-product__details--product-name').text()).toEqual(
      'Product: jakafi 60 ct bottle'
    );
  });
});