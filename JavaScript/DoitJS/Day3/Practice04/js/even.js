// 짝수 더하기 프로그램 만들기.

var n = 10;
var sum = 0;

for (var i = 1; i<=n; i++){
    if(i % 2 == 1){
        continue;
    }
    sum += i;
    document.write(`${i}------${sum}<br>`);
}