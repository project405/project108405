-- ------------------------------
--    Create member table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."member";
CREATE TABLE "public"."member" (
  "memID" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "lineID" varchar(100) COLLATE "pg_catalog"."default",
  "memPass" varchar(100) COLLATE "pg_catalog"."default" ,
  "memBirth" date	,
	"memName" VARCHAR(15) COLLATE "pg_catalog"."default" ,
	"memMail" varchar(100) COLLATE "pg_catalog"."default" ,
	"memGender" char(1) COLLATE "pg_catalog"."default" ,
	"memNoti" BOOLEAN DEFAULT FALSE , 
	"memAddr" varchar(100) COLLATE "pg_catalog"."default",
"memAuthority" char(4) 

);
COMMENT ON COLUMN "public"."member"."memGender" IS 'M or F';
COMMENT ON COLUMN "public"."member"."memNoti" IS 'T or F';
ALTER TABLE "public"."member" ADD CONSTRAINT "member_pkey" PRIMARY KEY ("memID");

-- ------------------------------
--    Create memberMessage table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."memberMessage";
CREATE TABLE "public"."memberMessage" (
  "memMessNum" serial,
  "memID" varchar(100) COLLATE "pg_catalog"."default" ,
  "memMessCont" text	,
	"memMessDateTime" TIMESTAMP ,
	
	FOREIGN KEY("memID") REFERENCES member("memID")ON DELETE RESTRICT  ON UPDATE RESTRICT 
);
ALTER TABLE "public"."memberMessage" ADD CONSTRAINT "memberMessage_pkey" PRIMARY KEY ("memMessNum");

-- ------------------------------
--    Create article table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."article";
CREATE TABLE "public"."article" (
  "artiNum" serial , 
  "memID" varchar(100) COLLATE "pg_catalog"."default" ,
	"artiDateTime" TIMESTAMP ,
	"artiHead" varchar(100),
	"artiCont" text ,
	"artiClass" varchar(20) COLLATE "pg_catalog"."default" ,
	"analyzeScore" float4,
	"positiveWords" float4,
	"negativeWords" float4,
	"swearWords" int4,
	"score2" float4,
	FOREIGN KEY("memID") REFERENCES member("memID")ON DELETE RESTRICT  ON UPDATE RESTRICT 
);

COMMENT ON COLUMN "public"."article"."artiClass" IS 'movie , music , book , exhibition';
ALTER TABLE "public"."article" ADD CONSTRAINT "article_pkey" PRIMARY KEY ("artiNum");



-- ------------------------------
--    Create articleLike table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."articleLike";
CREATE TABLE "public"."articleLike" (
  "artiLikeNum" serial , 
  "memID" varchar(100) COLLATE "pg_catalog"."default" ,
  "artiNum" int4 , 
	"artiLikeDateTime" TIMESTAMP ,
	
	FOREIGN KEY("memID") REFERENCES "member"("memID")ON DELETE RESTRICT  ON UPDATE RESTRICT ,
	FOREIGN KEY("artiNum") REFERENCES "article"("artiNum")ON DELETE CASCADE  ON UPDATE RESTRICT 
);

ALTER TABLE "public"."articleLike" ADD CONSTRAINT "articleLike_pkey" PRIMARY KEY ("artiLikeNum");

-- ------------------------------
--    Create articleMessage table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."articleMessage";
CREATE TABLE "public"."articleMessage" (
  "artiMessNum" serial , 
  "artiNum" int4 , 
  "memID" varchar(100) COLLATE "pg_catalog"."default" ,
	"artiMessDateTime" TIMESTAMP ,
	"artiMessCont" text ,
	"analyzeScore" float4,
	"positiveWords" float4,
	"negativeWords" float4,
	"swearWords" int4,
	"score2" float4,
	FOREIGN KEY("memID") REFERENCES "member"("memID")ON DELETE RESTRICT  ON UPDATE RESTRICT ,
	FOREIGN KEY("artiNum") REFERENCES "article"("artiNum")ON DELETE CASCADE  ON UPDATE RESTRICT 
);
ALTER TABLE "public"."articleMessage" ADD CONSTRAINT "articleMessage_pkey" PRIMARY KEY ("artiMessNum");

-- ------------------------------
--    Create articleMessageLike table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."articleMessageLike";
CREATE TABLE "public"."articleMessageLike" (
  "artiMessLikeNum" serial , 
  "memID" varchar(100)	COLLATE "pg_catalog"."default" ,
  "artiMessNum" int4 ,
	"artiMessLikeDateTime" TIMESTAMP ,

	FOREIGN KEY("memID") REFERENCES "member"("memID")ON DELETE RESTRICT  ON UPDATE RESTRICT ,
	FOREIGN KEY("artiMessNum") REFERENCES "articleMessage"("artiMessNum")ON DELETE CASCADE  ON UPDATE RESTRICT 
);
ALTER TABLE "public"."articleMessageLike" ADD CONSTRAINT "articleMessageLike_pkey" PRIMARY KEY ("artiMessLikeNum");



-- ------------------------------
--    Create recommend table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."recommend";
CREATE TABLE "public"."recommend" (
  "recomNum" serial , 
  "recomDateTime" TIMESTAMP , 
	"recomHead" varchar(100) COLLATE "pg_catalog"."default" ,
	"recomCont" text , 
	"recomClass" varchar(10),
	"analyzeScore" float4,
	"positiveWords" int4,
	"negativeWords" int4,
	"score2" float4
);
	ALTER TABLE "public"."recommend" ADD CONSTRAINT "recommend_pkey" PRIMARY KEY ("recomNum");


-- ------------------------------
--    Create recommendLike table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."recommendLike";
CREATE TABLE "public"."recommendLike" (
  "recomLikeNum" serial , 
  "memID" varchar(100) COLLATE "pg_catalog"."default" , 
	"recomNum" int4 ,
	"recomLikeDateTime" TIMESTAMP ,
	
	FOREIGN KEY("memID") REFERENCES "member"("memID")ON DELETE RESTRICT  ON UPDATE RESTRICT ,
	FOREIGN KEY("recomNum") REFERENCES "recommend"("recomNum")ON DELETE CASCADE  ON UPDATE RESTRICT 
	
);
	ALTER TABLE "public"."recommendLike" ADD CONSTRAINT "recommendLike_pkey" PRIMARY KEY ("recomLikeNum");
	
-- ------------------------------
--    Create recommendMessage table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."recommendMessage";
CREATE TABLE "public"."recommendMessage" (
  "recomMessNum" serial , 
  "recomNum" int4 , 
	"memID" varchar(100) COLLATE "pg_catalog"."default" , 
	"recomMessDateTime" TIMESTAMP ,
	"recomMessCont" text ,
	"analyzeScore" float4,
	"positiveWords" float4,
	"negativeWords" float4,
	"swearWords" int4,
	"score2" float4,
	FOREIGN KEY("memID") REFERENCES "member"("memID")ON DELETE RESTRICT  ON UPDATE RESTRICT ,
	FOREIGN KEY("recomNum") REFERENCES "recommend"("recomNum")ON DELETE CASCADE  ON UPDATE RESTRICT 
	
);
	ALTER TABLE "public"."recommendMessage" ADD CONSTRAINT "recommendMessage_pkey" PRIMARY KEY ("recomMessNum");
	
-- ------------------------------
--    Create recommendMessLike table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."recommendMessageLike";
CREATE TABLE "public"."recommendMessageLike" (
  "recomMessLikeNum" serial , 
  "memID" varchar(100) COLLATE "pg_catalog"."default" , 
	"recomMessNum" int4 ,
	"recomMessLikeDateTime" TIMESTAMP ,
	
	FOREIGN KEY("memID") REFERENCES "member"("memID")ON DELETE RESTRICT  ON UPDATE RESTRICT ,
	FOREIGN KEY("recomMessNum") REFERENCES "recommendMessage"("recomMessNum")ON DELETE CASCADE  ON UPDATE RESTRICT 
	
);
	ALTER TABLE "public"."recommendMessageLike" ADD CONSTRAINT "recommendMessLike_pkey" PRIMARY KEY ("recomMessLikeNum");


-- ------------------------------
--    Create memberCollection table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."memberCollection";
CREATE TABLE "public"."memberCollection" (
  "collNum" serial , 
  "memID" varchar(100)	COLLATE "pg_catalog"."default" ,
	"recomNum" int4,
  "artiNum" int4,
	"collDateTime" TIMESTAMP ,

	FOREIGN KEY("memID") REFERENCES "member"("memID")ON DELETE RESTRICT  ON UPDATE RESTRICT ,
	FOREIGN KEY("artiNum") REFERENCES "article"("artiNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
	FOREIGN KEY("recomNum") REFERENCES "recommend"("recomNum")ON DELETE CASCADE  ON UPDATE RESTRICT 
);
ALTER TABLE "public"."memberCollection" ADD CONSTRAINT "memberCollection_pkey" PRIMARY KEY ("collNum");

-- ------------------------------
--    Create prefer table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."prefer";
CREATE TABLE "public"."prefer" (
  "preferNum" serial , 
  "preferClass" varchar(10)	COLLATE "pg_catalog"."default" ,
  "preferStyle" varchar(10)	COLLATE "pg_catalog"."default" 

);
ALTER TABLE "public"."prefer" ADD CONSTRAINT "prefer_pkey" PRIMARY KEY ("preferNum");

COMMENT ON COLUMN "public"."prefer"."preferClass" IS 'movie , music , book , exhibition';
-- ------------------------------
--    Create memberPrefer table 
-- ------------------------------

DROP TABLE IF EXISTS "public"."memberPrefer";
CREATE TABLE "public"."memberPrefer" (
  "memID" varchar(100)	COLLATE "pg_catalog"."default" ,
  "preferNum" int4 ,
	"degree" int4 ,

	FOREIGN KEY("memID") REFERENCES "member"("memID")ON DELETE RESTRICT  ON UPDATE RESTRICT ,
	FOREIGN KEY("preferNum") REFERENCES "prefer"("preferNum")ON DELETE RESTRICT  ON UPDATE RESTRICT 
);

-- ------------------------------
--    Create movie table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."movie";
CREATE TABLE "public"."movie" (
  "movNum" serial , 
  "movName" varchar(100)	COLLATE "pg_catalog"."default" ,
	"movPlayDate" date ,
	"movIntro" text ,
	"movScore1" float4 ,
	"movScore2" float4 ,
	"movDir" text,
	"movActor" text,
	"movLim" varchar(10)	COLLATE "pg_catalog"."default"
);

ALTER TABLE "public"."movie" ADD CONSTRAINT "movie_pkey" PRIMARY KEY ("movNum");

COMMENT ON COLUMN "public"."movie"."movLim" IS 'General , Parental Guidance , Parents , Restricted';
	
-- ------------------------------
--    Create movieStyle table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."movieStyle";
CREATE TABLE "public"."movieStyle" (
  "movStyleNum" serial , 
  "movStyle" varchar(10)	COLLATE "pg_catalog"."default" 
	
);
	ALTER TABLE "public"."movieStyle" ADD CONSTRAINT "movieStyle_pkey" PRIMARY KEY ("movStyleNum");
	
-- ------------------------------
--    Create movieStyleSet table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."movieStyleSet";
CREATE TABLE "public"."movieStyleSet" (
  "movStyleSetNum" serial , 
  "movStyleNum" int4 , 
	"movNum" int4,
	
	FOREIGN KEY("movStyleNum") REFERENCES "movieStyle"("movStyleNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
	FOREIGN KEY("movNum") REFERENCES "movie"("movNum")ON DELETE RESTRICT  ON UPDATE RESTRICT 
);
	ALTER TABLE "public"."movieStyleSet" ADD CONSTRAINT "movieStyleSet_pkey" PRIMARY KEY ("movStyleSetNum");

-- ------------------------------
--    Create music table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."music";
CREATE TABLE "public"."music" (
  "musNum" serial , 
  "musName" varchar(100)	COLLATE "pg_catalog"."default" ,
	"musLyric" text,
	"musSinger" varchar(100)	COLLATE "pg_catalog"."default" ,
	"musAlbum" varchar(100)	COLLATE "pg_catalog"."default" 
);

ALTER TABLE "public"."music" ADD CONSTRAINT "music_pkey" PRIMARY KEY ("musNum");

-- ------------------------------
--    Create musicStyle table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."musicStyle";
CREATE TABLE "public"."musicStyle" (
  "musStyleNum" serial , 
  "musStyle" varchar(10)	COLLATE "pg_catalog"."default" 
	
);
	ALTER TABLE "public"."musicStyle" ADD CONSTRAINT "musicStyle_pkey" PRIMARY KEY ("musStyleNum");
	
-- ------------------------------
--    Create musicStyleSet table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."musicStyleSet";
CREATE TABLE "public"."musicStyleSet" (
  "musStyleSetNum" serial , 
  "musStyleNum" int4 , 
	"musNum" int4,
	
	FOREIGN KEY("musStyleNum") REFERENCES "musicStyle"("musStyleNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
	FOREIGN KEY("musNum") REFERENCES "music"("musNum")ON DELETE RESTRICT  ON UPDATE RESTRICT 
);
	ALTER TABLE "public"."musicStyleSet" ADD CONSTRAINT "musicStyleSet_pkey" PRIMARY KEY ("musStyleSetNum");
	
-- ------------------------------
--    Create book table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."book";
CREATE TABLE "public"."book" (
  "bookNum" serial , 
  "bookISBN" varchar(20)	COLLATE "pg_catalog"."default" ,
	"bookName" varchar(100)	COLLATE "pg_catalog"."default" ,
	"bookIntro" text ,
	"bookAuthor" varchar(100)	COLLATE "pg_catalog"."default" ,
	"bookCom1" text , 
	"bookCom2" text , 
	"bookPub" varchar(100)	COLLATE "pg_catalog"."default" 
);

ALTER TABLE "public"."book" ADD CONSTRAINT "book_pkey" PRIMARY KEY ("bookNum");

-- ------------------------------
--    Create bookStyle table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."bookStyle";
CREATE TABLE "public"."bookStyle" (
  "bookStyleNum" serial , 
  "bookStyle" varchar(10)	COLLATE "pg_catalog"."default" 
	
);
	ALTER TABLE "public"."bookStyle" ADD CONSTRAINT "bookStyle_pkey" PRIMARY KEY ("bookStyleNum");
	
-- ------------------------------
--    Create bookStyleSet table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."bookStyleSet";
CREATE TABLE "public"."bookStyleSet" (
  "bookStyleSetNum" serial , 
  "bookStyleNum" int4 , 
	"bookNum" int4,
	
	FOREIGN KEY("bookStyleNum") REFERENCES "bookStyle"("bookStyleNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
	FOREIGN KEY("bookNum") REFERENCES "book"("bookNum")ON DELETE RESTRICT  ON UPDATE RESTRICT 
);
	ALTER TABLE "public"."bookStyleSet" ADD CONSTRAINT "bookStyleSet_pkey" PRIMARY KEY ("bookStyleSetNum");
	
-- ------------------------------
--    Create exhibition table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."exhibition";
CREATE TABLE "public"."exhibition" (
  "exhNum" serial , 
  "exhName" varchar(100)	COLLATE "pg_catalog"."default" ,
	"exhIntro" text,
	"exhAddr" varchar(100)	COLLATE "pg_catalog"."default" ,
	"exhStart" TIMESTAMP , 
	"exhEnd" TIMESTAMP ,
	"exhPriceInfo" text ,
	"exhCreator" varchar(100)	COLLATE "pg_catalog"."default" ,
	"exhOrgan" varchar(100)	COLLATE "pg_catalog"."default" 
);

ALTER TABLE "public"."exhibition" ADD CONSTRAINT "exhibition_pkey" PRIMARY KEY ("exhNum");

-- ------------------------------
--    Create exhibitionStyle table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."exhibitionStyle";
CREATE TABLE "public"."exhibitionStyle" (
  "exhStyleNum" serial , 
  "exhStyle" varchar(10)	COLLATE "pg_catalog"."default" 
	
);
	ALTER TABLE "public"."exhibitionStyle" ADD CONSTRAINT "exhibitionStyle_pkey" PRIMARY KEY ("exhStyleNum");
	
-- ------------------------------
--    Create exhibitionStyleSet table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."exhibitionStyleSet";
CREATE TABLE "public"."exhibitionStyleSet" (
  "exhStyleSetNum" serial , 
  "exhStyleNum" int4 , 
	"exhNum" int4,
	
	FOREIGN KEY("exhStyleNum") REFERENCES "exhibitionStyle"("exhStyleNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
	FOREIGN KEY("exhNum") REFERENCES "exhibition"("exhNum")ON DELETE RESTRICT  ON UPDATE RESTRICT 
);
	ALTER TABLE "public"."exhibitionStyleSet" ADD CONSTRAINT "exhibitionStyleSet_pkey" PRIMARY KEY ("exhStyleSetNum");
-- ------------------------------
--    Create tag table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."tag";
CREATE TABLE "public"."tag" (
  "tagNum" serial , 
  "tagName" varchar(50)	COLLATE "pg_catalog"."default" 
	
);
	ALTER TABLE "public"."tag" ADD CONSTRAINT "tag_pkey" PRIMARY KEY ("tagNum");

-- ------------------------------
--    Create tagLinkArticle table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."tagLinkArticle";
CREATE TABLE "public"."tagLinkArticle" (
  "tagLinkArtiNum" serial , 
  "artiNum" int4 , 
	"tagNum" int4 ,
"recomNum" int4 ,
	FOREIGN KEY("artiNum") REFERENCES "article"("artiNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
	FOREIGN KEY("tagNum") REFERENCES "tag"("tagNum")ON DELETE RESTRICT  ON UPDATE RESTRICT 
);
	ALTER TABLE "public"."tagLinkArticle" ADD CONSTRAINT "tagLinkArticle_pkey" PRIMARY KEY ("tagLinkArtiNum");
-- ------------------------------
--    Create report table 
-- ------------------------------
DROP TABLE IF EXISTS "public"."report";
CREATE TABLE "public"."report" (
  "reportNum" serial , 
"memID" varchar(100)	COLLATE "pg_catalog"."default" ,
  "artiNum" int4 , 
	"artiMessNum" int4 ,
	"recomMessNum" int4 , 
	"reportReason" text ,
	"reportDateTime" TIMESTAMP ,
	
	FOREIGN KEY("artiNum") REFERENCES "article"("artiNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
	FOREIGN KEY("artiMessNum") REFERENCES "articleMessage"("artiMessNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
FOREIGN KEY("recomMessNum") REFERENCES "recommendMessage"("recomMessNum")ON DELETE CASCADE  ON UPDATE RESTRICT 	
);
	ALTER TABLE "public"."report" ADD CONSTRAINT "report_pkey" PRIMARY KEY ("reportNum");

-- ------------------------------
--    Create image table 
-- ------------------------------
CREATE TABLE "public"."image" (
  "imgNum" serial,
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "artiNum" int4,
  "recomNum" int4,
  "artiMessNum" int4,
  "recomMessNum" int4,
  "imgName" text COLLATE "pg_catalog"."default",
  "imgDateTime" TIMESTAMP  ,
	FOREIGN KEY("artiNum") REFERENCES "article"("artiNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
	FOREIGN KEY("recomNum") REFERENCES "recommend"("recomNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
	FOREIGN KEY("artiMessNum") REFERENCES "articleMessage"("artiMessNum")ON DELETE CASCADE  ON UPDATE RESTRICT ,
	FOREIGN KEY("recomMessNum") REFERENCES "recommendMessage"("recomMessNum")ON DELETE CASCADE  ON UPDATE RESTRICT 
)