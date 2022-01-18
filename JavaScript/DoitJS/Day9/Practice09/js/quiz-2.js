// quiz2

const btn = document.querySelector("#start");
const radius = document.querySelector("#radius");
const round = document.querySelector("#round");
const area = document.querySelector("#area");

btn.addEventListener("click", calCulate);

function calCulate(){
    round.value =  2 * parseInt(radius.value) * Math.PI;
    area.value = Math.pow(parseInt(radius.value), 2) * Math.PI;
}