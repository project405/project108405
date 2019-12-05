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
                                <input type="text" class="navSearch" id="input_search" placeholder="搜尋"/>\
                                <button class="btn navSearch" onclick="byParamSearch()"><i class="fas fa-search"></i></button>\
                            </div>\
                            <li class="nav-item">\
                            <a class="nav-link" href="/recommendList/1">\
                                🥳專欄</a>\
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
                            <a class="nav-link" href="/post">\
                            <i class="fas fa-pen"></i>&nbsp;發文</a>\
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
                            <h5 class="modal-title" id="exampleModalCenterTitle">小幫手</h5>\
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                              </button>\
                        </div>\
                        <div class="modal-body" style="padding:0em;">\
                        <img src="/imgs/icon/aboutUS.png" alt="" style="width: 100%;"></div>\
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
                                <input type="text" class="navSearch" id="input_search" placeholder="搜尋"/>\
                                <button class="btn navSearch" onclick="byParamSearch()"><i class="fas fa-search"></i></button>\
                            </div>\
                            <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                管理者選項\
                            </a>\
                            <div class="dropdown-menu member dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" >\
                                <a class="dropdown-item" href="#/" onclick="reply()">Line推播</a>\
                                <a class="dropdown-item" href="/recommend/post/page">新增推薦</a>\
                                <a class="dropdown-item" href="#/" onclick="bestReply()">選出最佳留言</a>\
                                <a class="dropdown-item" href="/specialColumn/post/page">新增專欄</a>\
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
                            <a class="nav-link" href="/post">\
                            <i class="fas fa-pen"></i>&nbsp;發文</a>\
                            </li>\
                            <li class="nav-item dropdown">\
                                <a class="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    會員\
                                </a>\
                                <div class="dropdown-menu member dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" >\
                                    <a class="dropdown-item" href="/notify"><i class="fas fa-bell" style="color:white;"></i></a>\
                                    <a class="dropdown-item" href="/collection/recommend/1">推薦收藏</a>\
                                    <a class="dropdown-item" href="/collection/article/1">文章收藏</a>\
                                    <a class="dropdown-item" href="/member/articleManage/1">文章管理</a>\
                                    <a class="dropdown-item" href="/member/memberManage">會員資料修改</a>\
                                    <a class="dropdown-item" id="navReport" style="cursor:pointer;" data-toggle="modal" data-target="#report">申報</a>\
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
            </div>\ '
            reply = () => {
                $.post('https://project-108405-test.herokuapp.com/webhook', () => {
                }) 
                .done (() => {
                    alert('推播成功！');
                })
                .fail(() => {
                    alert('推播失敗！');
                })
            };
            bestReply = () => {
                $.post('/bestReply', () => {
                     
                }).done((res) =>{
                    var str = "上月最佳留言 \n";
                    for (var i = 0 ; i < res[1].length ; i++){
                        str += "留言編號:" + res[1][i].recomMessNum + "  使用者帳號為:" + res[1][i].memID + '\n' ; 
                    }

                    if(confirm(str)){
                        var recomHead = [] ; 
                        var memID = [] ; 
                        var result = [] ; 
                        for(var i = 0 ; i < res[0].length ; i++){
                            recomHead.push(res[0][i].recomHead);
                        }

                        for(var i = 0 ; i < res[1].length ; i++){
                            memID.push(res[1][i].memID);
                        }
                        result[0] = recomHead ;
                        result[1] = memID ; 

                        $.ajax({
                            url: "/notify",
                            type: 'POST',
                            dataType: 'TEXT',
                            data: {"recom" : JSON.stringify(recomHead), "member" : JSON.stringify(memID)},
                            success: function (res) {
                                alert(res); 
                            },
                            error: function (res) {
                                console.log("失敗", res);
                            }
                         }); 
                        
                    }else{
                        alert("取消寄出");
                    };
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
                            <input type="text" class="navSearch" id="input_search" placeholder="搜尋"/>\
                            <button class="btn navSearch" onclick="byParamSearch()"><i class="fas fa-search"></i></button>\
                        </div>\
                        <li class="nav-item">\
                            <a class="nav-link" href="/recommendList/1">\
                            官方推薦</a>\
                        </li>\
                        <li class="nav-item">\
                            <a class="nav-link" href="/articleList/1">\
                                討論區</a>\
                        </li>\
                        <li class="nav-item">\
                        <a class="nav-link" href="/post">\
                        <i class="fas fa-pen"></i>&nbsp;發文</a>\
                        </li>\
                        <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                會員\
                            </a>\
                            <div class="dropdown-menu member dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" >\
                                <a class="nav-link" href="/notify"><i class="fas fa-bell" style="color:white;"></i></a>\
                                <a class="dropdown-item" href="/collection/recommend/1">推薦收藏</a>\
                                <a class="dropdown-item" href="/collection/article/1">文章收藏</a>\
                                <a class="dropdown-item" href="/member/articleManage/1">文章管理</a>\
                                <a class="dropdown-item" href="/member/memberManage">會員資料修改</a>\
                                <a class="dropdown-item" id="navReport" style="cursor:pointer;" data-toggle="modal" data-target="#report">申報</a>\
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
                        <h5 class="modal-title" id="exampleModalCenterTitle">小幫手</h5>\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                            <span aria-hidden="true">&times;</span>\
                          </button>\
                    </div>\
                    <div class="modal-body" style="padding:0em;">\
                        <img src="/imgs/icon/aboutUS.png" alt="" style="width: 100%;"> </div>\
                </div>\
            </div>\
        </div>\ '
            }
        }
    });
});

function byParamSearch(){
    var params = $("#input_search").val() ;  
    var checkParams = params.replace(/&nbsp;/g, '').replace(/&ensp;/g, '').replace(/&emsp;/g, '').replace(/<br>/g, '').trim()
    if (checkParams == '') {
        return;
    }
    location.href='/search/' + params ;
    
}

