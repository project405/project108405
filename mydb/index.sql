-- 取得熱門文章
SELECT * 
FROM "articleListDataView" 
ORDER BY "likeCount" DESC , "artiDateTime" DESC 
LIMIT 3

-- 根據參數 取得搜尋
-- 文章列表
SELECT *
FROM "articleListDataView"
WHERE "artiHead" LIKE '%一%' or "artiCont" LIKE '%一%' or "artiClass" LIKE '%movie%'

-- 根據文章編號取得 tag
SELECT *
FROM "articleTagView"
WHERE "artiNum" 
	IN(SELECT "artiNum"
			FROM "articleListDataView"
			WHERE "artiHead" LIKE '%一%' or "artiCont" LIKE '%一%' or "artiClass" LIKE '%一%')
			
-- 推薦
SELECT * 
FROM "recommendListDataView"
WHERE "recomHead" LIKE '%女%' or "recomCont" LIKE '%女%' or "recomClass" LIKE '%女%'



