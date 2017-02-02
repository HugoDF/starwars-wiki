import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Favourites } from './Favourites';
import { shallow } from 'enzyme';

describe('Favourites component', () => {
  it('renders without crashing', () => {
    const favourites = shallow(<Favourites />);
    expect(favourites.find('.Favourites')).to.have.length(1);
  });
  it('renders a link to the homepage if favourites passed as prop has length 0', () => {
    const favourites = shallow(<Favourites />);
    expect(favourites.find('Link')).to.have.length(1);
    expect(favourites.find('Link').props().to).to.equal('/');
  });
  it('renders a card container with the correct number of cards', () => {
    const favourites = shallow(<Favourites favourites={[ {}, {}, {} ]} />);
    expect(favourites.find('.card-container')).to.have.length(1);
    expect(favourites.find('.card-container').children()).to.have.length(3);
  });
});