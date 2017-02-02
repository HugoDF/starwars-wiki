import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Planet } from './Planet';
import { shallow } from 'enzyme';

describe('Planet component', () => {
  it('renders without crashing', () => {
    const planet = shallow(<Planet />);
    expect(planet.find('.Planet')).to.have.length(1);
  });
  it('renders a link to the homepage isEmpty prop is set to true', () => {
    const planet = shallow(<Planet isEmpty={true} />);
    expect(planet.find('Link')).to.have.length(1);
    expect(planet.find('Link').props().to).to.equal('/');
  });
  it('renders a pilot list with items if residents passed as props is an array', () => {
    const planet = shallow(<Planet residents={[ {} ]} />);
    expect(planet.find('.resident-list').children()).to.have.length(1);
  });
  it('renders an empty pilot list if residents passed as props is not an array', () => {
    const planet = shallow(<Planet residents={{}} />);
    expect(planet.find('.resident-list').children()).to.have.length(0);
  });
  describe('handleResidentClick', () => {
    let mockEvent;
    beforeEach(() => {
      mockEvent = { preventDefault: sinon.stub() };
    });
    it('returns a function', () => {
      const planet = new Planet;
      expect(planet.handleResidentClick()).to.be.a('function');
    });
    it('returns a function that takes an event, prevents default, fetches resident and redirects to \'character\' page', () => {
      const mockFetchCharacter = sinon.stub();
      const mockRouter = {
        push: sinon.stub()
      };
      const planet = new Planet({ fetchCharacter: mockFetchCharacter }, { router: mockRouter });
      const url = 'foo-bar';
      planet.handleResidentClick(url)(mockEvent);
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