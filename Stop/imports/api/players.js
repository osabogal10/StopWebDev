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
      const name = Meteor.user().username;
      const win = Meteor.user().win;
      const lost = Meteor.user().lost;

      if(!name)
      {
        throw new Meteor.Error('Not Authorized');
      }
      Players.upsert(
        {name},
        {
          name,
          win:0,
          lost:0
        });

      const player = Players.findOne({name});
      return player;
    }
  }
);