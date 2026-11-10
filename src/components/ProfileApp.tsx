"use client";

import { useRef, useState, type ReactNode } from "react";
import { keywords, sections, type SectionId } from "@/data/content";
import Sidebar from "./Sidebar";
import KeywordCloud from "./KeywordCloud";
import EssayView from "./EssayView";
import SectionView from "./SectionView";
import DocumentsView from "./DocumentsView";
import styles from "./ProfileApp.module.css";

type View =
  | { type: "cloud" }
  | { type: "essay"; keywordId: string }
  | { type: "section"; sectionId: SectionId }
  | { type: "documents" };

/** 모바일에서 한 번에 하나만 보이는 화면. side = 보조화면, main = 메인화면 */
type Panel = "side" | "main";
/** out = 현재 화면이 버튼으로 빨려 들어가는 중, in = 새 화면이 버튼에서 나오는 중 */
type Phase = "idle" | "out" | "in";

// 구름이 좌우로 흩어지는 시간(ms). KeywordCloud.module.css의 전환 시간과 맞춘다.
const SCATTER_MS = 520;
// 화면이 버튼으로 빨려 들어가거나 나오는 시간(ms). ProfileApp.module.css의 애니메이션 시간과 맞춘다.
const PANEL_MS = 380;
// ProfileApp.module.css의 모바일 기준 너비와 맞춘다.
const MOBILE_QUERY = "(max-width: 767px)";

function isMobile() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

export default function ProfileApp({ age }: { age: ReactNode }) {
  const [view, setView] = useState<View>({ type: "cloud" });
  const [scattering, setScattering] = useState(false);
  // 모바일은 메인화면에서 시작한다.
  const [panel, setPanel] = useState<Panel>("main");
  const [phase, setPhase] = useState<Phase>("idle");
  // 지금까지 확인한 키워드 id (페이지를 새로 열면 처음부터 다시 센다)
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const viewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function switchPanel(target: Panel) {
    if (panelTimer.current) clearTimeout(panelTimer.current);
    setPhase("out");
    panelTimer.current = setTimeout(() => {
      setPanel(target);
      setPhase("in");
      panelTimer.current = setTimeout(() => setPhase("idle"), PANEL_MS);
    }, PANEL_MS);
  }

  function goTo(next: View) {
    if (viewTimer.current) clearTimeout(viewTimer.current);
    if (view.type !== "cloud" || next.type === "cloud") {
      setScattering(false);
      setView(next);
      return;
    }
    setScattering(true);
    viewTimer.current = setTimeout(() => {
      setScattering(false);
      setView(next);
    }, SCATTER_MS);
  }

  function openKeyword(keywordId: string) {
    setViewedIds((ids) => (ids.includes(keywordId) ? ids : [...ids, keywordId]));
    goTo({ type: "essay", keywordId });
  }

  // 아직 확인하지 않은 키워드 중 첫 번째를 연다. 모두 확인했으면 처음 키워드부터 다시 보여 준다.
  function openNextKeyword() {
    const next = keywords.find((keyword) => !viewedIds.includes(keyword.id)) ?? keywords[0];
    openKeyword(next.id);
  }

  function selectSection(sectionId: SectionId) {
    // 모바일의 보조화면에서는 메인화면이 가려져 있으므로, 구름 흩어짐 없이 바로 바꾸고 메인화면으로 넘어간다.
    if (isMobile() && panel === "side") {
      if (viewTimer.current) clearTimeout(viewTimer.current);
      setScattering(false);
      setView({ type: "section", sectionId });
      switchPanel("main");
      return;
    }
    goTo({ type: "section", sectionId });
  }

  const activeKeyword = view.type === "essay" ? keywords.find((keyword) => keyword.id === view.keywordId) : undefined;
  const activeSection = view.type === "section" ? sections.find((section) => section.id === view.sectionId) : undefined;

  return (
    <div className={styles.frame} data-panel={panel} data-phase={phase}>
      <button
        type="button"
        className={styles.toggle}
        role="switch"
        aria-checked={panel === "main"}
        aria-label="프로필 화면과 소개 화면 전환"
        disabled={phase !== "idle"}
        onClick={() => switchPanel(panel === "side" ? "main" : "side")}
      >
        <span className={styles.knob} aria-hidden="true" />
        <span className={styles.toggleLabel}>프로필</span>
        <span className={styles.toggleLabel}>소개</span>
      </button>
      <div className={styles.side}>
        <Sidebar age={age} activeSectionId={activeSection?.id} onSelect={selectSection} />
      </div>
      <main className={styles.main}>
        {view.type !== "cloud" && (
          <button type="button" className={styles.back} onClick={() => goTo({ type: "cloud" })}>
            ← 처음 화면으로
          </button>
        )}
        {view.type === "cloud" && (
          <KeywordCloud
            scattering={scattering}
            viewedCount={viewedIds.length}
            onSelect={openKeyword}
            onNext={openNextKeyword}
            onReview={() => goTo({ type: "documents" })}
          />
        )}
        {activeKeyword && <EssayView key={activeKeyword.id} keyword={activeKeyword} />}
        {activeSection && <SectionView key={activeSection.id} section={activeSection} />}
        {view.type === "documents" && <DocumentsView />}
      </main>
    </div>
  );
}
