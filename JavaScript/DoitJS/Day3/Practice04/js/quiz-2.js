//quiz2
var count = 0;

for (var i = 1; i<=100; i++){
    if(i % 3 == 0){
        document.write(`${i}, `);
        count++;
    }
    
}

document.write(`<br>3의 배수의 갯수: ${count}`);