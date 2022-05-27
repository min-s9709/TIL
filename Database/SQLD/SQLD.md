# SQL 기본 및 활용

## DCL

DCL은 데이터 베이스 사용자에게 권한을 부여/회수하는 언어이다.

- GRANT: 권한 부여
- REVOKE: 권한 회수

```sql
GRANT 권한
ON 테이블
TO 유저;

REVOKE 권한
ON 테이블
FROM 유저;
```

권한의 종류

- SELECT, INSERT, UPDATE, DELETE
- REFERENCES, ALTER, INDEX
- ALL

ex) 유저 hoho가 아래의 코드와 같은 작업을 수행할 수 있도록 권한을 부여하는 DCL을 작성하시오.

```sql
UPDATE hoho_qualification.data
SET col2 = '합격'
WHERE col1 = 'SQLD';
```

```sql
GRANT SELECT, UPDATE ON hoho_qualification.list TO hoho;

/*
	GRANT 권한 ON 테이블명 TO 유저명;
	WHERE 조건문을 사용가능하기 위한 SELECT 권한도 부여
*/
```

ex) 데이터베이스상에서 많은 사용자들에게 개별적으로 권한을 부여하고 관리하는 어려움을 해소하고자 **다양한 권한을 하나의 그룹으로 묶어서 관리**할 수 있도록 하는 논리적인 권한의 그룹(명령어)를 칭하는 말은?

정답 -> **ROLE** (다양한 권한을 다양한 유저를 대상으로 관리하기 위한 명령어이다.)

여러 사용자에게 동일한 ROLE 부여 가능하며 ROLE의 생성은 [CREATE ROLE] 권한을 가진 유저가 할 수 있다.

**GRANT 관리자권한 TO hoho;** 

## DDL

DDL은 데이터를 보관하고 관리하기 위한 객체의 구조를 정의하기 위한 언어이다.

- CREATE: 구조 생성
- ALTER: 구조 변경
- DROP: 구조 삭제
- RENAME: 이름 변경
- TRUNCATE: 테이블 초기화

#### CREATE 

데이터베이스 상 **테이블 구조 생성**. 고객 정보를 저장해두기 위한 테이블이 필요하다면, 우선 정보를 담을 그릇을 만다는 것이다.

```sql
CREATE TABLE C_INFO (
	이름 varchar2(10),
    생년 number(4),
    phone varchar2(15),
    첫방문일 date, 
    고객번호 varchar2(10)
);
```

컬럼명은 영문, 한글, 숫자 모두 가능하다. (단, 시작만 문자로) ex) h10 (o) 10h (x)

컬럼 뒤 데이터 유형을 정하는 것은 필수!

```sql
CREATE TABLE C_INFO (
	이름 varchar2(10),
    생년 number(4) default 9999,
    phone varchar2(15) not null,
    첫방문일 date, 
    고객번호 varchar2(10) primary key
);

/*
	default: 기본값 지정
	not null: null 입력 불가
	primary key: 기본키 지종
	>> PK는 not null
	>> PK는 unique한 값 (테이블 내 중복 없음)
	foreign key: 외래키 지정
	>> 테이블 당 여러개 가능
*/
```

ex) 김호호씨가 아래와 같이 테이블 menu를 생성한 후, 유효한 튜플 값 4개를 삽입했다. 이 경우, SQL-a와 SQL-b의 실행 결과를 각각 구하시오.

```sql
CREATE TABLE MENU (
	메뉴명 varchar2(10) PRIMARY KEY,
    가격 number(10)
);

-- SQL-a
SELECT count(*) FROM MENU; -- 4

-- SQL-b
SELECT count(메뉴명) FROM MENU; -- 4

/*
	count(*): 전체 행의 수 카운트, null 포함
	count(컬럼명): null 제외한 행 수 카운트
	
	메뉴명 칼럼은 PK이므로 null값을 가질 수 없다.
	
	따라서 *을 통해 전체 행을 추출한 a와 메뉴명이란 컬러명을 명시한 b의 결과가 동일.
*/
```

```sql
CREATE TABLE MENU (
	메뉴명 varchar2(10) PRIMARY KEY,
    가격 number(10)
);

-- SQL-a
SELECT count(*) FROM MENU; -- 4

-- SQL-b
SELECT count(가격) FROM MENU; 

/*
	[가격] 컬럼에 포함된 null 값의 개수에 따라 서로 실행 결과가 다를 수 있다.
	[가격] 컬럼은 NOT NULL 제약 조건이 붙지도 않았고, PK도 아니다.
*/
```

#### ALTER

테이블과 컬럼에 대해 이름 및 속성 변경, 추가/삭제 등 구조 수정을 위해 사용한다.

- 테이블명 변경: **ALTER TABLE** MENU **RENAME TO** ho_MENU;
- 테이블명 변경(다수 테이블 명 동시에 변경 가능) : **RENAME** TABLE MENU **TO** ho_MENU;
- 컬럼명 변경 : **ALTER TABLE** MENU **RENAME COLUMN** phone **TO** 전화번호;
- 컬럼 속성 변경 : **ALTER TABLE** MENU **MODIFY** (이름 varchar(20) not null);
- 컬럼 추가 : **ALTER TABLE** MENU **ADD** (거주지역 varchar(10));
- 컬럼 삭제: **ALTER TABLE** MENU **DROP COLUMN** 이름;
- 제약조건 추가 : **ALTER TABLE** MENU **ADD** CONSTRAINT;
- 제약조건 삭제: **ALTER TABLE** MENU **DROP** CONSTRAINT;

ex) 테이블 RIDING에서 **현재 null 값이 존재하는 컬럼**(phone 컬럼)에 대하여 null이 발생할 수 없도록 제약조건을 **추가**하고자 한다. 올바른 SQL 문장을 기술하시오. 

```sql
ALTER TABLE RIDING MODIFY(phone varchar(15) NOT NULL);
```

#### DROP

테이블 및 컬럼을 삭제하는 용도로 사용된다.

- 컬럼 삭제: **ALTER TABLE** MENU **DROP COLUMN** 이름;
- 테이블 삭제: **DROP TABLE** MENU;

> **테이블 삭제 (유의)**
>
> **DROP TABLE** MENU **CASCADE CONSTRAINT**;
>
> 해당 테이블의 데이터를 외래키로 참조한 제약사항도 모두 삭제.
>
> Oracle에만 있는 옵션. SQL Server에는 존재하지 않는다. 
>
> FK 제약조건과 참조테이블 먼저 삭제하고, 해당 테이블을 삭제한다.

> ##### **DROP VS TRUNCATE**
>
> DROP(테이블 삭제)은 테이블 관련해서 모두 삭제된다. 구조도, 데이터도!
>
> TRUNCATE(테이블 초기화)는 테이블 데이터만 삭제되고 구조는 살아있다.

```sql
 -- 테이블 정의를 완전삭제. 테이블이 사용했던 모든 저장공간 Release.
DROP TABLE F_INFO; 

 -- 테이블을 초기상태로, 테이블 최초 형성시 사용했던 저장공간만 남기고 Release.
TRUNCATE TABLE F_INFO;
```

## DML

정의된 데이터베이스에 레코드를 입력하거나, 수정, 삭제 및 조회하기 위한 명령어다.

- SELECT : 데이터 조회
- INSERT : 데이터 입력
- UPDATE : 데이터 수정
- DELETE :  데이터 삭제

```SQL
INSERT INTO MENU (NAME) VALUES ('연어스시'); -- INSERT
UPDATE MENU SET discount_rate = 10 (WHERE name = "연어스시"); -- UPDATE
DELETE FROM MENU (WHERE name = '연어스시'); -- DELETE
```

ex) 다음의 SQL을 통해 MENU 테이블을 생성했다. 보기의 SQL 문장 중 오류가 발생하는 것을 모두 고르시오.

```SQL
CREATE TABLE MENU (
	메뉴코드 varchar2(10) PRIMARY KEY,
    메뉴명 varchar2(10) NOT NULL,
    가격 number(10) NOT NULL,
    할인율 number(100) DEFAULT 0
);

/*
	1. UPDATE MENU SET 메뉴코드 = 100 WHERE 메뉴명 = '스키야키';
	2. DELETE MENU
	3. INSERT INTO MENU (메뉴코드, 가격) VALUES('101', 50000);
	4. INSERT INTO MENU VALUES('102', 와규, 30000);
	
	정답: 3, 4
	숫자는 varchar2와 char에 입력 가능.
	DELETE에서 FROM 생략 가능.
	3. 테이블이 생성되고 NOT NULL값인 메뉴명에 대한 INSERT가 이뤄지지 않았으므로 오류          발생.
	4. 컬럼명 지정이 이뤄지지 않은 상태에서는 전체(여기선 컬럼 4개)의 값이 들어가야한다. 
*/
```

## TCL

트랜잭션을 제어하기 위한 언어이다. 

> **트랜잭션**
>
> 데이터베이스의 상태를 변화시키기 위해 수행하는 작업의 단위이다.

- **COMMIT** : 데이터에 대한 변화를 DB에 반영하기 위한 명령어
- **SAVEPOINT** : 코드를 분할하기 위한 저장 포인트 지정
- **ROLLBACK** :  트랜잭션이 시작되기 이전의 상태로 되돌리기 위한 언어. 최신 COMMIT이나 SAVEPOINT로 되돌릴 수 있는 명령어

> **COMMIT과 ROLLBACK의 효과**
>
> 1. 데이터 무결성을 보장할 수 있다.
> 2. 영구적인 변경 전 데이터에 대한 변동사항을 확인할 수 있다.
> 3. 논리적 연관성 있는 작업을 그룹화하여 처리할 수 있다.

ex) 다음의 SQL문을 수행했을때 결과를 구하시오.

```sql
CREATE TABLE T1 (
	col1 varchar2(10),
    col2 number(10)
);

INSERT INTO T1 VALUES(10, 100);
INSERT INTO T1 VALUES(20, 200);
INSERT INTO T1 VALUES(25, 250);
SAVEPOINT S1;

DELETE T1 WHERE col1 = 10;
UPDATE T1 SET col1 = 40 WHERE col2 = 200;
SAVEPOINT S1;

INSERT INTO T1 VALUES(50, 500);
ROLLBACK TO SAVEPOINT S1;

SELECT MAX(col2) FROM T1; -- 250
```

ex) 다음의 SQL문을 수행했을 때 영구적으로 반영되는 co1의 값을 모두 쓰시오.

```sql
INSERT INTO T2 (col1) VALUES(10);
INSERT INTO T2 (co11) VALUES(20);
INSERT INTO T2 (col1) VALUES(30);
COMMIT;

UPDATE T2 SET col1 = 50 WHERE col1 = 20;
DELETE T2 WHERE col1 = 30;
INSERT INTO T2 (col1) VALUES(70);
ROLLBACK;
COMMIT;

-- 10, 20 , 30
```

## SELECT

```SQL
-- 조회를 하기 위한 기본 문장 구조
SELECT 조회대상
FROM 테이블명
WHERE 조건문;
```

```SQL
-- DML-SELECT문 기본 구조
SELECT 컬럼명 등
FROM 테이블명
WHERE 조건문
GROUP BY 집계기준 컬럼명
HAVING grouping된 후 상태 기반의 조건문
ORDER BY 컬럼명;
```

> **DISTINCT**
>
> DISTINCT가 붙은 컬럼은 중복을 제거한 데이터를 조회한다. 또한 DISTINCT는 NULL도 단일 행으로 본다.

ex) 다음과 같이 정의된 C_INFO 테이블에서 2000년도에 태어난 고객의 이름과 전화번호를 조회하려고한다. 빈칸에 알맞은 명령어를 구하시오.

```SQL
CREATE TABLE C_INFO (
	이름 varchar2(10),
    생년 number(10) default 9999,
    전화번호 varchar2(15) NOT NULL,
    첫방문일 date,
    고객번호 varchar2(10) PRIMARY KEY
);

-- 정답
SELECT 이름, 전화번호
FROM C_INFO
WHERE 생년 = 2000;
```

ex) 테이블 C_INFO에 대하여 아래와 같은 SQL문을 실행한 결과 출력되는 행의 수를 구하시오.

| 회원코드 | 성별 | 연령대 | 이름  |
| :------: | :--: | :----: | :---: |
|    A     |  F   |  20대  | kate  |
|    B     |  M   |  20대  |  Max  |
|    C     |  F   |  30대  | lily  |
|    D     |  M   |  20대  | paul  |
|    E     |      |  50대  | james |

```sql
SELECT DISTINCT 성별, 연령대
FROM C_INFO;
/*
	정답: 4
	C_INFO라는 테이블의 성별과 연령대 컬럼값 조합에서 중복을 제거하고 조회한다.
*/
```

ex) 위의 테이블에 대하여 아래 SQL문 3가지를 실행한 결과 출력되는 행 수를 구하시오.

```sql
SELECT COUNT(*) FROM C_INFO; -- 5 전체 행 카운트.
SELECT COUNT(성별) FROM C_INFO; -- 4 NULL 제외 카운트.
SELECT COUNT(DISTINCT 성별) FROM C_INFO; -- 3 NULL까지 구분(포함)하여 카운트.
```

#### 문자형 함수

- LOWER(문자열) : 영어 문자열 소문자로 변환. LOWER('SQL') > 'sql'

- UPPER(문자열) : 영어 문자열 대문자로 변환. UPPER('sql') > 'SQL'

- CONCAT(문자열1, 문자열2) : 문자열1과 문자열2를 결합. 

  CONCAT('가', '나')= '가'||'나' = '가' + '나'

- SUBSTR(문자열, m, n) : 문자열 m번째 자리부터 n개를 자른다. SUBSTR('KATE', 2, 2) > 'AT'

- LENGTH(문자열) = LEN(문자열) : 공백을 포함하여 문자열의 길이값. LEN('가 나다') > 4

- TRIM(문자열, 제거대상)

​		TRIM('aabbccaa', 'a') > 'bbcc' : 왼쪽과 오른쪽에서 지정된 문자를 삭제한다.

​		TRIM(' aabbccaa ',) > 'aabbccaa' : 지정된 문자가 없으면 공백을 제거한다.

- LTRIM(문자열, 제거대상)

​		LTRIM(' aabbccaa', 'a') > 'bbccaa' : 왼쪽에서 지정된 문자를 삭제한다.

​		LTRIM('  aabbccaa  ', ) > 'aabbccaa  ' : 지정된 문자가 없으면 좌측의 공백을 제거한다.

- RTRIM(문자열, 제거대상)

​		RTRIM(' aabbccaa', 'a') > 'aabbcc' : 오른쪽에서 지정된 문자를 삭제한다.

​		RTRIM('  aabbccaa  ', ) > '  aabbccaa' : 지정된 문자가 없으면 우측의 공백을 제거한다.

ex) 위의 C_INFO를 다음과 같은 테이블처럼 조회하기 위한 SQL문은?

| 회원코드 | 연령대 | 이름  |
| :------: | :----: | :---: |
|    A     |  20대  | KATE  |
|    B     |  20대  |  MAX  |
|    C     |  30대  | LILY  |
|    D     |  20대  | PAUL  |
|    E     |  50대  | JAMES |

```SQL
-- 답
SELECT 회원코드, 연령대, UPPER(이름) FROM C_INFO;
```

ex) 위의 C_INFO를 다음과 같은 테이블 처럼 조회하기 위한 SQL문은?

| 회원코드 | 연령대 | 이름  |
| :------: | :----: | :---: |
|    A     |   20   | KATE  |
|    B     |   20   |  MAX  |
|    C     |   30   | LILY  |
|    D     |   20   | PAUL  |
|    E     |   50   | JAMES |

```SQL
-- 답
SELECT 회원코드, RTRIM(연령대, '대'), UPPER(이름) FROM C_INFO;
```

#### 숫자형 함수

- ROUND(숫자, 소수점 자리수) : 반올림. ROUND(25.35782) > 25.36
- TRUNC(숫자, 소수점 자리수) : 버림. TURNC(25.3578, 2) > 25.35
- CEIL(숫자) : 크거나 같은 최소 정수 반환. CEIL(33.5) > 34
- FLOOR(숫자) : 작거나 같은 최대 정수 반환. FLOOR(33.5) > 33
- MOD(분자, 분모) :  분자를 분모로 나눈 나머지 반환 MOD(3, 2) > 1
- SIGN(숫자) : 숫자가 양수면 1, 0이면 0, 음수면 -1 반환.
- ABS(숫자) : 절댓값.

#### 날짜형 함수

- SYSDATE : 쿼리를 돌리는 현재 날짜 & 시각 출력. 

​		2022/05/19 18:37:20 (datetime 형태)

- EXTRACT(정보 FROM 날짜) : 날짜형 데이터에서 원하는 값을 추출함. (년, 원, 일 데이터를 반환)

​		EXTRACT (YEAR FROM date '2022-01-31') > 2022

​		EXTRACT(YEAR FROM SYSDATE) = TO_NUMBER(TO_CHAR(SYSDATE, 'YYYY'))

#### 명시적 / 암시적 형변환

명시적 형변환은 형변환 함수를 사용하여 강제로 데이터 타입을 변경하는 것이고, 암시적 형변환은 데이터베이스가 알아서 바꿔주는 것이다. 단, 인덱스에 대해 암시적 형변환이 발생한 경우 인덱스를 사용할 수 없다.

- TO_NUMBER(문자열) : 문자열을 숫자로 변환 TO_NUMBER('2022')
- TO_CHAR(숫자 or 날짜, 포맷) : 숫자 혹은 날짜형 데이터를 포맷에 맞게 문자로 바꿈.

​		TO_CHAR(date '2022-02-11', 'day') > '금요일'

​		TO_CHAR(200) > '200'

- TO_DATE(문자열, 포맷) : TO_DATE('2022013120', 'YYYYMMDDHH24') > 2022/01/31 20:00:00

ex) 어제 날짜 (YYYYMMDD)를 조회하기 위한 다음 SQL문의 빈칸을 채우시오.

​                                                        SELECT _______ FROM DUAL;

```SQL
TO_CHAR(SYSDATE-1, 'YYYYMMDD')
/*
DUAL 테이블은 오라클에 존재하는 기본 테이블로, 하나의 열로만 이뤄져있음. 오늘 날짜를 구하거나 간단한 계산을 하는 등에 사용하기 적합함.

SYSDATE는 SQL을 작업하는 당일의 날짜와 시각을 알려주며, -1을 할 경우 전날의 날짜 값이 출력된다. 날짜를 조회한다고 했으니 TO_CHAR을 통해 형변환을 하여 날짜만 남긴다.
*/
```

#### DECODE, CASE WHEN

```SQL
-- IF문
DECODE(값1, 값2, 참일때 출력값, 거짓일 때 출력값)
/*
	DECODE(col1, KATE, '본인', '다른사람')
*/

-- 길어진 IF문
CASE WHEN 조건 THEN 조건이 참일때 결과 ELSE 거짓일때 결과 END
/*
	CASE WHEN col1 < 10 THEN '한자리수'
		 WHEN col1 BETWEEN 10 AND 99 THEN '두자리수'
		 ELSE '세자리수'
	END
*/
```

#### ORDER BY

조회된 테이블을 정렬하는 기능이다. 보통, 모든 테이블 제작 과정이 끝난 후 마지막으로 수행된다.

ex) 아래의 SQL문을 실행했을 때 출력될 표를 기입하시오.

| 회원코드 | 성별 | 연령 | 이름  |
| :------: | :--: | :--: | :---: |
|   101    |  F   |  20  | kate  |
|   102    |  M   |  40  |  max  |
|   103    |  F   |  59  | lily  |
|   104    |  M   |  24  | paul  |
|   105    |      |  11  | james |

```sql
SELECT 회원코드 AS C_ID, 연령 AS AGE, 이름 AS NAME
FROM C_INFO
ORDER BY (CASE WHEN 회원코드 = 101 OR 회원코드 = 104 THEN 1 ELSE 2 END), 
연령 DESC; -- DESC는 내림차순
```

정답

| C_ID | AGE  | NAME  |
| :--: | :--: | :---: |
| 104  |  24  | paul  |
| 101  |  20  | kate  |
| 103  |  59  | lily  |
| 102  |  40  |  max  |
| 105  |  11  | james |

## WHERE 조건문

|   연산자 종류    |                             설명                             |
| :--------------: | :----------------------------------------------------------: |
|   IN(x,y,z...)   | x, y, z 등으로 구성된 목록 내 값 중 어느 하나라도 일치하면 된다. |
| NOT IN(x,y,z...) | x,y,z 등으로 구성된 목록 내 값 중 어느 하나라도 일치하면 안된다. |
|     IS NULL      |               NULL인지 판단. NULL일 경우 TRUE                |
|   IS NOT NULL    |          NULL이 아닌지 판단. NULL이 아닐 경우 TRUE           |
| BETWEEN a AND b  |                   a와 b 사이에 값이 있는지                   |
|       기타       |                비교연산자(=, >, >= ,<, <=) 등                |

| 문자열 조건문 관련 연산자 |                   설명                   |
| :-----------------------: | :--------------------------------------: |
|         A LIKE B          | A에 대하여 B와 유사한 문자열을 찾아준다. |
|             %             |     문자 1개 이상이 존재한다는 의미      |
|             _             |                문자 한 개                |

ex) 아래와 같이 테이블을 조회하기 위한 SQL문의 빈칸에 알맞은 말은?

전체 테이블(wordlist)

| 코드 |  단어  |
| :--: | :----: |
|  A   |  kind  |
|  B   | choice |
|  C   | chrome |
|  D   |  kite  |
|  E   | chance |

조회 후

| 코드 | 단어 |
| :--: | :--: |
|  A   | kind |
|  D   | kite |

```sql
/*
	SELECT *
	FROM wordlist
	WHERE 단어 _____
	ORDER BY 1;
*/

SELECT *
FROM wordlist
where 단어 LIKE 'KI%'
ORDER BY 1;
```

#### WITH구문

1. 서브 쿼리를 사용해서 임시테이블이나 뷰(view)처럼 사용 가능함.
2. 별칭 지정 가능함.
3. 인라인뷰나 임시테이블로 판단한다.

```SQL
WITH TableName AS (
	SELECT *
    FROM C_INFO
    WHERE NAME LIKE '%a%'
)
```

> **서브쿼리와 인라인뷰**
>
> - 서브쿼리: SELECT 문 내에 SELECT문이 또 쓰여있는 쿼리.
> - 인라인뷰: 서브쿼리가 FROM 절 내에 쓰여진 것.
>
> ```SQL
> SELECT *
> FROM (SELECT * FROM C_INFO WHERE name LIKE '%a%')
> ```

> **뷰(VIEW) 테이블**
>
> 일종의 가상 테이블로서 실제 데이터나 하드웨어에 저장되는 것은 아니다. 
>
> 실제 데이터를 가지고 있지 않다.
>
> 테이블 구조가 변경되더라도 독립적으로 존재한다.

#### NULL 관련 함수

|             함수             |                             설명                             |
| :--------------------------: | :----------------------------------------------------------: |
|      NVL(col1, 대체값)       | NULL이면 다른 값으로 바꿔주는 함수 NVL(co1, 100)일때 co1이 NULL이면 100으로 바꿔준다. |
|   NVL2(col1, 결과1, 결과2)   | col1이 NULL일때 결과2를 출력하고 col1이 NOT NULL일 때 결과 1 출력해준다. |
|        NULLIF(v1, v2)        |          v1 == v2면 NULL v1 != v2면 v1을 출력한다.           |
| COALESCE(v1, v2, v3, ... vn) |                NULL이 아닌 최초의 값을 반환.                 |

ex) C_INFO 테이블에서 생년이 NULL이면 9999를 표시하고자 한다. SQL문장의 빈칸을 채우시오.

```SQL
-- SELECT 고객명, 고객번호, ___(생년, 9999) AS 정답컬럼 FROM C_INFO;

SELECT 고객명, 고객번호, NVL(생년, 9999) AS 정답컬럼 FROM C_INFO;
-- 생년과 대체값의 데이터타입이 같아야 한다.
```

## GROUP BY , HAVING

ex) 다음 SQL의 결과값을 기술하시오.

| 회원코드 | 성별 | 연령 | 이름  |
| :------: | :--: | :--: | :---: |
|   101    |  F   |  20  | kate  |
|   102    |  M   |  40  |  max  |
|   103    |  F   |  59  | lily  |
|   104    |  M   |  24  | paul  |
|   105    |      |  11  | james |

```sql
SELECT 성별, COUNT(회원코드)
FROM C_INFO
GROUP BY 성별;
```

결과

| 성별 | count(회원코드) |
| :--: | :-------------: |
|  F   |        2        |
|  M   |        2        |
|      |        1        |

ex) 다음 SQL의 결과값을 기술하시오.

| 회원코드 | 성별 | 연령대 | 이름  |
| :------: | :--: | :----: | :---: |
|   101    |  F   |  20대  | kate  |
|   102    |  M   |  30대  |  max  |
|   103    |  F   |  20대  | lily  |
|   104    |  M   |  40대  | paul  |
|   105    |  F   |  10대  | james |

```SQL
SELECT 성별, 연령대, COUNT(회원코드)
FROM C_INFO
GROUP BY 성별, 연령대;
```

결과

| 성별 | 연령대 | count(회원코드) |
| :--: | :----: | :-------------: |
|  F   |  20대  |        2        |
|  M   |  30대  |        1        |
|  M   |  40대  |        1        |
|  F   |  10대  |        1        |

#### 집계 함수

|            함수             |                     설명                     |
| :-------------------------: | :------------------------------------------: |
|    COUNT(*), COUNT(exp)     | count(*) : NULL 포함, COUNT(exp) : NULL 제외 |
|  SUM([DISTINCT\|ALL] exp)   |                     합계                     |
|  MAX([DISTINCT\|ALL] exp)   |                    최대값                    |
|  MIN([DISTINCT\|ALL] exp)   |                    최소값                    |
| STDDEV([DISTINCT\|ALL] exp) |                   표준편차                   |
| VARIAN([DISTINCT\|ALL] exp) |                     분산                     |

> 참고
>
> NULL 값에 대한 연산의 결과는 모두 NULL이며 통계적 집계함수를 연산할때 NULL은 제외하고 계산한다.

ex) C_INFO에서 평균 연령이 30대인 성별과 해당 성별의 평균 연령을 출력하는 SQL을 작성하시오.

| 회원코드 | 성별 | 연령 | 이름  |
| :------: | :--: | :--: | :---: |
|   101    |  F   |  20  | kate  |
|   102    |  M   |  40  |  max  |
|   103    |  F   |  47  | lily  |
|   104    |  M   |  24  | paul  |
|   105    |  F   |  11  | james |

```sql
SELECT 성별, AVG(연령)
FROM C_INFO
GROUP BY 성별
HAVING AVG(연령) >= 30 AND AVG(연령) < 40;
/*
 GROUP BY로 그룹화 한 이후의 집계 함수에 대해서 조건을 주는 것이라 HAVING을 써야함.
 즉, HAVING은 그룹에 대한 조건을 작성하기 위해 사용한다. 집계 함수는 WHERE절에는 사용할 수 없지만, HAVING절에서는 사용할 수 있다.
*/
```

## 그룹 함수

#### ROLLUP 함수

ROLLUP 함수는 부분합계와 전체 합계값을 보여준다. 이는 인수의 순서에 영향을 받는다.

```SQL
SELECT 성별, 연령대, SUM(결제금액)
FROM 결제
GROUP BY ROLLUP(성별, 연령대)
ORDER BY 성별, 연령;
```

|  성별   | 연령대 | SUM(결제금액) |
| :-----: | :----: | :-----------: |
|    F    |  10대  |     1000      |
|    F    |  20대  |     3000      |
| F(부분) |        |     4000      |
|    M    |  30대  |     1500      |
|    M    |  40대  |     5500      |
| M(부분) |        |     7000      |
| (전체)  |        |     11000     |

#### CUBE 함수

CUBE 함수는 그룹화될 수 있는 모든 경우에 대해 생성한다.

```SQL
SELECT 성별, 연령대, SUM(결제금액)
FROM 결제
GROUP BY CUBE(성별, 연령대);
```

| 성별 | 연령대 | SUM(결제금액) |
| :--: | :----: | :-----------: |
|  F   |  10대  |     1000      |
|  F   |  20대  |     3000      |
|  F   |        |     4000      |
|  M   |  30대  |     1500      |
|  M   |  40대  |     5500      |
|  M   |        |     7000      |
|      |        |     11000     |
|      |  10대  |     1000      |
|      |  20대  |     3000      |
|      |  30대  |     1500      |
|      |  40대  |     5500      |

#### GROUPING SETS 함수

괄호로 묶은 집합별 집계 가능

```SQL
SELECT 성별, 연령대, SUM(결제금액)
FROM 결제
GROUP BY GROUPING SETS(성별, 연령대);
```

| 성별 | 연령대 | SUM(결제금액) |
| :--: | :----: | :-----------: |
|  F   |        |     4000      |
|  M   |        |     7000      |
|      |  10대  |     1000      |
|      |  20대  |     3000      |
|      |  30대  |     1500      |
|      |  40대  |     5500      |

#### GROUPING 함수

소계, 합계 등이 계산되면 1을 반환하고, 아니면 0을 반환한다. 

```SQL
SELECT 성별, GROUPING(성별) g1, 연령대,
GROUPING(연령대) g2, SUM(결제금액)
FROM 결제
GROUP BY ROLLUP(성별, 연령대)
ORDER BY 성별, 연령;
```

| 성별 |  g1  | 연령대 |  g2  | SUM(결제금액) |
| :--: | :--: | :----: | :--: | :-----------: |
|  F   |  0   |  10대  |  0   |     1000      |
|  F   |  0   |  20대  |  0   |     3000      |
|  F   |  0   |        |  1   |     4000      |
|  M   |  0   |  30대  |  0   |     1500      |
|  M   |  0   |  40대  |  0   |     5500      |
|  M   |  0   |        |  1   |     7000      |
|      |  1   |        |  1   |     11000     |

> **CASE WHEN을 활용하여 전체 합계를 구분하고 싶다면?**
>
> ```SQL
> SELECT 성별, CASE WHEN GROUPING(성별) = 1
> 				 THEN '전체합계' END
> 		     AS g1
> 	   ,연령, GROUPING(연령) g2, SUM(결제금액)
> FROM 결제
> GROUP BY ROLLUP(성별, 연령대)
> ORDER BY 성별, 연령;
> ```

## JOIN

테이블 간의 결합. 집합과 유사함.

*학습할 테이블

<GENDER 테이블>

| 회원코드 | 성별 |
| :------: | :--: |
|   101    |  F   |
|   102    |  M   |
|   103    |  F   |
|   104    |  M   |
|   105    |  F   |

<AGE 테이블>

| 회원코드 | 연령 |
| :------: | :--: |
|   101    |  29  |
|   103    |  10  |
|   104    |  12  |
|   107    |  25  |
|   108    |  5   |

#### INNER JOIN

```SQL
SELECT A.*, B.연령
FROM GENDER A INNER JOIN AGE B
	 ON A.회원코드 =  B.회원코드;
	 
SELECT A.*, B.연령
FROM GENDER A, AGE B
WHERE A.회원코드 = B.회원코드;
```

| 회원코드 | 성별 | 연령 |
| :------: | :--: | :--: |
|   101    |  F   |  29  |
|   103    |  F   |  10  |
|   104    |  M   |  12  |

#### OUTER JOIN

```SQL
SELECT A.*, B.연령
FROM GENDER A FULL OUTER JOIN AGE B
	ON A.회원코드 = B.회원코드;
```

| 회원코드 | 성별 | 연령 |
| :------: | :--: | :--: |
|   101    |  F   |  29  |
|   102    |  M   |      |
|   103    |  F   |  10  |
|   104    |  M   |  12  |
|   105    |  F   |      |
|   107    |      |  25  |
|   108    |      |  5   |

#### LEFT JOIN

```SQL
SELECT A.* , B.연령
FROM GENDER A LEFT JOIN AGE B
	 ON A.회원코드 = B.회원코드;
	 
SELECT A.* , B.연령
FROM GENDER A, AGE B
WHERE A.회원코드 = B.회원코드(+);
```

| 회원코드 | 성별 | 연령 |
| :------: | :--: | :--: |
|   101    |  F   |  29  |
|   102    |  M   |      |
|   103    |  F   |  10  |
|   104    |  M   |  12  |
|   105    |  F   |      |

#### RIGHT JOIN

```SQL
SELECT B.회원코드, 성별, 연령
FROM GENDER A RIGHT JOIN AGE B
	 ON A.회원코드 = B.회원코드;

SELECT B.회원코드, 성별, 연령
FROM GENDER A , AGE B
WHERE A.회원코드(+) = B.회원코드;
```

| 회원코드 | 성별 | 연령 |
| :------: | :--: | :--: |
|   101    |  F   |  29  |
|   103    |  F   |  10  |
|   104    |  M   |  12  |
|   107    |      |  25  |
|   108    |      |  5   |

#### UNION,  UNION ALL

합집합.

동일한 컬럼 개수와 데이터 타입을 가진 두 테이블을 합쳐줌.

-T1

| 회원코드 | 성별 |
| :------: | :--: |
|   101    |  F   |
|   102    |  M   |
|   103    |  F   |
|   104    |  M   |
|   105    |  F   |

-T2

| 회원코드 | 성별 |
| :------: | :--: |
|   101    |  F   |
|   108    |  M   |
|   103    |  F   |
|   104    |  M   |
|   107    |  F   |

```SQL
SELECT * FROM T1
UNION -- 중복 제거.
SELECT * FROM T2;
```

-결과

| 회원코드 | 성별 |
| :------: | :--: |
|   101    |  F   |
|   102    |  M   |
|   103    |  F   |
|   104    |  M   |
|   105    |  F   |
|   108    |  M   |
|   107    |  F   |

```SQL
SELECT * FROM T1
UNION ALL -- 중복 제거 안됨.
SELECT * FROM T2;
```

-결과

| 회원코드 | 성별 |
| :------: | :--: |
|   101    |  F   |
|   102    |  M   |
|   103    |  F   |
|   104    |  M   |
|   105    |  F   |
|   101    |  F   |
|   108    |  M   |
|   103    |  F   |
|   104    |  M   |
|   107    |  F   |

#### MINUS

차집합.

위의 T1, T2 테이블 사용할 예정.

```SQL
SELECT * FROM A
MINUS
SELECT * FROM B;
```

-결과

| 회원코드 | 성별 |
| :------: | :--: |
|   102    |  M   |
|   105    |  F   |

#### EQUI JOIN

동일한 컬럼을 사용하여 두 릴레이션을 결합 

ex) A.key = B.key

#### non-EQUI JOIN

정확하게 일치하지 않는 컬럼들을 사용하여 두 릴레이션을 결합. 

=을 사용하지 않는다.

ex) A.key <,>,<=,>= B.key

#### CROSS JOIN

key 없이 JOIN하면 2개의 테이블에 대해 카테시안 곱 발생.

-T1

|  k1  |  k2  |
| :--: | :--: |
|  1   |  F   |
|  12  |  M   |
|  3   |  F   |
|  4   |  M   |
|  15  |  F   |

-T2

| 회원코드 | 이름  |
| :------: | :---: |
|   101    | kate  |
|   108    |  max  |
|   103    | amily |

```sql
SELECT * FROM T1 CROSS JOIN T2; -- 5 * 3 = 15 개의 행이 조회된다.
```

#### SELF JOIN

한 테이블 내에서 연관관계를 가진 두 컬럼 간의 조인.

테이블 명과 컬럼명이 모두 일치하기 때문에 꼭, ALIAS를 써줘야한다.

```SQL
SELECT T1.col1 , T2.col1
FROM 테이블명 T1, 테이블명 T2
WHERE T1.col1 = T2.col1;
```

## 서브 쿼리

```sql
SELECT COUNT(*)
FROM 고객목록
WHERE 고객번호 NOT IN (SELECT 고객번후 FROM 연체자 목록);
-- 전체가 메인 쿼리. NOT IN 괄호 안에 있는 SELECT문이 서브쿼리.
```

```SQL
FROM (SELECT * FROM 고객목록 WHERE 거주지 = '서울') A 
JOIN 연락처 B ON A.고객번호 = B.고객번호;
-- FROM 구에 SELECT 문이 있으면 인라인뷰.
```

```SQL
SELECT(SELECT SUM(salary) FROM 급여 WHERE EXTRACT(YEAR FROM 급여지급일) = 2021)...
-- SELECT 문에 들어가고, 한 행과 한 컬럼만 반환하는 서브 쿼리는 스칼라 서브쿼리.
```

1. 서브쿼리에서는 정렬을 수행하는 ORDER BY를 사용할 수 없다.
2. 여러 행을 반환하는 서브쿼리는 다중 행 연산자를 사용해야 한다.
3. 메인 쿼리에서 서브쿼리의 컬럼을 자유롭게 사용할 수 없다.
4. EXIST가 반환하는 결과값은 True 혹은 False다.



## 계층형 조회

트리 형태의 데이터에 대해 조회를 수행하는 것이다.

- 계층구조 시작점 (START WITH로 계층형 조회의 시작점을 설정한다) : 부모데이터, ROOT노드
- LEAF노드: 자식노드가 없는 데이터.

ex) 아래의 SQL을 수행한 결과 첫 번째 행의 값을 기입하시오.

| col1 | col2 | col3 |
| :--: | :--: | :--: |
|  11  |      |  10  |
|  12  |  11  |  12  |
|  13  |  11  |  13  |
|  14  |  12  |  15  |

```sql
SELECT col3
FROM 조직구조
START WITH col2 IS NULL
CONNECT BY PRIOR col1 = col2
ORDER SIBLINGS BY col3;
/*
	계층형 조회문제는 조회를 통해 어떻게 레코드가 재배치 되는지 파악하는 것이 중요!
	동일한 값을 가진 컬럼끼리 연결되며 재배치된다.
	CONNECT BY: 계층구조(트리)가 연결된 방향성을 알려줌
				ex)자식노드 -> 부모노드, 부모노드 -> 자식노드
	CONNECT BY PRIOR a = b : a컬럼과 b컬럼이 동일한 레코드들 간에 계층화가 발생한다.
							 b -> a순으로 재배치된다. (a의 앞은 b)
	ORDER SIBLING BY col3 : col3 기준, 오름차순으로 배치 순서 결정
*/
```

-답 : 15

| col1 | col2 | col3 |
| :--: | :--: | :--: |
|  14  |  12  |  15  |
|  12  |  11  |  12  |
|  13  |  11  |  13  |
|  11  |      |  10  |

## 윈도우 함수

레코드(행) 사이의 관계를  쉽게 정의하기 위한 함수.

```SQL
SELECT WINDOW_FUNCTION (ARGUMENTS) OVER ([PARTITION BY 컬럼명] [ORDER BY 컬럼명] [WINDOWING]) FROM 테이블명;

/*
	WINDOW_FUNCTION : 윈도우 함수
	ARGUMENTS : 인수 (컬럼명 등 함수의 작업이 이뤄지는 대상)
	PARTITION BY : 테이블의 레코드들을 쪼개는 기준
	ORDER BY : 쪼개진 레코드들 내에서 혹은 전체 테이블에서 레코드들을 어떤 기준으로 정렬			   할지
	WINDOWING : 함수의 연산 대상이 되는 레코드의 범위를 정함
*/
```

#### WINDOW_FUNCTION 종류

- 그룹 내 집계함수 : COUNT, SUM, MIN, MAX, AVG 등
- 그룹 내 순위(RANK) 함수
- 그룹 내 비율 관련 함수
- 그룹 내 행 순서 함수

#### 그룹 내 순위 함수

|    함수    |                             설명                             |
| :--------: | :----------------------------------------------------------: |
|    RANK    | 동일한 순위에 대해 동일한 순위를 부여한다. 동일한 순위를 하나의 건수로 계산하지 않는다. |
| DENSE_RANK | 동일한 순위에 대해 동일한 순위를 부여한다. 동일한 순위는 하나의 건수로 계산한다. |
| ROW_NUMBER |          동일한 순위에 대해 고유한 순위를 부여한다.          |

ex) 아래의 반환 결과를 보고 A,B,C열에 사용된 윈도우 순위 함수를 기입하시오.

| 매장코드 | 판매금액 |  A   |  B   |  C   |
| :------: | :------: | :--: | :--: | :--: |
|  101130  |  586030  |  1   |  1   |  1   |
|  101304  |  490349  |  2   |  2   |  2   |
|  104030  |  490349  |  2   |  2   |  3   |
|  102392  |  430004  |  3   |  4   |  4   |
|  103943  |  412003  |  4   |  5   |  5   |

```SQL
SELECT 매장코드, 판매금액, ______() OVER (ORDER BY 판매금액 DESC) FROM 판매;

/*
	A : DENSE_RANK
	B : RANK
	C : ROW_NUMBER
*/
```

ex) 아래의 결과를 출력하는 SQL문을 완성하시오.

| 매장코드 | 지역명 |  메뉴명  | 판매량 | 판매순위 |
| :------: | :----: | :------: | :----: | :------: |
|   101    |  서울  | 연어스시 |  400   |    1     |
|   101    |  서울  | 참치스시 |  400   |    1     |
|   101    |  서울  |   와규   |  300   |    2     |
|   102    |  부산  | 연어스시 |  600   |    1     |
|   102    |  부산  |   튀김   |  300   |    2     |

```SQL
/*
SELECT 매장코드, 지역명, 메뉴명, 판매량, _____() AS 판매순위 FROM 판매;
*/

SELECT 매장코드, 지역명, 메뉴명, 판매량
		, DENSE_RANK() OVER (PARTITION BY 지역명 ORDER  BY 판매량 DESC) AS 
		판매순위
FROM 판매;
```

#### 그룹 내 집계함수

SUM, AVG, COUNT, MAX, MIN 등의 집계성 함수들도 윈도우 함수로 사용할 수 있다.

ex) 아래의 결과를 출력하는 SQL문을 완성하시오.

| 매장코드 | 지역명 |  메뉴명  | 판매량 | col1 |
| :------: | :----: | :------: | :----: | :--: |
|   101    |  서울  | 연어스시 |  400   | 1100 |
|   101    |  서울  | 참치스시 |  400   | 1100 |
|   101    |  서울  |   와규   |  300   | 1100 |
|   102    |  부산  | 연어스시 |  600   | 900  |
|   102    |  부산  |   튀김   |  300   | 900  |

```sql
SELECT 매장코드, 지역명, 메뉴명, 판매량, SUM(판매량) OVER (PARTITION BY 지역명) col1
FROM 판매;
```

#### 그룹 내 비율 함수

|     함수     |                             설명                             |
| :----------: | :----------------------------------------------------------: |
| PERCENT_RANK | 값이 아닌, 순서를 대상으로, 파티션 내에서의 순서별 백분율을 조회함 |
|   NTILE(n)   | 파티션별로 전체 건수를 n등분한 값을 반환한다. n=4일 경우 4등분한 것 내에서 몇인지 조회함 |
|  CUME_DIST   | 파티션 내 전체에서 현재 행의 값 이하인 레코드 건수에 대한 누적 백분율을 조회. 누적 분포상에 0~1값을 가짐 |

#### 그룹 내 행 순서 함수

|                        함수                        |                             설명                             |
| :------------------------------------------------: | :----------------------------------------------------------: |
|                    FIRST_VALUE                     |   파티션 내에서 가장 처음 나오는 값 반환. MIN과 동일 결과    |
|                     LAST_VALUE                     | 파티션 내에서 가장 마지막에 나오는 값 반환. MAX와 동일한 결과 |
|           LAG(컬럼명, 레코드위치차이값)            |                       이전 행을 가져옴                       |
| LEAD(컬럼명, 레코드위치차이값, null일 경우 대체값) |          다음(특정 위치의)행을 가져옴. default는 1           |

ex) SQL문의 결과 반환되는 ㄱ, ㄴ 값을 구하시오.

| 매장코드 | 지역명 |  A   |  B   |
| :------: | :----: | :--: | :--: |
|    A     |  서울  |      |      |
|    B     |  부산  |      |      |
|    C     |  부산  |  ㄱ  |  ㄴ  |
|    D     |  부산  |      |      |
|    E     |  부산  |      |      |

```SQL
SELECT 매장코드, 지역명
		, LAG(매장코드, 2) OVER (ORDER BY 매장코드 DESC) A
		, LEAD(매장코드, 2) OVER (PARTITION BY 지역명, ORDER BY 매장코드) B
FROM 판매;
-- ㄱ: E ㄴ: E
```

#### WINDOWING

함수의 연산 대상이 되는 레코드의 범위를 정함

|        종류         |                         설명                         |
| :-----------------: | :--------------------------------------------------: |
|        RANGE        | 범위를 지정해줄때 사용 ex) RANGE BETWEEN 100 AND 200 |
|   BETWEEN a AND b   |             a부터 b까지 윈도우가 적용됨              |
| UNBOUNDED PRECEDING |           윈도우의 시작 위치 = 첫 번째 행            |
| UNBOUNDED FOLLOWING |           윈도우의 마지막 위치 = 마지막 행           |
|     CURRENT ROW     |              윈도우 시작 위치가 현재 행              |

## 테이블 파티션

대용량의 테이블을 여러개의 데이터 파일에 분리하여 저장하는 것.

물리적으로 분리된 데이터 파일에 저장되어 입력/수정/삭제/조회 성능이 향상되고, 독립적 관리가 가능하며 조회의 범위를 줄이는 효과가 있어 성능이 향상된다.

|   파티션 종류   |                             설명                             |
| :-------------: | :----------------------------------------------------------: |
| RANGE PARTITION |       값의 범위를 기준으로 파티션을 나눠 저장하는 방법       |
| LIST PARTITION  |          특정 값을 기준으로 분할하여 저장하는 방법           |
| HASH PARTITION  | 데이터베이스 관리 시스템이 자체적으로 해쉬함수를 사용해 분할하고 관리하는 방식 |

## 옵티마이저

SQL 실행계획을 수립하고, SQL을 실행하는 데이터베이스 관리 시스템의 소프트웨어이다.

같은 SQL문이더라도 어떻게 실행하냐에 따라 성능이 달라진다. (소요시간, 자원사용량 등) 따라서 SQL문을 분석한 후 일정한 기준을 통해 실행계획을 세워줘야하는데 이때 사용되는 것이 옵티마이저다.

옵티마이저의 유형에는 규칙기반 옵티마이저와 비용 기반 옵티마이저가 있다.

|           유형           |                             설명                             |
| :----------------------: | :----------------------------------------------------------: |
| 규칙기반 옵티마이저(RBO) | 사전에 정의된 SQL 규칙의 우선순위(15가지)로 실행계획을 생성하는 방식 |
| 비용기반 옵티마이저(CBO) | 통계 정보를 활용하여 SQL 처리시간 및 자원 사용량 등을 계산하고, 가장 효율적인 실행 계획을 생성하는 방식 |

## 인덱스

데이터의 색인(목차)와 동일하다. 원하는 데이터를 빠르게 조회할 수 있다.

인덱스는 인덱스 키를 기준으로 정렬되어 있으며 그에 따라 탐색이 빨라진다. PK는 자동적으로 INDEX가 된다.

하나의 테이블에 여러 개의 인덱스를 생성할 수 있고, 하나의 인덱스는 여러 컬럼으로 구성될 수 있다.

- Index Unique SCAN : 인덱스 키 값이 중복되지 않을 때 해당 키를 통해 탐색.
- Index Range SCAN : 특정 범위를 조회하는 WHERE 문을 사용하여 해당 영역을 스캔.
- Index Full SCAN : 인덱스의 처음부터 끝까지 모두 스캔.

## 옵티마이저 조인

JOIN을 수행하는 과정에서 성능을 최적하기 위해 옵티마이저 조인 방식을 선택하여 hint로 기입해준다.

```sql
SELECT /* ordered_use_nl(B) */ A.* -- nested loop방식
FROM table1 A JOIN table2 B ON A.id = B.id;

-- ordered use_hash, ordered use_merge
```

#### Nested Loop JOIN

-**선행 테이블(외부 테이블, Driving Table)**을 먼저 조회하여 연결 대상 데이터를 찾고, 그 다음 테이블(내부 테이블)을 연결한다.

-선행테이블(외부테이블, Driving Table)의 처리범위에 따라 처리량이 결정된다. 선행 테이블의 크기가 작은것을 찾아야한다.

-로우들간의 처리, 테이블 간의 처리 모두 **순차적**으로 일어난다.

-최적의 순서를 찾아주는 것이 중요하다.

-**RANDOM ACCESS** 발생(선행 테이블에서 두 번째 테이블을 참조할 때 발생한다.)

-성능 지연을 줄이기 위해 RANDOM ACCESS가 적은 양이 발생하도록 해야한다.

-선행테이블 처리 범위가 많거나, 연결 테이블에서의 랜덤엑세스 범위가 많다면 SORT MERGE JOIN    보다 불리해지는 경우가 있다.

-**INDEX가 필요하고**, Unique Index 시 유리하다.

-온라인 트랜잭션 처리(**OLTP**)에 유용하다.

#### Sort Merge JOIN

-두 테이블을 각각 **정렬**하고, 완료되면 병합함.

-정렬이 발생하기 때문에 데이터 양이 많을 경우 느려진다.

-정렬 대상 데이터 양이 많을 경우 **임시 디스크**를 사용하기 때문에, 성능이 저하된다.

-**EQUI JOIN, non-EQUI JOIN 모두 가능**함.

#### HASH JOIN

-두 테이블 중 작은 테이블을 **HASH** 메모리에 로딩하고, 두 테이블의 조인 키를 사용하여 해쉬 테이 블을 생성함.

-두 테이블을 동시에 스캔함.

-선행 테이블에는 작은 데이터가 먼저 와야함.

-**시스템 자원을 최대한 활용 가능**하며, 너무 많이 사용될 우려도 있음.

-대용량 처리에 빠른 처리 속도를 보임.

-**EQUI JOIN에서만 가능**함.

-**INDEX를 사용하지 않음**.

## PL/SQL

SQL을 확장시켜 다양한 절차적 프로그래밍을 가능하게 한 언어

-Block 구조로 되어 있어서 기능별로 모듈화가 가능.

-Declare 문으로 시작하며, 변수 및 상수를 선언하여 사용 가능.

-DML, IF, LOOP문 등 다양한 절차적 언어를 사용.

-Oracle에 내장되어 있음. 동일한 언어를 사용하는 프로그램과 호환 가능.

-응용 프로그램의 성능을 향상시킴.

## 분산 데이터베이스

하나의 데이터베이스시스템(DBMS)이 네트워크를 통해 물리적으로 분리된 데이터베이스들을 제어하는 형태의 DB

-성능향상 : 분산데이터베이스가 병렬 작업을 하기 때문에 속도가 빠름.

-모듈화가 되어있어 다른 모듈에 영향을 주지 않고 시스템 갱신이 가능.

-분산 데이터베이스 추가를 통한 용량 확장이 용이.

-중요 데이터를 보호하기 용이.

-신뢰성이 높음.

-관리와 통제가 어려움.

-보안관리, 무결성 통제가 어려움.

-복잡한 구조를 가짐.
