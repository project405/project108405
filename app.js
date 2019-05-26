var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var session = require('express-session');

// --------------  My routes--------------- 
var collection_recommend_Router = require('./routes/collection/collectionRecommend');
var collection_article_Router = require('./routes/collection/collectionArticle');
var memberRouter = require('./routes/member');
var articleListRouter = require('./routes/article/articleList');
var articleRouter = require('./routes/article/article');
var loginRouter = require('./routes/login');
var signUpRouter = require('./routes/signUp');
var signUpAddRouter = require('./routes/signUp_add');
var userLoginRouter = require('./routes/userLogin');
var notifyRouter = require('./routes/notify');
var recommendListRouter = require('./routes/recommendList');
// ---------------  My four Class -------------------
var articleMovieRouter = require('./routes/article/articleMovie');
var articleMusicRouter = require('./routes/article/articleMusic');
var articleBookRouter = require('./routes/article/articleBook');
var articleExhibitionRouter = require('./routes/article/articleExhibition');
// ---------------  My four collRecommendClass -------------------
var colleRecomMovieRouter = require('./routes/collection/colleRecomMovie');
var colleRecomMusicRouter = require('./routes/collection/colleRecomMusic');
var colleRecomBookRouter = require('./routes/collection/colleRecomBook');
var colleRecomExhibitionRouter = require('./routes/collection/colleRecomExhibition');

// ---------------  My four collArticleClass -------------------
var colleArtiMovieRouter = require('./routes/collection/colleArtiMovie');
var colleArtiMusicRouter = require('./routes/collection/colleArtiMusic');
var colleArtiBookRouter = require('./routes/collection/colleArtiBook');
var colleArtiExhibitionRouter = require('./routes/collection/colleArtiExhibition');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// ---------------  express-session  ----------------
app.use(session({secret: 'mysecret', cookie: { maxAge: 60000 }}));
app.use('/', indexRouter);
app.use('/article', articleRouter);
// ---------------  My use  ----------------
app.use('/collection/recommend',collection_recommend_Router);
app.use('/collection/article',collection_article_Router);
app.use('/member',memberRouter);
app.use('/articleList',articleListRouter);
app.use('/login',loginRouter);
app.use('/signUp',signUpRouter);
app.use('/signUp/add',signUpAddRouter);
app.use('/userlogin',userLoginRouter);
app.use('/notify',notifyRouter);
app.use('/recommendList',recommendListRouter);
// -------------- My use Four Class ----------------
app.use('/articleList/articleMovie',articleMovieRouter);
app.use('/articleList/articleMusic',articleMusicRouter);
app.use('/articleList/articleBook',articleBookRouter);
app.use('/articleList/articleExhibition',articleExhibitionRouter);
// -------------- My use Four collRecomClass ----------------
app.use('/collection/recommend/movie',colleRecomMovieRouter);
app.use('/collection/recommend/music',colleRecomMusicRouter);
app.use('/collection/recommend/book',colleRecomBookRouter);
app.use('/collection/recommend/exhibition',colleRecomExhibitionRouter);
// -------------- My use Four collArtiClass ----------------
app.use('/collection/article/movie',colleArtiMovieRouter);
app.use('/collection/article/music',colleArtiMusicRouter);
app.use('/collection/article/book',colleArtiBookRouter);
app.use('/collection/article/exhibition',colleArtiExhibitionRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
