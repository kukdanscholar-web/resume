import type { CSSProperties } from "react";
import { keywords } from "@/data/content";
import styles from "./KeywordCloud.module.css";

interface KeywordCloudProps {
  scattering: boolean;
  onSelect: (keywordId: string) => void;
}

export default function KeywordCloud({ scattering, onSelect }: KeywordCloudProps) {
  return (
    <div className={`${styles.cloud} ${scattering ? styles.scattering : ""}`}>
      <p className={styles.hint}>키워드를 눌러 보세요</p>
      {keywords.map((keyword, index) => (
        <span
          key={keyword.id}
          className={styles.slot}
          style={
            {
              top: `${keyword.y}%`,
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
