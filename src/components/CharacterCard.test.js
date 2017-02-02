import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { CharacterCard } from './CharacterCard';
import { shallow } from 'enzyme';

describe('CharacterCard component', () => {

  it('renders without crashing', () => {
    const characterCard = shallow(<CharacterCard />);
    expect(characterCard.find('.CharacterCard')).to.have.length(1);
  });

  describe('showCharacter', () => {
    it('calls router push and fetchCharacter with URL', () => {
      const fetchCharacterStub = sinon.stub();
      const mockRouter = {
        push: sinon.stub()
      };
      const characterCard = new CharacterCard({ fetchCharacter: fetchCharacterStub }, { router: mockRouter });
      const url = 'someurl';
      characterCard.showCharacter(url)();
      expect(mockRouter.push.calledOnce).to.equal(true);
      expect(mockRouter.push.calledWith({
        pathname: '/character',
        query: { url }
      })).to.equal(true);
      expect(fetchCharacterStub.calledOnce).to.equal(true);
      expect(fetchCharacterStub.calledWith(url)).to.equal(true);
    });
  });

});