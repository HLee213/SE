var express = require('express');
var router = express.Router();

// 檢查看看username有沒有重複
let checkDuplicate = (db, formData) =>{
  // 確定撈完了做比對，return撈完的東西
  return new Promise((rs, rj) => {
    let sql = "SELECT username FROM user WHERE 1";
    db.query(sql, function(err, rows){
        if(err){
            console.log("[SELSCT ERROR] -", err);
        } else{ //如果沒事
            // 檢查有沒有撈到資料
            if(rows.length == 0){
                // 如果根本沒撈到資料，就表示是第一個註冊的人，沒有重複的問題
                rs(200);
            }else{
                //檢查重複
                if(rows.includes(formData['username'])){
                    // 如果有在撈回來的資料裡面，就reject
                    rj(400);
                } else{
                    rs(200);
                }
            }
        }
    })
  });
}

let writeDB = (db, formData) => {
    return new Promise((rs, rj) => {
        let sql = "INSERT INTO `user`(`username`, `password`) VALUES (?, ?)";
        let params = [formData['username'], formData['password']];
        db.query(sql, params, function(err, result){
            if(err) {
                console.log("[INSERT ERROR] -", err);
                rj(400);
            } else{
                rs(200);
            }
        });
    });
}


router.post('/', async function(req, res, next) {
  let formData = req.body;
  console.log(formData);
  try{
    await checkDuplicate(req.db, formData); // 如果能成功往下跑，代表沒有重複
    await writeDB(req.db, formData);
    res.redirect('/login');
  } catch(error){
      console.log(error);
      res.send('註冊失敗');
    // res.render('message', {message:'註冊失敗', js:'location.href="/signUp"'});
  }
});

module.exports = router;