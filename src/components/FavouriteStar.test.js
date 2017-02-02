import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { FavouriteStar } from './FavouriteStar';
import { shallow } from 'enzyme';

describe('FavouriteStar component', () => {
  it('renders without crashing', () => {
    const favouriteStar = shallow(<FavouriteStar />);
    expect(favouriteStar.find('.FavouriteStar')).to.have.length(1);
  });
  it('renders with a font-awesome icon class', () => {
    const favouriteStar = shallow(<FavouriteStar />);
    expect(favouriteStar.find('.fa')).to.have.length(1);
    expect(favouriteStar.find('.fa-lg')).to.have.length(1);
  });
  it('renders with the full star if isFavourite prop is true and isHovered state is false', () => {
    const favouriteStar = shallow(<FavouriteStar isFavourite={true} />);
    expect(favouriteStar.find('.fa-star')).to.have.length(1);
  });
  it('renders with an empty star if isFavourite prop is false and isHovered state is false', () => {
    const favouriteStar = shallow(<FavouriteStar isFavourite={false} />);
    expect(favouriteStar.find('.fa-star-o')).to.have.length(1);
  });
  it('renders with a full star if isFavourite prop is false and isHovered state is true', () => {
    const favouriteStar = shallow(<FavouriteStar isFavourite={false} />);
    favouriteStar.setState({ isHovered: true });
    expect(favouriteStar.find('.fa-star')).to.have.length(1);
  });
  it('renders with an empty star if isFavourite prop is true and isHovered state is true', () => {
    const favouriteStar = shallow(<FavouriteStar isFavourite={true} />);
    favouriteStar.setState({ isHovered: true });
    expect(favouriteStar.find('.fa-star-o')).to.have.length(1);
  });
  describe('handleMouseEnter', () => {
    it('calls setState with { isHovered: true }', () => {
      const favouriteStar = new FavouriteStar;
      const setStateStub = sinon.stub();
      favouriteStar.setState = setStateStub;
      favouriteStar.handleMouseEnter();
      expect(setStateStub.calledOnce).to.equal(true);
      expect(setStateStub.calledWith({ isHovered: true })).to.equal(true);
    });
  });
  describe('handleMouseLeave', () => {
    it('calls setState with { isHovered: false }', () => {
      const favouriteStar = new FavouriteStar;
      const setStateStub = sinon.stub();
      favouriteStar.setState = setStateStub;
      favouriteStar.handleMouseLeave();
      expect(setStateStub.calledOnce).to.equal(true);
      expect(setStateStub.calledWith({ isHovered: false })).to.equal(true);
    });
  });
  describe('reset on new props', () => {
    it('calls setState with { isHovered: false } if the props change', () => {
      const favouriteStar = shallow(<FavouriteStar />);
      const setStateStub = sinon.stub();
      favouriteStar.instance().setState = setStateStub;
      favouriteStar.setProps({ isFavourite: true });
      expect(setStateStub.calledOnce).to.equal(true);
      expect(setStateStub.calledWith({ isHovered: false })).to.equal(true);
    });
  });
});