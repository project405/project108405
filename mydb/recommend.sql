----------------------
---  recommendList ---
----------------------
------ 本週推薦資訊 ------
SELECT *
FROM "recommendListDataView"


------ 取得一篇推薦 --------
SELECT * 
FROM "recommendListDataView"
WHERE "recomNum" = 5

------- 取得單一文章的tag -------
SELECT "tagName"
FROM "recommendTagView"
WHERE "recomNum" = 1

-------------------------
---  getOneRecommend  ---
-------------------------
------- 取得單一文章留言 及留言愛心數量  -------------	
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

------- 是否按過收藏 ---------
SELECT "memID" , "recomNum"
FROM "memberCollection"
WHERE "recomNum" = 1 AND "memID" = 'abc123'

------- 是否按過愛心 ---------
SELECT "recomNum" 
FROM "recommendLike" 
WHERE "recomNum" = 5 AND "memID" = 'abc123'

--------- 判斷每個留言是否被按愛心 ---------
SELECT "Mess"."recomMessNum"
FROM "recommendMessage" AS "Mess"
	INNER JOIN "recommendMessageLike" AS "MessLike"
		ON "Mess"."recomMessNum" = "MessLike"."recomMessNum"
WHERE "Mess"."recomNum" = 1 AND "MessLike"."memID" = 'abc123'

----------- 取得照片 ----------- 
SELECT "recomNum" , "imgName" 
FROM "image"

---------------------------
---  getRecommendClass  ---
---------------------------
SELECT * 
FROM "recommendListDataView" 
WHERE "recomClass" = '電影'