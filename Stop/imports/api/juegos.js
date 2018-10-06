import {Mongo} from 'meteor/mongo';

export const Juegos = new Mongo.Collection('juegos');

if(Meteor.isServer){
  Meteor.publish('juegos', () =>{
    return Juegos.find({});
  });
}

Meteor.methods({
  'juegos.addJugada':function(jugada){
    Juegos.insert(jugada);
  }
});