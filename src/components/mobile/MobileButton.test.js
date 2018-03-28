import React from 'react';
import MobileButton from './MobileButton';
import SessionStorage from '../../__mocks__/mockSessionStorage';
import { mount } from 'enzyme';

describe('Component: MobileButton', () => {
  window.sessionStorage = new SessionStorage();
  const props = {
    visible: true,
  };
  const spy = jest.fn();
  const handleVerifyProduct = spy;
  const handleAllVerifications = spy;
  const handleLogout = spy;

  const wrapper = mount(
    <MobileButton
      handleDrawer={spy}
      visible={props.visible}
      handleVerifyProduct={handleVerifyProduct}
      handleAllVerifications={handleAllVerifications}
    />
  );

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Menu Drawer Icon is displayed or not', () => {
    expect(wrapper.find('.mobileButton__option').length).toBe(1);
  });

  it('Menu Drawer is present or not', () => {
    expect(wrapper.find('.mobileButton__menu-drawer .open').length).toBe(1);
  });

  it('Should render 3 options in the menu drawer', () => {
    expect(wrapper.find('.mobileButton__row').length).toBe(3);
  });

  it('renders first option as Verify Product in the menu drawer', () => {
    expect(
      wrapper
        .find('.mobileButton__row')
        .at(0)
        .text()
    ).toEqual('VERIFY PRODUCT');
  });

  it('renders second option as ALL VERIFICATIONS in the menu drawer', () => {
    expect(
      wrapper
        .find('.mobileButton__row')
        .at(1)
        .text()
    ).toEqual('ALL VERIFICATIONS');
  });

  it('renders third option as LOGOUT in the menu drawer', () => {
    expect(
      wrapper
        .find('.mobileButton__row')
        .at(2)
        .text()
    ).toEqual('LOGOUT');
  });

  it('should call handleVerifyProduct when the VERIFY PRODUCT option is clicked', () => {
    wrapper
      .find('.mobileButton__row')
      .at(0)
      .simulate('click');
    expect(handleVerifyProduct).toHaveBeenCalled();
  });

  it('should call handleAllVerifications when the All Verifications option is clicked', () => {
    wrapper
      .find('.mobileButton__row')
      .at(1)
      .simulate('click');
    expect(handleAllVerifications).toHaveBeenCalled();
  });

  it('should call handleLogout when the Logout option is clicked', () => {
    wrapper
      .find('.mobileButton__row')
      .at(2)
      .simulate('click');
    expect(handleLogout).toHaveBeenCalled();
  });
});
