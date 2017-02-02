import React from 'react';
import { expect } from 'chai';
import { Home } from './Home';
import { shallow } from 'enzyme';

describe('Home component', () => {
  it('renders without crashing', () => {
    const home = shallow(<Home />);
    expect(home.find('.Home')).to.have.length(1);
  });
});