'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var moment = require('moment');

//---------  getCollRecommend() -------------
var getCollRecommend = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0', [memID])
        .then((data) => {
            // console.log(data.rows);
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "recommend" where "recomNum" = $1', [getdata[i].recomNum])
            .then((data) => {
                data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                result.push(data.rows[0]);
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getCollArticle() -------------
var getCollArticle = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0', [memID])
        .then((data) => {
            // console.log(data.rows);
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1', [getdata[i].artiNum])
            .then((data) => {
                data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                result.push(data.rows[0]);
            }, (error) => {
                result = null;
            });
    }
    return result;
}
// ==================  Four Recom Class  (start)=========================
//---------  getRecomMovie() -------------
var getRecomMovie = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "recommend" where "recomNum" = $1 and "recomClass" = $2', [getdata[i].recomNum, 'movie'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getRecomMusic() -------------
var getRecomMusic = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "recommend" where "recomNum" = $1 and "recomClass" = $2', [getdata[i].recomNum, 'music'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getRecomBook() -------------
var getRecomBook = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "recommend" where "recomNum" = $1 and "recomClass" = $2', [getdata[i].recomNum, 'book'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getRecomExhibition() -------------
var getRecomExhibition = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "recomNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "recommend" where "recomNum" = $1 and "recomClass" = $2', [getdata[i].recomNum, 'exhibition'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].recomDateTime = moment(data.rows[0].recomDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
// ==================  Four Recom Class  (end)=========================
// ==================  Four Arti Class  (start)=========================
//---------  getArtiMovie() -------------
var getArtiMovie = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1 and "artiClass" = $2', [getdata[i].artiNum, 'movie'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getArtiMusic() -------------
var getArtiMusic = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1 and "artiClass" = $2', [getdata[i].artiNum, 'music'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getArtiBook() -------------
var getArtiBook = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1 and "artiClass" = $2', [getdata[i].artiNum, 'book'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}
//---------  getArtiExhibition() -------------
var getArtiExhibition = async function (memID) {
    var getdata = [];
    var result = [];
    await sql('SELECT * FROM "memberCollection" where "memID" = $1 and "artiNum" != 0 ', [memID])
        .then((data) => {
            getdata = data.rows;
        }, (error) => {
            getdata = null;
        });
    for (let i = 0; i < getdata.length; i++) {
        await sql('SELECT * FROM "article" where "artiNum" = $1 and "artiClass" = $2', [getdata[i].artiNum, 'exhibition'])
            .then((data) => {
                if (data.rows[0] != undefined) {
                    // console.log(data.rows[0]);
                    data.rows[0].artiDateTime = moment(data.rows[0].artiDateTime).format("YYYY-MM-DD hh:mm:ss");
                    result.push(data.rows[0]);
                }
            }, (error) => {
                result = null;
            });
    }
    return result;
}

// ==================  Four Arti Class  (end)=========================
module.exports = { getCollRecommend, getCollArticle,
    getRecomMovie, getRecomMusic, getRecomBook, getRecomExhibition,
    getArtiMovie, getArtiMusic, getArtiBook, getArtiExhibition };