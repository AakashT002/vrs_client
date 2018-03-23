import React from 'react';
import { shallow } from 'enzyme';
import ProductDetails from './ProductDetails';

describe('Component: ProductDetails', () => {
  const props = {
    isPIVerificationModalVisible: true,
    productIdentifier:
      '(01)10350881006602(21)12345678904321(17)ABC1234(10)20190321',
    gtin: 13425,
    srn: 1231,
    status: 'Verified',
    expDate: '20190321',
    productName: 'jakafi 60 ct bottle',
    lot: 'ABC1234',
    deviceType: process.env.REACT_APP_DEVICE_TYPE,
  };
  const spy = jest.fn();
  const wrapper = shallow(
    <ProductDetails
      productIdentifier={props.productIdentifier}
      gtin={props.gtin}
      srn={props.srn}
      lot={props.lot}
      expDate={props.expDate}
      productName={props.productName}
      expirationDateFormat={spy}
      showInModal={props.isPIVerificationModalVisible}
      deviceType={props.deviceType}
    />
  );
  const renderClassName = props.isPIVerificationModalVisible
    ? 'desktop-modal'
    : props.deviceType;
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders product identifier', () => {
    expect(
      wrapper.find(`.ProductDetails__pi-${renderClassName}`).text()
    ).toEqual('(01)10350881006602(21)12345678904321(17)ABC1234(10)20190321');
  });

  it('renders the product details', () => {
    expect(
      wrapper.find(`.ProductDetails__details-${renderClassName}`).exists()
    ).toBe(true);
    expect(wrapper.find('.ProductDetails__gtin').text()).toEqual('GTIN: 13425');
    expect(wrapper.find('.ProductDetails__serial-number').text()).toEqual(
      'Serial Number: 1231'
    );
    expect(wrapper.find('.ProductDetails__lot').text()).toEqual('Lot: ABC1234');
    expect(wrapper.find('.ProductDetails__expiration').text()).toEqual(
      'Expiration: 21 Mar 2019'
    );
    expect(wrapper.find('.ProductDetails__product-name').text()).toEqual(
      'Product: jakafi 60 ct bottle'
    );
  });
});