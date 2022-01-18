// quiz1

const checkBx = document.querySelectorAll(".checkbx");
const totalBox = document.querySelector(".price");
let price = 24000;

for(let i=0; i<checkBx.length; i++){
    checkBx[i].onchange = function(){
            if(checkBx[i].checked === true){
                price += parseInt(checkBx[i].value);
            }else{
                price -= parseInt(checkBx[i].value);
            }
            totalBox.value = price;
        }
    }


