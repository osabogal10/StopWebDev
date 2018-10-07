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
    }
  }
});