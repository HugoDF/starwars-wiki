import React from 'react';

import { connect } from 'react-redux';
import {
  addFavourite,
  removeFavourite
} from '../actions';

import FavouriteStar from './FavouriteStar';

export class FavouriteButton extends React.Component {
  handleRemoveClick(url) {
    return (e) => {
      this.props.removeFavourite(url);
    };
  }
  handleAddClick(obj) {
    return (e) => {
      this.props.addFavourite(obj);
    };
  }
  render() {
    const { isFavourite, url } = this.props;
    const handler = isFavourite ? this.handleRemoveClick(url) : this.handleAddClick({ url, props: this.props });
    return (
      <span className="FavouriteButton" onClick={handler}>
        <FavouriteStar isFavourite={isFavourite} />
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => { return {}; };
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFavourite: (favourite) => {
      dispatch(addFavourite(favourite));
    },
    removeFavourite: (url) => {
      dispatch(removeFavourite(url));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouriteButton);