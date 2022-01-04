// 기념일 계산기 만들기 프로그램

var now = new Date();
var firstDay = new Date("2021-08-28T00:00:00");

var passedTime = now.getTime() - firstDay.getTime();
var passedDay = Math.round(passedTime/(1000*60*60*24));

document.querySelector('#accent').innerText = `${passedDay}일`;

function calcDate(days){
    var future = firstDay.getTime() + days * (1000*60*60*24);
    var someday = new Date(future);

    var year = someday.getFullYear();
    var month = someday.getMonth() +1;
    var date = someday.getDate();

    document.querySelector(`#date${days}`).innerText = `${year}년 ${month}월 ${date}일`; 

}

calcDate(100);
calcDate(200);
calcDate(365);
calcDate(500);