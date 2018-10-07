Accounts.onCreateUser(function(options, user) 
{
  // Use provided profile in options, or create an empty object
  //user.profile = options.profile || {};
  // Assigns first and last names to the newly created user object
  //user.profile.firstName = options.firstName;
  //user.profile.lastName = options.lastName;

  user.ganadas = 0;
  user.perdidas = 0;
  user.roomId = 0;

  // Returns the user object
  return user;
});