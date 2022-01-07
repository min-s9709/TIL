# 웹 문서를 다루는 방법, 문서 객체 모델(DOM)

## 문서 객체 모델이란?

자바스크립트를 사용해 웹 문서의 텍스트나 이미지 등의 요소를 제어하기 위해서는 **문서 객체 모델**을 이해해야한다.

#### 문서 객체 모델의 정의

**DOM이란 웹 문서의 모든 요소를 자바스크립트를 이용하여 조작할 수 있도록 객체를 사용해 문서를 해석하는 방법이다.**

document는 웹 문서 자체를 가리키는 DOM 요소 중 하나이다. 콘솔 창에 document를 입력한 다음 결괏값을 살펴보자 결괏괎을 펼쳐보면 웹 문서의 소스가 그대로 들어있다. 이처럼 document를 사용하면 자바스크립트 웹 문서의 소스 전부를 인식할 수 있기 때문에 수정도 할 수 있는 것이다. 이렇듯 document는 수 많은 DOM 요소 중 하나이다.

#### DOM 트리 - DOM 구조는 나무처럼 생겼다

자바스크립트로 DOM을 조작하기 위해서는 실제 웹 문서가 DOM으로 어떻게 표현되는지 알아야한다. DOM은 웹 문서의 요소를 부모 요소와 자식 요소로 구분한다. 다음은 아주 간단한 웹 문서이다.

```html
<body>
    <h1>제목</h1>
    <p>본문</p>
</body>
```

여기서 DOM은 body를 h1, p의 부모 요소로, h1,p를 body의 자식 요소로 이해하고 구조화 한다. 

DOM 트리는 가지와 노드로 표현한다. 노드는 웹 문서에 있는 요소나 속성을 나타낸다. 가지는 노드와 노드 사이의 연결 관계를 나타낸다. 그러나, DOM 트리는 웹 문서의 HTML 요소만 표현하지 않는다. HTML의 요소가 품고 있는 텍스트, 이미지도 자식으로 간주하여 DOM 트리에 표현한다. 

DOM 트리는웹 문서 요소를 다음과 같이 표현한다.

- 웹 문서의 태그는 요소(Element) 노드로 표현한다.
- 태그가 품고 있는 텍스트는 해당 요소 노드(태그)의 자식 노드인 텍스트(Text) 노드로 표현한다.
- 태그의 속성은 모두 해당 요소 노드(태그)의 자식 노드인 속성(Attribute) 노드로 표현한다.
- 주석은 주석(Comment) 노드로 표현한다.

이렇게 웹 문서를 놓고 DOM 트리를 상상하면 자바스크립트로 원하는 요소에 어떻게 접근할지 쉽게 생각할 수 있다.

## DOM 요소에 접근하기

#### DOM 요소에 접근하는 여러 가지 방법

CSS에는 선택자(Selector) 개념이 있다. HTML 요소의 스타일을 선택하여 수정할 때 CSS 선택자를 사용한다. 자바스크립트로 DOM 요소에 접근할 때도 주로 선택자를 사용한다. 

##### -DOM 요소를 id 선택자로 접근하는 함수 - getElementById()

id 속성 값은 한 문서 안에서 유일하기 때문에 자주 사용한다. DOM 요소에 접근할 때에도 마찬가지 방법을 사용한다. 그리고 id 선택자를 사용해서 DOM 요소에 접근하는 함수가 바로 getElementById() 함수이다. 접근한 요소에 텍스트가 있다면 자바스크립트를 사용해 글자 색이나 크기 등 스타일을 수정할 수 있다.

##### -DOM 요소를 class 값으로 찾아내는 함수 - getElementsByClassName()

class 속성 값을 사용하여 DOM 요소에 접근하려면 getElementsByClassName() 함수를 사용한다. 그런데 이 함수의 이름을 자세히보면 By 단어 앞에 복수를 뜻하는 's'가 붙어있다.

CSS에서 class 선택자는 id 선택자와 다르게 웹 문서 안에서 여러 번 사용할 수 있다. 그래서 getElementsByClassName() 함수는 2개 이상의 웹 요소에 접근한다. 그런데 getElementsByClassName() 함수로 접근한 DOM 요소중 1개의 요소에만 접근하고 싶을 수도 있다. 배열의 인덱스를 사용하면 원하는 요소를 가져올 수 있는 것처럼 원하는 요소에 접근이 가능하다.

##### -DOM 요소를 태그 이름으로 찾아내는 함수 - getElementsByTagName()

id나 class 선택자가 없는 DOM 요소를 접근할 경우 getElementsByTagName() 함수를 사용하여 태그 이름 찾아 DOM 요소에 접근하면 된다. 이 함수의 이름에도 's' 가 붙어 있다. 즉, 이 함수도 여러 DOM 요소를 모두 찾아 접근한다.

##### -DOM 요소를 다양한 방법으로 찾아주는 함수 - querySelector(), querySelectorAll()

이번에는 id, class 값을 사용해도 되고 태그 이름을 사용해도 되는 querySelector() 함수와 querySelectorAll() 함수에 대해 알아보자. 두 함수는 접근하는 DOM 요소 개수에만 차이가 있을 뿐 사용 방법은 같다.

두 함수는 id, class 값을 사용해도 되고 태그 이름을 사용해도 됩니다. 그러면 id와 class는 어떻게 입력해야할까? CSS 선택자를 사용하는 방법을 그대로 사용하면 된다. 즉 class 값 앞에는 마침표(.)를, id 값 앞에는 샵(#)을 붙인다. 태그 이름은 기호 없이 태그 이름만 사용하면 된다.

다음은 getElementById() 함수와 querySelector() 함수로 id 값을 사용하요 DOM 요소에 접근하는 방법을 비교한 것이다.

```javascript
document.getElementById("heading");
document.querySelector("#container");
```

- getElementById() 함수와 querySelector() 함수의 차이

  getElementById() 함수는 단순히 id 선택자를 사용해서 요소에 접근하지만 querySelector() 함수를 사용하면 id 선택자뿐만 아니라 querySelector("#container>ul")처럼 둘 이상의 선택자를 사용해서 요소에 접근할 수 있다.

## 웹 요소의 태그 속성 가져와서 수정

#### HTML 속성을 가져오거나 수정하는 함수 - getAttribute(), setAttribute()

예를들어, 선택한 상품 이미지를 특정 위치에 표시하는 프로그램을 생각해보자. 다르게 말해 선택한 상품 이미지에 맞게 특정 위치의 이미지를 변경하는 프로그램이다. 이러한 기능을 어떻게 구현을 해야할지 생각해보면

1. 작은 이미지의 src 속성에 접근해서 값을 알아낸다.
2. 큰 이미지의 src 속성에 작은 이미지의 src 값으로 변경한다.

이미지 요소에 접근하는 것은 앞에서 살펴본 querySelector() 함수를 사용하면 된다. 그리고 속성에 접근하려면 getAttribute() 함수를 사용하고, 접근한 속성의 값을 바꾸려면 setAttribute() 함수를 사용한다.

HTML 태그의 속성 값을 바꾸고 싶다면 setAttribute() 함수를 사용하고, 괄호 안에 속성 이름과 속성값을 넣으면 된다. 이때 지정한 속성이 아직 없다면 새로 속성과 속성 값을 추가하고, 지정한 속성이 있다면 괄호 안에 넣은 속성 값으로 수정한다.

## DOM에서 이벤트 처리하기

#### 이벤트 처리 방법 복습하기 

##### -HTML 태그 안에서 이벤트 처리기 연결하기

이벤트가 발생하는 HTML 태그 안에 직접 이벤트 처리기를 추가하는 방법이다. 예를 들어 이미지를 눌렀을 때 다른 이미지로 바꿔 주는 chnagePic() 함수를 미리 선언했다면 이미지 태그 안에 다음과 같이 실행할 함수를 연결할 수 있다. 

```javascript
<div id="container">
		<img id="pic" src="images/girl.png" alt="" onclick="changePic()"> // 클릭하면 changePic() 함수 실행.
</div>
<script>		
		var pic = document.querySelector('#pic');
		function changePic() {			
			pic.src = "images/boy.png";
		}
</script>
```

이 방법은 HTML 태그와 자바스크립트 소스가 섞여 있는 형태라서 중간에 이벤트를 바꾼다거나 연결 함수를 바꾸려면 HTML 소스를 수정해야한다. HTML 소스가 길지 않아서 쉽게 확인이 가능할 때 사용할 수 있다. 이 방법은 하나의 요소에 하나의 이벤트 처리기만 사용할 수 있다.

##### -DOM 요소에 이벤트 처리기 연결하기

이 방법은 이벤트가 발생한 웹 요소를 가져온 후 이벤트 처리기를 연결하는 방법이다. 앞에서 본 예제와 마찬가지로 이미지를 눌렀을 때 changePic() 함수를 실행하지만 그 과정에서 차이가 있다. 이벤트 처리기를 자바스크립트 소스에서 실행한다. 

```javascript
<div id="container">
		<img id="pic" src="images/girl.png" alt="">
</div>
<script>		
    var pic = document.querySelector('#pic');
    pic.onclick = changePic; // pic 요소를 누르면 changePic() 함수 실행
    
		function changePic() {			
			pic.src = "images/boy.png";
		}
</script>
```

이 방법은 HTML 태그와 뒤섞이지 않고 자바스크립트 소스를 사용한다는 점에서 좋지만, 역시 하나의 요소에 하나의 이벤트 처리기만 사용할 수 있다.

#### addEventListener() 함수로 여러 이벤트를 한번에 처리하기

지금까지 살펴 본 이벤트 처리기 연결 방법은 한 요소에 하나의 이벤트 처리기만 연결할 수 있었다. 한 요소에 여러 이벤트가 발생했을 때 이를 동시에 처리하려면 DOM의 **addEventListener() 함수**를 사용하면 된다. 

addEventListener() 함수는 이벤트가 발생한 요소에 이벤트 처리기를 연결해 주는 함수로, 웹 문서에서 이미지나 텍스트 등 특정 요소뿐만 아니라 Document 객체나 Window 객체 어디에서든 사용할 수 있다.