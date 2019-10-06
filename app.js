var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var session = require('express-session');

var signUp = require('./routes/utility/signUp');

//=========================================
//---------  article router ------------
//=========================================
var articleListRouter = require('./routes/article/articleList');
var articleRouter = require('./routes/article/article');
var addCollectionRouter = require('./routes/collection/addCollection');
var delCollectionRouter = require('./routes/collection/delCollection');
var likeCountRouter = require('./routes/likeCount');
// ---------------  four Class -------------------
var articleMovieRouter = require('./routes/article/articleMovie');
var articleMusicRouter = require('./routes/article/articleMusic');
var articleBookRouter = require('./routes/article/articleBook');
var articleExhibitionRouter = require('./routes/article/articleExhibition');

//=========================================
//---------  member router ------------
//=========================================
var memberRouter = require('./routes/member/member');
var memberManageRouter = require('./routes/member/memberManage');
var articleManageRouter = require('./routes/member/articleManage');
var articlePostRouter = require('./routes/member/articlePost');
var loginRouter = require('./routes/member/login');
var logOutRouter = require('./routes/member/logOut');
var signUpRouter = require('./routes/member/signUp');
var signUpAddRouter = require('./routes/member/signUp_add');
var userLoginRouter = require('./routes/member/userLogin');
var notifyRouter = require('./routes/notify');
var postRouter = require('./routes/post');
var addLikeRouter = require('./routes/member/addLike');
var delLikeRouter = require('./routes/member/delLike');
var reportRouter = require('./routes/member/report');
var replyPostRouter = require('./routes/member/replyPost');

// ---------------  four Class -------------------
var myMovieArticleRouter = require('./routes/member/myMovieArticle');
var myMusicArticleRouter = require('./routes/member/myMusicArticle');
var myBookArticleRouter = require('./routes/member/myBookArticle');
var myExhibitionArticleRouter = require('./routes/member/myExhibitionArticle');

//=========================================
//---------  collection router ------------
//=========================================
var collection_recommend_Router = require('./routes/collection/collectionRecommend');
var collection_article_Router = require('./routes/collection/collectionArticle');
var oneColleRecommend = require('./routes/collection/oneColleRecommend');
var oneColleArticle = require('./routes/collection/oneColleArticle');
// ---------------  collection recommend Class -------------------
var colleRecomMovieRouter = require('./routes/collection/colleRecomMovie');
var colleRecomMusicRouter = require('./routes/collection/colleRecomMusic');
var colleRecomBookRouter = require('./routes/collection/colleRecomBook');
var colleRecomExhibitionRouter = require('./routes/collection/colleRecomExhibition');
// ---------------  collection article Class -------------------
var colleArtiMovieRouter = require('./routes/collection/colleArtiMovie');
var colleArtiMusicRouter = require('./routes/collection/colleArtiMusic');
var colleArtiBookRouter = require('./routes/collection/colleArtiBook');
var colleArtiExhibitionRouter = require('./routes/collection/colleArtiExhibition');

//=========================================
//---------  recommend router ------------
//=========================================
var recommendListRouter = require('./routes/recommend/recommendList');
var oneRecommendRouter = require('./routes/recommend/oneRecoomend');
var recommendPostPageRouter = require('./routes/recommend/recomPostPage');
var recommendPostRouter = require('./routes/recommend/post');
// ---------------  four recommend Class -------------------
var RecomMovieRouter = require('./routes/recommend/recomMovie');
var RecomMusicRouter = require('./routes/recommend/recomMusic');
var RecomBookRouter = require('./routes/recommend/recomBook');
var RecomExhibitionRouter = require('./routes/recommend/recomExhibition');

var CheckStatus = require('./routes/checkStatus');
var searchRouter = require('./routes/search');

var app = express();

//---------------------------------------------
// 使用passport-google-oauth2套件進行認證
//---------------------------------------------
var passport = require('passport');

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

//載入google oauth2
var GoogleStrategy = require('passport-google-oauth20').Strategy;

//填入自己在google cloud platform建立的憑證
passport.use(
    new GoogleStrategy({
        clientID: '535503110825-vsqohis8p2itidvaqii3akbmha3kluie.apps.googleusercontent.com', 
        clientSecret: 'vx7elBl3NGlZcnNPFV3QNH7l',
        callbackURL: "https://project108405.herokuapp.com/auth/google/callback" 
    },
    function(accessToken, refreshToken, profile, done) {
        if (profile) {
            return done(null, profile);
        }else {
            return done(null, false);
        }
    }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//----------------------------------------
// 可由外部直接取用資料夾
//----------------------------------------
app.use(express.static('public/picture'));
//-----------------------------------------

//=========================================
//---------  express session ------------
//=========================================
app.use(session({ secret: 'mysecret', cookie: { maxAge: 6000000 } }));

app.use('/', indexRouter);

//=========================================
//---------  article use ------------
//=========================================
app.use('/article', articleRouter);
app.use('/articleList', articleListRouter);
app.use('/articleList/post', postRouter);
app.use('/article/post', articlePostRouter);
app.use('/article/reply', replyPostRouter);
app.use('/addCollection', addCollectionRouter);
app.use('/delCollection', delCollectionRouter);
app.use('/likeCount', likeCountRouter);

// -------------- four Class use----------------
app.use('/articleList/articleMovie', articleMovieRouter);
app.use('/articleList/articleMusic', articleMusicRouter);
app.use('/articleList/articleBook', articleBookRouter);
app.use('/articleList/articleExhibition', articleExhibitionRouter);

//=========================================
//------------  member use ----------------
//=========================================
app.use('/member', memberRouter);
app.use('/member/articleManage', articleManageRouter);
app.use('/member/memberManage', memberManageRouter);
app.use('/login', loginRouter);
app.use('/logOut', logOutRouter);
app.use('/signUp', signUpRouter);
app.use('/signUp/add', signUpAddRouter);
app.use('/userLogin', userLoginRouter);
app.use('/notify', notifyRouter);
app.use('/addLike', addLikeRouter);
app.use('/delLike', delLikeRouter);
app.use('/report', reportRouter);

// -------------- four Class use----------------
app.use('/articleManage/movie', myMovieArticleRouter);
app.use('/articleManage/music', myMusicArticleRouter);
app.use('/articleManage/book', myBookArticleRouter);
app.use('/articleManage/exhibition', myExhibitionArticleRouter);
//=========================================
//----------  collection use --------------
//=========================================
app.use('/collection/recommend', collection_recommend_Router);
app.use('/collection/article', collection_article_Router);
app.use('/collection/recommend/one', oneColleRecommend);
app.use('/collection/article/one', oneColleArticle);
// --------- collection recommend four Class use -----------
app.use('/collection/recommend/movie', colleRecomMovieRouter);
app.use('/collection/recommend/music', colleRecomMusicRouter);
app.use('/collection/recommend/book', colleRecomBookRouter);
app.use('/collection/recommend/exhibition', colleRecomExhibitionRouter);
// --------- collection article four Class use -----------
app.use('/collection/article/movie', colleArtiMovieRouter);
app.use('/collection/article/music', colleArtiMusicRouter);
app.use('/collection/article/book', colleArtiBookRouter);
app.use('/collection/article/exhibition', colleArtiExhibitionRouter);

// =========================================
// ---------  recommend use ------------
// =========================================
app.use('/recommendList', recommendListRouter);
app.use('/oneRecommend', oneRecommendRouter);
app.use('/recommend/post/page', recommendPostPageRouter);
app.use('/recommend/post',recommendPostRouter);
// -------------- four Class ----------------
app.use('/recommendList/movie', RecomMovieRouter);
app.use('/recommendList/music', RecomMusicRouter);
app.use('/recommendList/book', RecomBookRouter);
app.use('/recommendList/exhibition', RecomExhibitionRouter);
app.use('/checkStatus', CheckStatus);

app.use('/search',searchRouter);



//---------------------------------------------
// 設定登入及登出方法內容
//---------------------------------------------
app.get('/user/login',
    passport.authenticate('google', { scope: ['email', 'profile'] })
    );   //進行google第三方認證

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),   //導向登入失敗頁面	
    function(req, res) {
        // 如果登入成功, 使用者資料已存在session
        // console.log(req.session.passport.user.id);
        // console.log(req.session.passport.user.displayName);
        // console.log(req.session.passport.user.emails[0].value);	 

        var checkID ;
        signUp.checkMemID(req.session.passport.user.id).then((data) => {      
            checkID = data[0];
        })
        //如果帳號不存在，新增帳號到資料庫
        if(!checkID){      
            signUp.googleCreateMember(req.session.passport.user.id, req.session.passport.user.displayName, req.session.passport.user.emails[0].value);
            console.log(req.session.passport.user.id);
        }
 
        res.redirect('/');   //導向登入成功頁面
    });

app.get('/user/logout', function(req, res){    
    req.logout();        //將使用者資料從session移除
    req.session.memID = undefined ;
    console.log(req.session.memID);
    res.redirect('/');   //導向登出頁面
});    


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
