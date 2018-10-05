import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Players = new Mongo.Collection('players');

if (Meteor.isServer) {
	Meteor.publish ('players', () => {
		return Players.find({});
	});
}

Meteor.methods(
  {
    'players.add': function() 
    {
      const userId = '' + (Players.find({}).count+1);
      const name = Meteor.user().username;

      if(!name)
      {
        throw new Meteor.Error('Not Authorized');
      }
      Players.upsert(
        {userId},
        {
          userId: uId,
          name,
          win:0,
          tie:0,
          lost:0
        });

      const player = Players.findOne({userId});
      return player;
    },

    'players.findById': function(id){
      const player = Players.find({id: Meteor.userId()}).fetch()
    },

    'players.updateWin': function(id){
      const player = Players.find({id: Meteor.userId()}).fetch()
      Players.update(player[0].userId, win = win+1);
    },

    'players.updateLost': function(id){
      const player = Players.find({id: Meteor.userId()}).fetch()
      Players.update(player[0].userId, lost = lost+1);
    },

    'players.updateTie': function(id){
      const player = Players.find({id: Meteor.userId()}).fetch()
      Players.update(player[0].userId, tie = tie+1);
    }
  }
);