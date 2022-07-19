# 아스키 코드란?
# 컴퓨터는 내부에서 숫자 또는 문자에 대한 정보처리를 이진수로 처리한다.
# 0과 1 두개로만 처리 --> 즉, 문자도 숫자로 기억한다.
# 이때 문자와 숫자를 대응시켜줘야 하는데 여러 방법중 아스키 코드 방식을 사용한다.
# 영어 알파벳 각각의 문자에 번호를 붙여서 처리 --> 번호를 붙일때 ASCII(아스키) 규약에 따라 붙임 --> 아스키 코드

# 대문자 A --> 65 (이후 부터는 하나씩 증가 B --> 66)
# 소문자 a --> 97 (하나씩 증가하므로 d --> 100)
# 숫자 0 --> 48 (하나씩 증가하므로 57은 숫자 9)
# 엔터(Enter) --> 13
# 아스키 코드 0번 --> NULL

# [1]: 대문자
# ord() 함수는 문자를 입력받아 해당 문자에 해당하는 아스키코드 값을 반환.
print(ord('A'))  # 65
print(ord('B'))  # 66
print(ord('C'))  # 67
print(ord('Z'))  # 90 --> A(65) + 알파벳문자(26개-1) = Z(90)

# [2]: 소문자
print(ord('a'))  # 97
print(ord('b'))  # 98
print(ord('c'))  # 99
print(ord('z'))  # 122