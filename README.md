# 가상 자산 지갑 관리 시스템

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5b47968c-ba92-4fb6-8bd8-7839c705582b/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.36.02.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220530%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220530T075318Z&X-Amz-Expires=86400&X-Amz-Signature=4a08a4999388de23e672b7e1eaa65949d3eec82aeb7cc8df0036595558cd1911&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202022-05-30%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE%25204.36.02.png%22&x-id=GetObject">

## 1. 프로젝트 소개

> - 거래소와는 별도로 개인 자산을 보관하고 관리하는 지갑을 구현
> - 개인 가상 자산을 관리하기 위해 구현된 지갑 인프라에 사용자가 쉽게 접근할 수 있는 유저 인터페이스를 추가
> - 프론트엔드는 초기 세팅부터 전부 직접 구현했으며, 백엔드는 백엔드 엔지니어 팀원분께서 따로 작업해주셨습니다.
> - 진행 기간: 2022/05/09~05/24(배포까지 총 16일)

## 2. 실행 방법

```
npm install
npm run start
```

리팩토링 하면서 .env 파일을 만들어 URL을 따로 관리할 예정

## 3. 기술 스택

### Front-end

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=black">

### Back-end

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

### DB

<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">

백엔드 엔지니어 팀원분께서 레포지토리를 pubilc으로 전환할 때, 백엔드 레포지토리 주소도 기입할 예정

### Tool

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/notion-181717?style=for-the-badge&logo=notion&logoColor=white"><img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">

## 4. 프로젝트 로그

> - 프로젝트(인턴십) 진행 로그
> - 페이지별 관리하는 State, 사용하는 함수
> - 컨벤션, 스타일 가이드
> - 이력서 관련 세션

[프로젝트 로그 보러가기](https://calico-satellite-06e.notion.site/0176a96c2ab144baa7b37f67fe48e019)
