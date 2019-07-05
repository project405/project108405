var check = [];

function passcheck() {
    passwordValidateForm();
    checkPasswordValidateForm();
}

function passwordValidateForm() {
    var password = document.getElementById("password").value;
    if (password != "" && password.length > 7 && password.length < 40) {
        document.getElementById("passwordAlarm").innerHTML = '';
        return check[0] = true;

    } else {
        document.getElementById("passwordAlarm").innerHTML = '<i class="fas fa-exclamation-circle alarm"></i> 密碼至少 8 字元';
        return check[0] = false;
    }
}

function checkPasswordValidateForm() {
    var checkPassword = document.getElementById("checkPassword").value;
    var password = document.getElementById("password").value;

    if (checkPassword != password) {
        document.getElementById("checkPasswordAlarm").innerHTML = '<i class="fas fa-exclamation-circle alarm"></i> 確認密碼與密碼不相同';
        return check[1] = false;

    } else {
        document.getElementById("checkPasswordAlarm").innerHTML = '';
        return check[1] = true;
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
        return check[2] = true;
    } else {
        document.getElementById("birthdayAlarm").innerHTML = '<i class="fas fa-exclamation-circle alarm"></i> 請輸入正確生日';
        return check[2] = false;
    }
}

function checkValue() {
    var password = document.getElementById("password").value;
    var checkPassword = document.getElementById("checkPassword").value;

    if (password != "" || checkPassword != "checkPassword") {
        if (check[0] == false || check[1] == false) {
            document.getElementById("submit").disabled = true;
        } else {
            document.getElementById("submit").disabled = false;
        }
    }

    var birthday = document.getElementById("birthday").value;

    if (birthday != "") {
        if (check[2] == false) {
            document.getElementById("submit").disabled = true;

        } else {
            document.getElementById("submit").disabled = false;
        }
    }

}