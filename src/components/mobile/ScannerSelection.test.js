import React from 'react';
import { shallow } from 'enzyme';
import SessionStorage from '../../__mocks__/mockSessionStorage';
import ScannerSelection from '../../components/mobile/ScannerSelection';

describe('Component: ScannerSelection', () => {
  const props = {
    scannerId: null,
  };

  window.sessionStorage = new SessionStorage();

  const spy = jest.fn();

  const wrapper = shallow(
    <ScannerSelection
      scannerId={props.scannerId}
      handleFieldChange={spy}
      handleSubmit={spy}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the Welcome heading', () => {
    expect(wrapper.find('.scannerSelection__welcome').text()).toEqual(
      'Hello, Testuser'
    );
  });

  it('renders the Instruction Text', () => {
    expect(wrapper.find('.scannerSelection__instruction').text()).toEqual(
      'Enter a scanner ID if you are using a handheld scanner.'
    );
  });

  it('renders the Scanner ID Text field', () => {
    expect(wrapper.find('.scannerSelection__text-field').exists()).toBe(true);
  });

  it('renders the "Use this phone as scanner" Check box', () => {
    expect(wrapper.find('.scannerSelection__check-box').exists()).toBe(true);
  });

  it('renders the SIGN IN button', () => {
    expect(wrapper.find('.scannerSelection__verify-button').exists()).toBe(
      true
    );
  });

  it('should call handleFieldChange function when the Scanner ID text field value is changed', () => {
    const wrapper = shallow(
      <ScannerSelection scannerId={props.scannerId} handleFieldChange={spy} />
    );
    wrapper.find('.scannerSelection__text-field').simulate('change');
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleSubmit function when the SIGN IN button is clicked', () => {
    const wrapper = shallow(
      <ScannerSelection scannerId={props.scannerId} handleSubmit={spy} />
    );
    wrapper.find('.scannerSelection__text-field').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
