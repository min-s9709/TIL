// 참가 신청 명단 프로그램 만들기

var btn = document.querySelector("button");
btn.addEventListener("click",newRegister);

function newRegister(e){
    e.preventDefault();
    var newP = document.createElement("p");
    var userName = document.querySelector("#userName");
    var newText = document.createTextNode(userName.value);
    newP.appendChild(newText);

    var delBttn = document.createElement("span");
    var delText = document.createTextNode("X");
    delBttn.setAttribute("class", "del");
    delBttn.appendChild(delText);
    newP.appendChild(delBttn);
    var nameList = document.querySelector("#nameList");
    nameList.insertBefore(newP, nameList.childNodes[0]); // 새로운 p 요소를 맨 앞에 추가하기
    //nameList.appendChild(newP);
    userName.value = "";

    var removeBttns = document.querySelectorAll(".del");
    for(let i=0; i<removeBttns.length; i++){
        removeBttns[i].addEventListener("click", function(){
            if(this.parentNode.parentNode)
                this.parentNode.parentNode.removeChild(this.parentNode);
        });
    }
}
