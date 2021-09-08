require('dotenv').config();
const moment = require('moment');
const mysql = require('mysql');

exports.updateAvatar = (id_user=null, url=null) => {
  return new Promise(function(resolve, reject) {
    if (id_user == null || url == null) {
      reject('ERROR: arguments undefined')
    }else{
      try {
        const connection = mysql.createConnection({
          host     : process.env.DB_HOST,
          user     : process.env.DB_USER,
          password : process.env.DB_PASS,
          database : process.env.DB_NAME
        });
        connection.connect();

        let file_name = url.split('/')
        file_name = file_name[file_name.length - 1]
        let dateString = moment().format().split('T').join(' ').split('+')[0].trim()

        connection.query(`INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES(${id_user}, '${dateString}', '${dateString}', '', '${file_name}', '', 'inherit', 'open', 'closed', '', '${file_name}', '', '', '${dateString}', '${dateString}', '', 0, '${url}', 0, 'attachment', 'image/jpeg', 0);`, function (error, results, fields) {
          if (error) {
            console.log(error);
            connection.end();
          }else{
            let wp_posts_id = results.insertId
            console.log('wp_posts_id', wp_posts_id);
            connection.query(`INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES(${wp_posts_id}, '_wp_attached_file', '${file_name}');`, function (error, results, fields) {
              if (error){
                console.log(error);
                connection.end();
              }else{
                console.log(results);
                connection.query(`INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES('${wp_posts_id}', '_wp_attachment_metadata', 'a:5:{s:5:\"width\";i:800;s:6:\"height\";i:748;s:4:\"file\";s:21:\"${file_name}\";s:5:\"sizes\";a:16:{s:6:\"medium\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:600;s:6:\"height\";i:600;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:9:\"thumbnail\";a:4:{s:4:\"file\";s:21:\"f${file_name}\";s:5:\"width\";i:180;s:6:\"height\";i:180;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:12:\"medium_large\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:768;s:6:\"height\";i:718;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:14:\"post-thumbnail\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:600;s:6:\"height\";i:550;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:12:\"krowd_medium\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:640;s:6:\"height\";i:550;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:21:\"woocommerce_thumbnail\";a:5:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";s:9:\"uncropped\";b:0;}s:18:\"woocommerce_single\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:600;s:6:\"height\";i:561;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:29:\"woocommerce_gallery_thumbnail\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:180;s:6:\"height\";i:180;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:12:\"shop_catalog\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:11:\"shop_single\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:600;s:6:\"height\";i:561;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:14:\"shop_thumbnail\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:180;s:6:\"height\";i:180;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:10:\"profile_24\";a:4:{s:4:\"file\";s:19:\"${file_name}\";s:5:\"width\";i:24;s:6:\"height\";i:24;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:10:\"profile_48\";a:4:{s:4:\"file\";s:19:\"${file_name}\";s:5:\"width\";i:48;s:6:\"height\";i:48;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:10:\"profile_96\";a:4:{s:4:\"file\";s:19:\"${file_name}\";s:5:\"width\";i:96;s:6:\"height\";i:96;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:11:\"profile_150\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:150;s:6:\"height\";i:150;s:9:\"mime-type\";s:10:\"image/jpeg\";}s:11:\"profile_300\";a:4:{s:4:\"file\";s:21:\"${file_name}\";s:5:\"width\";i:300;s:6:\"height\";i:300;s:9:\"mime-type\";s:10:\"image/jpeg\";}}s:10:\"image_meta\";a:12:{s:8:\"aperture\";s:1:\"0\";s:6:\"credit\";s:0:\"\";s:6:\"camera\";s:0:\"\";s:7:\"caption\";s:0:\"\";s:17:\"created_timestamp\";s:1:\"0\";s:9:\"copyright\";s:0:\"\";s:12:\"focal_length\";s:1:\"0\";s:3:\"iso\";s:1:\"0\";s:13:\"shutter_speed\";s:1:\"0\";s:5:\"title\";s:0:\"\";s:11:\"orientation\";s:1:\"0\";s:8:\"keywords\";a:0:{}}}');`, function (error, results, fields) {
                  if (error){
                    console.log(error);
                    connection.end();
                  }else{
                    console.log(results);
                    connection.query(`UPDATE wp_usermeta SET meta_value = '${wp_posts_id}' WHERE user_id = ${id_user} AND meta_key = 'profile_image_id';`, function (error, results, fields) {
                      if (error){
                        console.log(error);
                        connection.end();
                      }else{
                        console.log(results);
                        let unixtime_update = (Date.now()/1000).toFixed(0)
                        connection.query(`UPDATE wp_usermeta SET meta_value = '${unixtime_update}' WHERE user_id = ${id_user} AND meta_key = 'last_update';`, function (error, results, fields) {
                          if (error){
                            console.log(error);
                            connection.end();
                          }else{
                            console.log(results);
                            connection.end();
                          }
                        })
                      }
                    })
                  }
                });
              }
            });
          }
        });
      } catch (e) {
        reject('ERROR: database connected')
      }
    }
  });
}
