// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   req.db.query('SELECT * FROM user WHERE id.=1', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('your id is: ', rows[0].id);
//     let data = {
//       // title:對應到網頁的標題
//       title: '軟工課輔',
//       username: rows[0].username
//     }
//     // render渲染ejs
//       //     欲渲染的檔案名
//     res.render('index', data);
//   });
  
// });

// module.exports = router;
var express = require('express');
var router = express.Router();
const loginCheck = require('./middleware/loginCheck')

/* GET home page. */
router.get('/', loginCheck, function(req, res, next) {
  console.log(req.session);
  res.render('index', {title: 'Express'});
});


router.get('/signUp', function(req, res, next){
  res.render('signUp');
});

router.get('/login', function(req, res, next){
  console.log(req.session);
  res.render('login');
});

module.exports = router;