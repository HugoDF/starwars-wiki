import React from 'react';
import './StatusOverlay.css';

function StatusOverlay({ loadingText = "LOADING", error, isLoading }) {
  if(isLoading) {
    return (
      <div className="StatusOverlay">
        <div className="text-container">{loadingText}</div>
      </div>
    )
  }
  if(error && !isLoading) {
    return (
      <div className="StatusOverlay">
        <div className="text-container">Error: {error.response && error.response.status + ', ' + error.response.statusText}</div>
      </div>
    );
  }
  return <span />;
}

export default StatusOverlay;