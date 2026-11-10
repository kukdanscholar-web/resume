import type { CSSProperties } from "react";
import { keywords, PROGRESS_LABEL, REVIEW_LABEL } from "@/data/content";
import styles from "./KeywordCloud.module.css";

interface KeywordCloudProps {
  scattering: boolean;
  /** 지금까지 확인한 키워드 개수 */
  viewedCount: number;
  onSelect: (keywordId: string) => void;
  /** 아직 확인하지 않은 다음 키워드 열기 */
  onNext: () => void;
  /** 이력서·포트폴리오 원문 화면으로 이동 */
  onReview: () => void;
}

export default function KeywordCloud({ scattering, viewedCount, onSelect, onNext, onReview }: KeywordCloudProps) {
  return (
    <div className={`${styles.cloud} ${scattering ? styles.scattering : ""}`}>
      <button type="button" className={`${styles.pill} ${styles.progress}`} disabled={scattering} onClick={onNext}>
        {PROGRESS_LABEL}
        <span className={styles.count}>
          {viewedCount}/{keywords.length}
        </span>
      </button>
      <button type="button" className={`${styles.pill} ${styles.review}`} disabled={scattering} onClick={onReview}>
        {REVIEW_LABEL}
        <svg className={styles.arrow} viewBox="0 0 28 14" width="28" height="14" aria-hidden="true">
          <path d="M1 7h24M19 1.5 25.5 7 19 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {keywords.map((keyword, index) => (
        <span
          key={keyword.id}
          className={styles.slot}
          style={
            {
              "--y": `${keyword.y}%`,
              "--x": `${keyword.x}%`,
              "--travel": `${keyword.travel}s`,
              // 음수 지연으로 처음부터 각자의 가로 위치에서 출발하게 한다.
              "--start": `${-((100 - keyword.x) / 100) * keyword.travel}s`,
              "--dir": index % 2 === 0 ? -1 : 1,
            } as CSSProperties
          }
        >
          <button
            type="button"
            className={styles.word}
            style={
              {
                "--size": `${keyword.size}px`,
                color: keyword.color,
                "--bob": `${keyword.bob}s`,
                "--phase": `${-index * 1.3}s`,
              } as CSSProperties
            }
            disabled={scattering}
            onClick={() => onSelect(keyword.id)}
          >
            {keyword.label}
          </button>
        </span>
      ))}
    </div>
  );
}
