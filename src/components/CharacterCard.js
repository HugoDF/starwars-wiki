import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import {
  addFavourite,
  removeFavourite,
  fetchCharacter
} from '../actions';

import './CharacterCard.css';

import FavouriteButton from './FavouriteButton';

export class CharacterCard extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  showCharacter(url) {
    return (e) => {
      this.props.fetchCharacter(url);
      this.context.router.push({
        pathname: '/character',
        query: { url }
      });
    };
  }
  render() {
    const {
      name,
      height,
      birth_year,
      gender,
      mass,
      url,
      isFavourite
    } = this.props;
    return (
      <div className="CharacterCard">
        <h3 onClick={this.showCharacter(url)}>{name}</h3>
        <FavouriteButton isFavourite={isFavourite} url={url} {...this.props} />
        <div onClick={this.showCharacter(url)} style={{ textAlign: 'left' }}>
          <p>Height: {height}</p>
          <p>Weight: {mass}</p>
          <p>Birth year: {birth_year}</p>
          <p>Gender: {gender}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { favourites } = state;
  return {
    favourites,
    isFavourite: Boolean(favourites.find(({ url }) => url === ownProps.url))
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFavourite: (favourite) => {
      dispatch(addFavourite(favourite));
    },
    removeFavourite: (url) => {
      dispatch(removeFavourite(url));
    },
    fetchCharacter: (url) => {
      dispatch(fetchCharacter(url));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterCard);