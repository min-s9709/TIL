// 배송 정보 자동 입력 프로그램 만들기

const check = document.querySelector("#shippingInfo");

check.addEventListener("click", function(){
    if(check.checked === true){
        document.querySelector("#shippingName").value = document.querySelector("#billingName").value;
        document.querySelector("#shippingTel").value = document.querySelector("#billingTel").value;
        document.querySelector("#shippingAddr").value = document.querySelector("#billingAddr").value;
    }else{
        document.querySelector("#shippingName").value = "";
        document.querySelector("#shippingTel").value = "";
        document.querySelector("#shippingAddr").value = "";
    }
});