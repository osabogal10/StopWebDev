import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  Meteor.publish('games', function gamesPublication() {
    return Games.find();
  });
}

Meteor.methods({
  'games.create'() {
    if (!Meteor.user()._id) {
      throw new Meteor.Error('No logueado');
    }

    let gameId = '' + (Games.find({}).count() + 1);
    let host = Meteor.user().username;
    let ready = false;
    let players = [{
      username: host
    }];
    let newGame = {
      _id: gameId,
      host,
      ready,
      players
    };
    Games.insert(newGame);
    return newGame;
  }
});