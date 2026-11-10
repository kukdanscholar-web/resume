"use client";

import { useRef, useState, type ReactNode } from "react";
import { keywords, sections, type SectionId } from "@/data/content";
import Sidebar from "./Sidebar";
import KeywordCloud from "./KeywordCloud";
import EssayView from "./EssayView";
import SectionView from "./SectionView";
import styles from "./ProfileApp.module.css";

type View =
  | { type: "cloud" }
  | { type: "essay"; keywordId: string }
  | { type: "section"; sectionId: SectionId };

// 구름이 좌우로 흩어지는 시간(ms). KeywordCloud.module.css의 전환 시간과 맞춘다.
const SCATTER_MS = 520;

function recordClick(id: string) {
  // 집계 실패가 화면 동작을 막으면 안 되므로 오류는 무시한다.
  fetch("/api/clicks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
    keepalive: true,
  }).catch(() => undefined);
}

export default function ProfileApp({ age }: { age: ReactNode }) {
  const [view, setView] = useState<View>({ type: "cloud" });
  const [scattering, setScattering] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function goTo(next: View, clickId: string) {
    recordClick(clickId);
    if (timer.current) clearTimeout(timer.current);
    if (view.type !== "cloud" || next.type === "cloud") {
      setScattering(false);
      setView(next);
      return;
    }
    setScattering(true);
    timer.current = setTimeout(() => {
      setScattering(false);
      setView(next);
    }, SCATTER_MS);
  }

  const activeKeyword = view.type === "essay" ? keywords.find((keyword) => keyword.id === view.keywordId) : undefined;
  const activeSection = view.type === "section" ? sections.find((section) => section.id === view.sectionId) : undefined;

  return (
    <div className={styles.frame}>
      <Sidebar
        age={age}
        activeSectionId={activeSection?.id}
        onSelect={(sectionId) => goTo({ type: "section", sectionId }, `section-${sectionId}`)}
      />
      <main className={styles.main}>
        {view.type !== "cloud" && (
          <button type="button" className={styles.back} onClick={() => goTo({ type: "cloud" }, "back")}>
            ← 처음 화면으로
          </button>
        )}
        {view.type === "cloud" && (
          <KeywordCloud
            scattering={scattering}
            onSelect={(keywordId) => goTo({ type: "essay", keywordId }, keywordId)}
          />
        )}
        {activeKeyword && <EssayView key={activeKeyword.id} keyword={activeKeyword} />}
        {activeSection && <SectionView key={activeSection.id} section={activeSection} />}
      </main>
    </div>
  );
}
