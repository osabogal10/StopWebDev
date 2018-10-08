import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Imports carpeta api
import {Players} from '../api/players.js';

//Imports carpeta ui
import AccountsUIWrapper from './AccountsUIWrapper.js';
import CreateRoom from './CreateRoom.js';
import Navbar from './Navbar.js';

//Imports de CSS
import './app.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className = "app">
        <Navbar/>
        {Meteor.user() ?
          <div className="container">
            <CreateRoom/>
          </div>
          :
          <div className="container">
            <h1>Welcome to STOP Online Game</h1>
            <h4>An intense game to compete with family and friends!</h4>
            <br/><h2> To start you need to log in first</h2>
            <h2> Active User: </h2>
            <AccountsUIWrapper/>
          </div>
        }
        
      </div>
    );
  }
}

App.propTypes = {
  players: PropTypes.array.isRequired,
  user: PropTypes.object
};

export default withTracker(() => {
  return {
    players: Players.find({}).fetch(),
    user: Meteor.user()
  };
})(App);