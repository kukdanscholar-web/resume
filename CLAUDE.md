# CLAUDE.md — 지원자 김재진 웹 프로파일

제품 요구사항은 [PRD.md](PRD.md)를 따른다. PRD에 없는 기능은 임의로 추가하지 않는다.
Next.js 관련 규칙은 [AGENTS.md](AGENTS.md)도 함께 따른다 (이 버전은 변경점이 많으므로 코드 작성 전 `node_modules/next/dist/docs/`의 해당 가이드를 확인).

## 기술 스택
- 프레임워크: Next.js 16 (App Router, `src/` 디렉터리 사용)
- 언어: TypeScript, React 19
- 스타일: CSS Modules + `globals.css` (Tailwind 미사용)
- 애니메이션: CSS 애니메이션/트랜지션 우선. 라이브러리 추가는 사용자 확인 후.
- 배포: Vercel 무료(Hobby). GitHub `main`에 푸시하면 자동 배포된다. 서버에 파일을 저장할 수 없다.
- 실행 환경: Node.js 26, npm
- 린트: ESLint (`eslint-config-next`)
- 대상 환경: 데스크탑 브라우저만. 모바일 반응형은 만들지 않는다.

## 명령어
- 개발 서버: `npm run dev` → http://localhost:3000
- 빌드 확인: `npm run build`
- 린트: `npm run lint`

## 폴더 구조
```
src/app/            # 페이지(layout.tsx, page.tsx), 전역 스타일
src/components/     # 화면 컴포넌트 (보조화면, 메인화면, 키워드 구름 등)
src/data/           # 프로필·키워드·에세이 등 콘텐츠 데이터
public/             # 사진 등 정적 파일
PRD.md, CLAUDE.md, AGENTS.md
firstpaper_display.png   # 화면 초안 (참고용)
```

## 코드 규칙
1. 콘텐츠와 코드를 분리한다. 화면에 표시되는 텍스트는 `src/data/`에 두고 컴포넌트에 하드코딩하지 않는다.
2. 기본은 서버 컴포넌트. 클릭·애니메이션 등 상호작용이 필요한 컴포넌트에만 `"use client"`를 붙인다.
3. 생년월일은 서버에서만 다루고, 화면과 클라이언트로 전달되는 데이터에는 계산된 나이만 내려보낸다.
4. 개인정보(전화번호·상세 주소·이메일)를 코드, 로그, 커밋에 넣지 않는다. 공개 정보는 거주 지역(구 단위)까지만.
5. 서버에 파일을 쓰는 기능은 만들지 않는다 (Vercel에서 유지되지 않음).
6. `dangerouslySetInnerHTML`은 쓰지 않는다.
7. `any` 타입 금지. 데이터 구조는 `type`/`interface`로 정의한다.
8. 네이밍: 컴포넌트·타입은 `PascalCase`, 변수·함수는 `camelCase`, 상수는 `UPPER_SNAKE_CASE`, CSS 클래스는 `camelCase`(CSS Modules). 컴포넌트 파일명은 `PascalCase.tsx`.
9. 들여쓰기 2칸, 세미콜론 사용, 문자열은 큰따옴표.
10. 주석과 UI 문구는 한국어, 식별자는 영어. 주석은 "왜"를 설명할 때만 쓴다.
11. 컴포넌트는 한 가지 역할만 맡고 길어지면 나눈다.
12. 이미지는 `next/image`를 사용한다.

## 작업 방식
- 변경 후에는 `npm run lint`를 통과시키고, 개발 서버를 띄워 브라우저에서 직접 동작을 확인한다.
- 사용자가 "기억만 할 것"이라고 한 내용은 구현하지 않고 메모리에만 기록한다.
- 구현은 사용자가 별도로 지시할 때만 시작한다.
- 사용자는 책을 보며 실습 중인 입문자다. 설명은 쉬운 말로 한다.
