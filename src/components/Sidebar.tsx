import Image from "next/image";
import type { ReactNode } from "react";
import { profile, sections, type SectionId } from "@/data/content";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  age: ReactNode;
  activeSectionId?: SectionId;
  onSelect: (sectionId: SectionId) => void;
}

export default function Sidebar({ age, activeSectionId, onSelect }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.photo}>
        <Image src={profile.photo} alt={`${profile.name} 프로필 사진`} width={320} height={380} priority />
      </div>
      <div className={styles.identity}>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.line}>{age}</p>
        <p className={styles.line}>{profile.region}</p>
      </div>
      <nav className={styles.menu} aria-label="자료 메뉴">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={section.id === activeSectionId ? styles.active : undefined}
            aria-current={section.id === activeSectionId ? "page" : undefined}
            onClick={() => onSelect(section.id)}
          >
            <span className={styles.label}>{section.label}</span>
            <span className={styles.summary}>{section.summary}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
