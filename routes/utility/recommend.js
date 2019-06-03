'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');
//=========================================
//---------  getRecommendList() -----------
//=========================================
var getRecommendList = async function () {
    var RecommendList = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommend"')
        .then((data) => {
            // console.log("data=", data.rows);
            for (let i = 0; i < data.rows.length; i++) {
                // console.log(data.rows[i].recomClass);
                if (data.rows[i].recomClass == 'movie') {
                    data.rows[i].recomClass = '電影';
                } else if (data.rows[i].recomClass == 'music') {
                    data.rows[i].recomClass = '音樂';
                } else if (data.rows[i].recomClass == 'book') {
                    data.rows[i].recomClass = '書籍';
                } else {
                    data.rows[i].recomClass = '展覽';
                }
            }
            RecommendList = data.rows;
        }, (error) => {
            RecommendList = null;
        });
    return RecommendList;
}
//=========================================
//------ get_four_class_recom (start)------
//=========================================

//---------  getRecomMovie() -------------
var getRecomMovie = async function () {
    var RecommendMovie = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['movie'])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                if (data.rows[i].recomClass == 'movie') {
                    data.rows[i].recomClass = '電影';
                }
            }
            // console.log("data=", data.rows);
            RecommendMovie = data.rows;
        }, (error) => {
            RecommendMovie = null;
        });
    return RecommendMovie;


}

//---------  getRecomMusic() -------------
var getRecomMusic = async function () {
    var RecommendMusic = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['music'])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                if (data.rows[i].recomClass == 'music') {
                    data.rows[i].recomClass = '音樂';
                }
            }
            // console.log("data=", data.rows);
            RecommendMusic = data.rows;
        }, (error) => {
            RecommendMusic = null;
        });
    return RecommendMusic;

}
//---------  getRecomBook() --------------
var getRecomBook = async function () {
    var RecommendBook = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['book'])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                if (data.rows[i].recomClass == 'book') {
                    data.rows[i].recomClass = '書籍';
                }
            }
            // console.log("data=", data.rows);
            RecommendBook = data.rows;
        }, (error) => {
            RecommendBook = null;
        });
    return RecommendBook;

}

//-------  getRecomExhibition() ----------
var getRecomExhibition = async function () {
    var RecommendExhibition = [];
    // -----------  取得文章清單 --------------
    await sql('SELECT * FROM "recommend" WHERE "recomClass" = $1 ', ['exhibition'])
        .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
                if (data.rows[i].recomClass == 'exhibition') {
                    data.rows[i].recomClass = '展覽';
                }
            }
            // console.log("data=", data.rows);
            RecommendExhibition = data.rows;
        }, (error) => {
            RecommendExhibition = null;
        });
    return RecommendExhibition;

}

//=========================================
//------ get_four_class_recom (end)------
//=========================================
module.exports = { getRecommendList, 
    getRecomMovie,getRecomMusic,getRecomBook,getRecomExhibition}