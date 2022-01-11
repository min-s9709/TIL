// quiz2

var check = document.querySelectorAll(".check");
for(let i=0; i<check.length; i++){
    check[i].addEventListener("click", function(){
        this.parentNode.style.color="#ccc";
    });
}
