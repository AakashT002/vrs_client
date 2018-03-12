import React from 'react';
import { shallow } from 'enzyme';
import { ProductVerification } from './ProductVerification';

describe('Container: ProductVerification', () => {
  const props = {
    verificationResult: [],
  };
  const spy = jest.fn();

  const wrapper = shallow(
    <ProductVerification
      verificationResult={props.verificationResult}
      dispatch={spy}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the mobile home page', () => {
    expect(wrapper.find('.productVerification-layout').exists()).toBe(true);
  });
  it('renders the mobile layout', () => {
    expect(wrapper.find('.productVerification-layout').exists()).toBe(true);
  });
});
