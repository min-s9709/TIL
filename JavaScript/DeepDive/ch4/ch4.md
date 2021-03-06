# 변수

## 4.1 변수란 무엇인가? 왜 필요한가?

변수는 프로그래밍 언어에서 데이터를 관리하기 위한 핵심 개념이다.

```javascript
10+20;
```

위 식을 자바스크립트 엔진이 코드를 계산하려면 먼저 10,20,+의 각각의 의미를 알고 있어야 하며 10+20이라는 식의 의미도 해석 할 수 있어야한다. 컴퓨터는 cpu를 통해 연산을 하고, 메모리를 사용해 데이터를 기억한다.

메모리는 데이터를 저장할 수 있는 메모리 셀의 집합체이다. 셀 하나의 크기는 1바이트이며 각 셀은 고유의 메모리 주소를 가진다. 컴퓨터는 모든 데이터를 2진수로 처리하기 때문에 따라서 메모리에 저장되는 데이터는 데이터의 종류와 상관없이 2진수로 저장된다.

위 식의 예제를 보면 10과 20은 메모리상의 임의의 위치에 기억되고 CPU는 이 값을 읽어 들여 연산을 수행한다.

하지만 위의 결과 값 30을 재사용 하기 위해서는 저장된 메모리 공간에 직접 접근해야한다. 그러나 이 방법은 옳바른 방법이 아니다.

**--> 따라서 프로그래밍 언어는 기억하고 싶은 값을 메모리에 저장하고, 저장된 값을 읽어들여 재사용하기 위해 변수라는 메커니즘을 제공한다.**

**변수란 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름이다. 이를 간단하게 말하면, 변수는 프로그래밍에서 값을 저장하고 참조하는 메커니즘으로, 값의 위치를 가리키는 상징적인 이름이다.**

```javascript
var result = 10 + 20;
```

10+20은 연산을 통해 새로운 값 30을 생성하고 연산을 통해 생성된 값 30은 메모리 공간에 저장된다. 이때 result 변수는 메모리 공간에 저장된 값 30을 다시 읽어 들여 재사용할 수 있도록 값이 저장된 메모리 공간에 상징적인 이름을 붙인 것이다.

**변수이름**: 메모리 공간에 저장된 값을 식별할 수 있는 고유한 이름. 사람을 위해 사람이 이해할 수 있는 언어로 값이 저장된 메모리 공간에 붙인 상징적인 이름이며, 변수를 이용해 참조를 요청하면 자바스크립트 엔진은 변수 이름과 매핑된 메모리 주소를 통해 메모리 공간에 접근해서 저장된 값을 반환.

**변수 값** : 변수에 저장된 값.

**할당**: 변수에 값을 저장하는 것.

**참조**: 변수에 저장된 값을 읽어 들이는 것.

## 4.2 식별자

변수 이름을 식별자라고도 한다. **식별자는 어떤 값을 구별해서 식별할 수 있는 고유한 이름을 말한다.**

식별자는 메모리 공간에 저장되어 있는 어떤 값을 구별해서 식별해 낼 수 있어야한다. 이를 위해 식별자는 어떤 값이 저장되어 있는 메모리 주소를 기억해야한다. 즉, 식별자는 값이 저장되 어있는 메모리 주소와 매핑관계를 맺으며, 이 매핑 정보도 메모리에 저장되어야 한다.

식별자라는 용어는 변수 이름에만 국한해서 사용하지 않으며, 변수, 함수, 클래스 등의 이름은 모두 식별자가 될 수 있다. 

이러한 변수, 함수, 클래스 등의 이름과 같은 식별자는 네이밍 규칙을 준수해야하며, 선언에 의해 자바스크립트 엔진에 식별자의 존재를 알린다.

## 4.3 변수 선언

**변수 선언이란 변수를 생성하는 것을 뜻한다.** 값을 저장하기 위한 메모리 공간을 확보하고 변수 이름과 확보된 메모리 공간의 주소를 연결해서 값을 저장할 수 있게 준비하는 것이다.

변수 선언을 위해서는 **var, let, const** 라는 키워드를 사용해야한다. 여기서 **키워드란 자바스크립트 코드를 해석하고 실행하는 자바스크립트 엔진이 수행할 동작을 규정한 일종의 명령어 이다.** 자바스크립트 엔진은 키워드를 만나면 자신이 수행해야할 동작을 수행한다.

```javascript
var score;
```

이 예제를 보면 변수 선언을 한 이후 변수에 값을 할당하지 않았따. 따라서 변수 선언에 의해 확보된 메모리 공간은 비어 있을 것이라고 생각할 수 있지만, 확보된 메모리 공간에는 자바스크립트 엔진에 의해 **undefined** 라는 값이 할당되어 초기화 된다.

**undefined: 자바스크립트에서 제공하는 원시 타입의 값**

자바스크립트 엔진은 변수 선언을 **(1)선언 단계 (2)초기화 단계** 를 거쳐 수행한다.

선언 단계에서는 변수 이름을 등록해서 자바스크립트 엔진에 변수의 존재를 알리고, 초기화 단계에서는 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 undefined를 할당해 초기화 한다. var키워드로 선언한 변수는 undefined로 암묵적인 초기화가 자동 수행 된다. 따라서 var 키워드로 선언한 변수는 어떠한 값도 할당하지 않아도 undefined라는 값을 갖는다.

**변수를 사용하려면 반드시 선언이 필요**하고 만약 선언되지 않은 식별자에 접근하면 **RefferenceError(참조 에러)**가 발생한다. 

**RefferenceError : 식별자를 통해 값을 참조하려 했지만 자바스크립트 엔진이 등록된 식별자를 찾을 수 없을 때 발생 하는 에러.**

## 4.4 변수 선언의 실행 시점과 변수 호이스팅

```javascript
console.log(score); // undefined
var score; // 변수 선언문
```

변수 선언문보다 변수를 참조하는 코드가 앞에 있지만 참조 에러가 발생하지 않고 undefined가 나타남.

이는 **변수 선언이 소스코드가 한 줄씩 순차적으로 실행되는 시점, 즉 런타임이 아니라 그 이전단계에서 먼저 실행되기 때문이다.** 

자바 스크립트 엔진은 소스코드를 한 줄 씩 순차적으로 실행하기에 앞서 먼저 소스코드의 평과가정을 거치면서 소스코드를 실행하기 위한 준비를 한다. 이때 소스코드 실행을 위한 준비 단계인 소스코드의 평가 과정에서 자바스크립트 엔진은 변수 선언을 포함한 모든 선언문을 소스코드에서 찾아내 먼저 실행한다. 그리고 소스코드의 평가 과정이 끝나면 비로소 변수 선언을 포함한 모든 선언문을 제외하고 소스코드를 한 줄씩 순차적으로 실행한다.

**변수 호이스팅 : 변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징이다.**

## 4.5 값의 할당

```javascript
var score; // 변수 선언
score = 80; // 값의 할당
```

변수 선언과 값의 할당의 실행 시점은 다르다. **변수 선언은 소스코드가 순차적으로 실행되는 시점인 런타임 이전에 먼저 실행되지만 값의 할당은 소스코드가 순차적으로 실행되는 시점인 런타임에 실행되기 때문이다.**

```javascript
console.log(score); //undefined

var score; // (1)변수 선언
score = 80; // (2)값의 할당
console.log(score); // 80
```

위의 예제를 보면 변수 선언은 런타임 이전에 실행되고 값의 할당은 런타임에 실행된다. 따라서 score 변수에 값을 할당하는 시점에는 이미 변수 선언이 완료된 상태이며, 이미 undefined로 초기화 되어 있다. 따라서 score 변수에 값을 할당하면 score 변수의 값은 undefined에서 새롭게 할당한 숫자 값 80으로 변경된다.

**변수에 값을 할당할 때는 이전 값 undefined가 저장되어 있던 메모리 공간을 지우고 그 메모리 공간에 할당 값 80을 새롭게 저장하는 것이 아니라 새로운 메모리 공간을 확보하고 그곳에 할당 값 80을 저장한다.**

## 4.6 값의 재할당

**재할당이란 이미 값이 할당되어 있는 변수에 새로운 값을 또 다시 할당하는 것이다.**

```javascript
var score = 80;
score = 90;
```

만약 값을 재할당할 수 없어서 변수에 저장된 값을 변경할 수 없다면 변수가 아니라 **상수**라 한다. 상수는 한번 정해지면 변하지 않는 값이며 단 한번만 할당할 수 있는 변수이다. (**const** 키워드를 이용하면 상수를 표현 가능.)

변수에 값을 재할당하면 score 변수의 값은 이전 값 80에서 재할당한 값 90으로 변경된다. 처음 값을 할당했을 때와 마찬가지로 이전 값 80이 저장되어 있던 메모리 공간을 지우고 그 메모리 공간에 재할당 값 90을 새롭게 저장하는 것이 아니라 새로운 메모리 공간을 확보하고 그 메모리 공간에 숫자 값 90을 저장한다. 기존의 undefined 값과 80이라는 값은 더 이상 불필요하며 **가비지 콜렉터**에 의해 메모리에서 자동 해제된다.
**가비지 콜렉터: 애플리케이션이 할당한 메모리 공간을 주기적으로 검사하여 더 이상 사용되지 않는 메모리를 해제하는 기능.**

## 4.7 식별자 네이밍 규칙

1. 식별자는 특수문자를 제외한 문자, 숫자, 언더스코어(_), 달러 기호($)를 포함 할 수 있다.
2. 단, 식별자는 특수 문자를 제외한 문자, 언더스코어(_), 달러 기호($)로 시작해야 한다. 숫자로 시작하는 것은 허용하지 않는다.
3. 예약어는 식별자로 사용할 수 없다.

자바스크립트에서는 일반적으로 변수나 함수의 이름에는 **카멜 케이스**를 사용하고  생성자 함수, 클래스의 이름에는 **파스칼 케이스**를 이용한다.

```javascript
var firstName; //카멜 케이스
var FirstName; //파스칼 케이스
```

