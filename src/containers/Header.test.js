import React from 'react';
import SessionStorage from '../__mocks__/mockSessionStorage';
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

  it('renders a Client name', () => {
    expect(wrapper.find('.header__user-menu').exists()).toBe(true);
  });

  it('Menu Button is present or not', () => {
    expect(wrapper.find('MenuButton').exists()).toBe(true);
  });

  it('Dropdown Button is present or not', () => {
    expect(wrapper.find('DropdownMenu').length).toBe(1);
  });

  it('Username is present or not', () => {
    expect(wrapper.find('.Header__title-username').length).toBe(1);
  });

  it('Username Button is present or not', () => {
    expect(wrapper.find('Button').length).toBe(1);
  });
});
