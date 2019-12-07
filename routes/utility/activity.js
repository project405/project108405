//=========================================
//----- getArticleListPagination() --------
//=========================================
var getArticleListPagination = async function (memID, artiListNum) {
    var articleList = [];
    var tag ;
    var isCollection  ;
    var isLike ;
    var imgs ;
    var result = [];
    var articleSum;
    // -----------  取得文章清單 --------------
    await sql(`SELECT "T2".*,
                      "M"."memName" 
                FROM(
                    SELECT *
                    FROM( 
                        SELECT "A".*,"I"."imgNum", "I"."imgName", ROW_NUMBER() OVER(PARTITION BY "A"."artiNum" ORDER BY "I"."imgNum") as "Rank" 
                        FROM "articleListDataView" AS "A"
                            LEFT JOIN "image" AS "I"
                                ON "A"."artiNum" = "I"."artiNum"
                        WHERE "I"."artiMessNum" IS NULL	) AS "T1"
                    WHERE "T1"."Rank" = '1'
                    ORDER BY "artiNum" DESC
                    LIMIT 10 
                    OFFSET $1 ) AS "T2"
                        INNER JOIN "member" "M"
                            ON "M"."memID" = "T2"."memID"
                ORDER BY "artiDateTime" DESC , "artiNum" DESC`, [(artiListNum-1) * 10])
        .then((data) => {
            articleList = data.rows;
        }, (error) => {
            articleList = undefined;
        });

    await sql('SELECT COUNT(*) FROM "articleListDataView"')
    .then((data) => {
        articleSum = data.rows;
    }, (error) => {
        articleSum = undefined;
    })

    // ----------- 取得tag -----------
    await sql('SELECT * FROM "articleTagView"')
        .then((data) => {
            tag = data.rows;
        }, (error) => {
            tag = undefined;
        });

    // ----------- 判斷是否被使用者按愛心 -----------
    await sql('SELECT "memID","artiNum" FROM "articleLike" WHERE "memID" = $1 ', [memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isLike = undefined;
            } else {
                isLike = data.rows;
            }
        }, (error) => {
            isLike = undefined;
        });

    // ----------- 判斷是否被使用者收藏 -----------
    await sql('SELECT "memID" , "artiNum" FROM "memberCollection" WHERE "memID" = $1', [memID])
        .then((data) => {
            if (data.rows == null || data.rows == '') {
                isCollection = undefined;
            } else {
                isCollection = data.rows;
            }
        }, (error) => {
            isCollection = undefined;
        });

    result[0] = articleList; 
    result[1] = tag;
    result[2] = isLike;
    result[3] = imgs;
    result[4] = isCollection;
    result[5] = [memID];
    result[6] = articleSum;
    result[7] = [artiListNum];

    return result;
}

//匯出
module.exports = {
    getArticleListPagination
};