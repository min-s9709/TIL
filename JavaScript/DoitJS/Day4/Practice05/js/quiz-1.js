function sumMulti(num1, num2){
    let result;
    if(num1==num2){
        result = num1 * num2;
        console.log(result);
    }
    else{
        result = num1 + num2;
        console.log(result);
    }
}

sumMulti(5, 10);
sumMulti(10, 10);


/*
정답 코드
		function sumMulti(x, y) {
			if (x == y) return x * y;
			else return x + y;
		}

		console.log(sumMulti(5, 10));
		console.log(sumMulti(10, 10));
*/