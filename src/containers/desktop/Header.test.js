import React from 'react';
import SessionStorage from '../../__mocks__/mockSessionStorage';
import Header from './Header';
import { mount } from 'enzyme';

describe('containers: Header', () => {
  window.sessionStorage = new SessionStorage();
  const dispatchStub = () => {
    return new Promise(() => {});
  };

  let wrapper;
  beforeEach(() => {
    sessionStorage.setItem('username', 'testuser');
    wrapper = mount(
      <Header.WrappedComponent dispatch={dispatchStub} isAuthenticated={true} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the header', () => {
    expect(wrapper.find('.Header').exists()).toBe(true);
  });

  it('renders the toolbar', () => {
    expect(wrapper.find('.Header-toolbar').exists()).toBe(true);
  });

  it('renders Title logo', () => {
    expect(wrapper.find('.Header__title-logo').exists()).toBe(true);
  });

  it('Dropdown Button is present or not', () => {
    expect(wrapper.find('.Header__dropDown-icon').exists()).toBe(true);
  });

  it('Username is present or not', () => {
    expect(wrapper.find('.Header__title-username').length).toBe(1);
  });

  it('DropDown items should not be displayed intially', () => {
    expect(wrapper.find('.Header__dropDown-item').exists()).toBe(false);
  });

  it('DropDown items should be displayed when hovered on Username', () => {
    wrapper.find('.Header__username-dropDown').simulate('mouseEnter');
    expect(wrapper.find('.Header__dropDown-item').exists()).toBe(true);
  });

  it('DropDown items should not be displayed when focus is not on Username', () => {
    wrapper.find('.Header__username-dropDown').simulate('mouseEnter');
    wrapper.find('.Header__username-dropDown').simulate('mouseLeave');
    expect(wrapper.find('.Header__dropDown-item').exists()).toBe(false);
  });
});
