var express = require('express');
var router = express.Router();

//檢查傳過來的資料和資料庫做比對的函數，return Promise
let checkLogin = (db, formData) => {
    return new Promise((rs, rj) => {
        let sql = "SELECT * FROM user WHERE username=? AND password=?";
        let params = [formData['username'], formData['password']];
        //                                rows:從資料庫撈回來的資料
        db.query(sql, params, function(err, rows) {
            if(err) {
                console.log("[SELECT ERROR] -", err);
                rj();
            } else {
                if(rows.length == 0) {
                    rj('login ERROR');
                } else {
                    rs(rows[0]);
                }
            }
        }) 
    })
}


router.post('/',async function(req, res, next) {
    let formData = req.body;
    console.log(formData);
    try{
        //檢查傳過來的資料和資料庫做比對
        let userData = await checkLogin(req.db, formData);
        req.session.user = {
            id: userData['id'], 
            username: userData['username']
        }
        res.redirect('/');
    } catch(err){
        console.log(err);
        // res.render('index', {title: 'Express'});
    }
  
});


module.exports = router;