--------------------------
---  getCollRecommend ----
--------------------------
-- 透過子查詢找到收藏的推薦編號，再利用推薦編號去查詢每篇文章的資訊
SELECT "recomNum"
	,to_char("recomDateTime",'YYYY-MM-DD') AS "recomDateTime"
	,"recomHead"
	,"recomCont"
	,CASE WHEN "recomClass" = 'movie' THEN '電影'
				WHEN "recomClass" = 'music' THEN '音樂'
				WHEN "recomClass" = 'book' THEN '書籍'
				WHEN "recomClass" = 'exhibition' THEN '展覽'
		END AS "recomClass"
FROM "recommend"
WHERE "recomNum" IN (SELECT "recomNum"
			FROM "memberCollection" 
			WHERE "memID" = 'abc123' )
			
-- 取得照片
SELECT "recomNum","imgName"
FROM "image"
where "recomNum" IN (SELECT "recomNum"
			FROM "memberCollection" 
			WHERE "memID" = 'abc123' )

------------------------------
---  getOneColleRecommend ----
------------------------------
------ 取得一篇推薦 --------
SELECT * 
FROM "recommendListDataView"
WHERE "recomNum" = 5
		
------- 取得單一推薦留言 及留言愛心數量  -------------	
SELECT "Mess"."recomMessNum"
	,"Mess"."memID"
	,to_char("Mess"."recomMessDateTime",'YYYY-MM-DD') AS "recomMessDateTime"
	,"Mess"."recomMessCont"
	,count("MessLike"."recomMessNum") AS "likeCount"
FROM "recommendMessage" AS "Mess"
	LEFT JOIN "recommendMessageLike" AS "MessLike"
		ON "Mess"."recomMessNum" = "MessLike"."recomMessNum"
WHERE "Mess"."recomNum" = 1
GROUP BY "Mess"."recomMessNum"
	,"Mess"."memID"
	,"Mess"."recomMessDateTime"
	,"Mess"."recomMessCont"
	

------- 取得單一推薦的tag -------
SELECT "tagName"
FROM "recommendTagView"
WHERE "recomNum" = 1

------------------------
---  getCollArticle ----
------------------------

-- 透過子查詢找到收藏的文章編號，再利用文章編號去查詢每篇文章的資訊
SELECT *
FROM "articleListDataView" AS "artiView"
WHERE "artiView"."artiNum" IN (SELECT "artiNum"
		FROM "memberCollection" 
		WHERE "memID" = 'abc456' )

------- 取得收藏文章的tag -------
SELECT "tagName" 
FROM "articleTagView"
WHERE "artiNum" IN(SELECT "artiNum"
		FROM "memberCollection" 
		WHERE "memID" = 'abc456')
		
------- 判斷使用者是否按愛心 -------
SELECT "artiNum"
FROM "articleLike"
WHERE "artiNum" IN(SELECT "artiNum"
		FROM "memberCollection" 
		WHERE "memID" = 'abc456') AND "memID" = 'abc456'
		
------- 取得照片 -------
SELECT "artiNum" , "imgName" 
FROM "image" 
WHERE "artiNum" IN(SELECT "artiNum"
		FROM "memberCollection" 
		WHERE "memID" = 'abc456') AND "memID" = 'abc456'
		
-- 收藏推薦四大分類		
---------------------------------
------ getCollRecomClassList ----
---------------------------------

-- 取得會員收藏的四大分類的推薦內容
SELECT "recomView"."recomNum"
	,"recomView"."recomHead"
	,"recomView"."recomCont"
	,"recomView"."recomClass"
FROM "recommendListDataView" AS "recomView"
WHERE "recomView"."recomNum" IN (SELECT "recomNum"
		FROM "memberCollection" 
		WHERE "memID" = 'abc123' ) AND "recomView"."recomClass" = '電影'
		
		
------- 取得照片 -------
SELECT "recomNum" , "imgName" 
FROM "image" 
WHERE "recomNum" IN(SELECT "recomNum"
		FROM "memberCollection" 
		WHERE "memID" = 'abc123')
		
		
-- 收藏文章四大分類		
---------------------------------
------ getCollArtiClassList ----
---------------------------------

-- 根據分類取得收藏文章
SELECT *
FROM "articleListDataView"
WHERE "artiNum" 
	IN (SELECT "artiNum"
		FROM "memberCollection" 
		WHERE "memID" = 'abc456' )
		AND "artiClass" = 'movie' 
		
		
------- 取得照片 -------
SELECT "artiNum" , "imgName" 
FROM "image" 
WHERE "artiNum" IN(SELECT "artiNum"
		FROM "memberCollection" 
		WHERE "memID" = 'abc456')
		
		
------- 取得收藏文章的tag -------
SELECT "tagName" 
FROM "articleTagView"
WHERE "artiNum" IN(SELECT "artiNum"
		FROM "memberCollection" 
		WHERE "memID" = 'abc456')
		
------- 判斷使用者是否按愛心 -------
SELECT "artiNum"
FROM "articleLike"
WHERE "artiNum" IN(SELECT "artiNum"
		FROM "memberCollection" 
		WHERE "memID" = 'abc456') AND "memID" = 'abc456'
		

