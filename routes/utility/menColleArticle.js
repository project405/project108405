'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//----------------------------------
// 確認是否有收藏
//----------------------------------
var checkCollArticle = async function (memID,artiNum) {
    var result;
    await sql('SELECT * FROM "memberCollection" WHERE "memID" = $1 and "artiNum" = $2', [memID, artiNum])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = undefined;
        });
    return result;
}

//----------------------------------
// 加入收藏文章
//----------------------------------
var addCollArticle = async function (memID,recomNum,artiNum,collDateTime) {
  var result;
  await sql('INSERT INTO "memberCollection" ("memID","recomNum","artiNum","collDateTime") VALUES ($1,$2,$3,$4)', [memID,recomNum,artiNum,collDateTime])
      .then((data) => {
          result = 0;
      }, (error) => {
          result = -1;
      });
  return result;
}

//----------------------------------
// 刪除收藏文章
//----------------------------------
var delCollArticle = async function(collNum){
  var result;

  await sql('DELETE FROM "memberCollection" WHERE "collNum" = $1', [collNum])
      .then((data) => {
          result = data.rowCount;   //刪除筆數
      }, (error) => {
          result = -1;   //剛除失敗
      });
  
  return result;
}

module.exports = router;
