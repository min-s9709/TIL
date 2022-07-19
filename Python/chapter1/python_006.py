# 아래 코드의 결과로 출력되는 값들에 대해서 설명하시오.
# id() 함수는 무엇을 출력하는가? --> 메모리 공간의 고유주소 출력.
# 3개의 id 출력 값중 다른 값을 출력하는 것이 있다면 몇번이고 왜 그런지 그 이유를 설명하시오.

# [1]
a = '붕어빵'
print(a, '-->', id(a))

# [2]
b = a
print(b, '-->', id(b))

# [3]
a = '잉어빵'
print(a, '-->', id(a))  # 주소값이 달라진다.

# [1] a 변수에 붕어빵이라는 문자열을 할당하면 메모리의 한 공간에 붕어빵이 할당되고 a 변수는 그 공간을 가리킨다.
# [2] b 변수에 기존의 a를 할당하면 b라는 변수도 a가 가리키는 붕어빵이 할당된 메모리공간을 가리킨다.
# [3] a 변수에 새로운 잉어빵이라는 문자열을 할당하면 메모리의 다른 공간에 잉어빵이 할당되고
# [3] 기존의 붕어빵이 할당된 메모리공간을 가리키는 것이 아니라 a라는 변수는 새로운 잉어빵이 할당된 메모리공간을 가리킨다.