import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "@/components/Link";
import LangSwitchLink from "@/components/LangSwitchLink";
import styles from "./index.module.css";

const MenuLink: React.FC<{
  href: string;
  strict?: boolean;
  children: string;
}> = ({ href, strict, children }) => {
  const router = useRouter();

  const isActive = strict
    ? router.pathname === `/[locale]`
    : router.pathname.includes(href);

  return (
    <li className={!isActive ? styles.inactive : null}>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
};

/*
    <MenuLink href="/podcast">{tr("menu.podcast")}</MenuLink>
    <MenuLink href="/projects">{tr("menu.projects")}</MenuLink>
    <MenuLink href="/about">{tr("menu.about")}</MenuLink>
 */

const PageLayout: React.FC = ({ children }) => {
  const { t: tr } = useTranslation();
  const router = useRouter();

  const isHome = router.pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main
      className={`${styles.page_container} ${menuOpen ? styles.menu_open : ""}`}
    >
      <menu className={styles.menu_container}>
        <ul>
          <MenuLink href="/" strict>
            {tr("menu.home")}
          </MenuLink>
          <MenuLink href="/blog">{tr("menu.blog")}</MenuLink>
          <MenuLink href="/thoughts">{tr("menu.thoughts")}</MenuLink>
        </ul>
      </menu>
      <section className={styles.content_container}>
        <header className={styles.header_container}>
          <div>
            <div className={styles.menu_button}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <path
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                  d="M3 12L21 12M3 6L21 6M3 18L21 18"
                />
              </svg>
            </div>
            <p className={styles.name}>{isHome && tr("common.name")}</p>
          </div>
          <div className={styles.lang_switcher}>
            <p className={styles.version}>{tr("common.version")}:</p>
            <div className={styles.langs}>
              <LangSwitchLink locale="ua" />
              <LangSwitchLink locale="en" />
            </div>
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
