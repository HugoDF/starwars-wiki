import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { FavouriteButton } from './FavouriteButton';
import { shallow } from 'enzyme';

describe('FavouriteButton component', () => {

  it('renders without crashing', () => {
    const favouriteButton = shallow(<FavouriteButton />);
    expect(favouriteButton.find('.FavouriteButton')).to.have.length(1);
  });

  describe('handleRemoveClick', () => {
    it('should return a function', () => {
      const favouriteButton = new FavouriteButton;
      expect(favouriteButton.handleRemoveClick()).to.be.a('function');
    });
    it('should return a function that calls removeFavourite function passed as prop when applied', () => {
      const removeFavouriteStub = sinon.stub();
      const favouriteButton = new FavouriteButton({ removeFavourite: removeFavouriteStub });
      const url = 'someurl';
      favouriteButton.handleRemoveClick(url)();
      expect(removeFavouriteStub.calledOnce).to.equal(true);
      expect(removeFavouriteStub.calledWith(url)).to.equal(true);
    });
  });

  describe('handleAddClick', () => {
    it('should return a function', () => {
      const favouriteButton = new FavouriteButton;
      expect(favouriteButton.handleAddClick()).to.be.a('function');
    });
    it('should return a function that calls removeFavourite function passed as prop when applied', () => {
      const addFavouriteStub = sinon.stub();
      const favouriteButton = new FavouriteButton({ addFavourite: addFavouriteStub });
      const obj = { url: 'someurl' };
      favouriteButton.handleAddClick(obj)();
      expect(addFavouriteStub.calledOnce).to.equal(true);
      expect(addFavouriteStub.calledWith(obj)).to.equal(true);
    });
  });

});