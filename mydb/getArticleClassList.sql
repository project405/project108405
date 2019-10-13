---------  取得文章四大分類內容 ---------
SELECT *
FROM "articleListDataView"
WHERE "artiClass" = 'music'

-------- 取得 tag -----------
SELECT *
FROM "articleTagView"
WHERE "atirNum" 
	IN (SELECT "artiNum"
			FROM "articleListDataView"
			WHERE "artiClass" = 'music')

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