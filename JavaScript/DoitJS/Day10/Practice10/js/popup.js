// 팝업 창 표시 프로그램 만들기

function openPop(){
    const newWin = window.open("popup.html","", "width=400, hegiht=400");
    if(newWin === null){
        alert("팝업이 차단되어 있습니다. 팝업 차단을 해제하고 새로고침 해주세요.");
    }
}

window.onload = openPop;