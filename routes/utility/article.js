'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
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



//匯出
module.exports = {list,getOneArticle};