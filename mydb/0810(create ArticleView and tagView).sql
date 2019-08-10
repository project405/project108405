/*
 Navicat Premium Data Transfer

 Source Server         : chintest
 Source Server Type    : PostgreSQL
 Source Server Version : 110004
 Source Host           : ec2-23-21-186-85.compute-1.amazonaws.com:5432
 Source Catalog        : d96t764r1va6lf
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 110004
 File Encoding         : 65001

 Date: 10/08/2019 15:34:26
*/


-- ----------------------------
-- Sequence structure for articleLike_artiLikeNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."articleLike_artiLikeNum_seq";
CREATE SEQUENCE "public"."articleLike_artiLikeNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for articleLike_artiLikeNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."articleLike_artiLikeNum_seq1";
CREATE SEQUENCE "public"."articleLike_artiLikeNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for articleMessageLike_artiMessLikeNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."articleMessageLike_artiMessLikeNum_seq";
CREATE SEQUENCE "public"."articleMessageLike_artiMessLikeNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for articleMessageLike_artiMessLikeNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."articleMessageLike_artiMessLikeNum_seq1";
CREATE SEQUENCE "public"."articleMessageLike_artiMessLikeNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for articleMessage_artiMessNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."articleMessage_artiMessNum_seq";
CREATE SEQUENCE "public"."articleMessage_artiMessNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for articleMessage_artiMessNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."articleMessage_artiMessNum_seq1";
CREATE SEQUENCE "public"."articleMessage_artiMessNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for article_artiNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."article_artiNum_seq";
CREATE SEQUENCE "public"."article_artiNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for article_artiNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."article_artiNum_seq1";
CREATE SEQUENCE "public"."article_artiNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for bookStyleSet_bookStyleSetNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."bookStyleSet_bookStyleSetNum_seq";
CREATE SEQUENCE "public"."bookStyleSet_bookStyleSetNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for bookStyleSet_bookStyleSetNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."bookStyleSet_bookStyleSetNum_seq1";
CREATE SEQUENCE "public"."bookStyleSet_bookStyleSetNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for bookStyle_bookStyleNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."bookStyle_bookStyleNum_seq";
CREATE SEQUENCE "public"."bookStyle_bookStyleNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for bookStyle_bookStyleNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."bookStyle_bookStyleNum_seq1";
CREATE SEQUENCE "public"."bookStyle_bookStyleNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for book_bookNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."book_bookNum_seq";
CREATE SEQUENCE "public"."book_bookNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for book_bookNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."book_bookNum_seq1";
CREATE SEQUENCE "public"."book_bookNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for exhibitionStyleSet_exhStyleSetNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."exhibitionStyleSet_exhStyleSetNum_seq";
CREATE SEQUENCE "public"."exhibitionStyleSet_exhStyleSetNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for exhibitionStyleSet_exhStyleSetNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."exhibitionStyleSet_exhStyleSetNum_seq1";
CREATE SEQUENCE "public"."exhibitionStyleSet_exhStyleSetNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for exhibitionStyle_exhStyleNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."exhibitionStyle_exhStyleNum_seq";
CREATE SEQUENCE "public"."exhibitionStyle_exhStyleNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for exhibitionStyle_exhStyleNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."exhibitionStyle_exhStyleNum_seq1";
CREATE SEQUENCE "public"."exhibitionStyle_exhStyleNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for exhibition_exhNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."exhibition_exhNum_seq";
CREATE SEQUENCE "public"."exhibition_exhNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for exhibition_exhNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."exhibition_exhNum_seq1";
CREATE SEQUENCE "public"."exhibition_exhNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for image_imgNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."image_imgNum_seq";
CREATE SEQUENCE "public"."image_imgNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for memberCollection_collNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."memberCollection_collNum_seq";
CREATE SEQUENCE "public"."memberCollection_collNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for memberCollection_collNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."memberCollection_collNum_seq1";
CREATE SEQUENCE "public"."memberCollection_collNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for memberMessage_memMessNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."memberMessage_memMessNum_seq";
CREATE SEQUENCE "public"."memberMessage_memMessNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for movieStyleSet_movStyleSetNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."movieStyleSet_movStyleSetNum_seq";
CREATE SEQUENCE "public"."movieStyleSet_movStyleSetNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for movieStyleSet_movStyleSetNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."movieStyleSet_movStyleSetNum_seq1";
CREATE SEQUENCE "public"."movieStyleSet_movStyleSetNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for movieStyle_movStyleNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."movieStyle_movStyleNum_seq";
CREATE SEQUENCE "public"."movieStyle_movStyleNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for movieStyle_movStyleNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."movieStyle_movStyleNum_seq1";
CREATE SEQUENCE "public"."movieStyle_movStyleNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for movie_movNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."movie_movNum_seq";
CREATE SEQUENCE "public"."movie_movNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for movie_movNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."movie_movNum_seq1";
CREATE SEQUENCE "public"."movie_movNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for musicStyleSet_musStyleSetNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."musicStyleSet_musStyleSetNum_seq";
CREATE SEQUENCE "public"."musicStyleSet_musStyleSetNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for musicStyleSet_musStyleSetNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."musicStyleSet_musStyleSetNum_seq1";
CREATE SEQUENCE "public"."musicStyleSet_musStyleSetNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for musicStyle_musStyleNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."musicStyle_musStyleNum_seq";
CREATE SEQUENCE "public"."musicStyle_musStyleNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for musicStyle_musStyleNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."musicStyle_musStyleNum_seq1";
CREATE SEQUENCE "public"."musicStyle_musStyleNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for music_musNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."music_musNum_seq";
CREATE SEQUENCE "public"."music_musNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for music_musNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."music_musNum_seq1";
CREATE SEQUENCE "public"."music_musNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for orddetails_serno_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."orddetails_serno_seq";
CREATE SEQUENCE "public"."orddetails_serno_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 3000
CACHE 1;

-- ----------------------------
-- Sequence structure for prefer_preferNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."prefer_preferNum_seq";
CREATE SEQUENCE "public"."prefer_preferNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for prefer_preferNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."prefer_preferNum_seq1";
CREATE SEQUENCE "public"."prefer_preferNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for recommendClass_recomClassNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."recommendClass_recomClassNum_seq";
CREATE SEQUENCE "public"."recommendClass_recomClassNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for recommendLike_recomLikeNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."recommendLike_recomLikeNum_seq";
CREATE SEQUENCE "public"."recommendLike_recomLikeNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for recommendLike_recomLikeNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."recommendLike_recomLikeNum_seq1";
CREATE SEQUENCE "public"."recommendLike_recomLikeNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for recommendMessageLike_recomMessLikeNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."recommendMessageLike_recomMessLikeNum_seq";
CREATE SEQUENCE "public"."recommendMessageLike_recomMessLikeNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for recommendMessageLike_recomMessLikeNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."recommendMessageLike_recomMessLikeNum_seq1";
CREATE SEQUENCE "public"."recommendMessageLike_recomMessLikeNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for recommendMessage_recomMessNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."recommendMessage_recomMessNum_seq";
CREATE SEQUENCE "public"."recommendMessage_recomMessNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for recommendMessage_recomMessNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."recommendMessage_recomMessNum_seq1";
CREATE SEQUENCE "public"."recommendMessage_recomMessNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for recommend_recomNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."recommend_recomNum_seq";
CREATE SEQUENCE "public"."recommend_recomNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for recommend_recomNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."recommend_recomNum_seq1";
CREATE SEQUENCE "public"."recommend_recomNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for report_reportNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."report_reportNum_seq";
CREATE SEQUENCE "public"."report_reportNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for report_reportNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."report_reportNum_seq1";
CREATE SEQUENCE "public"."report_reportNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tagLinkArticle_tagLinkArtiNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tagLinkArticle_tagLinkArtiNum_seq";
CREATE SEQUENCE "public"."tagLinkArticle_tagLinkArtiNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tagLinkArticle_tagLinkArtiNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tagLinkArticle_tagLinkArtiNum_seq1";
CREATE SEQUENCE "public"."tagLinkArticle_tagLinkArtiNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tag_tagNum_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tag_tagNum_seq";
CREATE SEQUENCE "public"."tag_tagNum_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tag_tagNum_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tag_tagNum_seq1";
CREATE SEQUENCE "public"."tag_tagNum_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS "public"."article";
CREATE TABLE "public"."article" (
  "artiNum" int4 NOT NULL DEFAULT nextval('"article_artiNum_seq1"'::regclass),
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "artiDateTime" timestamp(6),
  "artiHead" varchar(100) COLLATE "pg_catalog"."default",
  "artiCont" text COLLATE "pg_catalog"."default",
  "artiClass" varchar(20) COLLATE "pg_catalog"."default",
  "picture" text COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."article"."artiClass" IS 'movie , music , book , exhibition';

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO "public"."article" VALUES (1, 'abc123', '2019-01-07 09:25:00', '#分享 #有雷【復仇者聯盟4】謝謝鋼鐵人成就蜘蛛人！', '剛好昨天官方說可以開始討論劇情...
就在網路上看到一篇超級讓人淚腺爆發的漫畫😭

不知道發哪個版比較適合...但這邊好多人都在討論復聯4
所以就分享在這裡，如果不行還請告知><', 'movie', NULL);
INSERT INTO "public"."article" VALUES (2, 'abc456', '2019-02-07 10:30:00', '海洋奇緣觀後感＃雷', '海洋奇緣是2016年上映的電影，我卻最近才看完，原本是帶著看一部卡通的愉快心情，沒想到劇情那麼感人，讓我大爆哭！也可能是那時候我剛考完準備很久的考試，加上對未來有一種迷茫感吧～

總之我覺得這部電影很適合不確定自己要幹嘛、沒自信的人看！', 'movie', NULL);
INSERT INTO "public"."article" VALUES (3, 'abc123', '2019-03-07 19:25:00', '想找一首英文歌', '一開始去是鋼琴 登等登等登*4
然後副歌歌詞聽起來像you are my story
感覺像一個樂團 男生唱的', 'music', NULL);
INSERT INTO "public"."article" VALUES (4, 'abc456', '2019-04-08 12:21:00', '#詢問 尋找好聽的日文歌曲', 'true跟茅原實里的是因為看了某部動畫入坑的
不過聽了一些true的其他歌後
有點不太喜歡…?', 'music', NULL);
INSERT INTO "public"."article" VALUES (5, 'abc123', '2018-05-01 11:20:00', '（書單）2019年起截止到5月7日讀到的好書', '基本都是純文學小說，少人文社科綜合和詩集，祝閱讀愉快( ´ ▽ ` )ﾉ
《大瑟爾》凱魯亞克
《天才的編輯》A·司各特·伯格
《崩潰》菲茨傑羅
《語言與沈默》喬治·斯坦納', 'book', NULL);
INSERT INTO "public"."article" VALUES (6, 'abc456', '2018-06-04 12:11:00', '求推薦 請問有人看過“變身在漫威世界”嗎？', '如題
請問有人有看過“變身在漫威世界”嗎？
本人看了8年小說
至從看了變身在漫威世界之後
感覺其他小說怎麼看怎麼不對', 'book', NULL);
INSERT INTO "public"."article" VALUES (7, 'abc123', '2019-07-04 12:12:00', '後大人時代的我們 免費講座', '從前從前，大人們總是說：「等你長大就懂了。」
如今我們長大了，那些以後就會懂的事，我們真的都懂了嗎？
我們現在都活在曾經相信過的價值觀正被拆解重建著的時代。
女權意識抬頭、同性議題的討論、AI取代人工等等。', 'exhibition', NULL);
INSERT INTO "public"."article" VALUES (8, 'abc456', '2019-08-01 01:01:00', '學校校慶展覽....', '學校校慶展覽活動到底是要辦給誰看呀？
展覽時間在上課期間😂😂
展覽結束5:00(剛好下課時間)
然後園遊會時間晚上5:00開始到7:00
我真的覺得這個時間點很奇怪
還是這很正常呢？', 'exhibition', NULL);
INSERT INTO "public"."article" VALUES (10, 'abc123', '2019-08-09 02:23:39', 'qq', 'qqq<br><br>\:imgLocation<br><br>ddd<br><br>\:imgLocation', 'music', NULL);

-- ----------------------------
-- Table structure for articleLike
-- ----------------------------
DROP TABLE IF EXISTS "public"."articleLike";
CREATE TABLE "public"."articleLike" (
  "artiLikeNum" int4 NOT NULL DEFAULT nextval('"articleLike_artiLikeNum_seq1"'::regclass),
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "artiNum" int4,
  "artiLikeDateTime" timestamp(6)
)
;

-- ----------------------------
-- Records of articleLike
-- ----------------------------
INSERT INTO "public"."articleLike" VALUES (6, 'abc456', 2, '2019-05-01 03:12:00');
INSERT INTO "public"."articleLike" VALUES (7, 'abc456', 4, '2019-06-01 03:12:00');
INSERT INTO "public"."articleLike" VALUES (8, 'abc456', 7, '2019-07-01 03:12:00');
INSERT INTO "public"."articleLike" VALUES (18, 'abc123', 1, '2019-08-09 09:55:49');
INSERT INTO "public"."articleLike" VALUES (19, 'abc123', 2, '2019-08-09 09:56:11');
INSERT INTO "public"."articleLike" VALUES (22, 'abc123', 3, '2019-08-09 10:02:55');
INSERT INTO "public"."articleLike" VALUES (23, 'abc123', 6, '2019-08-09 10:03:13');
INSERT INTO "public"."articleLike" VALUES (25, 'abc123', 8, '2019-08-09 10:03:42');
INSERT INTO "public"."articleLike" VALUES (26, 'abc123', 7, '2019-08-09 10:03:43');

-- ----------------------------
-- Table structure for articleMessage
-- ----------------------------
DROP TABLE IF EXISTS "public"."articleMessage";
CREATE TABLE "public"."articleMessage" (
  "artiMessNum" int4 NOT NULL DEFAULT nextval('"articleMessage_artiMessNum_seq1"'::regclass),
  "artiNum" int4,
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "artiMessDateTime" timestamp(6),
  "artiMessCont" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of articleMessage
-- ----------------------------
INSERT INTO "public"."articleMessage" VALUES (1, 1, 'abc123', '2019-11-30 18:00:00', 'abc123 chin 測試第一篇文章留言內容 movie');
INSERT INTO "public"."articleMessage" VALUES (2, 1, 'abc456', '2019-11-30 18:20:00', 'abc456 wt 測試第一篇文章留言內容 movie ');
INSERT INTO "public"."articleMessage" VALUES (3, 2, 'abc123', '2019-11-30 18:00:00', 'abc123 chin 測試第二篇文章留言內容 movie ');
INSERT INTO "public"."articleMessage" VALUES (4, 2, 'abc456', '2019-11-30 18:20:00', 'abc456 wt 測試第二篇文章留言內容 movie');
INSERT INTO "public"."articleMessage" VALUES (5, 3, 'abc123', '2019-11-30 18:00:00', 'abc123 chin 測試第三篇文章留言內容 music');
INSERT INTO "public"."articleMessage" VALUES (6, 3, 'abc456', '2019-11-30 18:20:00', 'abc456 wt 測試第三篇文章留言內容 music ');
INSERT INTO "public"."articleMessage" VALUES (7, 4, 'abc123', '2019-11-30 18:00:00', 'abc123 chin 測試第四篇文章留言內容 music ');
INSERT INTO "public"."articleMessage" VALUES (8, 4, 'abc456', '2019-11-30 18:20:00', 'abc456 wt 測試第四篇文章留言內容 music');
INSERT INTO "public"."articleMessage" VALUES (9, 5, 'abc123', '2019-11-30 18:00:00', 'abc123 chin 測試第五篇文章留言內容 book ');
INSERT INTO "public"."articleMessage" VALUES (10, 5, 'abc456', '2019-11-30 18:20:00', 'abc456 wt 測試第五篇文章留言內容 book');
INSERT INTO "public"."articleMessage" VALUES (11, 6, 'abc123', '2019-11-30 18:00:00', 'abc123 chin 測試第六篇文章留言內容 book ');
INSERT INTO "public"."articleMessage" VALUES (12, 6, 'abc456', '2019-11-30 18:20:00', 'abc456 wt 測試第六篇文章留言內容 book');
INSERT INTO "public"."articleMessage" VALUES (13, 7, 'abc123', '2019-11-30 18:00:00', 'abc123 chin 測試第七篇文章留言內容 exhibition ');
INSERT INTO "public"."articleMessage" VALUES (14, 7, 'abc456', '2019-11-30 18:20:00', 'abc456 wt 測試第七篇文章留言內容 exhibition');
INSERT INTO "public"."articleMessage" VALUES (15, 8, 'abc123', '2019-11-30 18:00:00', 'abc123 chin 測試第八篇文章留言內容 exhibition ');
INSERT INTO "public"."articleMessage" VALUES (16, 8, 'abc456', '2019-11-30 18:20:00', 'abc456 wt 測試第八篇文章留言內容 exhibition');

-- ----------------------------
-- Table structure for articleMessageLike
-- ----------------------------
DROP TABLE IF EXISTS "public"."articleMessageLike";
CREATE TABLE "public"."articleMessageLike" (
  "artiMessLikeNum" int4 NOT NULL DEFAULT nextval('"articleMessageLike_artiMessLikeNum_seq1"'::regclass),
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "artiMessNum" int4,
  "artiMessLikeDateTime" timestamp(6)
)
;

-- ----------------------------
-- Records of articleMessageLike
-- ----------------------------
INSERT INTO "public"."articleMessageLike" VALUES (1, 'abc123', 1, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (2, 'abc123', 2, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (4, 'abc123', 4, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (5, 'abc123', 5, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (6, 'abc123', 6, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (7, 'abc123', 7, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (8, 'abc123', 8, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (9, 'abc123', 9, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (11, 'abc123', 11, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (12, 'abc123', 12, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (13, 'abc456', 1, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (14, 'abc456', 3, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (15, 'abc456', 5, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (16, 'abc456', 7, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (17, 'abc456', 9, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (18, 'abc456', 11, '2019-12-01 03:12:00');
INSERT INTO "public"."articleMessageLike" VALUES (19, 'abc123', 3, '2019-08-07 04:07:55');

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS "public"."book";
CREATE TABLE "public"."book" (
  "bookNum" int4 NOT NULL DEFAULT nextval('"book_bookNum_seq1"'::regclass),
  "bookISBN" varchar(20) COLLATE "pg_catalog"."default",
  "bookName" varchar(100) COLLATE "pg_catalog"."default",
  "bookIntro" text COLLATE "pg_catalog"."default",
  "bookAuthor" varchar(100) COLLATE "pg_catalog"."default",
  "bookCom1" text COLLATE "pg_catalog"."default",
  "bookCom2" text COLLATE "pg_catalog"."default",
  "bookPub" varchar(100) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO "public"."book" VALUES (1, '9789572054116', '物件導向設計模式 : 可再利用物件導向軟體之要素', '
紀錄類型:	 書目-語言資料,印刷品 : 單行本
ISBN:	9789572054116 (精裝) :
作者:	強生
其他作者:	維賽茲
正題名/作者:	物件導向設計模式 : / Gamma Johnson, Helm Vlissides著 ; 葉秉哲譯
其他題名:	可再利用物件導向軟體之要素 /
出版者:	臺北市 : 臺灣培生教育, 2011.12
面頁冊數:	18, 458面 : 圖 ; 24公分
附註:	含索引
標題:	物件導向程式 -', '強生', '第一平台書評', '第二平台書評', '	臺北市 : 臺灣培生教育, 2011.12');
INSERT INTO "public"."book" VALUES (2, '9861255869平裝附光碟片', 'Java 2物件導向程式語言', '
紀錄類型:	 書目-語言資料,印刷品 : 單行本
ISBN:	9861255869平裝附光碟片
團體作者:	位元文化
版本:	初版
出版地:	臺北市
出版者:	文魁資訊;
出版年:	民94
面頁冊數:	1冊圖 : 23 公分; 1片光碟+
標題:	JAVA(電腦程式語言) -
標題:	物件導向程式 -', '阿欽', '第一平台書評', '第二平台書評', '文魁資訊');
INSERT INTO "public"."book" VALUES (3, '9574104575平裝附光碟片', '資料庫系統應用實務', '
紀錄類型:	 書目-語言資料,印刷品 : 單行本
ISBN:	9574104575平裝附光碟片
作者:	曾守正,
合作者:	周韻寰,
版本:	第一版
出版地:	[高雄縣鳳山市]
出版者:	曾守正發行; 華泰總經銷;
出版年:	民91
面頁冊數:	1冊圖 : 26公分; 1張光碟片+
叢書名:	資料庫叢書系列
標題:	資料庫管理系統 -
標題:	關聯式資料庫 -
標題:	SQL(電腦程式語言) -
標題:	DBASE,CLIPPER等入此 -', '曾守正', '第一平台書評', '第二平台書評', '曾守正發行; 華泰總經銷');

-- ----------------------------
-- Table structure for bookStyle
-- ----------------------------
DROP TABLE IF EXISTS "public"."bookStyle";
CREATE TABLE "public"."bookStyle" (
  "bookStyleNum" int4 NOT NULL DEFAULT nextval('"bookStyle_bookStyleNum_seq1"'::regclass),
  "bookStyle" varchar(10) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of bookStyle
-- ----------------------------
INSERT INTO "public"."bookStyle" VALUES (1, '小說');
INSERT INTO "public"."bookStyle" VALUES (2, '教科書');
INSERT INTO "public"."bookStyle" VALUES (3, '言情小說');

-- ----------------------------
-- Table structure for bookStyleSet
-- ----------------------------
DROP TABLE IF EXISTS "public"."bookStyleSet";
CREATE TABLE "public"."bookStyleSet" (
  "bookStyleSetNum" int4 NOT NULL DEFAULT nextval('"bookStyleSet_bookStyleSetNum_seq1"'::regclass),
  "bookStyleNum" int4,
  "bookNum" int4
)
;

-- ----------------------------
-- Records of bookStyleSet
-- ----------------------------
INSERT INTO "public"."bookStyleSet" VALUES (1, 1, 1);
INSERT INTO "public"."bookStyleSet" VALUES (2, 1, 2);
INSERT INTO "public"."bookStyleSet" VALUES (3, 2, 3);

-- ----------------------------
-- Table structure for exhibition
-- ----------------------------
DROP TABLE IF EXISTS "public"."exhibition";
CREATE TABLE "public"."exhibition" (
  "exhNum" int4 NOT NULL DEFAULT nextval('"exhibition_exhNum_seq1"'::regclass),
  "exhName" varchar(100) COLLATE "pg_catalog"."default",
  "exhIntro" text COLLATE "pg_catalog"."default",
  "exhAddr" varchar(100) COLLATE "pg_catalog"."default",
  "exhStart" timestamp(6),
  "exhEnd" timestamp(6),
  "exhPriceInfo" text COLLATE "pg_catalog"."default",
  "exhCreator" varchar(100) COLLATE "pg_catalog"."default",
  "exhOrgan" varchar(100) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of exhibition
-- ----------------------------
INSERT INTO "public"."exhibition" VALUES (1, '2019 洪天宇 x 羅懿君 聯展：自然之外', '三月初春的週末午後，歡迎帶著輕鬆愉快的心情，2019/3/2 （六） 14:30-16:30來到陸府植深館參加這場野菜共和開幕午茶時光+現場吉他音樂演奏。2019第一檔令', '陸府植深館-公益路二段789號', '2019-03-02 10:00:00', '2019-06-30 17:00:00', '免費', '洪天宇', '陸府生活美學教育基金會 Live Forever Foundation');
INSERT INTO "public"."exhibition" VALUES (2, '愛老虎油 I love you 2019 高雄駁二', '人類第一對愛侶－亞當和夏娃的出現首見於聖經故事第一篇「創世紀」，上帝用土創造了人類（男人），再拿男人的肋骨造了女人，男人對女人一見鍾情。然而愛情故事總是充滿荊棘及誘惑，夏娃受不了誘惑偷採金果樹上象徵智慧與自我主權意識的果實，並分享給亞當一起食下，上帝勃然大怒將其二人趕出伊甸園，降罪人間。偷摘禁果可說是人類對於智慧與自我主權的渴求，人類第一對夫妻體現的是本能上對愛的渴求，而後即使被貶人間仍終其一生相互相依，可見兩性關係的相處及婚姻則需要男女雙方的智慧來共同努力。', '駁二藝術特區大勇區C5倉庫-	大勇路1號', '2019-02-28 10:00:00', '2019-05-26 20:00:00', '一人一票，限同一人單日使用，展覽不限進場次數。 年齡6歲以下或身高115公分以下之幼童，與持身心障礙手冊及必要陪同者，請出示相關證明文件正本，得免票進場。 套票優惠 - 可當日無限次進出當代館、舊事倉庫及動漫倉庫展覽。 單展票 - 可單日單展無限次進出場館。 詳情請洽駁二大勇區C5、大義區C7售票點。', '阿欽', '駁二藝術特區');
INSERT INTO "public"."exhibition" VALUES (3, '敦煌文化藝術展2019千年萬象', '敦煌，絲綢之路的樞紐，見證千年古道悠長歲月，其所醞釀文化瑰寶，不單是人類文明重要遺產，形式各異的藝術表現，更為後人探究歷史軌跡與鑽研藝術風華的線索。「千年萬象～敦煌文化藝術展」以此背景為展覽框架，分別從地理位置及歷史意義，再現敦煌繾綣人心之美。', '國立雲林科技大學 藝術中心-雲林縣斗六市大學路三段123號', '2019-04-25 08:00:00', '2019-05-22 17:00:00', '免費參觀', '違停', '財團法人沈春池文教基金會,敦煌研究院,中國宋慶齡基金會');

-- ----------------------------
-- Table structure for exhibitionStyle
-- ----------------------------
DROP TABLE IF EXISTS "public"."exhibitionStyle";
CREATE TABLE "public"."exhibitionStyle" (
  "exhStyleNum" int4 NOT NULL DEFAULT nextval('"exhibitionStyle_exhStyleNum_seq1"'::regclass),
  "exhStyle" varchar(10) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of exhibitionStyle
-- ----------------------------
INSERT INTO "public"."exhibitionStyle" VALUES (1, '書畫');
INSERT INTO "public"."exhibitionStyle" VALUES (2, '攝影');
INSERT INTO "public"."exhibitionStyle" VALUES (3, '設計');

-- ----------------------------
-- Table structure for exhibitionStyleSet
-- ----------------------------
DROP TABLE IF EXISTS "public"."exhibitionStyleSet";
CREATE TABLE "public"."exhibitionStyleSet" (
  "exhStyleSetNum" int4 NOT NULL DEFAULT nextval('"exhibitionStyleSet_exhStyleSetNum_seq1"'::regclass),
  "exhStyleNum" int4,
  "exhNum" int4
)
;

-- ----------------------------
-- Records of exhibitionStyleSet
-- ----------------------------
INSERT INTO "public"."exhibitionStyleSet" VALUES (1, 1, 1);
INSERT INTO "public"."exhibitionStyleSet" VALUES (2, 2, 2);
INSERT INTO "public"."exhibitionStyleSet" VALUES (3, 3, 3);

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS "public"."image";
CREATE TABLE "public"."image" (
  "imgNum" int4 NOT NULL DEFAULT nextval('"image_imgNum_seq"'::regclass),
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "artiNum" int4,
  "artiMessNum" int4,
  "recomMessNum" int4,
  "imgName" text COLLATE "pg_catalog"."default",
  "imgDateTime" timestamp(6)
)
;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO "public"."image" VALUES (1, 'abc123', 10, NULL, NULL, '1565331819352--bWF4cmVzZGVmYXVsdA==.jpg', '2019-08-09 02:23:39');
INSERT INTO "public"."image" VALUES (2, 'abc123', 10, NULL, NULL, '1565331819355--cTZDVm5aMllsS09lcUtV.jpg', '2019-08-09 02:23:39');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS "public"."member";
CREATE TABLE "public"."member" (
  "memID" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "memPass" varchar(100) COLLATE "pg_catalog"."default",
  "memBirth" date,
  "memName" varchar(15) COLLATE "pg_catalog"."default",
  "memMail" varchar(100) COLLATE "pg_catalog"."default",
  "memGender" char(1) COLLATE "pg_catalog"."default",
  "memNoti" bool DEFAULT false,
  "memAddr" varchar(100) COLLATE "pg_catalog"."default",
  "memAuthority" char(4) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."member"."memGender" IS 'M or F';
COMMENT ON COLUMN "public"."member"."memNoti" IS 'T or F';

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO "public"."member" VALUES ('abc123', 'abc123', '1997-09-28', 'chin', '10546007@ntub.edu.tw', 'm', 't', '深坑', 'boss');
INSERT INTO "public"."member" VALUES ('abc456', 'abc456', '1998-08-07', 'wat', '10546004@ntub.edu.tw', 'f', 'f', '三重', NULL);

-- ----------------------------
-- Table structure for memberCollection
-- ----------------------------
DROP TABLE IF EXISTS "public"."memberCollection";
CREATE TABLE "public"."memberCollection" (
  "collNum" int4 NOT NULL DEFAULT nextval('"memberCollection_collNum_seq1"'::regclass),
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "recomNum" int4,
  "artiNum" int4,
  "collDateTime" timestamp(6)
)
;

-- ----------------------------
-- Records of memberCollection
-- ----------------------------
INSERT INTO "public"."memberCollection" VALUES (3, 'abc456', NULL, 1, '2019-03-03 12:00:00');
INSERT INTO "public"."memberCollection" VALUES (4, 'abc456', NULL, 2, '2019-03-03 12:00:00');
INSERT INTO "public"."memberCollection" VALUES (6, 'abc456', NULL, 3, '2019-03-03 12:00:00');
INSERT INTO "public"."memberCollection" VALUES (8, 'abc123', NULL, 8, '2019-08-09 03:35:56');
INSERT INTO "public"."memberCollection" VALUES (9, 'abc123', NULL, 7, '2019-08-09 03:35:57');
INSERT INTO "public"."memberCollection" VALUES (10, 'abc123', NULL, 10, '2019-08-09 07:05:18');

-- ----------------------------
-- Table structure for memberMessage
-- ----------------------------
DROP TABLE IF EXISTS "public"."memberMessage";
CREATE TABLE "public"."memberMessage" (
  "memMessNum" int4 NOT NULL DEFAULT nextval('"memberMessage_memMessNum_seq"'::regclass),
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "memMessCont" text COLLATE "pg_catalog"."default",
  "memMessDateTime" timestamp(6)
)
;

-- ----------------------------
-- Records of memberMessage
-- ----------------------------
INSERT INTO "public"."memberMessage" VALUES (1, 'abc123', 'abc123 chin會員訊息內容', '2019-12-01 03:12:00');
INSERT INTO "public"."memberMessage" VALUES (2, 'abc456', 'abc456 wt會員訊息內容', '2019-12-01 03:12:00');
INSERT INTO "public"."memberMessage" VALUES (3, 'abc123', '訊息通知喔!', '2019-12-01 03:12:00');
INSERT INTO "public"."memberMessage" VALUES (4, 'abc456', '訊息通知喔!', '2019-12-01 03:12:00');

-- ----------------------------
-- Table structure for memberPrefer
-- ----------------------------
DROP TABLE IF EXISTS "public"."memberPrefer";
CREATE TABLE "public"."memberPrefer" (
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "preferNum" int4,
  "degree" int4
)
;

-- ----------------------------
-- Records of memberPrefer
-- ----------------------------
INSERT INTO "public"."memberPrefer" VALUES ('abc123', 1, 10);
INSERT INTO "public"."memberPrefer" VALUES ('abc123', 2, 3);
INSERT INTO "public"."memberPrefer" VALUES ('abc123', 3, 4);
INSERT INTO "public"."memberPrefer" VALUES ('abc123', 5, 1);
INSERT INTO "public"."memberPrefer" VALUES ('abc456', 4, 10);
INSERT INTO "public"."memberPrefer" VALUES ('abc456', 6, 6);
INSERT INTO "public"."memberPrefer" VALUES ('abc456', 2, 1);

-- ----------------------------
-- Table structure for movie
-- ----------------------------
DROP TABLE IF EXISTS "public"."movie";
CREATE TABLE "public"."movie" (
  "movNum" int4 NOT NULL DEFAULT nextval('"movie_movNum_seq1"'::regclass),
  "movName" varchar(100) COLLATE "pg_catalog"."default",
  "movPlayDate" date,
  "movIntro" text COLLATE "pg_catalog"."default",
  "movScore1" float4,
  "movScore2" float4,
  "movDir" text COLLATE "pg_catalog"."default",
  "movActor" text COLLATE "pg_catalog"."default",
  "movLim" varchar(10) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."movie"."movLim" IS 'General , Parental Guidance , Parents , Restricted';

-- ----------------------------
-- Records of movie
-- ----------------------------
INSERT INTO "public"."movie" VALUES (1, '福爾圖娜之瞳', '2019-05-03', '改編自日本狂銷540萬本《永遠的0》作者百田尚樹衝擊之作 ★ 《明天，我要和昨天的妳約會》青春戀愛電影大師 三木孝浩 最新動人之作 ★ 氣質清新女神 有村架純 × 實力派演員 神木隆之介 首度詮釋戀人談場不平凡的戀愛 ★ 當能看穿命運的男子遇上死期將至的女子，交織出顫動你我內心的愛情故事   當你預見摯愛的人死期將 ..', 1.5, 5.5, '三木孝浩', '神木隆之介(Ryunosuke Kamiki) 、 有村架純(Kasumi Arimura)', '保護級');
INSERT INTO "public"."movie" VALUES (2, '柏林我愛你', '2019-05-03', '一封獻給柏林的情書！見證生命最美麗的相遇！ ★《巴黎我愛你》製作團隊再創「愛的城市」新經典！ ★《紅酒燉香雞》《惡魔教室》等多位國際重量級導演聯手打造！ ★《模仿遊戲》《曼哈頓戀習曲》個性女神綺拉奈特莉動人新作！ ★《黛妃與女皇》奧斯卡影后海倫米蘭，又一感動人心的演出！ ★《力挽狂瀾》《愛你九週半》金球獎影帝米基洛 ...', 3, 2.5, '彼得契爾森(Peter Chelsom)', '綺拉奈特莉(Keira Knightley)', '輔導級');
INSERT INTO "public"."movie" VALUES (3, '大冒險家', '2019-05-03', '《大娛樂家》好萊塢巨星休傑克曼獻聲配音 ★《派拉諾曼：靈動小子》《酷寶：魔弦傳說》奧斯卡提名團隊萊卡動畫工作室全新力作 ★橫跨世界五大洲，今年暑假最ㄎㄧㄤ冒險故事！   傳奇冒險家佛洛斯特爵士(休傑克曼配音)跋山涉水遠征全世界，蒐集傳說中的怪物，證明牠們真實存在。一天他收到匿名信，信上寫著美國太平洋西北地區，發現了一 ..', 5.5, 6, '克里斯巴特勒(Chris Butler)', '休傑克曼(Hugh Jackman) 、 柔伊莎達娜(Zoe Saldana) 、 提摩西奧利芬(Timothy Olyphant) 、 艾瑪湯普遜(Emma Thompson) 、 查克葛里芬納奇(Zach Galifianakis)', '普遍級');

-- ----------------------------
-- Table structure for movieStyle
-- ----------------------------
DROP TABLE IF EXISTS "public"."movieStyle";
CREATE TABLE "public"."movieStyle" (
  "movStyleNum" int4 NOT NULL DEFAULT nextval('"movieStyle_movStyleNum_seq1"'::regclass),
  "movStyle" varchar(10) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of movieStyle
-- ----------------------------
INSERT INTO "public"."movieStyle" VALUES (1, '驚悚');
INSERT INTO "public"."movieStyle" VALUES (2, '愛情');
INSERT INTO "public"."movieStyle" VALUES (3, '喜劇');
INSERT INTO "public"."movieStyle" VALUES (4, '驚悚、血腥');
INSERT INTO "public"."movieStyle" VALUES (5, '愛情、動作');

-- ----------------------------
-- Table structure for movieStyleSet
-- ----------------------------
DROP TABLE IF EXISTS "public"."movieStyleSet";
CREATE TABLE "public"."movieStyleSet" (
  "movStyleSetNum" int4 NOT NULL DEFAULT nextval('"movieStyleSet_movStyleSetNum_seq1"'::regclass),
  "movStyleNum" int4,
  "movNum" int4
)
;

-- ----------------------------
-- Records of movieStyleSet
-- ----------------------------
INSERT INTO "public"."movieStyleSet" VALUES (1, 1, 1);
INSERT INTO "public"."movieStyleSet" VALUES (2, 2, 2);
INSERT INTO "public"."movieStyleSet" VALUES (3, 3, 3);

-- ----------------------------
-- Table structure for music
-- ----------------------------
DROP TABLE IF EXISTS "public"."music";
CREATE TABLE "public"."music" (
  "musNum" int4 NOT NULL DEFAULT nextval('"music_musNum_seq1"'::regclass),
  "musName" varchar(100) COLLATE "pg_catalog"."default",
  "musLyric" text COLLATE "pg_catalog"."default",
  "musSinger" varchar(100) COLLATE "pg_catalog"."default",
  "musAlbum" varchar(100) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of music
-- ----------------------------
INSERT INTO "public"."music" VALUES (1, '床邊故事', '從前從前有隻貓頭鷹 牠站在屋頂
屋頂後面一片森林 森林很安靜
安靜的鋼琴在大廳 閣樓裡 仔細聽
仔細聽 叮叮叮 什麼聲音

乖乖睡 不要怕 聽我說
乖乖睡 醒來就 吃蘋果
不睡覺 的時候 有傳說
會有人 咬你的 小指頭

這故事 繼續翻頁 再翻頁
你繼續 不想睡 我卻想睡
然後我準備 去打開衣櫃
去看看 躲著誰 去看看 躲著誰

紙上的 城堡卡片 發光的 立體呈現
奇幻的 床邊故事 動聽的 令人稱羨
場景瞬間變化 我接著又施展魔法
活過來說話 準備開始吧

等天黑 一起倒數後關上燈
三二一 入夢境 的繽紛
我們並 非正常人
遊戲怎麼會 照劇本 Oh

天黑 一起來關上燈
三二一 進自由 的靈魂
Oh oh oh oh oh~ Come on~
再回童年 敲敲門

滴噠滴噠突然開始擺動
牆上老掛鐘古董油畫 出現詭異的笑容
好的巫婆壞掉的蘋果 願望要跟誰說
旋轉的 音樂盒 我豎起 耳朵聽
這不會 是一場 夢

Oh 夢~ 一下子瞬間跳躍
我翻閱下個世界
滿滿都是蝴蝶

(森林滿滿蝴蝶
更多更詳盡歌詞 在 ※ Mojim.com　魔鏡歌詞網 
窗外紛飛著雪
一覺醒來旁邊躺著是誰)

這故事 繼續翻頁 再翻頁
你繼續 不想睡 我卻想睡
然後我準備 去打開衣櫃
去看看 躲著誰 去看看 躲著誰

紙上的 城堡卡片 發光的 立體呈現
奇幻的 床邊故事 動聽的 令人稱羨
場景瞬間變化 我接著又施展魔法
活過來說話 準備開始吧

等天黑 一起倒數後關上燈
三二一 入夢境 的繽紛
我們並 非正常人
遊戲怎麼會 照劇本 Oh

天黑 一起來關上燈
三二一 進自由 的靈魂
Oh oh oh oh oh~ Come on~
再回童年 敲敲門

乖乖睡啊 不要害怕
乖乖睡醒來就吃蘋果啊
不睡覺啊 有傳說啊
會有人咬你的小指頭啊

等天黑 一起倒數後關上燈
三二一 入夢境 的繽紛
我們並 非正常人
遊戲怎麼會 照劇本 Oh

天黑 一起來關上燈
三二一 進自由 的靈魂
Oh oh oh oh oh~ Come on~
再回童年 敲敲門
再回童年 敲敲門
再回童年 敲敲門
', '周杰倫', '周杰倫的床邊故事');
INSERT INTO "public"."music" VALUES (2, '不為誰而作的歌', '原諒我這一首 不為誰而作的歌
感覺上彷彿窗外的夜色
曾經有那一刻 回頭竟然認不得
需要 從記憶再摸索 的人 和他們關心的
的地方 和那些走過的 請等一等', '林俊傑', '和自己對話');

-- ----------------------------
-- Table structure for musicStyle
-- ----------------------------
DROP TABLE IF EXISTS "public"."musicStyle";
CREATE TABLE "public"."musicStyle" (
  "musStyleNum" int4 NOT NULL DEFAULT nextval('"musicStyle_musStyleNum_seq1"'::regclass),
  "musStyle" varchar(10) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of musicStyle
-- ----------------------------
INSERT INTO "public"."musicStyle" VALUES (1, '抒情');
INSERT INTO "public"."musicStyle" VALUES (2, 'R&B');
INSERT INTO "public"."musicStyle" VALUES (3, 'rap');
INSERT INTO "public"."musicStyle" VALUES (4, '電音');
INSERT INTO "public"."musicStyle" VALUES (5, '舞曲');

-- ----------------------------
-- Table structure for musicStyleSet
-- ----------------------------
DROP TABLE IF EXISTS "public"."musicStyleSet";
CREATE TABLE "public"."musicStyleSet" (
  "musStyleSetNum" int4 NOT NULL DEFAULT nextval('"musicStyleSet_musStyleSetNum_seq1"'::regclass),
  "musStyleNum" int4,
  "musNum" int4
)
;

-- ----------------------------
-- Records of musicStyleSet
-- ----------------------------
INSERT INTO "public"."musicStyleSet" VALUES (1, 1, 1);
INSERT INTO "public"."musicStyleSet" VALUES (2, 2, 2);

-- ----------------------------
-- Table structure for prefer
-- ----------------------------
DROP TABLE IF EXISTS "public"."prefer";
CREATE TABLE "public"."prefer" (
  "preferNum" int4 NOT NULL DEFAULT nextval('"prefer_preferNum_seq1"'::regclass),
  "preferClass" varchar(10) COLLATE "pg_catalog"."default",
  "preferStyle" varchar(10) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."prefer"."preferClass" IS 'movie , music , book , exhibition';

-- ----------------------------
-- Records of prefer
-- ----------------------------
INSERT INTO "public"."prefer" VALUES (1, 'movie', '喜劇');
INSERT INTO "public"."prefer" VALUES (2, 'movie', '愛情動作');
INSERT INTO "public"."prefer" VALUES (3, 'music', 'rap');
INSERT INTO "public"."prefer" VALUES (4, 'music', '抒情');
INSERT INTO "public"."prefer" VALUES (5, 'book', '教科書');
INSERT INTO "public"."prefer" VALUES (6, 'book', '小說');
INSERT INTO "public"."prefer" VALUES (7, 'exhibition', '書畫');
INSERT INTO "public"."prefer" VALUES (8, 'exhibition', '設計');

-- ----------------------------
-- Table structure for recommend
-- ----------------------------
DROP TABLE IF EXISTS "public"."recommend";
CREATE TABLE "public"."recommend" (
  "recomNum" int4 NOT NULL DEFAULT nextval('"recommend_recomNum_seq1"'::regclass),
  "recomDateTime" timestamp(6),
  "recomHead" varchar(100) COLLATE "pg_catalog"."default",
  "recomCont" text COLLATE "pg_catalog"."default",
  "recomClass" varchar(10) COLLATE "pg_catalog"."default",
  "subNum" int4,
  "picture" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of recommend
-- ----------------------------
INSERT INTO "public"."recommend" VALUES (1, '2018-01-01 23:10:00', '名偵探皮卡丘', '名偵探皮卡丘》是第一部真人寶可夢冒險電影，由萊恩雷諾斯聲演名偵探皮卡丘，改編自廣受喜愛的寶可夢品牌。皮卡丘是轟動全球的寶可夢招牌人物，而寶可夢是全世界最受歡迎又老少咸宜的娛樂商品之一，且是史上最成功的媒體系列之一。    現在，全世界的粉絲能史無前例第一次在大銀幕上看到皮卡丘，這個獨一無二的寶可夢人物這次將化身為名偵 ... ', 'movie', 1, NULL);
INSERT INTO "public"."recommend" VALUES (2, '2018-01-02 12:10:00', '詐騙女神', '敘述瑞貝爾威爾森和安海瑟薇是一對擦出精彩火花的女騙徒，她們在位於南法的一座濱海小鎮展開一場騙術大比拼。喬瑟芬柴斯特菲德（安海瑟薇 飾）是一個穿著光鮮亮麗、蠱惑誘人、善於算計、刁滑奸詐的英國正妹，她在濱海博蒙這座位於南法蔚藍海岸的小鎮擁有一棟豪宅，專門詐騙來自世界各地的有錢凱子。潘妮賴斯特（瑞貝爾威爾森 飾）則是一個無憂  ', 'movie', 2, NULL);
INSERT INTO "public"."recommend" VALUES (3, '2019-01-01 21:10:00', '是什麼讓我遇見這樣的你', '是什麼讓我遇見這樣的你
演出者
白安
專輯
麥田捕手
授權 YouTube 的內容擁有者：
Bin Music (代表Bin Music); ASCAP, The Royalty Network (Publishing), CMRRA與 7 個音樂版權協會', 'music', 1, NULL);
INSERT INTO "public"."recommend" VALUES (4, '2019-01-02 12:10:00', '寂寞寂寞就好', '歌曲
寂寞寂寞就好
演出者
田馥甄
專輯
稍息立正我愛你原聲帶
授權 YouTube 的內容擁有者：
HIMservice (代表HIM International Music Inc.); UMPI與 3 個音樂版權協會', 'music', 2, NULL);
INSERT INTO "public"."recommend" VALUES (5, '2019-02-02 23:00:00', '畫仙：仙靈傳奇3', '作者：陳郁如
繪者：蔡兆倫
出版社：親子天下
出版日：2019/3/28
ISBN：9789575033606
適讀年齡：13~18歲適讀', 'book', 1, NULL);
INSERT INTO "public"."recommend" VALUES (6, '2019-01-03 12:10:00', '太陽神試煉：混血營攻略', '作者：雷克．萊爾頓
出版社：遠流
出版日：2019/4/26
ISBN：9789573285359
適讀年齡：全齡適讀', 'book', 2, NULL);
INSERT INTO "public"."recommend" VALUES (7, '2019-03-03 13:10:00', '手舞足蹈｜藝術長廊創作展 2018朱銘美術館', '活動地點

朱銘美術館藝術長廊-	西勢湖2號

費用資訊

全票：280元 優待票 （學生、65歲以上長者）:250元 優待票 （持身心障礙手冊者）：140元 團體票 （15人以上、美術相關科系學生）：220元 6歲（含）以下兒童（需憑證）免費入館', 'exhibition', 1, NULL);
INSERT INTO "public"."recommend" VALUES (8, '2019-02-03 23:00:00', '2019 女性主體與藝術創作展：女潮 國立臺灣工藝研究發展中心', '活動時間

開始於2018-12-04~2019-05-26
09:00:00至17:00:00
活動地點

國立臺灣工藝研究發展中心 工藝文化館-	中正路573號

費用資訊

免費入場參觀', 'exhibition', 2, NULL);

-- ----------------------------
-- Table structure for recommendLike
-- ----------------------------
DROP TABLE IF EXISTS "public"."recommendLike";
CREATE TABLE "public"."recommendLike" (
  "recomLikeNum" int4 NOT NULL DEFAULT nextval('"recommendLike_recomLikeNum_seq1"'::regclass),
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "recomNum" int4,
  "recomLikeDateTime" timestamp(6)
)
;

-- ----------------------------
-- Records of recommendLike
-- ----------------------------
INSERT INTO "public"."recommendLike" VALUES (1, 'abc123', 1, '2019-02-02 00:00:00');
INSERT INTO "public"."recommendLike" VALUES (2, 'abc123', 3, '2019-02-02 00:00:00');
INSERT INTO "public"."recommendLike" VALUES (3, 'abc123', 5, '2019-02-02 00:00:00');
INSERT INTO "public"."recommendLike" VALUES (4, 'abc123', 7, '2019-02-02 00:00:00');
INSERT INTO "public"."recommendLike" VALUES (5, 'abc456', 1, '2019-02-02 00:00:00');
INSERT INTO "public"."recommendLike" VALUES (6, 'abc456', 2, '2019-02-02 00:00:00');
INSERT INTO "public"."recommendLike" VALUES (7, 'abc456', 8, '2019-02-02 00:00:00');

-- ----------------------------
-- Table structure for recommendMessage
-- ----------------------------
DROP TABLE IF EXISTS "public"."recommendMessage";
CREATE TABLE "public"."recommendMessage" (
  "recomMessNum" int4 NOT NULL DEFAULT nextval('"recommendMessage_recomMessNum_seq1"'::regclass),
  "recomNum" int4,
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "recomMessDateTime" timestamp(6),
  "recomMessCont" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of recommendMessage
-- ----------------------------
INSERT INTO "public"."recommendMessage" VALUES (1, 1, 'abc123', '2019-02-02 10:00:00', '阿欽說第一篇推薦文章好讚喔好好看這是內容');
INSERT INTO "public"."recommendMessage" VALUES (2, 1, 'abc456', '2019-02-02 10:00:00', '違停說第一篇推薦文章太帥了ㄅ這是內容');
INSERT INTO "public"."recommendMessage" VALUES (3, 2, 'abc123', '2019-02-02 10:00:00', '阿欽說第二篇推薦文章好讚喔好好看這是內容');
INSERT INTO "public"."recommendMessage" VALUES (4, 2, 'abc456', '2019-02-02 10:00:00', '違停說第二篇推薦文章太帥了ㄅ這是內容');
INSERT INTO "public"."recommendMessage" VALUES (5, 3, 'abc123', '2019-02-02 10:00:00', '阿欽說第三篇推薦文章好讚喔好好看這是內容');
INSERT INTO "public"."recommendMessage" VALUES (6, 3, 'abc456', '2019-02-02 10:00:00', '違停說第三篇推薦文章太帥了ㄅ這是內容');
INSERT INTO "public"."recommendMessage" VALUES (7, 4, 'abc123', '2019-02-02 10:00:00', '阿欽說第四篇推薦文章好讚喔好好看這是內容');
INSERT INTO "public"."recommendMessage" VALUES (8, 4, 'abc456', '2019-02-02 10:00:00', '違停說第四篇推薦文章太帥了ㄅ這是內容');
INSERT INTO "public"."recommendMessage" VALUES (9, 5, 'abc123', '2019-02-02 10:00:00', '阿欽說第五篇推薦文章好讚喔好好看這是內容');
INSERT INTO "public"."recommendMessage" VALUES (10, 5, 'abc456', '2019-02-02 10:00:00', '違停說第五篇推薦文章太帥了ㄅ這是內容');
INSERT INTO "public"."recommendMessage" VALUES (11, 6, 'abc123', '2019-02-02 10:00:00', '阿欽說第六篇推薦文章好讚喔好好看這是內容');
INSERT INTO "public"."recommendMessage" VALUES (12, 6, 'abc456', '2019-02-02 10:00:00', '違停說第六篇推薦文章太帥了ㄅ這是內容');
INSERT INTO "public"."recommendMessage" VALUES (13, 7, 'abc123', '2019-02-02 10:00:00', '阿欽說第七篇推薦文章好讚喔好好看這是內容');
INSERT INTO "public"."recommendMessage" VALUES (14, 7, 'abc456', '2019-02-02 10:00:00', '違停說第七篇推薦文章太帥了ㄅ這是內容');
INSERT INTO "public"."recommendMessage" VALUES (15, 8, 'abc123', '2019-02-02 10:00:00', '阿欽說第八篇推薦文章好讚喔好好看這是內容');
INSERT INTO "public"."recommendMessage" VALUES (16, 8, 'abc456', '2019-02-02 10:00:00', '違停說第八篇推薦文章太帥了ㄅ這是內容');

-- ----------------------------
-- Table structure for recommendMessageLike
-- ----------------------------
DROP TABLE IF EXISTS "public"."recommendMessageLike";
CREATE TABLE "public"."recommendMessageLike" (
  "recomMessLikeNum" int4 NOT NULL DEFAULT nextval('"recommendMessageLike_recomMessLikeNum_seq1"'::regclass),
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "recomMessNum" int4,
  "recomMessLikeDateTime" timestamp(6)
)
;

-- ----------------------------
-- Records of recommendMessageLike
-- ----------------------------
INSERT INTO "public"."recommendMessageLike" VALUES (1, 'abc123', 1, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (2, 'abc123', 2, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (5, 'abc123', 5, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (6, 'abc123', 11, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (7, 'abc123', 12, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (8, 'abc456', 1, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (9, 'abc456', 2, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (10, 'abc456', 3, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (11, 'abc456', 6, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (12, 'abc456', 7, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (13, 'abc456', 8, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (14, 'abc456', 9, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (15, 'abc456', 10, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (16, 'abc456', 13, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (17, 'abc456', 14, '2019-03-03 12:00:00');
INSERT INTO "public"."recommendMessageLike" VALUES (18, 'abc123', 3, '2019-08-08 09:54:02');
INSERT INTO "public"."recommendMessageLike" VALUES (19, 'abc123', 4, '2019-08-08 09:54:02');

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS "public"."report";
CREATE TABLE "public"."report" (
  "reportNum" int4 NOT NULL DEFAULT nextval('"report_reportNum_seq1"'::regclass),
  "memID" varchar(100) COLLATE "pg_catalog"."default",
  "artiNum" int4,
  "artiMessNum" int4,
  "recomMessNum" int4,
  "reportReason" text COLLATE "pg_catalog"."default",
  "reportDateTime" timestamp(6)
)
;

-- ----------------------------
-- Records of report
-- ----------------------------
INSERT INTO "public"."report" VALUES (1, 'abc123', 1, NULL, NULL, '太色情了吧', '2019-06-29 06:45:00');
INSERT INTO "public"."report" VALUES (2, 'abc123', 2, NULL, NULL, '不知道在說啥', '2019-06-29 06:45:00');
INSERT INTO "public"."report" VALUES (3, 'abc123', NULL, 1, NULL, '亂打一通', '2019-06-29 06:45:00');
INSERT INTO "public"."report" VALUES (4, 'abc123', NULL, 2, NULL, '欠檢舉', '2019-06-29 06:45:00');
INSERT INTO "public"."report" VALUES (5, 'abc123', NULL, NULL, 1, '就想檢舉阿', '2019-06-29 06:45:00');
INSERT INTO "public"."report" VALUES (6, 'abc123', NULL, NULL, 2, '封鎖他!!!', '2019-06-29 06:45:00');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS "public"."tag";
CREATE TABLE "public"."tag" (
  "tagNum" int4 NOT NULL DEFAULT nextval('"tag_tagNum_seq1"'::regclass),
  "tagName" varchar(50) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO "public"."tag" VALUES (1, '太帥了吧');
INSERT INTO "public"."tag" VALUES (2, '66666');
INSERT INTO "public"."tag" VALUES (3, '豬血糕');
INSERT INTO "public"."tag" VALUES (4, '火鍋');
INSERT INTO "public"."tag" VALUES (5, '台北美食');
INSERT INTO "public"."tag" VALUES (6, '皮卡皮卡');
INSERT INTO "public"."tag" VALUES (7, '天氣好好喔喔喔');
INSERT INTO "public"."tag" VALUES (8, '水啦');
INSERT INTO "public"."tag" VALUES (9, '123');
INSERT INTO "public"."tag" VALUES (10, '456');

-- ----------------------------
-- Table structure for tagLinkArticle
-- ----------------------------
DROP TABLE IF EXISTS "public"."tagLinkArticle";
CREATE TABLE "public"."tagLinkArticle" (
  "tagLinkArtiNum" int4 NOT NULL DEFAULT nextval('"tagLinkArticle_tagLinkArtiNum_seq1"'::regclass),
  "artiNum" int4,
  "tagNum" int4,
  "recomNum" int4
)
;

-- ----------------------------
-- Records of tagLinkArticle
-- ----------------------------
INSERT INTO "public"."tagLinkArticle" VALUES (1, 1, 1, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (2, 1, 2, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (3, 1, 3, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (4, 2, 4, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (5, 2, 5, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (6, 2, 6, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (7, 3, 7, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (8, 3, 8, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (9, 4, 1, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (10, 2, 3, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (11, 10, 9, NULL);
INSERT INTO "public"."tagLinkArticle" VALUES (12, 10, 10, NULL);

-- ----------------------------
-- View structure for articleListDataView
-- ----------------------------
DROP VIEW IF EXISTS "public"."articleListDataView";
CREATE VIEW "public"."articleListDataView" AS  SELECT "A"."artiNum",
    "A"."memID",
    "A"."artiDateTime",
    "A"."artiHead",
    "A"."artiCont",
    "A"."artiClass",
    "A".picture,
    "A"."likeCount",
    count(mess."artiNum") AS "messCount"
   FROM (( SELECT arti."artiNum",
            arti."memID",
            to_char(arti."artiDateTime", 'YYYY-MM-DD'::text) AS "artiDateTime",
            arti."artiHead",
            arti."artiCont",
            arti."artiClass",
            arti.picture,
            count("artiLike"."artiNum") AS "likeCount"
           FROM (article arti
             LEFT JOIN "articleLike" "artiLike" ON ((arti."artiNum" = "artiLike"."artiNum")))
          GROUP BY arti."memID", arti."artiDateTime", arti."artiHead", arti."artiCont", arti."artiClass", arti.picture, arti."artiNum") "A"
     LEFT JOIN "articleMessage" mess ON (("A"."artiNum" = mess."artiNum")))
  GROUP BY "A"."artiNum", "A"."memID", "A"."artiDateTime", "A"."artiHead", "A"."artiCont", "A"."artiClass", "A".picture, "A"."likeCount"
  ORDER BY "A"."artiNum" DESC;

-- ----------------------------
-- View structure for articleTagView
-- ----------------------------
DROP VIEW IF EXISTS "public"."articleTagView";
CREATE VIEW "public"."articleTagView" AS  SELECT "artiView"."artiNum",
    tag."tagName"
   FROM (("articleListDataView" "artiView"
     JOIN "tagLinkArticle" "tagLink" ON (("artiView"."artiNum" = "tagLink"."artiNum")))
     JOIN tag ON ((tag."tagNum" = "tagLink"."tagNum")))
  ORDER BY "artiView"."artiNum" DESC;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."articleLike_artiLikeNum_seq"', 6, false);
ALTER SEQUENCE "public"."articleLike_artiLikeNum_seq1"
OWNED BY "public"."articleLike"."artiLikeNum";
SELECT setval('"public"."articleLike_artiLikeNum_seq1"', 27, true);
SELECT setval('"public"."articleMessageLike_artiMessLikeNum_seq"', 6, false);
ALTER SEQUENCE "public"."articleMessageLike_artiMessLikeNum_seq1"
OWNED BY "public"."articleMessageLike"."artiMessLikeNum";
SELECT setval('"public"."articleMessageLike_artiMessLikeNum_seq1"', 25, true);
SELECT setval('"public"."articleMessage_artiMessNum_seq"', 6, false);
ALTER SEQUENCE "public"."articleMessage_artiMessNum_seq1"
OWNED BY "public"."articleMessage"."artiMessNum";
SELECT setval('"public"."articleMessage_artiMessNum_seq1"', 17, true);
SELECT setval('"public"."article_artiNum_seq"', 6, false);
ALTER SEQUENCE "public"."article_artiNum_seq1"
OWNED BY "public"."article"."artiNum";
SELECT setval('"public"."article_artiNum_seq1"', 11, true);
SELECT setval('"public"."bookStyleSet_bookStyleSetNum_seq"', 6, false);
ALTER SEQUENCE "public"."bookStyleSet_bookStyleSetNum_seq1"
OWNED BY "public"."bookStyleSet"."bookStyleSetNum";
SELECT setval('"public"."bookStyleSet_bookStyleSetNum_seq1"', 4, true);
SELECT setval('"public"."bookStyle_bookStyleNum_seq"', 6, false);
ALTER SEQUENCE "public"."bookStyle_bookStyleNum_seq1"
OWNED BY "public"."bookStyle"."bookStyleNum";
SELECT setval('"public"."bookStyle_bookStyleNum_seq1"', 4, true);
SELECT setval('"public"."book_bookNum_seq"', 6, false);
ALTER SEQUENCE "public"."book_bookNum_seq1"
OWNED BY "public"."book"."bookNum";
SELECT setval('"public"."book_bookNum_seq1"', 4, true);
SELECT setval('"public"."exhibitionStyleSet_exhStyleSetNum_seq"', 6, false);
ALTER SEQUENCE "public"."exhibitionStyleSet_exhStyleSetNum_seq1"
OWNED BY "public"."exhibitionStyleSet"."exhStyleSetNum";
SELECT setval('"public"."exhibitionStyleSet_exhStyleSetNum_seq1"', 4, true);
SELECT setval('"public"."exhibitionStyle_exhStyleNum_seq"', 6, false);
ALTER SEQUENCE "public"."exhibitionStyle_exhStyleNum_seq1"
OWNED BY "public"."exhibitionStyle"."exhStyleNum";
SELECT setval('"public"."exhibitionStyle_exhStyleNum_seq1"', 4, true);
SELECT setval('"public"."exhibition_exhNum_seq"', 6, false);
ALTER SEQUENCE "public"."exhibition_exhNum_seq1"
OWNED BY "public"."exhibition"."exhNum";
SELECT setval('"public"."exhibition_exhNum_seq1"', 4, true);
ALTER SEQUENCE "public"."image_imgNum_seq"
OWNED BY "public"."image"."imgNum";
SELECT setval('"public"."image_imgNum_seq"', 3, true);
SELECT setval('"public"."memberCollection_collNum_seq"', 6, false);
ALTER SEQUENCE "public"."memberCollection_collNum_seq1"
OWNED BY "public"."memberCollection"."collNum";
SELECT setval('"public"."memberCollection_collNum_seq1"', 11, true);
ALTER SEQUENCE "public"."memberMessage_memMessNum_seq"
OWNED BY "public"."memberMessage"."memMessNum";
SELECT setval('"public"."memberMessage_memMessNum_seq"', 5, true);
SELECT setval('"public"."movieStyleSet_movStyleSetNum_seq"', 6, false);
ALTER SEQUENCE "public"."movieStyleSet_movStyleSetNum_seq1"
OWNED BY "public"."movieStyleSet"."movStyleSetNum";
SELECT setval('"public"."movieStyleSet_movStyleSetNum_seq1"', 4, true);
SELECT setval('"public"."movieStyle_movStyleNum_seq"', 6, false);
ALTER SEQUENCE "public"."movieStyle_movStyleNum_seq1"
OWNED BY "public"."movieStyle"."movStyleNum";
SELECT setval('"public"."movieStyle_movStyleNum_seq1"', 6, true);
SELECT setval('"public"."movie_movNum_seq"', 6, false);
ALTER SEQUENCE "public"."movie_movNum_seq1"
OWNED BY "public"."movie"."movNum";
SELECT setval('"public"."movie_movNum_seq1"', 4, true);
SELECT setval('"public"."musicStyleSet_musStyleSetNum_seq"', 6, false);
ALTER SEQUENCE "public"."musicStyleSet_musStyleSetNum_seq1"
OWNED BY "public"."musicStyleSet"."musStyleSetNum";
SELECT setval('"public"."musicStyleSet_musStyleSetNum_seq1"', 3, true);
SELECT setval('"public"."musicStyle_musStyleNum_seq"', 6, false);
ALTER SEQUENCE "public"."musicStyle_musStyleNum_seq1"
OWNED BY "public"."musicStyle"."musStyleNum";
SELECT setval('"public"."musicStyle_musStyleNum_seq1"', 6, true);
SELECT setval('"public"."music_musNum_seq"', 6, false);
ALTER SEQUENCE "public"."music_musNum_seq1"
OWNED BY "public"."music"."musNum";
SELECT setval('"public"."music_musNum_seq1"', 3, true);
SELECT setval('"public"."orddetails_serno_seq"', 3004, false);
SELECT setval('"public"."prefer_preferNum_seq"', 6, false);
ALTER SEQUENCE "public"."prefer_preferNum_seq1"
OWNED BY "public"."prefer"."preferNum";
SELECT setval('"public"."prefer_preferNum_seq1"', 9, true);
SELECT setval('"public"."recommendClass_recomClassNum_seq"', 6, false);
SELECT setval('"public"."recommendLike_recomLikeNum_seq"', 6, false);
ALTER SEQUENCE "public"."recommendLike_recomLikeNum_seq1"
OWNED BY "public"."recommendLike"."recomLikeNum";
SELECT setval('"public"."recommendLike_recomLikeNum_seq1"', 10, true);
SELECT setval('"public"."recommendMessageLike_recomMessLikeNum_seq"', 6, false);
ALTER SEQUENCE "public"."recommendMessageLike_recomMessLikeNum_seq1"
OWNED BY "public"."recommendMessageLike"."recomMessLikeNum";
SELECT setval('"public"."recommendMessageLike_recomMessLikeNum_seq1"', 20, true);
SELECT setval('"public"."recommendMessage_recomMessNum_seq"', 6, false);
ALTER SEQUENCE "public"."recommendMessage_recomMessNum_seq1"
OWNED BY "public"."recommendMessage"."recomMessNum";
SELECT setval('"public"."recommendMessage_recomMessNum_seq1"', 17, true);
SELECT setval('"public"."recommend_recomNum_seq"', 6, false);
ALTER SEQUENCE "public"."recommend_recomNum_seq1"
OWNED BY "public"."recommend"."recomNum";
SELECT setval('"public"."recommend_recomNum_seq1"', 9, true);
SELECT setval('"public"."report_reportNum_seq"', 6, false);
ALTER SEQUENCE "public"."report_reportNum_seq1"
OWNED BY "public"."report"."reportNum";
SELECT setval('"public"."report_reportNum_seq1"', 7, true);
SELECT setval('"public"."tagLinkArticle_tagLinkArtiNum_seq"', 6, false);
ALTER SEQUENCE "public"."tagLinkArticle_tagLinkArtiNum_seq1"
OWNED BY "public"."tagLinkArticle"."tagLinkArtiNum";
SELECT setval('"public"."tagLinkArticle_tagLinkArtiNum_seq1"', 13, true);
SELECT setval('"public"."tag_tagNum_seq"', 6, false);
ALTER SEQUENCE "public"."tag_tagNum_seq1"
OWNED BY "public"."tag"."tagNum";
SELECT setval('"public"."tag_tagNum_seq1"', 11, true);

-- ----------------------------
-- Primary Key structure for table article
-- ----------------------------
ALTER TABLE "public"."article" ADD CONSTRAINT "article_pkey" PRIMARY KEY ("artiNum");

-- ----------------------------
-- Primary Key structure for table articleLike
-- ----------------------------
ALTER TABLE "public"."articleLike" ADD CONSTRAINT "articleLike_pkey" PRIMARY KEY ("artiLikeNum");

-- ----------------------------
-- Primary Key structure for table articleMessage
-- ----------------------------
ALTER TABLE "public"."articleMessage" ADD CONSTRAINT "articleMessage_pkey" PRIMARY KEY ("artiMessNum");

-- ----------------------------
-- Primary Key structure for table articleMessageLike
-- ----------------------------
ALTER TABLE "public"."articleMessageLike" ADD CONSTRAINT "articleMessageLike_pkey" PRIMARY KEY ("artiMessLikeNum");

-- ----------------------------
-- Primary Key structure for table book
-- ----------------------------
ALTER TABLE "public"."book" ADD CONSTRAINT "book_pkey" PRIMARY KEY ("bookNum");

-- ----------------------------
-- Primary Key structure for table bookStyle
-- ----------------------------
ALTER TABLE "public"."bookStyle" ADD CONSTRAINT "bookStyle_pkey" PRIMARY KEY ("bookStyleNum");

-- ----------------------------
-- Primary Key structure for table bookStyleSet
-- ----------------------------
ALTER TABLE "public"."bookStyleSet" ADD CONSTRAINT "bookStyleSet_pkey" PRIMARY KEY ("bookStyleSetNum");

-- ----------------------------
-- Primary Key structure for table exhibition
-- ----------------------------
ALTER TABLE "public"."exhibition" ADD CONSTRAINT "exhibition_pkey" PRIMARY KEY ("exhNum");

-- ----------------------------
-- Primary Key structure for table exhibitionStyle
-- ----------------------------
ALTER TABLE "public"."exhibitionStyle" ADD CONSTRAINT "exhibitionStyle_pkey" PRIMARY KEY ("exhStyleNum");

-- ----------------------------
-- Primary Key structure for table exhibitionStyleSet
-- ----------------------------
ALTER TABLE "public"."exhibitionStyleSet" ADD CONSTRAINT "exhibitionStyleSet_pkey" PRIMARY KEY ("exhStyleSetNum");

-- ----------------------------
-- Primary Key structure for table image
-- ----------------------------
ALTER TABLE "public"."image" ADD CONSTRAINT "image_pkey" PRIMARY KEY ("imgNum");

-- ----------------------------
-- Primary Key structure for table member
-- ----------------------------
ALTER TABLE "public"."member" ADD CONSTRAINT "member_pkey" PRIMARY KEY ("memID");

-- ----------------------------
-- Primary Key structure for table memberCollection
-- ----------------------------
ALTER TABLE "public"."memberCollection" ADD CONSTRAINT "memberCollection_pkey" PRIMARY KEY ("collNum");

-- ----------------------------
-- Primary Key structure for table memberMessage
-- ----------------------------
ALTER TABLE "public"."memberMessage" ADD CONSTRAINT "memberMessage_pkey" PRIMARY KEY ("memMessNum");

-- ----------------------------
-- Primary Key structure for table movie
-- ----------------------------
ALTER TABLE "public"."movie" ADD CONSTRAINT "movie_pkey" PRIMARY KEY ("movNum");

-- ----------------------------
-- Primary Key structure for table movieStyle
-- ----------------------------
ALTER TABLE "public"."movieStyle" ADD CONSTRAINT "movieStyle_pkey" PRIMARY KEY ("movStyleNum");

-- ----------------------------
-- Primary Key structure for table movieStyleSet
-- ----------------------------
ALTER TABLE "public"."movieStyleSet" ADD CONSTRAINT "movieStyleSet_pkey" PRIMARY KEY ("movStyleSetNum");

-- ----------------------------
-- Primary Key structure for table music
-- ----------------------------
ALTER TABLE "public"."music" ADD CONSTRAINT "music_pkey" PRIMARY KEY ("musNum");

-- ----------------------------
-- Primary Key structure for table musicStyle
-- ----------------------------
ALTER TABLE "public"."musicStyle" ADD CONSTRAINT "musicStyle_pkey" PRIMARY KEY ("musStyleNum");

-- ----------------------------
-- Primary Key structure for table musicStyleSet
-- ----------------------------
ALTER TABLE "public"."musicStyleSet" ADD CONSTRAINT "musicStyleSet_pkey" PRIMARY KEY ("musStyleSetNum");

-- ----------------------------
-- Primary Key structure for table prefer
-- ----------------------------
ALTER TABLE "public"."prefer" ADD CONSTRAINT "prefer_pkey" PRIMARY KEY ("preferNum");

-- ----------------------------
-- Primary Key structure for table recommend
-- ----------------------------
ALTER TABLE "public"."recommend" ADD CONSTRAINT "recommend_pkey" PRIMARY KEY ("recomNum");

-- ----------------------------
-- Primary Key structure for table recommendLike
-- ----------------------------
ALTER TABLE "public"."recommendLike" ADD CONSTRAINT "recommendLike_pkey" PRIMARY KEY ("recomLikeNum");

-- ----------------------------
-- Primary Key structure for table recommendMessage
-- ----------------------------
ALTER TABLE "public"."recommendMessage" ADD CONSTRAINT "recommendMessage_pkey" PRIMARY KEY ("recomMessNum");

-- ----------------------------
-- Primary Key structure for table recommendMessageLike
-- ----------------------------
ALTER TABLE "public"."recommendMessageLike" ADD CONSTRAINT "recommendMessLike_pkey" PRIMARY KEY ("recomMessLikeNum");

-- ----------------------------
-- Primary Key structure for table report
-- ----------------------------
ALTER TABLE "public"."report" ADD CONSTRAINT "report_pkey" PRIMARY KEY ("reportNum");

-- ----------------------------
-- Primary Key structure for table tag
-- ----------------------------
ALTER TABLE "public"."tag" ADD CONSTRAINT "tag_pkey" PRIMARY KEY ("tagNum");

-- ----------------------------
-- Primary Key structure for table tagLinkArticle
-- ----------------------------
ALTER TABLE "public"."tagLinkArticle" ADD CONSTRAINT "tagLinkArticle_pkey" PRIMARY KEY ("tagLinkArtiNum");

-- ----------------------------
-- Foreign Keys structure for table article
-- ----------------------------
ALTER TABLE "public"."article" ADD CONSTRAINT "article_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table articleLike
-- ----------------------------
ALTER TABLE "public"."articleLike" ADD CONSTRAINT "articleLike_artiNum_fkey" FOREIGN KEY ("artiNum") REFERENCES "public"."article" ("artiNum") ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE "public"."articleLike" ADD CONSTRAINT "articleLike_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table articleMessage
-- ----------------------------
ALTER TABLE "public"."articleMessage" ADD CONSTRAINT "articleMessage_artiNum_fkey" FOREIGN KEY ("artiNum") REFERENCES "public"."article" ("artiNum") ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE "public"."articleMessage" ADD CONSTRAINT "articleMessage_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table articleMessageLike
-- ----------------------------
ALTER TABLE "public"."articleMessageLike" ADD CONSTRAINT "articleMessageLike_artiMessNum_fkey" FOREIGN KEY ("artiMessNum") REFERENCES "public"."articleMessage" ("artiMessNum") ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE "public"."articleMessageLike" ADD CONSTRAINT "articleMessageLike_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table bookStyleSet
-- ----------------------------
ALTER TABLE "public"."bookStyleSet" ADD CONSTRAINT "bookStyleSet_bookNum_fkey" FOREIGN KEY ("bookNum") REFERENCES "public"."book" ("bookNum") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."bookStyleSet" ADD CONSTRAINT "bookStyleSet_bookStyleNum_fkey" FOREIGN KEY ("bookStyleNum") REFERENCES "public"."bookStyle" ("bookStyleNum") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table exhibitionStyleSet
-- ----------------------------
ALTER TABLE "public"."exhibitionStyleSet" ADD CONSTRAINT "exhibitionStyleSet_exhNum_fkey" FOREIGN KEY ("exhNum") REFERENCES "public"."exhibition" ("exhNum") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."exhibitionStyleSet" ADD CONSTRAINT "exhibitionStyleSet_exhStyleNum_fkey" FOREIGN KEY ("exhStyleNum") REFERENCES "public"."exhibitionStyle" ("exhStyleNum") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table image
-- ----------------------------
ALTER TABLE "public"."image" ADD CONSTRAINT "image_artiMessNum_fkey" FOREIGN KEY ("artiMessNum") REFERENCES "public"."articleMessage" ("artiMessNum") ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE "public"."image" ADD CONSTRAINT "image_artiNum_fkey" FOREIGN KEY ("artiNum") REFERENCES "public"."article" ("artiNum") ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE "public"."image" ADD CONSTRAINT "image_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE "public"."image" ADD CONSTRAINT "image_recomMessNum_fkey" FOREIGN KEY ("recomMessNum") REFERENCES "public"."recommendMessage" ("recomMessNum") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table memberCollection
-- ----------------------------
ALTER TABLE "public"."memberCollection" ADD CONSTRAINT "memberCollection_artiNum_fkey" FOREIGN KEY ("artiNum") REFERENCES "public"."article" ("artiNum") ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE "public"."memberCollection" ADD CONSTRAINT "memberCollection_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."memberCollection" ADD CONSTRAINT "memberCollection_recomNum_fkey" FOREIGN KEY ("recomNum") REFERENCES "public"."recommend" ("recomNum") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table memberMessage
-- ----------------------------
ALTER TABLE "public"."memberMessage" ADD CONSTRAINT "memberMessage_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table memberPrefer
-- ----------------------------
ALTER TABLE "public"."memberPrefer" ADD CONSTRAINT "memberPrefer_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."memberPrefer" ADD CONSTRAINT "memberPrefer_preferNum_fkey" FOREIGN KEY ("preferNum") REFERENCES "public"."prefer" ("preferNum") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table movieStyleSet
-- ----------------------------
ALTER TABLE "public"."movieStyleSet" ADD CONSTRAINT "movieStyleSet_movNum_fkey" FOREIGN KEY ("movNum") REFERENCES "public"."movie" ("movNum") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."movieStyleSet" ADD CONSTRAINT "movieStyleSet_movStyleNum_fkey" FOREIGN KEY ("movStyleNum") REFERENCES "public"."movieStyle" ("movStyleNum") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table musicStyleSet
-- ----------------------------
ALTER TABLE "public"."musicStyleSet" ADD CONSTRAINT "musicStyleSet_musNum_fkey" FOREIGN KEY ("musNum") REFERENCES "public"."music" ("musNum") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."musicStyleSet" ADD CONSTRAINT "musicStyleSet_musStyleNum_fkey" FOREIGN KEY ("musStyleNum") REFERENCES "public"."musicStyle" ("musStyleNum") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table recommendLike
-- ----------------------------
ALTER TABLE "public"."recommendLike" ADD CONSTRAINT "recommendLike_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."recommendLike" ADD CONSTRAINT "recommendLike_recomNum_fkey" FOREIGN KEY ("recomNum") REFERENCES "public"."recommend" ("recomNum") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table recommendMessage
-- ----------------------------
ALTER TABLE "public"."recommendMessage" ADD CONSTRAINT "recommendMessage_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."recommendMessage" ADD CONSTRAINT "recommendMessage_recomNum_fkey" FOREIGN KEY ("recomNum") REFERENCES "public"."recommend" ("recomNum") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table recommendMessageLike
-- ----------------------------
ALTER TABLE "public"."recommendMessageLike" ADD CONSTRAINT "recommendMessageLike_memID_fkey" FOREIGN KEY ("memID") REFERENCES "public"."member" ("memID") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."recommendMessageLike" ADD CONSTRAINT "recommendMessageLike_recomMessNum_fkey" FOREIGN KEY ("recomMessNum") REFERENCES "public"."recommendMessage" ("recomMessNum") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table report
-- ----------------------------
ALTER TABLE "public"."report" ADD CONSTRAINT "report_artiMessNum_fkey" FOREIGN KEY ("artiMessNum") REFERENCES "public"."articleMessage" ("artiMessNum") ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE "public"."report" ADD CONSTRAINT "report_artiNum_fkey" FOREIGN KEY ("artiNum") REFERENCES "public"."article" ("artiNum") ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE "public"."report" ADD CONSTRAINT "report_recomMessNum_fkey" FOREIGN KEY ("recomMessNum") REFERENCES "public"."recommendMessage" ("recomMessNum") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table tagLinkArticle
-- ----------------------------
ALTER TABLE "public"."tagLinkArticle" ADD CONSTRAINT "tagLinkArticle_artiNum_fkey" FOREIGN KEY ("artiNum") REFERENCES "public"."article" ("artiNum") ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE "public"."tagLinkArticle" ADD CONSTRAINT "tagLinkArticle_tagNum_fkey" FOREIGN KEY ("tagNum") REFERENCES "public"."tag" ("tagNum") ON DELETE RESTRICT ON UPDATE RESTRICT;
