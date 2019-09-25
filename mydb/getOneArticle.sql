------- 取得單一文章 及 愛心數量、留言數量 -------------	
SELECT * 
FROM "articleListDataView"
WHERE "artiNum" = 5
		
------- 取得單一文章留言 及留言愛心數量  -------------	
SELECT "Mess"."artiMessNum"
	,"Mess"."memID"
	,to_char("Mess"."artiMessDateTime",'YYYY-MM-DD') AS "artiMessDateTime"
	,"Mess"."artiMessCont"
	,count("MessLike"."artiMessNum") AS "likeCount"
FROM "articleMessage" AS "Mess"
	LEFT JOIN "articleMessageLike" AS "MessLike"
		ON "Mess"."artiMessNum" = "MessLike"."artiMessNum"
WHERE "Mess"."artiNum" = 5
GROUP BY "Mess"."artiMessNum"
	,"Mess"."memID"
	,"Mess"."artiMessDateTime"
	,"Mess"."artiMessCont"
	
------- 取得單一文章的tag -------
SELECT "tagName" 
FROM "articleTagView"
WHERE "artiNum" = 3

------- 是否按過收藏 ---------
SELECT "memID" , "artiNum"
FROM "memberCollection"
WHERE "memID" = 'abc123' AND "artiNum" = 10

------- 是否按過愛心 ---------
SELECT "artiNum" 
FROM "articleLike" 
WHERE "memID" = 'abc123' AND "artiNum" = 5

--------- 判斷每個留言是否被按愛心 ---------
SELECT "Mess"."artiMessNum"
FROM "articleMessage" AS "Mess"
INNER JOIN "articleMessageLike" AS "MessLike"
	ON "Mess"."artiMessNum" = "MessLike"."artiMessNum"
WHERE "Mess"."artiNum" = 8 AND "MessLike"."memID" = 'abc123'


--------- 取得照片 ---------
SELECT "artiNum" , "imgName" FROM "image" WHERE "artiNum" = 10

