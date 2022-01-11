// quiz1

var myText = document.querySelector("#myText");
myText.addEventListener("click",changeText);

function changeText(){
    myText.style.fontSize = "20px";
    myText.style.color = "blue";
    myText.style.backgroundColor="#ccc";
}