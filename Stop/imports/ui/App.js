import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Imports carpeta api
import {Players} from '../api/players.js';

//Imports carpeta ui
import AccountsUIWrapper from './AccountsUIWrapper.js';
import CJGame from './CJGame.js';
import CreateGame from './CreateGame.js';
import JoinGame from './JoinGame.js';
import GameComponent from './GameComponent.js';
import GameForm from './GameForm.js';
import OtrosJugadores from './OtrosJugadores';
import CreateRoom from './CreateRoom.js';

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
        <div>------------------------------------------</div>
        <div>------------------------------------------</div>
        <h4>Componentes de prueba</h4>
        <AccountsUIWrapper/>
        <CreateRoom/>
        
        {/* <CJGame/>
        <CreateGame/>
        <JoinGame/>
        <GameComponent/>
        <div>------------------------------------------</div>
        <div>------------------------------------------</div>
        <h4>Interfaz de usuario a continuacion</h4>
        <h4>Active User</h4>
        <AccountsUIWrapper/>

        {Meteor.user() ?
          <div className ="userOK">
            <div> Usuario Logueado </div>
            <CJGame/>
          </div>
          :
          <div className ="userNOK">
            <div> Usuario no Logueado </div>
          
          </div>
        } */}

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