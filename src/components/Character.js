import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import {
  fetchCharacter,
  fetchPlanet,
  fetchVehicle,
  fetchStarship
} from '../actions';

import FavouriteButton from './FavouriteButton';
import StatusOverlay from './StatusOverlay';
import './Character.css';

export class Character extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  componentDidMount() {
    const { url } = this.context.router.location.query;
    if (this.props.isEmpty && url) {
      this.props.fetchCharacter(url);
    }
  }
  handlePlanetClick(url) {
    return (e) => {
      e.preventDefault();
      this.props.fetchPlanet(url);
      this.context.router.push({
        pathname: '/planet',
        query: { url }
      });
    }
  }
  handleStarshipClick(url) {
    return (e) => {
      e.preventDefault();
      this.props.fetchStarship(url);
      this.context.router.push({
        pathname: '/starship',
        query: { url }
      });
    }
  }
  handleVehicleClick(url) {
    return (e) => {
      e.preventDefault();
      this.props.fetchVehicle(url);
      this.context.router.push({
        pathname: '/vehicle',
        query: { url }
      });
    }
  }
  renderCharacter(isLoading, character, isFavourite) {
    if (isLoading) {
      return;
    }
    return (
      <div>
        <h1>{character.name} <FavouriteButton isFavourite={isFavourite} {...character} /></h1>
        <p>Birth year: {character.birth_year}</p>
        <p>Eye colour: {character.eye_color}</p>
        <p>Height: {character.height}</p>
        <p>Weight: {character.mass}</p>
        <p>Gender: {character.gender}</p>
        <p>Species: {
          Array.isArray(character.species) &&
          <span className="species">
            {
              character.species
                .map(({ name }) => name)
                .join(', ')
            }
          </span>
        }
        </p>
        {
          character.homeworld &&
          <div>
            <h2>Homeworld</h2>
            <a href="#" onClick={this.handlePlanetClick(character.homeworld.url)}>
              {character.homeworld.name}
            </a>
          </div>
        }
        {
          character.starships && character.starships.length > 0 &&
          <div className="tile">
            <h2>Starships</h2>
            <ul className="starship-list">
              {
                character.starships.map((starship, i) => {
                  return (
                    <li key={i}>
                      <a href="#" onClick={this.handleStarshipClick(starship.url)} key={i}>
                        {starship.name}
                      </a>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        }
        {
          character.vehicles && character.vehicles.length > 0 &&
          <div className="tile">
            <h2>Vehicles</h2>
            <ul className="vehicle-list">
              {
                character.vehicles.map((vehicle, i) => {
                  return (
                    <li key={i}>
                      <a href="#" onClick={this.handleVehicleClick(vehicle.url)} key={i}>
                        {vehicle.name}
                      </a>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        }
      </div>
    );
  }
  render() {
    const { character = {}, isLoading, isEmpty, isFavourite } = this.props;
    return (
      <div className="Character">
        <StatusOverlay loadingText="LOADING" error={character.error} isLoading={isLoading} />
        {
          isEmpty && !isLoading ?
            (
              <div>No character selected go to the <Link to="/">homepage</Link> to see some</div>
            )
            :
            this.renderCharacter(isLoading, character, isFavourite)
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { character, favourites } = state;
  const { isLoading, ...characterRest } = character;
  const isEmpty = Object.keys(characterRest).length === 0;
  return {
    isLoading,
    isEmpty,
    character: characterRest,
    isFavourite: Boolean(favourites.find(({ url }) => url === characterRest.url))
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCharacter: (url) => {
      dispatch(fetchCharacter(url));
    },
    fetchPlanet: (url) => {
      dispatch(fetchPlanet(url));
    },
    fetchStarship: (url) => {
      dispatch(fetchStarship(url));
    },
    fetchVehicle: (url) => {
      dispatch(fetchVehicle(url));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Character);