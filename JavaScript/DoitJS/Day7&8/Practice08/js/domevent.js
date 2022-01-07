// addEventListener() 함수로 여러 이벤트를 한번에 처리하기

var pic = document.querySelector('#pic');
pic.addEventListener("mouseover", changePic);
pic.addEventListener("mouseout", originPic);

function changePic(){
    pic.src="images/boy.png";
}

function originPic(){
    pic.src="images/girl.png";
}