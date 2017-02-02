import { expect } from 'chai';
import favourites from './favourites';
import {
  addFavourite,
  removeFavourite
} from '../actions';

describe('favourites reducer', () => {
  describe('ADD_FAVOURITE action type reducer', () => {
    it('adds action.favourite to state if it is not already present (check url)', () => {
      const favourite = { url: 'a' };
      const newState = favourites([], addFavourite(favourite));
      expect(newState).to.deep.equal([ favourite ]);
    });
    it('does not add action.favourite to state if it is already present (check url)', () => {
      const favourite = { url: 'a' };
      const newState = favourites([ favourite ], addFavourite(favourite));
      expect(newState).to.deep.equal([ favourite ]);
    });
  });
  describe('REMOVE_FAVOURITE action type reducer', () => {
    it('filters out the favourite with the correct URL', () => {
      const favourite = { url: 'a' };
      const newState = favourites([ favourite ], removeFavourite(favourite.url));
      expect(newState).to.deep.equal([]);
    });
  });
})