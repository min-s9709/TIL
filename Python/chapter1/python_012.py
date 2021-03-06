# a, b 각각의 변수에 들어있는 값을 교환하는 코드를 작성하시오.
# a, b 변수에 들어 있는 값은 100, 200이다.

# [1]: 변수 선언 및 값 할당
a = 100
b = 200
print("[1] 교환전 a, b 변수의 값은 = ", a, b)  # [1] 교환전 a, b 변수의 값은 =  100 200

# [2]: temp 변수를 이용한 swap
temp = a  # 임시 변수 temp에 a 변수 값 할당.
a = b  # a 변수에 b 변수 값 할당.
b = temp  # b 변수에 임시 변수 temp에 할당했던 a 변수 값 할당.
print("[2] 교환후 a, b 변수의 값은 = ", a, b)  # [2] 교환후 a, b 변수의 값은 =  200 100
