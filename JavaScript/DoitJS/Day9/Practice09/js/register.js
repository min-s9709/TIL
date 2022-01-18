// 입력값 검증 프로그램 만들기

const userId = document.querySelector("#user-id");
const userPw1 = document.querySelector("#user-pw1");
const userPw2 = document.querySelector("#user-pw2");


function checkId(){
    if(userId.value.length < 4 || userId.value.length > 15){
        alert("4~15자리의 영문과 숫자를 사용하세요.");
        userId.select();
    }
}

function checkPw(){
    if(userPw1.value.length < 8){
        alert("비밀번호는 8자리 이상이어야 합니다.");
        userPw1.value = "";
        userPw1.focus();
    }
}

function comparePw(){
    if(userPw1.value !== userPw2.value){
        alert("암호가 다릅니다. 다시 입력하세요.");
        userPw2.value = "";
        userPw2.focus();
    }
}

userId.onchange = checkId;
userPw1.onchange = checkPw;
userPw2.onchange = comparePw;