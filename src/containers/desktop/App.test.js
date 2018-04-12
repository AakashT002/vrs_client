import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import SessionStorage from '../../__mocks__/mockSessionStorage';

describe('Container: App', () => {
  window.sessionStorage = new SessionStorage();
  const wrapper = shallow(<App />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
