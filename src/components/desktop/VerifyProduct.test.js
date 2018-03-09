import React from 'react';
import { shallow } from 'enzyme';
import VerifyProduct from './VerifyProduct';

describe('Component: VerifyProduct', () => {
  const productIdentifier = '';
  const spy = jest.fn();
  const wrapper = shallow(
    <VerifyProduct
      productIdentifier={productIdentifier}
      handleChange={spy}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the verify product model view', () => {
    expect(wrapper.find('.verifyProduct').exists()).toBe(
      true
    );
  });
  
  it('renders the verify product input field', () => {
    expect(wrapper.find('.verifyProduct__product-id').exists()).toBe(
      true
    );
  });
});