header = '    <div class="header">\
<nav id="nav" class="navbar navbar-expand-lg navbar-light fixed-top ">\
    <a class="nav-link" href="index.html">\
    <img class="nav-item" href="index.html" src="imgs/logo.png" width="30px" height="30px " style="opacity:0.8" alt="">\
       <a href="index.html" class="navTitle">文藝富心</a>\
</a>\
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\
        <span class="navbar-toggler-icon"></span>\
    </button>\
    <div class="collapse navbar-collapse" id="navbarNav">\
        <ul class="navbar-nav ml-auto">\
        <div class="searchSection">\
        <input type="text" class="navSearch"/>\
        <button type="submit" class="btn navSearch"><i class="fas fa-search"></i></button>\
        </div>\
        <li class="nav-item">\
            <a class="nav-link" href="recommendPost.html">\
            新增推薦</a>\
        </li>\
        <li class="nav-item">\
                <a class="nav-link " href="index.html">首頁<span class="sr-only">(current)</span></a>\
            </li>\
            <li class="nav-item">\
            <a class="nav-link " href="post.html"><i class="far fa-edit" style="margin-right:5px;"></i>發文<span class="sr-only">(current)</span></a>\
        </li>\
            <li class="nav-item">\
                <a class="nav-link" href="notify.html">\
                <i class="fas fa-bell"  style="color:white;"></i>\
                </a>\
            </li>\
            <li class="nav-item">\
            <a class="nav-link" href="recommendList.html">\
            推薦</a>\
        </li>\
            <li class="nav-item">\
                <a class="nav-link" href="articleList.html">\
                文章</a>\
            </li>\
            <li id="dropdown"class="nav-item dropdown">\
            <a class="nav-link dropdown-toggle" href="collectionArticle.html" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
            收藏\
            </a>\
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">\
                <a class="dropdown-item" href="collectionRecommend.html">推薦收藏</a>\
                <a class="dropdown-item" href="collectionArticle.html">文章收藏</a>\
            </div>\
        </li>\
        <li class="nav-item">\
        <a class="nav-link" id="navReport" style="cursor:pointer;">申報</a>\
        </li>\
        <li class="nav-item">\
                <a class="nav-link" href="logIn.html">登入</a>\
        </li>\
        <li class="nav-item dropdown">\
        <a class="nav-link dropdown-toggle" href="memberManage.html" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                會員\
            </a>\
        <div class="dropdown-menu member dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">\
            <a class="dropdown-item" href="memberManage.html">會員資料</a>\
            <a class="dropdown-item" href="articleManage.html">文章管理</a>\
            <a class="dropdown-item" href="#">登出</a>\
        </div>\
      </li>\
        </ul>\
    </div>\
</nav>\
</div>\
<div class="container position-fixed col-lg-8 report" id="report">\
<div id="x"><i class="far fa-times-circle"></i>\
</div>\
<div class="form">\
    <form class="report" action="" data-aos="zoom-out-right">\
        <div class="input-icon-wrap">\
            <span class="input-icon"><span class="fas fa-hands-helping"></span></span>\
            <textarea class="input-with-icon report" placeholder="輸入舉報原因"></textarea>\
        </div>\
        <button type="button" class="btn btn-danger report">送出</button>\
    </form>\
</div>\
</div>\ ';

document.write(header);