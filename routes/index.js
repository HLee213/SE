var express = require('express');
var router = express.Router();

// const mysql = require('mysql')



// var connection = mysql.createConnection(db_config);

// connection.connect();
// connection.end();


/* GET home page. */
router.get('/', function(req, res, next) {
  req.db.query('SELECT * FROM user WHERE id=1', function(err, rows, fields) {
    if (err) throw err;
    console.log('your id is: ', rows[0].id);
    console.log('your username is: ', rows[0].username);
    console.log('your pwd is: ', rows[0].password);
    let data = {
      // title:對應到網頁的標題
      title: '軟工課輔',
      username: rows[0].username
    }
    // render渲染ejs
      //     欲渲染的檔案名
    res.render('index', data);
  });
  
});

module.exports = router;
