(function(factory) {    
    if (typeof define === "function" && define.amd) { define(["jquery", "../jquery.validate"], factory); } else {
        factory(jQuery);    
    }

}(function($) {

    /*
     * Translated default messages for the jQuery validation plugin.
     * Locale: ZH (Chinese, 中文 (Zhōngwén), 漢語, 漢語)
     */
    $.extend($.validator.messages, {    
        required: "這是必填字段",
            remote: "請修正此字段",
            email: "請輸入有效的電子郵件地址",
            url: "請輸入有效的網址",
            date: "請輸入有效的日期",
            dateISO: "請輸入有效的日期 (YYYY-MM-DD)",
            number: "請輸入有效的數字",
            digits: "只能輸入數字",
            creditcard: "請輸入有效的信用卡號碼",
            equalTo: "你的輸入不相同",
            extension: "請輸入有效的後綴",
            maxlength: $.validator.format("最多可以輸入 {0} 個字符"),
            minlength: $.validator.format("最少要輸入 {0} 個字符"),
            rangelength: $.validator.format("請輸入長度在 {0} 到 {1} 之間的字符串"),
            range: $.validator.format("請輸入範圍在 {0} 到 {1} 之間的數值"),
            max: $.validator.format("請輸入不大於 {0} 的數值"),
            min: $.validator.format("請輸入不小於 {0} 的數值")
    });

}));