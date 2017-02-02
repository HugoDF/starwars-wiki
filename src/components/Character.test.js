import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Character } from './Character';
import { shallow } from 'enzyme';

describe('Character Component', () => {
  it('renders without crashing', () => {
    const character = shallow(<Character />);
    expect(character.find('.Character')).to.have.length(1);
  });
  it('renders a link to the homepage if isEmpty prop is true', () => {
    const character = shallow(<Character isEmpty={true} />);
    expect(character.find('Link')).to.have.length(1);
    expect(character.find('Link').props().to).to.equal('/');
  });
  describe('renderCharacter', () => {
    let character;
    beforeEach(() => {
      character = new Character;
    });
    it('returns undefined if isLoading param is true', () => {
      expect(character.renderCharacter(true)).to.equal(undefined);
    });
    it('returns a div if isLoading is false', () => {
      const rendered = shallow(character.renderCharacter(false, {}));
      expect(rendered.find('div')).to.have.length(1);
    });
    it('renders a species if character.species is an Array', () => {
      const rendered = shallow(character.renderCharacter(false, { species: [ {}, {} ]}));
      expect(rendered.find('.species')).to.have.length(1);
    });
  });
  describe('handlePlanetClick', () => {
    let mockFetch, mockRouter, mockEvent;
    beforeEach(() => {
      mockFetch = sinon.stub();
      mockRouter = {
        push: sinon.stub()
      };
      mockEvent = {
        preventDefault: sinon.stub()
      };
    });
    it('returns a function', () => {
      const character = new Character;
      expect(character.handlePlanetClick()).to.be.a('function');
    });
    it('returns a function that prevents default, fetches the planet and calls router.push', () => {
      const character = new Character({ fetchPlanet: mockFetch }, { router: mockRouter });
      const url = 'foo-bar';
      character.handlePlanetClick(url)(mockEvent);
      expect(mockEvent.preventDefault.calledOnce).to.equal(true);
      expect(mockRouter.push.calledOnce).to.equal(true);
      expect(mockRouter.push.calledWith({
        pathname: '/planet',
        query: { url }
      })).to.equal(true);
      expect(mockFetch.calledOnce).to.equal(true);
      expect(mockFetch.calledWith(url)).to.equal(true);
    });
  });
  describe('handleVehicleClick', () => {
    let mockFetch, mockRouter, mockEvent;
    beforeEach(() => {
      mockFetch = sinon.stub();
      mockRouter = {
        push: sinon.stub()
      };
      mockEvent = {
        preventDefault: sinon.stub()
      };
    });
    it('returns a function', () => {
      const character = new Character;
      expect(character.handleVehicleClick()).to.be.a('function');
    });
    it('returns a function that prevents default, fetches the vehicle and calls router.push', () => {
      const character = new Character({ fetchVehicle: mockFetch }, { router: mockRouter });
      const url = 'foo-bar';
      character.handleVehicleClick(url)(mockEvent);
      expect(mockEvent.preventDefault.calledOnce).to.equal(true);
      expect(mockRouter.push.calledOnce).to.equal(true);
      expect(mockRouter.push.calledWith({
        pathname: '/vehicle',
        query: { url }
      })).to.equal(true);
      expect(mockFetch.calledOnce).to.equal(true);
      expect(mockFetch.calledWith(url)).to.equal(true);
    });
  });
  describe('handleStarshipClick', () => {
    let mockFetch, mockRouter, mockEvent;
    beforeEach(() => {
      mockFetch = sinon.stub();
      mockRouter = {
        push: sinon.stub()
      };
      mockEvent = {
        preventDefault: sinon.stub()
      };
    });
    it('returns a function', () => {
      const character = new Character;
      expect(character.handleStarshipClick()).to.be.a('function');
    });
    it('returns a function that prevents default, fetches the starship and calls router.push', () => {
      const character = new Character({ fetchStarship: mockFetch }, { router: mockRouter });
      const url = 'foo-bar';
      character.handleStarshipClick(url)(mockEvent);
      expect(mockEvent.preventDefault.calledOnce).to.equal(true);
      expect(mockRouter.push.calledOnce).to.equal(true);
      expect(mockRouter.push.calledWith({
        pathname: '/starship',
        query: { url }
      })).to.equal(true);
      expect(mockFetch.calledOnce).to.equal(true);
      expect(mockFetch.calledWith(url)).to.equal(true);
    });
  });
});