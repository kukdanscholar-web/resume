import Image from "next/image";
import { documents } from "@/data/content";
import styles from "./DocumentsView.module.css";

/** 이력서·포트폴리오 원문을 그대로 보여 주는 화면 */
export default function DocumentsView() {
  return (
    <section className={styles.documents}>
      {documents.map((document) => (
        <article key={document.id} className={styles.document}>
          <h2 className={styles.title}>{document.label}</h2>
          {document.pages.length === 0 ? (
            <p className={styles.empty}>준비 중입니다.</p>
          ) : (
            document.pages.map((page, index) => (
              <Image
                key={page.src}
                className={styles.page}
                src={page.src}
                alt={`${document.label} 원문 ${index + 1}쪽`}
                width={page.width}
                height={page.height}
                sizes="(max-width: 767px) 100vw, 860px"
                priority={index === 0}
              />
            ))
          )}
        </article>
      ))}
    </section>
  );
}
