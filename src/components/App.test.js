import React from 'react';
import { expect } from 'chai';
import App from './App';
import { shallow } from 'enzyme';

describe('App component', () => {
  it('renders without crashing', () => {
    const app = shallow(<App />);
    expect(app.find('.App')).to.have.length(1);
    expect(app.find('.App-body')).to.have.length(1);
  });
});
