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
        <button class="btn navSearch"><i class="fas fa-search"></i></button>\
        </div>\
        <li class="nav-item">\
            <a class="nav-link" href="recommendPost.html" style="display:none;">\
            新增推薦</a>\
        </li>\
        <li class="nav-item">\
                <a class="nav-link " href="index.html">首頁<span class="sr-only">(current)</span></a>\
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
        <a class="nav-link" style="cursor:pointer;" data-toggle="modal" data-target="#report">申報</a>\
        </li>\
        <li class="nav-item">\
                <a class="nav-link" href="logIn.html">登入</a>\
        </li>\
        <li class="nav-item">\
            <a class=" helper" id="aboutUsButton" data-toggle="modal" data-target="#aboutUsDiv" style="cursor: pointer;">\
            小幫手</a>\
          </li>\
        <li class="nav-item dropdown">\
        <a style="display:none;" class="nav-link dropdown-toggle" href="memberManage.html" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
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
<div class="modal fade" id="report" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\
<div class="modal-dialog modal-dialog-centered" role="document">\
    <div class="modal-content">\
        <div class="modal-header">\
            <h5 class="modal-title" id="exampleModalCenterTitle">申報：</h5>\
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
            <span aria-hidden="true">&times;</span>\
          </button>\
        </div>\
        <div class="modal-body" style="padding:1em;">\
            <textarea class="report"></textarea>\
        </div>\
        <div class="modal-footer">\
            <button type="button" class="btn btn-danger">提交</button>\
        </div>\
    </div>\
</div>\
</div>\
<div class="modal fade" id="aboutUsDiv" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\
<div class="modal-dialog modal-dialog-centered" role="document">\
    <div class="modal-content">\
        <div class="modal-header">\
            <h5 class="modal-title" id="exampleModalCenterTitle">關於我們：</h5>\
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
            <span aria-hidden="true">&times;</span>\
          </button>\
        </div>\
        <div class="modal-body" style="padding:1em;">\
            我們每週五會推薦給大家四種不一樣的藝文創作，分別為電影、音樂、展覽、書籍類型，希望大家可以好好享受藝文作品所帶來的感動。 </div>\
    </div>\
</div>\
</div>\ ';

document.write(header);