const User = require('./lib/user');

User.updateAvatar(158, 'https://lift700.com/wp-content/uploads/634918436.jpg').then(successUpdateAvatar => {
  // success
  console.log(successUpdateAvatar)
}, errorUpdateAvatar => {
  // error
  console.log(errorUpdateAvatar)
})
