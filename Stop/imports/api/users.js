import { Meteor } from 'meteor/meteor';

const USER_FIELDS = {
  ganadas: 1,
  perdidas: 1,
  roomId:1};

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
      {fields: USER_FIELDS});
  } else {
    this.ready();
  }
});
