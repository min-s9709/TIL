function calc(){
    var currentYear=2021; // 올해 연도를 저장할 변수
    var birthYear= prompt("태어난 연도를 입력하세요. ", "YYYY");   // 태어날 연도를 저장할 변수
    var age;        // 계산한 나이를 저장할 변수
    age = currentYear - birthYear +1;
    document.querySelector('#result').innerHTML="당신의 나이는 " + age + "세입니다.";
}
