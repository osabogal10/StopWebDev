import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('games');

// Hacer el publish unicamente de las cosas que deberia ver el usuario
// Esto deberia cambiarse por owner: Meteor.user().id o algo asi
// Calificable :v
if (Meteor.isServer) { 
  Meteor.publish('games', function gamesPublication() {
    return Games.find({});
  });
}

Meteor.methods({
  'games.create'() {
    if (!Meteor.user()._id) {
      throw new Meteor.Error('No logueado');
    }

    let gameId = '' + (Games.find({}).count() + 1);
    let hostId = Meteor.userId();
    let host = Meteor.user().username;
    let ready = false;
    let players = [{
      username: host
    }];
    let newGame = {
      _id: gameId,
      hostId,
      host,
      ready,
      players
    };
    Games.upsert(newGame);
    return newGame;
  },

  'games.findById': function(id) {
    const game = Games.find({id}).fetch()
    return game;
  },

  'games.findAll': function() {
    const games = Games.find().fetch()
    return games;
  },

  'games.remove': function(id){
    const game = Games.remove(id);
  },

  'games.update': function(id){
    const game = Games.find({id}).fetch()
    Games.update(game[0]._id,
      {
        ready: true,
        // No estoy seguro de como actualizar al nuevo jugador dentro del array
      });
  }

});