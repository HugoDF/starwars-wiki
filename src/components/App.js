import React from 'react';
import { IndexLink, Link } from 'react-router';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <div className="App-nav">
        <h2>Star Wars Wiki</h2>
        <IndexLink className="nav-link" activeClassName="active" to="/">Homepage</IndexLink>
        <Link className="nav-link" activeClassName="active" to="/favourites">Favourites</Link>
      </div>
      <div className="App-body">
        {props.children}
      </div>
    </div>
  );
}

export default App;
