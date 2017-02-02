import React from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { removeFavourite } from '../actions';

import CharacterCard from './CharacterCard';

export function Favourites(props) {
  const { favourites = []} = props;
  return (
    <div className="Favourites">
      {
        favourites.length > 0 ?
          (
            <div className="card-container">
              {
                favourites.map((favourite, i) => {
                  const { props } = favourite;
                  return (
                    <CharacterCard key={i} {...props} />
                  );
                })
              }
            </div>
          )
          :
          (<div>No favourites yet, add some from the <Link to="/">homepage</Link></div>)
      }
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { favourites } = state;
  return {
    favourites
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeFavourite: (favourite) => {
      dispatch(removeFavourite(favourite));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
