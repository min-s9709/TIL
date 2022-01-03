// 여러 이벤트 처리기 연결하기

var coverImage = document.querySelector("#cover");
coverImage.onclick = function(){
    alert('눌렀습니다.');
};

coverImage.onmouseover = function(){
    coverImage.style.border="5px black solid";
};

coverImage.onmouseout = function(){
    coverImage.style.border = "";
}