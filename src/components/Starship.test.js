import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Starship } from './Starship';
import { shallow } from 'enzyme';

describe('Starship component', () => {
  it('renders without crashing', () => {
    const starship = shallow(<Starship />);
    expect(starship.find('.Starship')).to.have.length(1);
  });
  it('renders a link to the homepage isEmpty prop is set to true', () => {
    const starship = shallow(<Starship isEmpty={true} />);
    expect(starship.find('Link')).to.have.length(1);
    expect(starship.find('Link').props().to).to.equal('/');
  });
  it('renders a pilot list with entries if pilots passed as props is an Array', () => {
    const starship = shallow(<Starship pilots={[ {} ]} />);
    expect(starship.find('.pilot-list').children()).to.have.length(1);
  });
  it('renders an empty pilot list if pilots passed as props is not an Array', () => {
    const starship = shallow(<Starship pilots={{}} />);
    expect(starship.find('.pilot-list').children()).to.have.length(0);
  });
  describe('handlePilotClick', () => {
    let mockEvent;
    beforeEach(() => {
      mockEvent = { preventDefault: sinon.stub() };
    });
    it('returns a function', () => {
      const starship = new Starship;
      expect(starship.handlePilotClick()).to.be.a('function');
    });
    it('returns a function that takes an event, prevents default, fetches pilot and redirects to \'character\' page', () => {
      const mockFetchCharacter = sinon.stub();
      const mockRouter = {
        push: sinon.stub()
      };
      const starship = new Starship({ fetchCharacter: mockFetchCharacter }, { router: mockRouter });
      const url = 'foo-bar';
      starship.handlePilotClick(url)(mockEvent);
      expect(mockFetchCharacter.calledOnce).to.equal(true);
      expect(mockFetchCharacter.calledWith(url)).to.equal(true);
      expect(mockRouter.push.calledOnce).to.equal(true);
      expect(mockRouter.push.calledWith({
        pathname: '/character',
        query: { url }
      })).to.equal(true);
    });
  });
});