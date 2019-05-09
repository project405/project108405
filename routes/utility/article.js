'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
// get article list
//------------------------------------------
var list = async function(){
    var result=[];
	
    await sql('SELECT * FROM article')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
//---------  getOneArticle() -------------
var getOneArticle = async function(artiNum){
    var result={};
    
    await sql('SELECT * FROM article WHERE "artiNum" = $1', [artiNum])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];   
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });
    
		
    return result;
}
//---------  getArticleMessage() -------------
var getArticleMessage = async function(artiNum){
    var result=[];
	
    await sql('SELECT * FROM "articleMessage" WHERE "artiNum" = $1', [artiNum])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
// ==================  Four Class  (start)=========================
//---------  getClassMovie() -------------
var getClassMovie = async function(){
    var result=[];
	
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['movie'])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
//---------  getClassMusic() -------------
var getClassMusic = async function(){
    var result=[];
	
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['music'])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
//---------  getClassBook() -------------
var getClassBook = async function(){
    var result=[];
	
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['book'])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
//---------  getClassExhibition() -------------
var getClassExhibition = async function(){
    var result=[];
	
    await sql('SELECT * FROM "article" WHERE "artiClass" = $1', ['exhibition'])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
// ==================  Four Class  (end)=========================
// ==================  get hot article (start)=========================
//---------  getArticleNum() -------------
var getArticleNum = async function(){
    var result = [];
    await sql('select "articleLike"."artiNum" from "articleLike"')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
//---------  getHotArticle() -------------
var getHotArticle = async function(artiNum){
    var result = [];
    await sql('select * from "article" where "artiNum" = $1 ',[artiNum])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
// ==================  get hot article (end)=========================
//匯出
module.exports = {list,getOneArticle,getArticleMessage,
    getClassMovie,getClassMusic,getClassBook,getClassExhibition,
    getArticleNum,getHotArticle};