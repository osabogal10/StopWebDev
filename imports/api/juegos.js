import {Mongo} from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Juegos = new Mongo.Collection('juegos');

if(Meteor.isServer){
  Meteor.publish('juegos', () =>{
    return Juegos.find({});
  });
}

Meteor.methods({
  'juegos.addJugada':function(jugada){
    const username = Meteor.user().username;
    Juegos.upsert({user:username},jugada);
  },
  'juegos.votar':function(pUser,field,vote){
    if(vote){
      let str = `{"${field}.score":1}`;
      let obj = JSON.parse(str);
      Juegos.update({user:pUser},{$inc:obj});
    }
    else{
      let str = `{"${field}.score":-1}`;
      let obj = JSON.parse(str);
      Juegos.update({user:pUser},{$inc:obj});
    }
  }
});