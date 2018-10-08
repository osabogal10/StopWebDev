import { Meteor } from 'meteor/meteor';

// Imports de la carpeta api del cliente
import  '../imports/api/players.js';
import  '../imports/api/games.js';
import '../imports/api/juegos.js';
import '../imports/api/rooms.js';
import './account-creation.js';
import '../imports/api/users.js';

Meteor.startup(() => {
  // code to run on server at startup
});
