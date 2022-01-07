// 선택한 상품 이미지 표시하기
var bigPic = document.querySelector("#cup");
var smallPics = document.querySelectorAll(".small");

for(var i=0; i<smallPics.length; i++){
    smallPics[i].onclick= showBig;
}

function showBig(){
    var newPic = this.src; // click 이벤트가 발생한 대상의 src 속성 값 가져옴.
    bigPic.setAttribute("src", newPic); // newPic 값을 큰 이미지의 src 속성에 할당.
}