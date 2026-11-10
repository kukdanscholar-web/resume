import styles from "./ViewTitle.module.css";

/** 메인화면의 제목. 옆에서 연필이 잠깐 쓰는 시늉을 한 뒤 사라진다. */
export default function ViewTitle({ label }: { label: string }) {
  return (
    <h2 className={styles.title}>
      <span className={styles.label}>{label}</span>
      <span className={styles.pencil} aria-hidden="true">
        ✏️
      </span>
    </h2>
  );
}
