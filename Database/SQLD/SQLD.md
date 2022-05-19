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

- SELECT : 데이터 입력
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

SELECT MAX(col2) FROM T1; -- 300
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

- ROUND(숫자, 소수점 자리수) : 반올림. ROUND(25.3578.2) > 25.36
- TURNC(숫자, 소수점 자리수) : 버림. TURNC(25.3578, 2) > 25.35
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

