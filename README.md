# Trala lab

## How to run
```
yarn start
```

## How to test 
```
yarn test
```

테스트 파일은 App.spec.tsx, Assets.spec.tsx 두 가지가 있습니다

## App.spec.tsx
메타 마스크로 설치에 따라 뷰가 제대로 나오는지 확인합니다.
```mermaid
graph LR
유저-->모바일
유저-->데스크탑
모바일-->메타마스크-딥링크
데스크탑-->메타마스크-미설치-->메타마스크-설치링크
```
## Assets.spec.tsx
보낼 Balance의 input에 자연수 혹은 소숫점이 들어가는지 확인합니다.


## Web-flow
1. Assets 
```mermaid
graph LR
유저-->모바일
유저-->데스크탑
모바일-->메타마스크-딥링크
데스크탑-->메타마스크-미설치-->메타마스크-설치링크
데스크탑-->메타마스크-설치-->Assets
```
2. Send
```mermaid
graph LR
Assets-->지갑주소-확인-->에러-->Send비활성
Assets-->보유량-확인-->에러-->Send비활성
Address-regex-지갑주소-확인-->지갑-OK-->보유량-확인-->보유량-OK-->Send활성화
```
3. Profile
```mermaid
graph LR
Profile-->저장된-이미지-없는-경우-->기본-이미지
기본-이미지-->클릭-->이미지-선택-->이미지-저장
Profile-->저장된-이미지-있는-경우-->클릭

```
