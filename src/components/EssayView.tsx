import { essay, type Keyword } from "@/data/content";
import ViewTitle from "./ViewTitle";
import styles from "./EssayView.module.css";

export default function EssayView({ keyword }: { keyword: Keyword }) {
  return (
    <section className={styles.essay}>
      <ViewTitle label={keyword.label} />
      <p className={styles.text}>
        {essay.map((segment) => (
          <span key={segment.id} className={keyword.segmentIds.includes(segment.id) ? styles.marked : undefined}>
            {segment.text}
          </span>
        ))}
      </p>
    </section>
  );
}
