import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Imports carpeta api
import {Players} from '../api/players.js';

//Imports carpeta ui
import GameComponent from './GameComponent.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import JoinGame from './JoinGame.js';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className = "app">
        <h2>Meteor Stop Game</h2>
        <h4>Active User</h4>
        <AccountsUIWrapper/>

        {Meteor.user() ?
          <div className ="userOK">
          <div> Usuario Logueado </div>
          <GameComponent/>
          <JoinGame/>
          </div>
           :
          <div className ="userNOK">
          <div> Usuario no Logueado </div>
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