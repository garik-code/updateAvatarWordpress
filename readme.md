# Обновление фотографии пользователя Wordpress

``` javascript
User.updateAvatar(user_id, avatar_url).then(successUpdateAvatar => {
  // Success
  console.log(successUpdateAvatar)
}, errorUpdateAvatar => {
  // Error
  console.log(errorUpdateAvatar)
})

```
Смотри файл [index.js](https://github.com/garik-code/updateAvatarWordpress/blob/master/index.js)
