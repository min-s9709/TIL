# Day4 - 제어문

## 조건연산자 - ?(물음표)와 :(콜론)

만약 조건이 하나이고 true일 때와 false일 때 실행할 명령도 하나뿐이라면 조건 연산자를 사용하는 것이 간단하다. 조건연산자는 기호 ?와 기호 :으로 이루어져 있다.

조건 연산자를 사용할 때는 ? 왼쪽에 조건을 넣는다. 그리고 : 왼쪽에는 조건이 true일 때 실행할 명령을 넣고 : 오른쪽에는 조건이 false일 때 실행할 명령을 넣는다.

```javascript
var score = 75;
(score >= 60) ? alert("통과") : alert("실패"); // "통과"
```

## truthy 값과 falsy 값

논리형 자료 값은 true와 false 뿐이다. 하지만 일반 값 중에서도 'true로 인정할 수 있는 값' 과 'false로 인정할 수 있는 값'이 있다. 이 값을 'truthy하다', 'falsy'하다 라고 표현한다. 

다음은 자바스크립트에서 falsy하게 인정하는 값이다. 이를 제외한 나머지 값은 자바스크립트에서 true로 인정하는 값이 된다.

1. 0
2. "" (빈 문자열)
3. NaN
4. undefined
5. null

truthy 값과 falsy 값은 조건을 확인할 때 유용하게 사용할 수 있다. 다음은 사용자가 프롬프트 창에 입력했는지를 확인 하는 소스이다. 

```javascript
var input = prompt("이름을 입력하세요.");
if(input) {                                    // input에 값이 들어 있으면 truthy 함. (true와 동일)
    alert("이름을 입력했습니다 : " + input);
}
else {                                        // input에 값이 들어 있지 않으면 falsy하다.(false와 동일)
    alert("이름을 입력하지 않았습니다.")
}
```

## for ... of문

for문을 사용한 반복은 인덱스 값을 기준으로 반복하지만 ES6에는 인덱스는 사용하지 않고 값을 기준으로 반복한다.

예를 들어 for...of 문을 사용해 3개 값이 있는 배열을 순회한다면 값이 끝날 때까지 차례로 반복한다. 여러 값을 차례로 순회할 때 인덱스 값이 필요 없다면 ES6에서는 for ... of문을 사용한다.

```javascript
let seasons = ["봄", "여름", "가을", "겨울"];
for (let value of seasons){
    console.log(value);
}
// 봄 여름 가을 겨울
```

## do ... while문

do...while문은 일단 문장을 한 번 실행한 후 조건을 확인한다. 그러므로 조건의 결괏값이 false라고 해도 일단 문장이 최소한 한 번은 실행된다.

```javascript
var i = 0;
do{
    document.write('반복 조건이 true이면 반복합니다. <br>');
    i += 1;
} while(i<10);
```

## break문

```javascript
for (var i = 0; i<10; i++){
    document.write("*");
    break;  // break를 만나게 되면 바로 반복문을 종료.
}
```

위 프로그램을 실행하면 별 문자 1개만 출력한다.for문을 시작하고 document.write()함수를 실행한 다음 바로 break문을 만나서 반복문이 종료된다.

## continue문

```javascript
for (var i = 0; i<10; i++) {
    document.write("*");
    continue;
    document.write("continue문 때문에 이 문장은 건너뜁니다.");
}
```

continue문은 주어진 조건에 맞는 값을 만났을 때 실행하던 반복 문장을 건너뛰고 반복문의 맨앞으로 되돌아가고 다시 반복을 시작한다. 

## QUIZ

1. 사용자가 입력한 숫자를 받아 짝수인지 홀수인지 구분하는 프로그램을 작성하세요.
2. 1부터 100까지 숫자 중 3의 배수를 모두 표시하고 몇 개인지 개수도 함께 알려 주는 프로그램을 작성하세요.
