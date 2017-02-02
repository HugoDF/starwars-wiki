import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Vehicle } from './Vehicle';
import { shallow } from 'enzyme';

describe('Vehicle component', () => {
  it('renders without crashing', () => {
    const vehicle = shallow(<Vehicle />);
    expect(vehicle.find('.Vehicle')).to.have.length(1);
  });
  it('renders a link to the homepage isEmpty prop is set to true', () => {
    const vehicle = shallow(<Vehicle isEmpty={true} />);
    expect(vehicle.find('Link')).to.have.length(1);
    expect(vehicle.find('Link').props().to).to.equal('/');
  });
  it('renders a pilot list with items if pilots passed as props is an array', () => {
    const vehicle = shallow(<Vehicle pilots={[ {} ]} />);
    expect(vehicle.find('.pilot-list').children()).to.have.length(1);
  });
  it('renders an empty pilot list if pilots passed as props is not an array', () => {
    const vehicle = shallow(<Vehicle pilots={{}} />);
    expect(vehicle.find('.pilot-list').children()).to.have.length(0);
  });
  describe('handlePilotClick', () => {
    let mockEvent;
    beforeEach(() => {
      mockEvent = { preventDefault: sinon.stub() };
    });
    it('returns a function', () => {
      const vehicle = new Vehicle;
      expect(vehicle.handlePilotClick()).to.be.a('function');
    });
    it('returns a function that takes an event, prevents default, fetches pilot and redirects to \'character\' page', () => {
      const mockFetchCharacter = sinon.stub();
      const mockRouter = {
        push: sinon.stub()
      };
      const vehicle = new Vehicle({ fetchCharacter: mockFetchCharacter }, { router: mockRouter });
      const url = 'foo-bar';
      vehicle.handlePilotClick(url)(mockEvent);
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