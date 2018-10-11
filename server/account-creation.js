Accounts.onCreateUser(function(options, user) 
{
  // Use provided profile in options, or create an empty object
  //user.profile = options.profile || {};
  // Assigns first and last names to the newly created user object
  //user.profile.firstName = options.firstName;
  //user.profile.lastName = options.lastName;

  // Use one language! Change in all the project
  user.won = 0;
  user.loose = 0;
  user.roomId = 0;

  // Returns the user object
  return user;
});
