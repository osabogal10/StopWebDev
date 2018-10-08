import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Games } from './../api/games.js';

export class GameComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gameId: 0,
      hostId: null,
      host: null,
      ready: false,
      players:[]
    };

    this.createGame = this.createGame.bind(this);
  }

  createGame(){
    Meteor.call('games.create', (err,res) => {
      this.setState({
        gameId:res.gameId,
        hostId:res.hostId,
        host:res.gameIdhost,
        ready:res.ready,
        players:res.players,
      });
    });
  }

  render() {
    return (
      <div>
        <h2>Create a Game</h2>
        <button onClick={this.createGame}>Create a Game</button>
        <label >{this.state.gameId}</label>
      </div>
    );
  }
}

GameComponent.propTypes = {
  ready: PropTypes.boolean,
  players: PropTypes.array
};

export default withTracker(() => {
  Meteor.subscribe('games');

  return{
    game: Games.find({}).fetch(),
    user: Meteor.user()
  };
})(GameComponent);