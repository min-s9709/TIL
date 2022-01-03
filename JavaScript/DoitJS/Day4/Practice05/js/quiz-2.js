let num1 = parseInt(prompt("비교할 첫 번째 숫자:"));
let num2 = parseInt(prompt("비교할 두 번째 숫자:"));

function compareNum(a,b){
    if(a>b){
        alert(`${a}(이)가 ${b}보다 큽니다.`);
    }
    else if(a===b){
        alert(`${a}와(과) ${b}가 같습니다.`);
    }
    else{
        alert(`${b}(이)가 ${a}보다 큽니다.`);
    }
}

compareNum(num1,num2);