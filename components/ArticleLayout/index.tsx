import React from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/styles/Post.module.css";
import { useTranslation } from "next-i18next";

export default function ArticleLayout({ article }) {
  const { t: tr } = useTranslation();
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1>{article.meta.title}</h1>
        <p className={styles.date}>{article.meta.date}</p>
        <div dangerouslySetInnerHTML={{ __html: article.html }} />
        <div
          className={styles.footer}
          dangerouslySetInnerHTML={{ __html: tr("common.articleFooter") }}
        />
      </div>
    </PageLayout>
  );
}
