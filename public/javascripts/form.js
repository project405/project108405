$(window).load(function() {
    styleselect();
})

// function styleselect() {

//     if (document.getElementById('inputState').value == "1") {
//         $("#infoForm").html('名稱：<input type="text" placeholder="電影名稱"><br>上映日期：<input type="date"><br>評分一：<input type="text" placeholder="第一平台評分"><br>評分二：<input type="text" placeholder="第二平台評分"><br>導演：<input type="text" placeholder="導演"><br>演員：<input type="text" placeholder="演員"><br>分級：<select col-sm-3"><option value="1">普遍級</option><option value="2">保護級</option><option value="3">輔導級</option><option value="4">限制級</option></select><br>發布日期：<input type="date">');
//     }
//     if (document.getElementById('inputState').value == "2") {
//         $("#infoForm").html('歌名：<input type="text" placeholder="歌名"><br>歌詞：<input type="text" placeholder="歌詞"><br>歌手：<input type="text" placeholder="歌手"><br>專輯：<input type="text" placeholder="專輯"><br>發布日期：<input type="date">');
//     }

//     if (document.getElementById('inputState').value == "3") {
//         $("#infoForm").html('名稱：<input type="text" placeholder="主題名稱"><br>創作者：<input type="text" placeholder="創作者"><br>單位：<input type="text" placeholder="主辦單位"><br>地點：<input type="text" placeholder="地點"><p>價格：<textarea type="text" placeholder="價格資訊"></textarea></p>開始日：<input type=datetime-local><br>截止日：<input type=datetime-local><br>發布日期：<input type="date">');

//     }

//     if (document.getElementById('inputState').value == "4") {
//         $("#infoForm").html('ISBN：<input type="text" placeholder="ISBN"><br>書名：<input type="text" placeholder="書名"><br>作者：<input type="text" placeholder="作者"><br>書評一：<input type="text" placeholder="第一平台書評"><br>書評二：<input type="text" placeholder="第二平台書評"><br>出版社：<input type="text" placeholder="出版社"><br>發布日期：<input type="date">');

//     }

// }

function styleselect() {
    if (document.getElementById('inputState').value == "movie") {
        $("#infoForm").html('名稱：<input type="text" placeholder="電影名稱"><br>上映日期：<input type="date"><br>導演：<input type="text" placeholder="導演"><br>演員：<input type="text" placeholder="演員"><br>分級：<select col-sm-3"><option value="1">普遍級</option><option value="2">保護級</option><option value="3">輔導級</option><option value="4">限制級</option></select><br>發布日期：<input type="date">');
    }
    if (document.getElementById('inputState').value == "music") {
        $("#infoForm").html('歌名：<input type="text" placeholder="歌名"><br>歌詞：<input type="text" placeholder="歌詞"><br>歌手：<input type="text" placeholder="歌手"><br>專輯：<input type="text" placeholder="專輯"><br>發布日期：<input type="date">');
    }

    if (document.getElementById('inputState').value == "exhibition") {
        $("#infoForm").html('名稱：<input type="text" placeholder="主題名稱"><br>創作者：<input type="text" placeholder="創作者"><br>單位：<input type="text" placeholder="主辦單位"><br>地點：<input type="text" placeholder="地點"><p>價格：<textarea type="text" placeholder="價格資訊"></textarea></p>開始日：<input type=datetime-local><br>截止日：<input type=datetime-local><br>發布日期：<input type="date">');

    }

    if (document.getElementById('inputState').value == "book") {
        $("#infoForm").html('ISBN：<input type="text" placeholder="ISBN"><br>書名：<input type="text" placeholder="書名"><br>作者：<input type="text" placeholder="作者"><br>出版社：<input type="text" placeholder="出版社"><br>發布日期：<input type="date">');

    }

}