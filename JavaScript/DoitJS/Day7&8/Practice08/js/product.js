// [상세 설명 보기/닫기] 버튼 만들기
/*
사용자가 상세 설명 보기 링크를 누르면 상세 설명 내용이 표시되고, 
상세 설명 닫기 링크를 누르면 표시된 내용이 사라진다.
*/
var bigPic = document.querySelector("#cup");  
var smallPics = document.querySelectorAll(".small");  

for(i=0; i<smallPics.length; i++) {
    smallPics[i].addEventListener("click", function() {
        newPic = this.src;
        bigPic.setAttribute("src", newPic);
    });
}

var view = document.querySelector("#view");
var isOpen=false;
view.addEventListener("click", function(){
    if(isOpen === false){
        document.querySelector("#detail").style.display = "block";
        view.innerText = "상세설명 닫기";
        isOpen = true;
    }
    else{
        document.querySelector("#detail").style.display="none";
        view.innerText = "상세설명 보기";
        isOpen = false;
    }
});