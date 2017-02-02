import React from 'react';

import { connect } from 'react-redux';
import { fetchCharacterList } from '../actions';

import CharacterCard  from './CharacterCard';
import StatusOverlay from './StatusOverlay';

export class Home extends React.Component {
  componentDidMount() {
    if(this.props.characterList.length === 0) {
      this.props.fetchCharacters();
    }
  }
  render() {
    const { isLoading, error, characterList } = this.props;
    return (
      <div className="Home">
        <StatusOverlay loadingMessage="LOADING" isLoading={isLoading} error={error} />

        <div className="card-container">
          { Array.isArray(characterList) &&
            characterList.map((character, i) => {
              return (
                <CharacterCard
                  key={i}
                  {...character} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { characters } = state;
  return {
    characterList: characters.characterList || [],
    isLoading: characters.isLoading,
    error: characters.error
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCharacters: () => {
      dispatch(fetchCharacterList());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
