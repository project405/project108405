$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: '/checkStatus',
        success: function (data) {
            //data[0] = memID , data[1] = Authority
            //如果沒登入
            if (!data[0]) {
                document.getElementById('header').innerHTML = '\
                <nav id="nav" class="navbar navbar-expand-lg navbar-light fixed-top ">\
                    <a class="nav-link" href="/">\
                        <img class="nav-item" href="/" src="/imgs/logo.png" width="30px" height="30px " style="opacity:0.8" alt="">\
                        <a href="/" class="navTitle">文藝富心</a>\
                    </a>\
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\
                            <span class="navbar-toggler-icon"></span>\
                        </button>\
                    <div class="collapse navbar-collapse" id="navbarNav">\
                        <ul class="navbar-nav ml-auto">\
                            <div class="searchSection">\
                                <input type="text" class="navSearch" id="input_search" />\
                                <button class="btn navSearch" onclick="byParamSearch()"><i class="fas fa-search"></i></button>\
                            </div>\
                            <li class="nav-item">\
                                <a class="nav-link " href="/">首頁<span class="sr-only">(current)</span></a>\
                            </li>\
                            <li class="nav-item">\
                                <a class="nav-link" href="/recommendList/1">\
                                官方推薦</a>\
                            </li>\
                            <li class="nav-item">\
                                <a class="nav-link" href="/articleList/1">\
                                    討論區</a>\
                            </li>\
                            <li class="nav-item">\
                            <a class="nav-link" href="/articleList/post">\
                            <i class="fas fa-pen"></i>&nbsp;發文</a>\
                            </li>\
                            <li class="nav-item">\
                                <a class="nav-link" id="navReport" style="cursor:pointer;" data-toggle="modal" data-target="#report">申報</a>\
                            </li>\
                            <li class="nav-item">\
                                <a class="nav-link" href="/logIn">登入</a>\
                            </li>\
                            <li class="nav-item">\
                            <a class="helper" id="aboutUsButton" data-toggle="modal" data-target="#aboutUsDiv" style="cursor: pointer;">\
                            小幫手</a>\
                        </li>\
                        </ul>\
                    </div>\
                </nav>\
            <div class="modal fade" id="report" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\
                <div class="modal-dialog modal-dialog-centered" role="document">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <h5 class="modal-title" id="exampleModalCenterTitle">申報</h5>\
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                              </button>\
                        </div>\
                        <form action="/report" method="POST">\
                            <div class="modal-body" style="padding:1em;">\
                                <textarea class="report" name="reportReason" placeholder="輸入申報原因"></textarea>\
                            </div>\
                            <div class="modal-footer">\
                                <button type="submit" class="btn btn-danger">提交</button>\
                            </div>\
                        </form>\
                    </div>\
                </div>\
            </div>\
            <div class="modal fade" id="aboutUsDiv" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\
                <div class="modal-dialog modal-dialog-centered" role="document">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <h5 class="modal-title" id="exampleModalCenterTitle">關於我們</h5>\
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                              </button>\
                        </div>\
                        <div class="modal-body" style="padding:1em;">\
                            我們每週五會推薦給大家四種不一樣的藝文創作，分別為電影、音樂、展覽、書籍類型，希望大家可以好好享受藝文作品所帶來的感動。 </div>\
                    </div>\
                </div>\
            </div>\ '
                //如果有登入也有新增推薦權限
            } else if (data[0] && data[1]) {
                document.getElementById('header').innerHTML = '\
                <nav id="nav" class="navbar navbar-expand-lg navbar-light fixed-top ">\
                    <a class="nav-link" href="/">\
                        <img class="nav-item" href="/" src="/imgs/logo.png" width="30px" height="30px " style="opacity:0.8" alt="">\
                        <a href="/" class="navTitle">文藝富心</a>\
                    </a>\
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\
                            <span class="navbar-toggler-icon"></span>\
                        </button>\
                    <div class="collapse navbar-collapse" id="navbarNav">\
                        <ul class="navbar-nav ml-auto">\
                            <div class="searchSection">\
                                <input type="text" class="navSearch" id="input_search" />\
                                <button class="btn navSearch" onclick="byParamSearch()"><i class="fas fa-search"></i></button>\
                            </div>\
                            <li class="nav-item">\
                                <a class="nav-link " href="/">首頁<span class="sr-only">(current)</span></a>\
                            </li>\
                            <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                管理者選項\
                            </a>\
                            <div class="dropdown-menu member dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" >\
                                <a class="dropdown-item" href="#/" onclick="reply()">Line推播</a>\
                                <a class="dropdown-item" href="/recommend/post/page">新增推薦</a>\
                                <a class="dropdown-item" href="/member/articleManage">選出最佳留言</a>\
                            </div>\
                        </li>\
                        <li class="nav-item">\
                            <li class="nav-item">\
                                <a class="nav-link" href="/recommendList/1">\
                                官方推薦</a>\
                            </li>\
                            <li class="nav-item">\
                                <a class="nav-link" href="/articleList/1">\
                                    討論區</a>\
                            </li>\
                            <li class="nav-item">\
                            <a class="nav-link" href="/articleList/post">\
                            <i class="fas fa-pen"></i>&nbsp;發文</a>\
                            </li>\
                            <li class="nav-item dropdown">\
                                <a class="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    會員\
                                </a>\
                                <div class="dropdown-menu member dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" >\
                                    <a class="dropdown-item" href="/notify"><i class="fas fa-bell" style="color:white;"></i></a>\
                                    <a class="dropdown-item" href="/collection/recommend">推薦收藏</a>\
                                    <a class="dropdown-item" href="/collection/article">文章收藏</a>\
                                    <a class="dropdown-item" href="/member/articleManage/1">文章管理</a>\
                                    <a class="dropdown-item" href="/member/memberManage">會員資料修改</a>\
                                    <a class="dropdown-item" href="/user/logout">登出</a>\
                                </div>\
                            </li>\
                            <li class="nav-item">\
                        </li>\
                        </ul>\
                    </div>\
                </nav>\
            <div class="modal fade" id="report" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\
                <div class="modal-dialog modal-dialog-centered" role="document">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <h5 class="modal-title" id="exampleModalCenterTitle">申報</h5>\
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                              </button>\
                        </div>\
                        <form action="/report" method="POST">\
                            <div class="modal-body" style="padding:1em;">\
                                <textarea class="report" name="reportReason" placeholder="輸入申報原因"></textarea>\
                            </div>\
                            <div class="modal-footer">\
                                <button type="submit" class="btn btn-danger">提交</button>\
                            </div>\
                        </form>\
                    </div>\
                </div>\
            </div>\
            <div class="modal fade" id="aboutUsDiv" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\
                <div class="modal-dialog modal-dialog-centered" role="document">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <h5 class="modal-title" id="exampleModalCenterTitle">關於我們</h5>\
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                              </button>\
                        </div>\
                        <div class="modal-body" style="padding:1em;">\
                            我們每週五會推薦給大家四種不一樣的藝文創作，分別為電影、音樂、展覽、書籍類型，希望大家可以好好享受藝文作品所帶來的感動。 </div>\
                    </div>\
                </div>\
            </div>\ '
            reply = () => {
                $.post('https://project-108405-test.herokuapp.com/webhook', () => {
                }) 
                .done (() => {
                    swal('推播成功！');
                })
                .fail(() => {
                    swal('推播失敗！');
                })
            };
                //如果有登入可是沒推薦權限
            } else if (data[0] && !data[1]) {
                document.getElementById('header').innerHTML = '\
            <nav id="nav" class="navbar navbar-expand-lg navbar-light fixed-top ">\
                <a class="nav-link" href="/">\
                    <img class="nav-item" href="/" src="/imgs/logo.png" width="30px" height="30px " style="opacity:0.8" alt="">\
                    <a href="/" class="navTitle">文藝富心</a>\
                </a>\
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\
                        <span class="navbar-toggler-icon"></span>\
                    </button>\
                <div class="collapse navbar-collapse" id="navbarNav">\
                    <ul class="navbar-nav ml-auto">\
                        <div class="searchSection">\
                            <input type="text" class="navSearch" id="input_search" />\
                            <button class="btn navSearch" onclick="byParamSearch()"><i class="fas fa-search"></i></button>\
                        </div>\
                        <li class="nav-item">\
                            <a class="nav-link " href="/">首頁<span class="sr-only">(current)</span></a>\
                        </li>\
                        <li class="nav-item">\
                            <a class="nav-link" href="/recommendList/1">\
                            官方推薦</a>\
                        </li>\
                        <li class="nav-item">\
                            <a class="nav-link" href="/articleList/1">\
                                討論區</a>\
                        </li>\
                        <li class="nav-item">\
                        <a class="nav-link" href="/articleList/post">\
                        <i class="fas fa-pen"></i>&nbsp;發文</a>\
                        </li>\
                        <li class="nav-item">\
                            <a class="nav-link" id="navReport" style="cursor:pointer;" data-toggle="modal" data-target="#report">申報</a>\
                        </li>\
                        <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                會員\
                            </a>\
                            <div class="dropdown-menu member dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" >\
                                <a class="nav-link" href="/notify"><i class="fas fa-bell" style="color:white;"></i></a>\
                                <a class="dropdown-item" href="/collection/recommend">推薦收藏</a>\
                                <a class="dropdown-item" href="/collection/article">文章收藏</a>\
                                <a class="dropdown-item" href="/member/articleManage/1">文章管理</a>\
                                <a class="dropdown-item" href="/member/memberManage">會員資料修改</a>\
                                <a class="dropdown-item" href="/user/logout">登出</a>\
                            </div>\
                        </li>\
                        <li class="nav-item">\
                        <a class="helper" id="aboutUsButton" data-toggle="modal" data-target="#aboutUsDiv" style="cursor: pointer;">\
                        小幫手</a>\
                    </li>\
                    </ul>\
                </div>\
            </nav>\
        <div class="modal fade" id="report" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\
            <div class="modal-dialog modal-dialog-centered" role="document">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <h5 class="modal-title" id="exampleModalCenterTitle">申報</h5>\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                            <span aria-hidden="true">&times;</span>\
                          </button>\
                    </div>\
                    <form action="/report" method="POST">\
                        <div class="modal-body" style="padding:1em;">\
                            <textarea class="report" name="reportReason" placeholder="輸入申報原因"></textarea>\
                        </div>\
                        <div class="modal-footer">\
                            <button type="submit" class="btn btn-danger">提交</button>\
                        </div>\
                    </form>\
                </div>\
            </div>\
        </div>\
        <div class="modal fade" id="aboutUsDiv" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\
            <div class="modal-dialog modal-dialog-centered" role="document">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <h5 class="modal-title" id="exampleModalCenterTitle">關於我們</h5>\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                            <span aria-hidden="true">&times;</span>\
                          </button>\
                    </div>\
                    <div class="modal-body" style="padding:1em;">\
                        我們每週五會推薦給大家四種不一樣的藝文創作，分別為電影、音樂、展覽、書籍類型，希望大家可以好好享受藝文作品所帶來的感動。 </div>\
                </div>\
            </div>\
        </div>\ '
            }
        }
    });
});

function byParamSearch(){
    var params = $("#input_search").val() ;  
    location.href='/search/' + params ;
}