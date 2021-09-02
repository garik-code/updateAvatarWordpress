const User = require('./lib/user');

User.updateAvatar(158, 'https://avatars.githubusercontent.com/u/33745472?v=4').then(successUpdateAvatar => {
  // success
  console.log(successUpdateAvatar)
}, errorUpdateAvatar => {
  // error
  console.log(errorUpdateAvatar)
})
