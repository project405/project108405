-- 刪除 view
-- article
DROP VIEW IF EXISTS "public"."articleTagView";
DROP VIEW IF EXISTS "public"."articleListDataView";

-- recommend 
DROP VIEW IF EXISTS "public"."recommendTagView";
DROP VIEW IF EXISTS "public"."recommendListDataView";

----------------------
----------------------
-- articleList View --
-----------------------

-- 所有文章
CREATE VIEW "articleListDataView" AS
	SELECT  "A"."artiNum" 
			,"A"."memID"
			,"A"."artiDateTime"
			,"A"."artiHead"
			,"A"."artiCont"
			,"A"."artiClass"
			,"A"."picture"
			,"A"."likeCount"
			,count("mess"."artiNum") AS "messCount"
	FROM(
		SELECT "arti"."artiNum" 
			,"arti"."memID"
			,to_char("arti"."artiDateTime",'YYYY-MM-DD') AS "artiDateTime"
			,"arti"."artiHead"
			,"arti"."artiCont"
			,"arti"."artiClass"
			,"arti"."picture"
			,count("artiLike"."artiNum") AS "likeCount"
			
		FROM article AS "arti"
			LEFT JOIN "articleLike" AS "artiLike"
				ON "arti"."artiNum" = "artiLike"."artiNum"
			GROUP BY "arti"."memID" , "arti"."memID" , "arti"."artiDateTime" 
							,"arti"."artiHead" , "arti"."artiCont" , "arti"."artiClass" , "arti"."picture" ,"arti"."artiNum") AS "A"
	LEFT JOIN "articleMessage" AS "mess"
		ON "A"."artiNum" = "mess"."artiNum"
		
	GROUP BY "A"."artiNum", "A"."memID" , "A"."artiDateTime" 
						,"A"."artiHead" , "A"."artiCont" , "A"."artiClass" , "A"."picture" ,"A"."likeCount"
	ORDER BY "A"."artiNum" DESC;
	
	
	
--------------------------
--   article tag View   --
--------------------------
-- 標籤
CREATE VIEW "articleTagView" AS
	SELECT  "artiView"."artiNum"
		,"tag"."tagName"
	FROM "articleListDataView" AS "artiView"
		INNER JOIN "tagLinkArticle" AS "tagLink"
			ON	"artiView"."artiNum" = "tagLink"."artiNum"
		INNER JOIN "tag"
			ON "tag"."tagNum" = "tagLink"."tagNum"
	ORDER BY "artiView"."artiNum" DESC	;
	

-----------------------------
--   recommendList View   --
------------------ ---------	
------ 本週推薦資訊 ------
CREATE VIEW "recommendListDataView" AS
	SELECT "A"."recomNum"
		,"A"."recomDateTime"
		,"A"."recomHead"
		,"A"."recomCont"
		,"A"."recomClass"
		,"A"."likeCount"
		,count("mess"."recomNum") AS "messCount"
	FROM(	
		SELECT "recom"."recomNum"
			,to_char("recom"."recomDateTime", 'YYYY-MM-DD') AS "recomDateTime"
			,"recom"."recomHead"
			,"recom"."recomCont"
			, CASE WHEN "recom"."recomClass" = 'movie' THEN '電影' 
						 WHEN "recom"."recomClass" = 'music' THEN '音樂'
						 WHEN "recom"."recomClass" = 'book'  THEN '書籍'
						 WHEN "recom"."recomClass" = 'exhibition' THEN '展覽'
			END AS "recomClass"
			,count("Like"."recomNum") AS "likeCount"
		FROM "recommend" AS "recom"
			LEFT JOIN "recommendLike" AS "Like"
				ON "recom"."recomNum" = "Like"."recomNum"
		GROUP BY "recom"."recomNum" 
			,"recomDateTime"
			,"recom"."recomHead"
			,"recom"."recomCont"
			,"recomClass" ) AS "A"
	LEFT JOIN "recommendMessage" AS "mess"
		ON "A"."recomNum" = "mess"."recomNum"
	GROUP BY "A"."recomNum"
		,"A"."recomDateTime"
		,"A"."recomHead"
		,"A"."recomCont"
		,"A"."recomClass"
		,"A"."likeCount"
		
ORDER BY "A"."recomDateTime" DESC;

----------------------------
--   recommend tag View   --
----------------------------
-- 標籤
CREATE VIEW "recommendTagView" AS
	SELECT  "recomView"."recomNum"
		,"tag"."tagName"
	FROM "recommendListDataView" AS "recomView"
		INNER JOIN "tagLinkArticle" AS "tagLink"
			ON	"recomView"."recomNum" = "tagLink"."recomNum"
		INNER JOIN "tag"
			ON "tag"."tagNum" = "tagLink"."tagNum"
	ORDER BY "recomView"."recomNum" DESC	;
	