# 아래 코드의 is 연산자 결과 및 각각의 print 결과를 예상하여 말해보시오.

a = "korea"
print('[1]', a, id(a))  # [1] korea 2239168361520

b = "korea"
print('[2]', b, id(b))  # [2] korea 2239168361520
print('a is b = ', a is b)  # a is b =  True

b += "!"
print('[3]', b, id(b))  # [3] korea! 2239168674416
print('a is b = ', a is b)  # a is b =  False

c = b[:-1]  # -1은 맨 마지막 인덱스를 의미. 마지막 인덱스 바로 전까지 슬라이싱
print('[4]', c, id(c))  # [4] korea 2239168674352
print('a is c = ', a is c)  # a is c =  False, 슬라이싱 한 값만 새로운 메모리 공간에 할당.
