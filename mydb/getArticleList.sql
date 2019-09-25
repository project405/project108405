-- 所有文章的搜尋
SELECT *
FROM "articleListDataView"

-- tag Select	
SELECT  *
FROM "articleTagView" 
	
--------------------------
-- 判斷使用者是否按愛心 --
--------------------------
SELECT "memID","artiNum"
FROM "articleLike"  
WHERE "memID" = 'abc123'


-------------------------
--   文章是否被收藏   --
-------------------------
SELECT "memID" , "artiNum"
FROM "memberCollection"
WHERE "memID" = 'abc123'


-- 取得照片
SELECT "artiNum" , "imgName"
FROM "image"




