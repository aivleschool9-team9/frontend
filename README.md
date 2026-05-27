# 📚 AIVLE Book Manager: AI 기반 지능형 도서 관리 플랫폼

**AIVLE Book Manager**는 단순한 도서 기록을 넘어, 생성형 AI 기술을 통해 도서의 가치를 재발견하고 사용자에게 최적화된 콘텐츠 경험을 제공하는 지능형 도서 관리 플랫폼입니다.

---

## 🌟 핵심 기능 (Core Features)

### 1. 지능형 도서 관리 시스템
- **데이터 통합 관리 (CRUD)**: 도서의 기본 정보부터 줄거리, AI 요약본까지 체계적으로 관리합니다.
- **스마트 검색 및 정렬**: 제목·저자 기반 검색은 물론, 최신순·좋아요순 등 사용자 요구에 맞는 정렬 옵션을 제공합니다.
- **개인화된 위시리스트**: '좋아요' 기능을 통해 관심 도서를 별도로 관리하며, 로컬 스토리지를 활용하여 브라우저 재방문 시에도 상태를 유지합니다.

### 2. 생성형 AI 콘텐츠 엔진 (OpenAI Integration)
- **AI 마케터**: 도서 본문을 분석하여 독자의 시선을 사로잡는 **감성적인 카피**와 **최적의 해시태그**를 자동 생성합니다.
- **AI 북 디자이너**: 도서의 핵심 테마를 시각화하여 세상에 하나뿐인 **맞춤형 북 커버**를 제작합니다.
- **지능형 요약 서비스**: 긴 줄거리를 한눈에 파악할 수 있도록 핵심 위주로 압축하여 제공합니다.

### 3. 미디어 최적화 인프라
- **커스텀 데이터 파이프라인**: Express 서버를 통해 이미지 데이터 전송 용량 제한을 50MB까지 확장하여 고해상도 AI 이미지를 안정적으로 처리합니다.
- **데이터 영속화**: 생성된 모든 AI 콘텐츠와 이미지는 로컬 DB에 안전하게 저장되어 언제든 다시 확인할 수 있습니다.

---

## 🚀 기술적 고도화 포인트 (Technical Excellence)

### 📊 의미론적 맥락 검색 (Semantic Search)
- 단순한 키워드 매칭(`LIKE` 연산자) 조건 검색의 한계를 극복하기 위해, **OpenAI의 Embedding API와 가상 임베딩 행렬(Vector Matrix)을 통한 RAG(검색 증강 생성) 아키텍처**를 구축했습니다.
- 사용자가 "우울할 때 위로가 되는 책"과 같이 문장형 자연어로 검색하면, 입력된 쿼리를 벡터 공간으로 변환한 뒤 `db.json` 내 줄거리 데이터와의 코사인 유사도 밀집도를 연산하여 맥락적으로 가장 부합하는 도서 목록을 정렬 및 반환합니다.
- `src/api/openai.js` 엔진과 독립된 프롬프트 모듈 `src/api/prompts.js`를 구조화하여 AI 페르소나와 검색 컨텍스트 주입 로직을 정교하게 제어합니다.

### 💾 실시간 인터랙티브 환경
- 단순히 클라이언트 단에서만 불빛이 토글되는 일차원적인 `LocalStorage` 활용법에서 벗어나, 가상 백엔드 데이터와 연동되는 **비동기 상태 동기화 파이프라인**을 구현했습니다.
- 사용자가 하트 아이콘을 클릭하면 프론트엔드의 `state` 상태 변화와 동시에 Express 백엔드로 `PATCH` 비동기 요청을 전송하여, 개별 유저의 찜 상태(Wishlist 플래그)와 도서별 고유 좋아요 통계 데이터를 실시간으로 동기화 결합 처리합니다.

### 📥 고해상도 미디어 다운로드 프로세스
- OpenAI DALL-E 3 API가 반환하는 일회성 원격 이미지 URL 링크를 브라우저에 그대로 노출하지 않고, 데이터 스트림 제어권을 프론트엔드 단으로 캡슐화했습니다.
- `fetch API`를 통해 이미지 원격 주소의 네트워크 데이터 스트림을 전송받아 **`Blob(Binary Large Object)` 데이터 객체로 변환**한 뒤, 브라우저 가상 앵커 태그(`<a>`)의 `URL.createObjectURL` 속성과 `download` 이벤트를 실시간 트리거하여 로컬 PC에 즉시 파일 형태로 내보내는 전송 프로세스를 수행합니다.

### 🎨 MUI 테마 시스템 기반 전역 디자인 시스템 구축
개별 컴포넌트에 스타일 속성을 하드코딩(매직 넘버)하는 방식을 배제하고, **Material-UI (MUI v5/v6) 라이브러리의 `ThemeProvider` 아키텍처**를 전격 도입했습니다.
- 디자인 시스템 관리 파일인 `src/theme.js`에서 애플리케이션 전체의 스타일 토큰(Color Palette, Typography, Elevation Shadow, Border-radius 등)을 중앙 집중식으로 통제하고, 스타일 시트 파일인 `FormStyles.js`와 매핑했습니다.
- 구조와 유효성 검사 커스텀 훅(`useFormValidation.js`)이 완벽히 동일한 등록/수정 화면 레이아웃을 단일 `BookForm.jsx` 공통 컴포넌트로 통합 구현하여 프론트엔드 생산성을 극대화했습니다.

---

## 🛠 기술 스택 (Tech Stack)

| 구분 | 기술 스택 |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router DOM (v7) |
| **Backend** | Node.js, Express, JSON-Server |
| **AI API** | OpenAI (GPT-4o-mini, DALL-E) |
| **Infrastructure** | LocalStorage, Custom Data Pipeline |

---

## 🏃 시작하기 (Quick Start)

### 1. 환경 변수 설정
루트 디렉토리에 `.env` 파일을 생성하고 OpenAI API 키를 설정합니다.
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 2. 설치 및 실행
```bash
# 의존성 설치
npm install

# 백엔드 서버 실행 (Port: 3000)
npm run server

# 프론트엔드 개발 서버 실행 (Port: 5173)
npm run dev
```

---

## 📂 프로젝트 구조 (Project Structure)

```text
src/
├── api/          # API 통신 로직 및 OpenAI 프롬프트 정의
│   ├── books.js      # 도서 관련 API (CRUD)
│   ├── openai.js     # OpenAI 호출 엔진
│   └── prompts.js    # AI 페르소나 및 프롬프트 템플릿
├── components/   # 공통 레이아웃 컴포넌트
├── hooks/        # 유효성 검사 등 재사용 로직
├── pages/        # 주요 서비스 페이지
│   ├── BookListPage.jsx    # 검색/정렬/필터링 기능 포함
│   ├── BookDetailPage.jsx  # 좋아요/삭제 기능 포함
│   ├── BookCreatePage.jsx  # AI 콘텐츠 생성 기능 포함
│   └── BookEditPage.jsx    # 정보 수정 및 이미지 업데이트
└── App.jsx       # 라우팅 및 전역 레이아웃 설정
```

---

