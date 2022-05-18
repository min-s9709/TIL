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



