# a, b 각각의 변수에 들어있는 값을 교환하는 코드를 작성하시오.
# a, b 변수에 들어 있는 값은 100, 200이다.
# 이때 별도의 temp 변수를 만들어서 교환하지 않고 한줄로 코드를 작성하여 교환하시오.

# [1]: 변수 선언 및 값 할당
a = 100
b = 200
print("[1] 교환전 a, b 변수의 값은 = ", a, b)  # [1] 교환전 a, b 변수의 값은 =  100 200

# [2]: temp 변수를 이용하지 않고 swap
a, b = b, a  # a 변수에  b 변수값 할당, b 변수에 a 변수값 할당.
print("[2] 교환후 a, b 변수의 값은 = ", a, b)  # [2] 교환후 a, b 변수의 값은 =  200 100