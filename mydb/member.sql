--================================
---------- articlePost() ---------
--================================
--新增並回傳此筆文章編號
INSERT into "article" ("memID") VALUES ('abc123');
SELECT currval('"article_artiNum_seq1"') AS "artiNum"



//================================
//--------- myArticle() ----------
//================================
------- 文章列表 ------
SELECT * FROM "articleListDataView" WHERE "memID" = 'abc123'

-------- 取得 tag -----------
SELECT *
FROM "articleTagView"
WHERE "artiNum" 
	IN (SELECT "artiNum" 
			FROM "articleListDataView" 
			WHERE "memID" = 'abc123')
			
-------- 文章是否收藏 ----------
SELECT "memID" , "artiNum"
FROM "memberCollection"
WHERE "memID" = 'abc456'

------ 判斷使用者是否按愛心 ------
SELECT "memID","artiNum"
FROM "articleLike"  
WHERE "memID" = 'abc123'

---------- 取得照片 ----------
SELECT "artiNum" , "imgName" 
FROM "image"
WHERE "artiNum" 
	IN(SELECT "artiNum" 
			FROM "articleListDataView" 
			WHERE "memID" = 'abc123')

//===================================
//----- getMyArticleClassList() -----
//===================================
---------  取得文章四大分類內容 ---------
SELECT *
FROM "articleListDataView"
WHERE "artiClass" = 'music' AND "memID" = 'abc123'

--------- 取得tag  ---------
SELECT  *
FROM "articleTagView" 
WHERE "artiNum" 
	IN(SELECT "artiNum"
		 FROM "articleListDataView"
		 WHERE "artiClass" = 'music' AND "memID" = 'abc123')


----------- 判斷是否被使用者收藏 -----------
SELECT "memID" , "artiNum" 
FROM "memberCollection" 
WHERE "memID" = 'abc123'

----------- 判斷是否被使用者按愛心 -----------
SELECT "memID","artiNum" 
FROM "articleLike" 
WHERE "memID" = 'abc123'
		 
		 
---------- 取得照片 ----------
SELECT "artiNum" , "imgName" 
FROM "image"

