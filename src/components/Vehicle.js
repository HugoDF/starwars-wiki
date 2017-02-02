import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import {
  fetchVehicle,
  fetchCharacter
} from '../actions';

import StatusOverlay from './StatusOverlay';

export class Vehicle extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  componentDidMount() {
    const { url } = this.context.router.location.query;
    if(this.props.isEmpty && url) {
      this.props.fetchVehicle(url);
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
      vehicle_class,
      manufacturer,
      cost_in_credits,
      length,
      crew,
      passengers,
      max_atmosphering_speed,
      cargo_capacity,
      consumables,
      pilots
    } = this.props;
    return (
      <div className="Vehicle">
        <StatusOverlay loadingText="LOADING" isLoading={isLoading} error={error} />
        {
          isEmpty && !isLoading &&
            <div>No vehicle selected go to the <Link to="/">homepage</Link> to see some</div>
        }
        {
          !isEmpty && !isLoading && !error &&
          <div>
            <h2>{name}</h2>
            <p>Model: {model}</p>
            <p>Class: {vehicle_class}</p>
            <p>Manufacturer: {manufacturer}</p>
            <p>Cost: {cost_in_credits}</p>
            <p>Crew: {crew}</p>
            <p>Length: {length}</p>
            <p>Passengers: {passengers}</p>
            <p>Max atmosphering speed: {max_atmosphering_speed}</p>
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
  const { vehicle } = state;
  return {
    ...vehicle,
    isEmpty: Object.keys(vehicle).length - 2 <= 0
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchVehicle: (url) => {
      dispatch(fetchVehicle(url))
    },
    fetchCharacter: (url) => {
      dispatch(fetchCharacter(url));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vehicle);