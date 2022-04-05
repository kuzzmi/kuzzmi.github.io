import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/PageLayout.module.css";

const PageLayout: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <main className={styles.page_container}>
      <menu className={styles.menu_container}>
        <ul>
          <li>
            <Link href="/ua">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.inactive}>
            <Link href="/ua">
              <a>Tech articles</a>
            </Link>
          </li>
          <li className={styles.inactive}>
            <Link href="/ua">
              <a>Blog</a>
            </Link>
          </li>
          <li className={styles.inactive}>
            <Link href="/ua">
              <a>Projects</a>
            </Link>
          </li>
          <li className={styles.inactive}>
            <Link href="/ua">
              <a>About me</a>
            </Link>
          </li>
        </ul>
      </menu>
      <section className={styles.content_container}>
        <header className={styles.header_container}>
          <p className={styles.version}>version:</p>
          <div className={styles.langs}>
            <Link href="/ua">
              <a>🇺🇦</a>
            </Link>
            <Link href="/en">
              <a>🇬🇧</a>
            </Link>
          </div>
        </header>
        <article className={styles.content}>{children}</article>
      </section>
      <div className={styles.flag}>
        <div className={styles.blue} />
        <div className={styles.yellow} />
      </div>
    </main>
  );
};

export default PageLayout;
