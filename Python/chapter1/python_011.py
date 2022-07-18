# 문자열을 slice한 결과와 id() 및 is() 연산자 출력 결과를 말해보시오.

# [1]: 문자열
t = "korea"

# [2]: 슬라이스 및 id() 출력
# korea 1987190699056 - k 1987190575920 - ko 1987191011888 - kor 1987191011952 - kore 1987191012016
print(t, id(t), '-', t[:1], id(t[:1]), '-', t[:2], id(t[:2]),
      '-', t[:3], id(t[:3]), '-', t[:4], id(t[:4]))


# korea 1987190699056, 문자열 t에 어떠한 변화도 없기 때문에 메모리에 새로 재할당 X.
print(t[:], id(t[:]))

# [3]: is 연산자 결과
print("t is t[:] = ", t is t[:])  # t is t[:] =  True
print("t is t[:1] = ", t is t[:1])  # t is t[:1] =  False
print("t[:1] is t[:2] = ", t[:1] is t[:2])  # t[:1] is t[:2] =  False
print("t[:] is t[:5] = ", t[:] is t[:5])  # t[:] is t[:5] =  True
