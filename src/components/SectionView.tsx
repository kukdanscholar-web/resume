import type { Section } from "@/data/content";
import ViewTitle from "./ViewTitle";
import styles from "./SectionView.module.css";

export default function SectionView({ section }: { section: Section }) {
  return (
    <section className={styles.section}>
      <ViewTitle label={section.label} />
      <div className={styles.groups}>
        {section.groups.map((group, groupIndex) => (
          <div key={group.heading ?? groupIndex} className={styles.group}>
            {group.heading && <h3 className={styles.heading}>{group.heading}</h3>}
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item.title}>
                  <p className={styles.item}>
                    <span className={item.key ? styles.marked : undefined}>{item.title}</span>
                    {item.meta && <span className={styles.meta}>{item.meta}</span>}
                  </p>
                  {item.details && (
                    <ul className={styles.details}>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
