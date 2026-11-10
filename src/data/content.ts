// 화면에 표시되는 모든 콘텐츠. 문구를 바꾸려면 이 파일만 고치면 된다.

export type SectionId = "career" | "certs" | "skills";

export interface Profile {
  name: string;
  role: string;
  region: string;
  photo: string;
}

export interface EssaySegment {
  id: string;
  text: string;
}

export interface Keyword {
  id: string;
  label: string;
  /** 이 키워드를 눌렀을 때 형광펜으로 칠할 에세이 조각 id */
  segmentIds: string[];
  /** 처음 화면에서의 가로 위치 (메인화면 기준 %) */
  x: number;
  /** 지나가는 높이 (메인화면 기준 %). 글씨끼리 겹치지 않게 서로 다른 값을 쓴다. */
  y: number;
  size: number;
  color: string;
  /** 오른쪽 끝에서 왼쪽 끝까지 지나가는 데 걸리는 시간(초) */
  travel: number;
  /** 위아래로 한 번 오르내리는 시간(초) */
  bob: number;
}

export interface SectionItem {
  title: string;
  meta?: string;
  /** true면 제목에 형광펜을 칠한다 */
  key?: boolean;
  details?: string[];
}

export interface SectionGroup {
  heading?: string;
  items: SectionItem[];
}

export interface Section {
  id: SectionId;
  label: string;
  /** 보조화면의 메뉴 아래에 보이는 한 줄 요약 */
  summary: string;
  groups: SectionGroup[];
}

export interface DocumentPage {
  src: string;
  width: number;
  height: number;
}

export interface OriginalDocument {
  id: string;
  label: string;
  /** 원문을 쪽마다 그림으로 만든 것. 비어 있으면 "준비 중"으로 표시한다. */
  pages: DocumentPage[];
}

export const profile: Profile = {
  name: "김재진",
  role: "행정/사무 · 지식재산권 · 영업/사업",
  region: "인천시 부평구",
  photo: "/profile.webp",
};

// 임시 에세이: 이력서 상단의 글. 최종 에세이를 받으면 교체한다.
export const essay: EssaySegment[] = [
  { id: "s1", text: "특허법률사무소에서 근무한 경력이 있습니다. " },
  { id: "s2", text: "근무 중 예술에 대한 열정으로 퇴사 하였습니다. " },
  { id: "s3", text: "창작 활동을 하며 세상과 경제에 보탬이 되고 싶다는 마음으로 " },
  { id: "s4", text: "스타벅스 등 외식 업종에 근무를 병행하였으며, " },
  {
    id: "s5",
    text: "더 높은 잠재 가치를 추구하기 위해, 최종적으로 종합상사에서 남은 35년의 커리어를 꾸리려 합니다. ",
  },
  { id: "s6", text: "일을 제 작품으로 대합니다." },
];

// 키워드와 에세이 조각의 연결은 임시 값이다. 최종 에세이에 맞춰 다시 정한다.
export const keywords: Keyword[] = [
  { id: "kw-creativity", label: "창의성", segmentIds: ["s2"], x: 16, y: 8, size: 60, color: "rgba(74, 144, 201, 0.72)", travel: 15, bob: 7 },
  { id: "kw-expression", label: "표현력", segmentIds: ["s3"], x: 62, y: 22, size: 44, color: "rgba(86, 168, 164, 0.72)", travel: 12, bob: 9 },
  { id: "kw-presentation", label: "PT능력", segmentIds: ["s5"], x: 38, y: 36, size: 68, color: "rgba(108, 122, 196, 0.64)", travel: 12, bob: 8 },
  { id: "kw-focus", label: "집중력", segmentIds: ["s6"], x: 74, y: 50, size: 38, color: "rgba(110, 164, 214, 0.8)", travel: 9, bob: 10 },
  { id: "kw-analysis", label: "분석능력", segmentIds: ["s1"], x: 12, y: 64, size: 46, color: "rgba(58, 100, 148, 0.68)", travel: 9, bob: 9 },
  { id: "kw-explain", label: "설명력", segmentIds: ["s4"], x: 54, y: 78, size: 54, color: "rgba(226, 152, 104, 0.74)", travel: 12, bob: 7 },
];

export const sections: Section[] = [
  {
    id: "career",
    label: "경력",
    summary: "특허법률사무소 주임",
    groups: [
      {
        items: [
          {
            title: "상상특허법률사무소 · 과제팀 주임 연구원",
            meta: "2022.07 – 2024.08 · 서울시 강남구",
            key: true,
            details: [
              "법률행정사무: 사건 관리 및 고객 소통, 특허청·법원 문서 수발신 대응과 양식 제출, 경영 행정 사무",
              "회사 창립 이후 누적된 사내 미수금 회수 및 채권 추심 업무 프로세스 개발",
              "특허분석 및 국가지원사업 컨설팅: 사업 유치와 고객 영업, 사업 계획서·시장 조사 보고서·특허맵 보고서 작성",
              "IP나래: 수가 약 2,500만원 국가 사업 수주 — ‘식물성 식품’ 기술의 한·일·미·유럽 특허 분석 및 전략 도출",
              "IP바로지원: 수가 1,000만원 국가 사업 고객 유치 — 기계 재료 시험 장비 특허 분석 및 전략 도출",
            ],
          },
          { title: "스타벅스 · 바리스타 (Coffee Master)", meta: "2025.01 – 2025.10" },
          { title: "영업 직무 및 서비스업 · 외식업 아르바이트 등", meta: "2024 – 2026" },
          { title: "영업 직무 및 서비스업 · 통신, 증권, 보험, 부동산 영업", meta: "2016 – 2022" },
        ],
      },
      {
        heading: "개인 프로젝트",
        items: [
          {
            title: "장편소설 집필 · 창작",
            meta: "2024.08 ~",
            details: ["현대 장르 장편 소설 집필", "2026.08 투고, 출판사 거절 의견으로 지속 작업"],
          },
        ],
      },
      {
        heading: "학력 · 병역",
        items: [
          { title: "인천청학공업고등학교 · 로보틱스과 졸업" },
          { title: "육군 · K9 자주포 정비병", meta: "중도 전역, 일병" },
        ],
      },
    ],
  },
  {
    id: "certs",
    label: "자격",
    summary: "지식재산권, 경영, AI",
    groups: [
      {
        heading: "AI & IT",
        items: [
          { title: "AICE", meta: "Associate" },
          { title: "AIBT", meta: "1급" },
          { title: "AI-POT", meta: "1급" },
          { title: "워드프로세서", meta: "1급" },
        ],
      },
      {
        heading: "Administration & Law",
        items: [
          { title: "지식재산능력시험 (2026)", meta: "1급", key: true },
          { title: "지식재산능력시험 (2023)", meta: "2급" },
          { title: "경제경영이해력시험", meta: "1급" },
          { title: "경제이해력시험", meta: "2급" },
          { title: "지식재산실무과정", meta: "수료" },
          { title: "법률사무취업과정", meta: "수료" },
        ],
      },
      {
        heading: "Languages",
        items: [
          { title: "영어 (TOEIC)", meta: "Advanced (800)", key: true },
          { title: "중국어", meta: "Intermediate" },
          { title: "일본어", meta: "Basic" },
        ],
      },
      {
        heading: "Others",
        items: [
          { title: "경영정보시각화능력", meta: "1급 1차 합격" },
          { title: "컴퓨터활용능력", meta: "1급 1차 합격" },
          { title: "손해/생명 보험", meta: "설계사" },
          { title: "생산자동화", meta: "기능사" },
        ],
      },
    ],
  },
  {
    id: "skills",
    label: "특기",
    summary: "PT 발표, 분석 업무",
    groups: [
      {
        items: [
          {
            title: "행정사무",
            key: true,
            details: ["사건 관리, 특허청·법원 문서 대응, 경영 행정 사무", "미수금 회수·채권 추심 업무 프로세스 개발"],
          },
          {
            title: "지식재산 국가사업",
            key: true,
            details: ["IP나래·IP바로지원 사업 수주 및 수행", "해외 특허 분석, 특허맵·전략 보고서 작성"],
          },
          {
            title: "영업",
            key: true,
            details: ["국가지원사업 고객 유치", "통신·증권·보험·부동산 영업 경험"],
          },
        ],
      },
      {
        heading: "Tools",
        items: [{ title: "PPT · Power BI · Claude(GenAI) · Microsoft Office · WIPS(특허 검색 엔진)" }],
      },
    ],
  },
];

/** 키워드 구름 화면 아래의 버튼 문구 */
export const REVIEW_LABEL = "한층 진지하게 검토해보기";

/** 키워드 구름 화면 위의 버튼 문구. 뒤에 "확인한 개수/전체 개수"가 붙는다. */
export const PROGRESS_LABEL = "지원자 역량 확인하기";

// 원문 그림에는 전화번호가 지워져 있다. 이력서를 바꾸면 그림도 다시 만들어야 한다.
export const documents: OriginalDocument[] = [
  {
    id: "resume",
    label: "이력서",
    pages: [{ src: "/resume-1.webp", width: 1428, height: 2021 }],
  },
  {
    id: "portfolio",
    label: "포트폴리오",
    pages: [],
  },
];
