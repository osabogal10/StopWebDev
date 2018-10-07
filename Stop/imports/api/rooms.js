import {Mongo} from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Rooms = new Mongo.Collection('rooms');

if(Meteor.isServer){
  Meteor.publish('rooms', () =>{
    return Rooms.find({});
  });
}

Meteor.methods({
  'rooms.addRoom':function(room){
    Rooms.upsert({owner:room.owner},room);
    let newroom = Rooms.findOne({owner:room.owner});
    Meteor.users.update({username: room.owner}, {$set: {'roomId': newroom._id}});
  },
  'rooms.joinPlayer':function(username,roomId){
    let jugadores=Rooms.findOne({_id:roomId},{players:1}).players;
    if(!jugadores.includes(username)){
      jugadores.push(username);
      Rooms.update({_id:roomId},{$set:{'players':jugadores}});
      Meteor.users.update({username:username},{$set:{'roomId':roomId}});
      let primeraJugada = {
        User: username,
        Nombre: ['',0],
        Ciudad: ['',0],
        Color: ['',0],
        Puntos: 0
      };
      let newPlays=Rooms.findOne({_id:roomId},{plays:1}).plays;
      //let playIndex = newPlays.find((obj => obj.user == primeraJugada.user));
      newPlays.push(primeraJugada);
      Rooms.update({_id:roomId},{$set:{'plays':newPlays}});
    }
  },
  'rooms.addPlay':function(jugada,roomId){
    let newPlays=Rooms.findOne({_id:roomId},{plays:1}).plays;
    let playIndex = newPlays.findIndex((obj => obj.user == jugada.user));
    console.log('index',playIndex);
    newPlays[playIndex] = jugada;
    console.log('newPlays',newPlays);
    Rooms.update({_id:roomId},{$set:{'plays':newPlays}});
  }
});