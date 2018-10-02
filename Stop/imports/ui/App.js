import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Imports carpeta api
import {Players} from "../api/players.js"

//Imports carpeta ui
import AccountsUIWrapper from './AccountsUIWrapper.js';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h2>Meteor stop</h2>
        <AccountsUIWrapper/>
        {Meteor.user() ?
          <div> Usuario Logueado </div> :
          <div> Usuario no Logueado </div>
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