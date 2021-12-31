var num = prompt("숫자를 입력하시오.");
if(num != null){
    if (num % 2 ==0) {
        document.write(`<h3>${num}은 짝수 입니다.</h3>`);
    }
    else{
        document.write(`<h3>${num}은 홀수 입니다.</h3>`);
    }
}
