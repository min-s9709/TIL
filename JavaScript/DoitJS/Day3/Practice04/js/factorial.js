var n = prompt("숫자를 입력하세요.");
var nFact=1;  // 1을 기본값으로 지정
var i=2;      // 1!은 1이므로 i=2부터 시작

while(i <= n){
    nFact *= i;
    i++;
}

document.write(`${n}! = ${nFact}`);
