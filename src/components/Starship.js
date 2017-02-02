import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import {
  fetchStarship,
  fetchCharacter
} from '../actions';

import StatusOverlay from './StatusOverlay';
import './Starship.css';

export class Starship extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  componentDidMount() {
    const { url } = this.context.router.location.query;
    if(this.props.isEmpty && url) {
      this.props.fetchStarship(url);
    }
  }
  handlePilotClick(url) {
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
      model,
      starship_class,
      cost_in_credits,
      length,
      crew,
      passengers,
      max_atmosphering_speed,
      hyperdrive_rating,
      MGLT,
      cargo_capacity,
      consumables,
      pilots
    } = this.props;
    return (
      <div className="Starship">
        <StatusOverlay loadingText="LOADING" isLoading={isLoading} error={error} />
        {
          isEmpty && !isLoading &&
            <div>No starship selected go to the <Link to="/">homepage</Link> to see some</div>
        }
        {
          !isEmpty && !isLoading && !error &&
          <div>
            <h2>{name}</h2>
            <p>Model: {model}</p>
            <p>Class: {starship_class}</p>
            <p>Cost: {cost_in_credits}</p>
            <p>Length: {length}</p>
            <p>Crew: {crew}</p>
            <p>Passengers: {passengers}</p>
            <p>Max atmosphering speed: {max_atmosphering_speed}</p>
            <p>Hyperdrive rating: {hyperdrive_rating}</p>
            <p>Maximum number of Megalights per hour: {MGLT}</p>
            <p>Cargo capacity: {cargo_capacity}</p>
            <p>Consumables: {consumables}</p>
            <h2>Pilots</h2>
            <ul className="pilot-list">
              {
                Array.isArray(pilots) &&
                pilots.map((pilot, i) => {
                  return (
                    <li key={i}>
                      <a href="#" onClick={this.handlePilotClick(pilot.url)}>
                        {pilot.name}
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
  const { starship } = state;
  return {
    ...starship,
    isEmpty: Object.keys(starship).length - 2 <= 0
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchStarship: (url) => {
      dispatch(fetchStarship(url))
    },
    fetchCharacter: (url) => {
      dispatch(fetchCharacter(url));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Starship);