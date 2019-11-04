var check = [];

function idValidateForm() {
    var id = document.getElementById("ID").value;
    var exception = /^[A-Za-z0-9_]+$/;

    if (id != "" && id.length > 7 && exception.test(id) && id.search(/^[A-Za-z]+$/) && id.search(/^[0-9]+$/)) {
        document.getElementById("idAlarm").innerHTML = '';
        return check[0] = true;
    } else {
        document.getElementById("idAlarm").innerHTML = '<i class="fas fa-exclamation-circle alarm"></i> 英數混合 8 字元以上，符號只允許 _ 底線。';
        return check[0] = false;

    }

}

function closeIdValidateForm() {
    var closeId = document.getElementById("closeId").value;
    if (closeId != "" && closeId.length > 2 && closeId.length < 13) {
        document.getElementById("closeIdAlarm").innerHTML = '';
        return check[1] = true;

    } else {
        document.getElementById("closeIdAlarm").innerHTML = '<i class="fas fa-exclamation-circle alarm"></i> 暱稱須在 3-12 字內';
        return check[1] = false;
    }
}

function passcheck() {
    passwordValidateForm();
    checkPasswordValidateForm();
}

function passwordValidateForm() {
    var password = document.getElementById("password").value;
    if (password != "" && password.length > 7 && password.length < 40) {
        document.getElementById("passwordAlarm").innerHTML = '';
        return check[2] = true;

    } else {
        document.getElementById("passwordAlarm").innerHTML = '<i class="fas fa-exclamation-circle alarm"></i> 密碼至少 8 字元';
        return check[2] = false;
    }
}

function checkPasswordValidateForm() {
    var checkPassword = document.getElementById("checkPassword").value;
    var password = document.getElementById("password").value;


    if (checkPassword != password) {
        document.getElementById("checkPasswordAlarm").innerHTML = '<i class="fas fa-exclamation-circle alarm"></i> 密碼欄位與確認密碼欄位不相同';
        return check[3] = false;

    } else {
        document.getElementById("checkPasswordAlarm").innerHTML = '';
        return check[3] = true;
    }

}

function birthdayValidateForm() {

    // 生日
    var birthday = document.getElementById("birthday").value;
    var stringBirthday = "";
    normallizeBirthday = Array.from(birthday.split("-"));
    birthYear = parseInt(normallizeBirthday[0]) * 365
    birthMonth = (parseInt(normallizeBirthday[1]) - 1) * 30
    birthdate = parseInt(normallizeBirthday[2])
    allbirth = birthYear + birthMonth + birthdate

    // 現在時間
    var currentTime = new Date();
    var year = currentTime.getFullYear() * 365;
    var month = (currentTime.getMonth() - 1) * 30;
    var date = currentTime.getDate();
    currentDate = year + month + date;

    var age = (currentDate - allbirth) / 365;


    if (age > 5 && age < 91) {
        document.getElementById("birthdayAlarm").innerHTML = '';
        return check[4] = true;
    } else {
        document.getElementById("birthdayAlarm").innerHTML = '<i class="fas fa-exclamation-circle alarm"></i> 請輸入正確生日';
        return check[4] = false;
    }
}

function checkValue() {
    var checkStep = 0;
    idValidateForm();
    closeIdValidateForm();
    passcheck();
    birthdayValidateForm();

    for (i = 0; i < check.length; i++) {
        if (check[i] == true) {
            checkStep = checkStep + 1;
        } else {
            alert('你的資料不完整')
            break;
        }
    };
    if (checkStep == 5) {
        document.getElementById("signupform").submit();
    }
}