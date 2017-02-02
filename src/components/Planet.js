import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import {
  fetchPlanet,
  fetchCharacter
} from '../actions';

import StatusOverlay from './StatusOverlay';
import './Planet.css';

export class Planet extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  componentDidMount() {
    const { url } = this.context.router.location.query;
    if(this.props.isEmpty && url) {
      this.props.fetchPlanet(url);
    }
  }
  handleResidentClick(url) {
    return (e) => {
      e.preventDefault();
      this.props.fetchCharacter(url);
      this.context.router.push({
        pathname: '/character',
        query: { url }
      });
    }
  }
  render() {
    const {
      isLoading,
      error,
      isEmpty,
      name,
      terrain,
      climate,
      population,
      rotation_period,
      orbital_period,
      gravity,
      surface_water,
      residents
    } = this.props;
    return (
      <div className="Planet">
        <StatusOverlay loadingText="LOADING" isLoading={isLoading} error={error} />
        {
          isEmpty && !isLoading &&
            <div>No planet selected go to the <Link to="/">homepage</Link> to see some</div>
        }
        {
          !isEmpty && !isLoading && !error &&
          <div>
            <h2>{name}</h2>
            <p>Terrain: {terrain}</p>
            <p>Climate: {climate}</p>
            <p>Population: {population}</p>
            <p>Rotation Period: {rotation_period}</p>
            <p>Orbital Period: {orbital_period}</p>
            <p>Gravity: {gravity}</p>
            <p>Surface Water: {Boolean(surface_water) ? 'Yes': 'No'}</p>
            <h2>Residents</h2>
            <ul className="resident-list">
              {
                Array.isArray(residents) &&
                residents.map(({ name, url }, i) => {
                  return (
                    <li key={i}>
                      <a href="#" onClick={this.handleResidentClick(url)}>
                        {name}
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
}

const mapStateToProps = (state, ownProps) => {
  const { planet } = state;
  return {
    ...planet,
    isEmpty: Object.keys(planet).length - 2 <= 0
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPlanet: (url) => {
      dispatch(fetchPlanet(url))
    },
    fetchCharacter: (url) => {
      dispatch(fetchCharacter(url));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Planet);