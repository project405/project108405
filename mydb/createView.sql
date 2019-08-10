-- 刪除 view
DROP VIEW IF EXISTS "public"."articleTagView";
DROP VIEW IF EXISTS "public"."articleListDataView";


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
	
	
	
------------------
--   tag View   --
------------------ 
-- 標籤
CREATE VIEW "articleTagView" AS
	SELECT  "artiView"."artiNum"
		,"tag"."tagName"
	FROM "articleListDataView" AS "artiView"
	INNER JOIN "tagLinkArticle" AS "tagLink"
		ON	"artiView"."artiNum" = "tagLink"."artiNum"
	INNER JOIN "tag"
		ON "tag"."tagNum" = "tagLink"."tagNum"
	ORDER BY "artiView"."artiNum" DESC;
	